<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container>
        <div class="d-flex align-center">
          <router-link
            :to="{ name: 'Index' }"
          >
            <v-img
              src="@/assets/logo.png"
              alt="Vue Logo"
              class="shrink mr-2"
              contain
              width="40"
            />
          </router-link>
        </div>
        <v-spacer />
      </v-container>
    </v-app-bar>
    <v-main class="grey lighten-3">
      <router-view />
    </v-main>
    <v-footer
      padless
      class="primary lighten-1"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        <v-card-text class="white--text">
          {{ (new Date()).getFullYear() }}
          —
          <a
            href="https://github.com/tarasbilohan"
            target="_blank"
            class="white--text"
          >
            Taras Bilohan
          </a>
          🙎‍
        </v-card-text>
      </v-col>
    </v-footer>
  </v-app>
</template>
