<template>
  <v-col
    cols="12"
    class="pa-4 white"
  >
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <td>Name</td>
            <td>Description</td>
            <td>Author</td>
          </tr>
        </thead>
        <tbody>
          <PackagesListItem
            v-for="pack in packages"
            :key="pack.name"
            :pack="pack"
            class="list-item"
            @click.native="onListItemClick(pack)"
          />
        </tbody>
      </template>
    </v-simple-table>
  </v-col>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

import PackagesListItem from '@/components/packages/PackagesListItem.vue'

export default defineComponent({
  name: 'PackagesList',
  components: {
    PackagesListItem
  },
  props: {
    packages: {
      type: Array,
      required: true
    }
  },
  setup (props, context) {
    function onListItemClick (item) {
      context.emit('list-item-click', item)
    }

    return {
      onListItemClick
    }
  }
})
</script>

<style lang="scss" scoped>
.list-item:hover {
  cursor: pointer;
}
</style>
