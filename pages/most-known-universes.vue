<template>
  <v-container>
    <!-- 1 - create -->
    <div>
      <h1 class="ma-4">
        Create your own Universe !
      </h1>

      <!-- New universe -->
      <center class="pa-4">
        <!-- Dialog to create a new universe -->
        <v-dialog
          v-model="dialogNewUniverse"
          width="500"
        >
          <!-- Button : trigger of the dialog -->
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              x-large
              outlined
              color="primary"
              class="ma-2 zoom-xs"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon
                left
                dark
              >
                mdi-earth
              </v-icon>
              New Universe
            </v-btn>
          </template>

          <!-- Dialog if logged in : create a new universe -->
          <v-card v-if="isUserLogged">
            <v-card-title>
              <span class="headline">New Universe</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <!-- Form -->
                <v-form ref="formNewUniverse" v-model="formNewUniverse">
                  <!-- Inputs for the new universe -->
                  <v-row>
                    <!-- New universe : name -->
                    <v-col cols="12">
                      <v-text-field
                        v-model="newUniverse.name"
                        label="Name"
                        :rules="[rules.required, rules.maxSmall]"
                      />
                    </v-col>

                    <!-- New universe : description -->
                    <v-col cols="12">
                      <div class="d-flex justify-center">
                        <v-textarea
                          v-model="newUniverse.description"
                          label="Description"
                          :rules="[rules.required, rules.maxBig]"
                          :placeholder="newUniverse.description || 'Please write the description of your universe !'"
                          outlined
                          auto-grow
                          rows="4"
                        />
                      </div>
                    </v-col>

                    <!-- New universe : isPublic -->
                    <v-col class="d-flex justify-center" cols="12">
                      <v-switch
                        v-model="newUniverse.bIsPublic"
                        inset
                        label="Is the universe public ?"
                      />
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>

            <!-- ALERT - displayed if an error occurs -->
            <v-container>
              <v-alert
                :value="errorMessage.length !== 0"
                dense
                outlined
                prominent
                type="error"
                transition="scale-transition"
              >
                {{ errorMessage }}
              </v-alert>
            </v-container>

            <!-- Divider -->
            <v-divider />

            <!-- Actions -->
            <v-card-actions>
              <v-spacer />

              <!-- Button - cancel -->
              <v-btn
                color="warning"
                text
                @click="dialogNewUniverse = false"
              >
                Cancel
              </v-btn>

              <!-- Button - create -->
              <v-btn
                color="primary"
                text
                @click="createUniverse"
              >
                Create new Universe !
              </v-btn>
            </v-card-actions>
          </v-card>

          <!-- Dialog if NOT logged in : warning -->
          <v-card v-else>
            <v-card-title>
              <span class="headline">Sign into your account !</span>
            </v-card-title>

            <v-container>
              Sorry, you are trying to access a feature that is only accessible to logged in users !
            </v-container>
            <v-container>
              Please log into your account or create a new one to access this feature.
            </v-container>

            <!-- Divider -->
            <v-divider />

            <!-- Actions -->
            <v-card-actions>
              <v-spacer />
              <!-- Button - dismiss -->
              <v-btn
                color="primary"
                text
                @click="dialogNewUniverse = false"
              >
                Dismiss
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </center>
    </div>

    <!-- divider -->
    <v-container>
      <v-divider class="ma-4" />
    </v-container>

    <!-- 2 - discover -->
    <h1 class="ma-4">
      Or discover the most popular ones !
    </h1>

    <v-row>
      <!-- Iterate through the universes -->
      <v-col
        v-for="universe in universes"
        :key="universe.id"
        class="d-flex child-flex"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <NuxtLink :to="'/universe/' + universe.id" class="text-decoration-none">
          <!-- Card for the current universe -->
          <v-card
            class="zoom-xs"
            elevation="8"
          >
            <!-- Title of the universe -->
            <v-card-title>
              <v-container class="pa-0">
                <v-row align="center" justify="center">
                  <!-- Logo (flexible according to the screen size) -->
                  <v-col sm="4" md="4" align="right">
                    <v-img class="shrink d-flex d-md-none" src="/logo.png" max-height="50" max-width="50" contain />
                    <v-img class="shrink d-none d-md-flex" src="/logo.png" max-height="75" max-width="75" contain />
                  </v-col>

                  <!-- Title -->
                  <v-col sm="8" md="8">
                    <h3 class="primary--text text-truncate">
                      {{ universe.name }}
                    </h3>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-title>

            <!-- Some stuff -->
            <v-card-subtitle>
              <i>{{ (universe.user || {username: 'unknown' }).username }}</i>
            </v-card-subtitle>

            <!-- Description of the universe -->
            <v-card-text>
              <v-container>
                <h3>{{ universe.description }}</h3>
              </v-container>
            </v-card-text>
          </v-card>
        </NuxtLink>
      </v-col>
    </v-row>

    <!-- Useful links -->
    <v-container>
      <NuxtLink to="/universe/0/characters" class="text-decoration-none">
        <v-btn>
          shortcut to characters
        </v-btn>
      </NuxtLink>

      <NuxtLink to="/universe/0/character" class="text-decoration-none">
        <v-btn>
          shortcut to character
        </v-btn>
      </NuxtLink>

      <NuxtLink to="/universe/0/character-template" class="text-decoration-none">
        <v-btn>
          shortcut to character-template
        </v-btn>
      </NuxtLink>
    </v-container>
  </v-container>
</template>

<script>
// Imports
import MixinRules from '@/mixins/mixin-rules'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MostKnownUniverses',

  mixins: [MixinRules],

  data: () => ({
    // Universe to display
    universes: [],

    // Whether the form to add a dialog is valid or not
    formNewUniverse: false,
    dialogNewUniverse: false,
    newUniverse: {
      name: '',
      description: '',
      bIsPublic: false,
      user: {}
    },
    errorMessage: ''
  }),

  computed: {
    // Imports
    ...mapGetters('login', ['getLogged']),
    ...mapGetters('universe', ['getUniverses']),

    /** Return whether a user is logged */
    isUserLogged () {
      return this.getLogged().logged
    },

    /** Return the id of the user (-1 if none is logged) */
    idUser () {
      return this.getLogged().iduser
    }
  },

  async mounted () {
    // We fetch all the Universes from the database
    await this.fetchAllUniverses()

    // We get these universes
    this.universes = await this.getUniverses()
  },

  methods: {
    ...mapActions('universe', ['fetchAllUniverses', 'addUniverse']),

    async createUniverse () {
      // If the form is valid
      if (this.$refs.formNewUniverse.validate()) {
        // We check if a user is logged in
        if (this.isUserLogged) {
          // We create the object we'll send to the database
          const universe = {
            name: this.newUniverse.name,
            description: this.newUniverse.description,
            bIsPublic: this.newUniverse.bIsPublic,
            idUser: this.idUser
          }

          // We send the new universe and get the response
          const response = await this.addUniverse(universe)

          // If the response is positive : reforward the user to the page of the newly created universe
          // Otherwise : try again
          if (response.id >= 0) {
            document.location.href = '/universe/' + response.id
          } else {
            this.errorMessage = 'Something went wrong, please try again'
          }
        }
      }
    }
  },

  head () {
    return { title: 'Known universes' }
  }
}
</script>
