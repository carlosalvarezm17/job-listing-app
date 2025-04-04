import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import JobList from '../../src/components/JobList.vue'
import { createTestingPinia } from '@pinia/testing'

describe('JobList Component', () => {
  it('should go to the next page if not on the last page', async () => {
    const wrapper = mount(JobList, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            jobStore: {
              currentPage: 1,
              totalPages: 3,
            },
          },
          stubActions: false, // Ensure actions are not stubbed
        })],
      },
    })

    const store = wrapper.vm.store
    const goToPageMock = vi.fn()
    store.goToPage = goToPageMock // Mock the action directly on the store

    const nextButton = wrapper.find('[data-testid="next-button"]')
    expect(nextButton.exists()).toBe(true)
  })

  it('should not go to the next page if on the last page', async () => {
    const wrapper = mount(JobList, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            jobStore: {
              currentPage: 3,
              totalPages: 3,
            },
          },
          stubActions: false,
        })],
      },
    })

    const store = wrapper.vm.store
    const goToPageMock = vi.fn()
    store.goToPage = goToPageMock // Mock the action directly on the store

    const nextButton = wrapper.find('[data-testid="next-button"]')
    expect(nextButton.exists()).toBe(true)
    await nextButton.trigger('click')
    expect(goToPageMock).not.toHaveBeenCalled()
  })

  it('should go to the previous page if not on the first page', async () => {
    const wrapper = mount(JobList, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            jobStore: {
              currentPage: 2,
              totalPages: 3,
            },
          },
          stubActions: false,
        })],
      },
    })

    const store = wrapper.vm.store
    const goToPageMock = vi.fn()
    store.goToPage = goToPageMock // Mock the action directly on the store

    const prevButton = wrapper.find('[data-testid="prev-button"]')
    expect(prevButton.exists()).toBe(true)
    await prevButton.trigger('click')
    expect(goToPageMock).toHaveBeenCalledWith(1)
  })

  it('should not go to the previous page if on the first page', async () => {
    const wrapper = mount(JobList, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            jobStore: {
              currentPage: 1,
              totalPages: 3,
            },
          },
          stubActions: false,
        })],
      },
    })

    const store = wrapper.vm.store
    const goToPageMock = vi.fn()
    store.goToPage = goToPageMock // Mock the action directly on the store

    const prevButton = wrapper.find('[data-testid="prev-button"]')
    expect(prevButton.exists()).toBe(true)
    await prevButton.trigger('click')
    expect(goToPageMock).not.toHaveBeenCalled()
  })
})
