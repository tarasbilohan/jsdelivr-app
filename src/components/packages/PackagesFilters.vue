<template>
  <v-col
    cols="12"
    class="mb-4 pa-4 white"
  >
    <v-text-field
      v-model="filtering.text"
      label="Package name"
      class="mb-0"
      @change="onFilteringChange"
    />
  </v-col>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'PackagesFilters',
  props: {
    filtering: {
      type: Object,
      required: true
    }
  },
  setup (props, context) {
    function onFilteringChange () {
      context.emit('change')
    }

    return {
      onFilteringChange
    }
  }
})
</script>
