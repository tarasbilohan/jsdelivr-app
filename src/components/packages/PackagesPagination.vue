<template>
  <v-col
    cols="12"
    class="mt-4 pa-4 white"
  >
    <v-row>
      <v-col
        cols="8"
        offset="2"
      >
        <v-container class="max-width">
          <v-pagination
            v-model="pagination.page"
            :length="totalPages"
            class="my-4"
            @input="onPaginationChange"
          />
        </v-container>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'PackagesPagination',
  props: {
    pagination: {
      type: Object,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  setup (props, context) {
    function onPaginationChange () {
      context.emit('change')
    }

    return {
      onPaginationChange
    }
  }
})
</script>
