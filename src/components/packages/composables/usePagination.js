import { reactive, computed } from '@vue/composition-api'

export default function usePagination () {
  const pagination = reactive({
    page: 1,
    total: 0,
    perPage: 10
  })

  function clearPagination () {
    pagination.page = 1
    pagination.total = 0
  }

  const totalPages = computed(() => {
    return Math.ceil(pagination.total / pagination.perPage)
  })

  return {
    pagination,
    clearPagination,
    totalPages
  }
}
