import { reactive } from '@vue/composition-api'

import api from '@/services/api'

export default function usePackages () {
  const packages = reactive({
    dataState: 'awaiting', // 'awaiting' | 'loading' | 'loaded' | 'failed'
    data: [],
    errorMessage: null
  })

  async function fetchPackages (queryParams) {
    const response = await api.packages.search(queryParams)

    return response
  }

  return {
    packages,
    fetchPackages
  }
}
