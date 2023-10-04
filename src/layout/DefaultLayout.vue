<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <h1>Pak RT Management System</h1>
      </div>

      <v-spacer></v-spacer>

      <template v-if="!isLogin">
        <v-btn
          to="/login"
          text
        >
          <span>Login</span>
        </v-btn>

        <v-btn
          to="/register"
          text
        >
          <span>Register</span>
        </v-btn>
      </template>
      <template v-else>
        <v-btn
          to="/residence"
          text
        >
          <span>Residence</span>
        </v-btn>

        <v-btn
          to="/bill"
          text
        >
          <span>Bill</span>
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLaoutView',
  computed: {
    isLogin() {
      return this.$store.state.user.isLogin
    }
  }
}
</script>