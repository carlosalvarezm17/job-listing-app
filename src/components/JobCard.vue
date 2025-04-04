<template>
    <div class="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
        <h3 class="text-xl font-semibold text-gray-800">{{ job.title }}</h3>
        <p class="text-gray-600">{{ job.company }} · {{ job.location }}</p>
        <button 
            class="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl" 
            @click="$router.push(`/jobs/${job.id}`)"
            aria-label="Ver más detalles del trabajo {{ job.title }}">
            Ver más
        </button>
    </div>
</template>
  
<script lang="ts" setup>
import { defineProps } from 'vue'
import { Job } from '../stores/jobStore'

const props = defineProps<{ job: Job }>()
</script>
  
<style scoped>
.job-card {
    border: 1px solid #ccc;
    padding: 1rem;
    margin-bottom: 1rem;
}
</style>
