import { createPinia, setActivePinia } from 'pinia'
import { useJobStore } from '../../src/stores/jobStore'
import { describe, it, expect, vi, beforeEach } from 'vitest'

global.fetch = vi.fn()

beforeEach(() => {
  setActivePinia(createPinia()) // Initialize Pinia before each test
})

describe('fetchJobs', () => {
  it('fetches jobs and updates the jobs array', async () => {
    const mockJobs = [
      { id: 1, title: 'Frontend Developer', category: 'Engineering', company: 'Company A' },
      { id: 2, title: 'Backend Developer', category: 'Engineering', company: 'Company B' }
    ]

    ;(fetch as unknown as jest.Mock).mockResolvedValueOnce({
      json: async () => mockJobs
    })

    const jobStore = useJobStore()
    await jobStore.fetchJobs()

    expect(jobStore.jobs).toEqual(mockJobs)
    expect(fetch).toHaveBeenCalledWith('/data/jobs.json', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
  })

  it('handles fetch errors gracefully', async () => {
    ;(fetch as unknown as jest.Mock).mockRejectedValueOnce(new Error('Fetch error'))

    const jobStore = useJobStore()
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    await jobStore.fetchJobs()

    expect(jobStore.jobs).toEqual([])
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching jobs:', expect.any(Error))

    consoleErrorSpy.mockRestore()
  })
})
