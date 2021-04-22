<template>
  <v-dialog
    v-model="isVisible"
    width="500"
  >
    <v-card v-if="pack.dataState === 'loading'">
      <v-card-title class="headline">
        Package
      </v-card-title>
      <v-card-text class="d-flex justify-center">
        <v-progress-circular
          indeterminate
          color="primary"
        />
      </v-card-text>
    </v-card>
    <v-card v-if="pack.dataState === 'failed'">
      <v-card-title class="headline">
        Package
      </v-card-title>
      <v-card-text>
        <h3 class="red--text">
          {{ pack.errorMessage }}
        </h3>
      </v-card-text>
    </v-card>
    <v-card v-if="pack.dataState === 'loaded'">
      <v-card-title class="headline">
        {{ pack.data.name }}@{{ pack.data.version }}
      </v-card-title>
      <v-card-text>
        {{ pack.data.description }}
      </v-card-text>
      <v-card-text v-if="pack.data.author">
        {{ pack.data.author.name }}
      </v-card-text>
      <v-card-text v-if="pack.data.keywords && pack.data.keywords.length">
        <h3>Keywords</h3>
        <v-chip-group column>
          <v-chip
            v-for="(keyword, index) in pack.data.keywords"
            :key="index"
          >
            {{ keyword }}
          </v-chip>
        </v-chip-group>
      </v-card-text>
      <v-card-text v-if="Object.keys(pack.tags).length">
        <h3>Tags</h3>
        <ul>
          <li
            v-for="(version, tag) in pack.tags"
            :key="tag"
          >
            {{ tag }}: {{ version }}
          </li>
        </ul>
      </v-card-text>
      <v-card-text v-if="pack.versions.length">
        <h3>Versions</h3>
        <v-chip-group column>
          <v-chip
            v-for="(version, index) in pack.versions"
            :key="index"
          >
            {{ version }}
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent, toRefs, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'AppPackageDialog',
  props: {
    pack: {
      type: Object,
      required: true
    }
  },
  setup (props, context) {
    const { pack } = toRefs(props)

    const isVisible = computed({
      get () {
        return pack.value.dataState !== 'awaiting'
      },
      set (value) {
        context.emit('close')
      }
    })

    return {
      isVisible
    }
  }
})
</script>
