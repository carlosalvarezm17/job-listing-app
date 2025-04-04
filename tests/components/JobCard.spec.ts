import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import JobCard from '../../src/components/JobCard.vue'

describe('JobCard.vue', () => {
  it('renders job title, company, and location', () => {
    const job = {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Corp',
      location: 'Remote'
    }

    const wrapper = mount(JobCard, {
      props: { job }
    })

    expect(wrapper.text()).toContain(job.title)
    expect(wrapper.text()).toContain(job.company)
    expect(wrapper.text()).toContain(job.location)
  })

  it('navigates to job details page on button click', async () => {
    const job = {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Corp',
      location: 'Remote'
    }

    const mockRouter = {
      push: vi.fn()
    }

    const wrapper = mount(JobCard, {
      props: { job },
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })

    await wrapper.find('button').trigger('click')
    expect(mockRouter.push).toHaveBeenCalledWith(`/jobs/${job.id}`)
  })
})
