<template>
  <v-container>
    <!-- title -->
    <h1>
      My Profile
    </h1>

    <!-- Name -->
    <v-container>
      <h3>
        Name:
      </h3>
      <v-card-subtitle>
        {{ username }}
      </v-card-subtitle>
      <v-dialog
        v-model="namedialog"
        persistent
        max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Change name
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">New Username</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Username" />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue draken-1"
              text
              @click="namedialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue draken-1"
              text
              @click="namedialog = false"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>

    <!-- Email -->
    <v-container>
      <h3>
        Email:
      </h3>
      <v-card-subtitle>
        {{ email }}
      </v-card-subtitle>
      <v-dialog
        v-model="emaildialog"
        persistent
        max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Change email
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">New Email</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    :rules="[rules.required, rules.email]"
                    label="New Email"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue draken-1"
              text
              @click="emaildialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue draken-1"
              text
              @click="emaildialog = false"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>

    <!-- Password -->
    <v-container>
      <h3>
        password:
      </h3>
      <v-card-subtitle>
        {{ password }}
      </v-card-subtitle>

      <v-dialog
        v-model="passworddialog"
        persistent
        max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Change password
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">New password</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="passw"
                    :append-icon="showpassword1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="showpassword1 ? 'text' : 'password'"
                    name="pass"
                    label="Password"
                    hint="At least 8 characters"
                    class="input-group--focused"
                    @click:append="showpassword1 = !showpassword1"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="confpass"
                    :append-icon="showpassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.passwordMatch]"
                    :type="showpassword2 ? 'text' : 'password'"
                    name="confpass"
                    label="Confime Password"
                    hint="At least 8 characters"
                    class="input-group--focused"
                    @click:append="showpassword2 = !showpassword2"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue draken-1"
              text
              @click="passworddialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue draken-1"
              text
              @click="passworddialog = false"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      username: 'John Doe',
      email: 'truc.bidule@hormail.fr',
      password: '*****',
      namedialog: false,
      emaildialog: false,
      passworddialog: false,
      showpassword1: false,
      showpassword2: false,
      passw: '',
      confpass: '',
      rules: {
        required: value => !!value || 'Required.',
        min: value => value.length >= 8 || 'Min 8 characters',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        passwordMatch: value => value === this.passw || 'Match password'
      }
    }
  },

  head () {
    return { title: 'My profile' }
  }
}
</script>
