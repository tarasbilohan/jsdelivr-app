import { reactive } from '@vue/composition-api'

import api from '@/services/api'

export default function usePackageDialog () {
  const pack = reactive({
    dataState: 'awaiting', // 'awaiting' | 'loading' | 'loaded' | 'failed'
    data: null,
    tags: null,
    versions: null,
    errorMessage: null
  })

  async function openPackageDialog (activePack) {
    pack.dataState = 'loading'
    pack.data = null
    pack.tags = null
    pack.versions = null
    pack.errorMessage = null

    // I try to load full info from http://registry.npmjs.com/vue.js by package name
    // But this API has problem with CORS 🤯
    pack.data = activePack
    // try {
    //   pack.data = await api.packages.getPackage(activePack.name)
    // } catch (error) {
    //   pack.errorMessage = error.response && error.response.statusCode === 404
    //     ? 'Package not found.'
    //     : 'Some error(s) occurred while loading package details.'
    //   pack.dataState = 'failed'
    //   console.log(error)
    //
    //   return
    // }

    try {
      const { tags, versions } = await api.packages.getPackageTagsAndVersions(activePack.name)
      pack.tags = tags
      pack.versions = versions
    } catch (error) {
      pack.errorMessage = 'Some error(s) occurred while loading package details.'
      pack.dataState = 'failed'
      console.log(error)

      return
    }

    pack.dataState = 'loaded'
  }

  function closePackageDialog () {
    pack.dataState = 'awaiting'
    pack.data = null
    pack.tags = null
    pack.versions = null
    pack.errorMessage = null
  }

  return {
    pack,
    openPackageDialog,
    closePackageDialog
  }
}
