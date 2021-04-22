import qs from 'qs'

import { npmApiClient, jsDelivrApiClient } from '@/services/api'

async function search (queryParams) {
  const { data } = await npmApiClient.get(`/-/v1/search?${qs.stringify(queryParams)}`)

  return {
    total: data.total,
    packages: data.objects.map((item) => item.package)
  }
}

async function getPackage (packageName) {
  const { data } = await npmApiClient.get(`/${packageName}`)

  return data
}

async function getPackageTagsAndVersions (packageName) {
  const { data } = await jsDelivrApiClient.get(`/v1/package/npm/${packageName}`)

  return data
}

export default {
  search,
  getPackage,
  getPackageTagsAndVersions
}
