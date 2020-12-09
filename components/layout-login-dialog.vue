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
            New account
          </div>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tabModel">
        <!-- All the menu's contents -->
        <!-- 1 - Login -->
        <v-tab-item>
          <v-card-text>
            <v-container>
              <v-form ref="formLogin" v-model="formLogin">
                <!-- Text -->
                <h3 class="pa-4" align="center">
                  Have you tried "Paul" and "paulsword" ?
                </h3>

                <v-spacer />

                <!-- Field : Username -->
                <v-text-field
                  v-model="loginUsername"
                  class="pa-4"
                  counter="50"
                  clearable
                  prepend-icon="mdi-face"
                  label="Username"
                  :rules="[rules.required, rules.maxSmall]"
                />

                <!-- Field : Password -->
                <v-text-field
                  v-model="loginPassword"
                  class="pa-4"
                  counter="50"
                  clearable
                  prepend-icon="mdi-lock"
                  label="Password"
                  type="password"
                  :rules="[rules.required, rules.maxSmall]"
                />
              </v-form>

              <br><br><br>

              <!-- ALERT - displayed if the credentials are incorrect -->
              <v-alert
                v-model="loginFailed"
                dense
                outlined
                prominent
                dismissible
                type="error"
                transition="scale-transition"
              >
                {{ loginErrorMessage }}
              </v-alert>
            </v-container>
          </v-card-text>
        </v-tab-item>

        <!-- 2 - Sign up -->
        <v-tab-item>
          <v-card-text>
            <v-container>
              <v-form ref="formSignup" v-model="formSignup">
                <!-- Text -->
                <h3 class="pa-4" align="center">
                  Having an account allows you to keep track of your scores
                </h3>

                <v-spacer />

                <!-- Field : Username -->
                <v-text-field
                  v-model="signUpUsername"
                  class="pa-4"
                  counter="50"
                  clearable
                  prepend-icon="mdi-face"
                  label="Username"
                  :rules="[rules.required, rules.maxSmall]"
                />

                <!-- Field : Password -->
                <v-text-field
                  v-model="signUpPassword"
                  class="pa-4"
                  counter="50"
                  clearable
                  prepend-icon="mdi-lock"
                  label="Password"
                  type="password"
                  :rules="[rules.required, rules.maxSmall]"
                />

                <!-- Field : Password verif -->
                <v-text-field
                  v-model="signUpPasswordVerif"
                  class="pa-4"
                  counter="50"
                  clearable
                  prepend-icon="mdi-lock"
                  label="Password verification"
                  type="password"
                  :rules="[rules.required, rules.maxSmall]"
                />
              </v-form>
              <br><br><br>

              <!-- ALERT - displayed if the credentials are incorrect -->
              <v-alert
                v-model="signUpFailed"
                dense
                outlined
                dismissible
                prominent
                type="error"
                transition="scale-transition"
              >
                {{ signUpErrorMessage }}
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
// Imports
import { mapActions } from 'vuex'
import MixinRules from '@/mixins/mixin-rules'

export default {
  name: 'LayoutAppBar',

  mixins: [MixinRules],

  props: {
    isDialogActive: {
      type: Boolean,
      required: true
    }
  },

  data () {
    return {
      tabModel: null,

      // Data - login
      loginUsername: '',
      loginPassword: '',

      // Data -signIn
      signUpUsername: '',
      signUpPassword: '',
      signUpPasswordVerif: '',

      // Form holder
      formLogin: false,
      formSignup: false,

      // Whether a form failed or not
      loginFailed: false,
      loginErrorMessage: '',
      signUpFailed: false,
      signUpErrorMessage: ''
    }
  },

  methods: {
    // Imports
    ...mapActions('login', ['login']),
    ...mapActions('user', ['addUser']),

    /** Close dialog */
    closeDialog () {
      this.$emit('closeDialog')
    },

    /** Method to Log in (connect to account) */
    async logIn () {
      // If the form is valid
      if (this.$refs.formLogin.validate()) {
        // We create a credentials instance
        const credentials = {
          username: this.loginUsername,
          password: this.loginPassword
        }

        // We try to login
        const response = await this.login(credentials)

        // If the response has an ID : success !
        // Otherwise : failed login
        if (response.id !== undefined) {
          // We reset the inputs
          this.$refs.formLogin.reset()

          // We close the dialog
          this.closeDialog()
        } else {
          this.loginFailed = true
          this.loginErrorMessage = response.message
        }
      }
    },

    /** Method to Sign up (create new account) */
    async signUp () {
      // If the form is valid
      if (this.$refs.formSignup.validate()) {
        if (this.signUpPassword === this.signUpPasswordVerif) {
          // We create a credentials instance
          const credentials = {
            username: this.signUpUsername,
            password: this.signUpPassword
          }

          // We try to login
          const response = await this.addUser(credentials)

          // If the sign-up is successful : log into the new account
          // Otherwise : error
          if (response.ok) {
            // We try to login
            const response2 = await this.login(credentials)

            // If the response has an ID : success !
            // Otherwise : failed login
            if (response2.id !== undefined) {
              // We reset the inputs
              this.$refs.formSignup.reset()

              // We close the dialog
              this.closeDialog()
            } else {
              this.signUpFailed = true
              this.signUpE = response2.message
            }
          } else {
            this.signUpFailed = true
            this.signUpE = 'Error at the sign Up, please try again'
          }

          // We reset the input OF BOTH FORM
          /*
          this.$refs.formLogin.reset()
          this.$refs.formSignup.reset()
          */
        } else {
          this.signUpFailed = true
          this.signUpErrorMessage = 'The passwords do not match !'
        }
      }
    }
  }
}
</script>
