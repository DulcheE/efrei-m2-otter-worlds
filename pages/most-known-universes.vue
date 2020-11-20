<template>
  <v-container>
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
        <!-- Card for the current universe -->
        <v-card
          class="zoom-xs"
          elevation="8"
          :to="'/universe/' + universe.name"
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

        <!-- some spaces -->
        <br><br>
      </v-col>
    </v-row>

    <router-link to="/characters">
      <v-btn>
        Normal
      </v-btn>
    </router-link>
  </v-container>
</template>

<script>
const traverson = require('traverson-promise')

export default {
  name: 'MostKnownUniverses',
  components: {
  },

  data: () => ({
    universes: []
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
  }
}
</script>
