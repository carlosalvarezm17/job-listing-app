<template>
    <div class="p-8">
      <h1 class="text-3xl">Job Listings</h1>
      <JobList />
    </div>
  </template>
  
  <script lang="ts" setup>
  import JobList from '../components/JobList.vue'
  import { useJobStore } from '../stores/jobStore'
  const store = useJobStore()

  store.fetchJobs()
  </script>
