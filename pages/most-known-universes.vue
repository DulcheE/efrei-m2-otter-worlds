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

          <!-- Dialog -->
          <v-card>
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
                        :rules="[rules.required]"
                      />
                    </v-col>

                    <!-- New universe : description -->
                    <v-col cols="12">
                      <div class="d-flex justify-center">
                        <v-textarea
                          v-model="newUniverse.description"
                          label="Description"
                          :rules="[rules.required]"
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

            <!-- Divider -->
            <v-divider />

            <!-- Actions -->
            <v-card-actions>
              <v-spacer />

              <!-- Button to create the Universe -->
              <v-btn
                color="primary"
                text
                @click="createUniverse"
              >
                Create new Universe !
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
        <NuxtLink :to="'/universe/' + universe.name" class="text-decoration-none">
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
const traverson = require('traverson-promise')

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
    }
  }),

  computed: {
  },

  mounted () {
    traverson.from('http://localhost:3000/api/v1')
      .follow('$._links.universes')
      .getResource().result
      .then((document) => {
        this.universes = document.universes
        return Promise.all(this.universes.map((universe) => {
          traverson.from(universe._links.user.href)
            .getResource().result
            .then((document) => {
              this.$set(universe, 'user', document)
            })
        }))
      })
      .catch((err) => {
        throw err.message
      })
  },

  methods: {
    createUniverse () {
      // If the form is valid
      if (this.$refs.formNewUniverse.validate()) {
        // We set the user in the universe
        this.newUniverse.user = {
          username: 'CREATED BY FORM'
        }

        // We add the universe to the list
        alert('creating ' + this.newUniverse.name + ' by ' + this.newUniverse.user.username)

        // We reset the form
        this.$refs.formNewUniverse.reset()

        // We close the dialog
        this.dialogNewUniverse = false
      }
    }
  },

  head () {
    return { title: 'Known universes' }
  }
}
</script>
