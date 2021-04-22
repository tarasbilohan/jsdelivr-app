<template>
  <v-col
    cols="12"
    class="pa-4 white text-center"
  >
    <h3 class="red--text">
      {{ errorMessage }}
    </h3>
  </v-col>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'PackagesFailed',
  props: {
    errorMessage: {
      type: String,
      required: true
    }
  }
})
</script>
