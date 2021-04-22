<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-sheet
          rounded="lg"
          class="pa-4"
        >
          <h1 class="h1">
            Hi 👋
          </h1>
          <p class="body-1 pb-0">
            Open
            <router-link
              :to="{ name: 'Packages' }"
            >
              packages search
            </router-link>
          </p>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
