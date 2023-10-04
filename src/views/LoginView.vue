<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card>
              <v-card-title class="text-center">
                <h2>Login</h2>
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field
                    v-model="username"
                    label="Username"
                    outlined
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="Password"
                    outlined
                    required
                    type="password"
                  ></v-text-field>
                  <v-btn type="submit" color="primary">Login</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    ...mapState('user', ['isLogin']),
  },
  watch: {
    isLogin(newVal) {
      if (newVal) {
        this.$router.replace({ name: 'home' });
      }
    },
  },
  methods: {
    login() {
      this.$store.dispatch('user/login', { username: this.username, password: this.password })
    },
  },
};
</script>

<style>
/* Add custom CSS styles here if needed */
</style>
