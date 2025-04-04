<template>
    <div>
      <div class="filters">
        <select v-model="store.filter">
          <option value="">Todos</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Fullstack</option>
          <option>DevOps</option>
        </select>
        <input
          class="outline-solid outline-offset-1 rounded-lg outline-blue-300"
          type="text"
          v-model="store.searchText"
          placeholder="Buscar por título"
        />
      </div>
  
      <div class="job-list">
        <JobCard class="my-4" v-for="job in store.paginatedJobs" :key="job.id" :job="job" />
      </div>
  
      <div class="pagination">
        <button 
          data-testid="prev-button" 
          aria-label="Página anterior"
          :class="{'text-gray-300': store.currentPage <= 1}" 
          @click="prevPage" 
          :disabled="store.currentPage <= 1">
          Anterior
        </button>
        <span>
          Página {{ store.currentPage }} de {{ store.totalPages }}
        </span>
        <button 
          data-testid="next-button" 
          aria-label="Página siguiente"
          :class="{'text-gray-300': store.currentPage >= store.totalPages}" 
          @click="nextPage" 
          :disabled="store.currentPage >= store.totalPages">
          Siguiente
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useJobStore } from '../stores/jobStore'
  import JobCard from './JobCard.vue'
  
  const store = useJobStore()
  
  function nextPage(): void {
    if (store.currentPage < store.totalPages) {
      store.goToPage(store.currentPage + 1)
    }
  }
  
  function prevPage(): void {
    if (store.currentPage > 1) {
      store.goToPage(store.currentPage - 1)
    }
  }
  </script>
  
  <style scoped>
  .filters {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
  }
  </style>
