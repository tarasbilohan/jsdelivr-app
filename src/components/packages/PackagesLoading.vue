<template>
  <v-col
    cols="12"
    class="pa-4 white d-flex justify-center"
  >
    <v-progress-circular
      indeterminate
      color="primary"
    />
  </v-col>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'PackagesLoading'
})
</script>
