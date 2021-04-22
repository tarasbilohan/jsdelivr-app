<template>
  <tr>
    <td>{{ pack.name }}@{{ pack.version }}</td>
    <td>
      {{ pack.description }}
    </td>
    <td>
      <div v-if="pack.author">
        {{ pack.name || '' }}
      </div>
    </td>
  </tr>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'PackagesList',
  props: {
    pack: {
      type: Object,
      required: true
    }
  }
})
</script>
