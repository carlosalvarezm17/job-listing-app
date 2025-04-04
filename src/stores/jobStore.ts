import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import debounce from 'lodash.debounce'

export interface Job {
  id: number
  title: string
  category: string
  company: string
  description?: string
  location?: string
}

export const useJobStore = defineStore('jobStore', () => {
  const jobs = ref<Job[]>([])
  const filter = ref<string>('')
  const searchText = ref<string>('')
  const currentPage = ref<number>(1)
  const pageSize = ref<number>(5)

  async function fetchJobs(): Promise<void> {
    try {
      const response = await fetch('/data/jobs.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      jobs.value = (await response.json()) as Job[]
    } catch (error) {
      console.error('Error fetching jobs:', error)
    }
  }

  const filteredJobs = computed((): Job[] => {
    let result = jobs.value
    if (filter.value) {
      result = result.filter(job => job.category.includes(filter.value))
    }
    if (searchText.value) {
      result = result.filter(job =>
        job.title.toLowerCase().includes(searchText.value.toLowerCase())
      )
    }
    return result
  })

  const totalPages = computed((): number =>
    Math.ceil(filteredJobs.value.length / pageSize.value)
  )

  const paginatedJobs = computed((): Job[] => {
    const start = (currentPage.value - 1) * pageSize.value
    return filteredJobs.value.slice(start, start + pageSize.value)
  })

  function goToPage(page: number): void {
    currentPage.value = page
  }

  watch([filter, searchText], debounce(() => {
    currentPage.value = 1
  }, 300))

  return {
    jobs,
    fetchJobs,
    filter,
    searchText,
    currentPage,
    pageSize,
    filteredJobs,
    totalPages,
    paginatedJobs,
    goToPage
  }
})
