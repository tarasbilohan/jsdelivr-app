<template>
  <v-container>
    <v-row class="mt-4 mb-4">
      <PackagesFilters
        :filtering="filtering"
        @change="onFilteringChange"
      />
      <PackagesLoading
        v-if="packages.dataState === 'loading'"
      />
      <PackagesFailed
        v-else-if="packages.dataState === 'failed'"
        :error-message="packages.errorMessage"
      />
      <PackagesEmpty
        v-else-if="packages.dataState === 'loaded' && packages.data.length === 0"
      />
      <PackagesList
        v-else-if="packages.dataState === 'loaded'"
        :packages="packages.data"
        @list-item-click="onListItemClick"
      />
      <PackagesPagination
        v-if="packages.dataState === 'loaded' && totalPages > 1"
        :pagination="pagination"
        :total-pages="totalPages"
        @change="onPaginationChange"
      />
    </v-row>
    <AppPackageDialog
      :pack="activePack"
      @close="onPackageDialogClose"
    />
  </v-container>
</template>

<script>
import { defineComponent, onMounted, computed, ref } from '@vue/composition-api'

import PackagesEmpty from '@/components/packages/PackagesEmpty.vue'
import PackagesFailed from '@/components/packages/PackagesFailed.vue'
import PackagesFilters from '@/components/packages/PackagesFilters.vue'
import PackagesList from '@/components/packages/PackagesList.vue'
import PackagesLoading from '@/components/packages/PackagesLoading.vue'
import PackagesPagination from '@/components/packages/PackagesPagination.vue'
import AppPackageDialog, { usePackageDialog } from '@/components/shared/AppPackageDialog'

import useFiltering from '@/components/packages/composables/useFiltering'
import usePagination from '@/components/packages/composables/usePagination'
import usePackages from '@/components/packages/composables/usePackages'

export default defineComponent({
  name: 'PackagesView',
  components: {
    PackagesEmpty,
    PackagesFailed,
    PackagesFilters,
    PackagesList,
    PackagesLoading,
    PackagesPagination,
    AppPackageDialog
  },
  setup () {
    const { packages, fetchPackages } = usePackages()
    const { filtering } = useFiltering()
    const { pagination, totalPages, clearPagination } = usePagination()
    const { pack: activePack, openPackageDialog, closePackageDialog } = usePackageDialog()

    const lastQueryParams = ref(null)

    const queryParams = computed(() => {
      return {
        text: filtering.text.trim(),
        from: (pagination.page - 1) * pagination.perPage,
        size: pagination.perPage
      }
    })

    async function loadPackages () {
      lastQueryParams.value = Object.assign({}, queryParams.value)

      packages.dataState = 'loading'
      packages.data = []
      packages.errorMessage = ''

      try {
        const response = await fetchPackages(queryParams.value)

        packages.data = response.packages
        pagination.total = response.total
        packages.dataState = 'loaded'
      } catch (error) {
        packages.errorMessage = 'Some error(s) occurred while loading packages.'
        packages.dataState = 'failed'
        console.log(error)
      }
    }

    async function onFilteringChange () {
      if (JSON.stringify(lastQueryParams.value) === JSON.stringify(queryParams.value)) {
        return
      }

      clearPagination()
      await loadPackages()
    }

    async function onPaginationChange () {
      await loadPackages()
    }

    function onListItemClick (item) {
      openPackageDialog(item)
    }

    function onPackageDialogClose () {
      closePackageDialog()
    }

    onMounted(async () => {
      filtering.text = 'vue.js'

      await loadPackages()
    })

    return {
      filtering,
      onFilteringChange,
      pagination,
      totalPages,
      onPaginationChange,
      packages,
      activePack,
      onListItemClick,
      onPackageDialogClose
    }
  }
})
</script>
