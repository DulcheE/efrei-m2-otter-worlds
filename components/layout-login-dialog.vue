<template>
  <v-dialog v-model="isDialogActive" max-width="750px" @click:outside="closeDialog">
    <!-- Login Dialog -->
    <v-card>
      <v-tabs
        v-model="tabModel"
        background-color="blue-grey darken-4"
        grow
        dark
      >
        <!-- All the menus Tabs-->
        <!-- 1 - Login -->
        <v-tab>
          <!-- icon -->
          <v-icon left>
            mdi-login
          </v-icon>

          <!-- text -->
          <div class="shrink mt-1 d-none d-lg-flex">
            Login
          </div>
        </v-tab>

        <!-- 2 - Sign in -->
        <v-tab>
          <!-- icon -->
          <v-icon left>
            mdi-account-plus
          </v-icon>

          <!-- text -->
          <div class="shrink mt-1 d-none d-lg-flex">
            Sign in
          </div>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tabModel">
        <!-- All the menu's contents -->
        <!-- 1 - Login -->
        <v-tab-item>
          <v-card-text>
            <v-container>
              <v-form>
                <!-- Text -->
                <h3 class="pa-4" align="center">
                  Have you tried "user1" and "test" ?
                </h3>

                <v-spacer />

                <!-- Field : Username -->
                <v-text-field
                  v-model="loginUsername"
                  class="pa-4"
                  counter="15"
                  clearable
                  prepend-icon="mdi-face"
                  label="Username"
                  :rules="[rules.required]"
                />

                <!-- Field : Password -->
                <v-text-field
                  v-model="loginPassword"
                  class="pa-4"
                  counter="45"
                  clearable
                  prepend-icon="mdi-lock"
                  label="Password"
                  type="password"
                  :rules="[rules.required]"
                />
              </v-form>

              <br><br><br>

              <!-- ALERT - displayed if the credentials are incorrect -->
              <v-alert
                :value="loginFailed"
                dense
                outlined
                dismissible
                prominent
                type="error"
                transition="scale-transition"
              >
                Please fill the form accordingly
              </v-alert>
            </v-container>
          </v-card-text>
        </v-tab-item>

        <!-- 2 - Sign up -->
        <v-tab-item>
          <v-card-text>
            <v-container>
              <v-form>
                <!-- Text -->
                <h3 class="pa-4" align="center">
                  Having an account allows you to keep track of your scores
                </h3>

                <v-spacer />

                <!-- Field : Username -->
                <v-text-field
                  v-model="signUpUsername"
                  class="pa-4"
                  counter="45"
                  clearable
                  prepend-icon="mdi-face"
                  label="Username"
                  :rules="[rules.required]"
                />

                <!-- Field : Password -->
                <v-text-field
                  v-model="signUpPassword"
                  class="pa-4"
                  counter="45"
                  clearable
                  prepend-icon="mdi-lock"
                  label="Password"
                  type="password"
                  :rules="[rules.required]"
                />

                <!-- Field : Password verif -->
                <v-text-field
                  v-model="signUpPasswordVerif"
                  class="pa-4"
                  counter="15"
                  clearable
                  prepend-icon="mdi-lock"
                  label="Password"
                  type="password"
                  :rules="[rules.required]"
                />
              </v-form>
              <br><br><br>

              <!-- ALERT - displayed if the credentials are incorrect -->
              <v-alert
                :value="signUpFailed"
                dense
                outlined
                dismissible
                prominent
                type="error"
                transition="scale-transition"
              >
                Please fill the form accordingly
              </v-alert>
            </v-container>
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>

      <!-- Buttons -->
      <v-card-actions>
        <v-spacer />
        <!-- Button - CLOSE -->
        <v-btn color="warning" text @click="closeDialog">
          Close
        </v-btn>

        <!-- Button - ACTION ! -->
        <v-btn color="success" text @click="tabModel == 0 ? logIn() : signUp()">
          {{ tabModel == 0 ? "Login !" : "Sign up !" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'LayoutAppBar',
  props: {
    isDialogActive: Boolean
  },

  data () {
    return {
      tabModel: null,
      loginUsername: '',
      loginPassword: '',
      signUpUsername: '',
      signUpPassword: '',
      signUpPasswordVerif: '',
      loginFailed: false,
      signUpFailed: false,
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },

  methods: {
    closeDialog () {
      this.$emit('closeDialog')
    },

    /** Method to Log in (connect to account) */
    logIn () {},

    /** Method to Sign in (create new account) */
    signUp () {}
  }
}
</script>
