<template>
    <div class="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
      <div v-if="job">
        <h2 class="text-2xl font-bold mb-2 text-gray-800">{{ job.title }}</h2>
        <p class="mb-4 text-gray-600">{{ job.description }}</p>
        <p class="mb-4"><strong>Company:</strong> {{ job.company }}<br /><strong>Location:</strong> {{ job.location }}</p>
        <form @submit.prevent="applyJob" class="mb-4">
          <div class="mb-2">
            <label for="name" class="block text-gray-700">Name:</label>
            <input
              id="name"
              v-model="name"
              type="text"
              class="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700">Email:</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            :class="[{ 'bg-gray-500': !name || !email, 'bg-green-600 hover:bg-green-700': name && email }, 'text-white px-4 py-2 rounded-xl']"
            :disabled="!name || !email"
          >
            Apply
          </button>
          <button
            class="bg-blue-600 hover:bg-blue-700 mx-2 text-white px-4 py-2 rounded-xl"
            @click="$router.push(`/`)"
          >
            Return
          </button>
        </form>
      </div>
      <div v-else class="text-gray-500">
        Job not found. Please return to the job listings.
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useJobStore, Job } from '../stores/jobStore'
  
  const route = useRoute()
  const store = useJobStore()
  const job = ref<Job | undefined>(undefined)
  const name = ref<string>('')
  const email = ref<string>('')
  
  onMounted(() => {
    const id = Number(route.params.id)
    job.value = store.jobs.find(j => j.id === id)
  })
  
  function applyJob(): void {
    if (job.value) {
      console.info('Aplicación enviada:', { title: job.value.title, name: name.value, email: email.value })
    }
  }
  </script>
