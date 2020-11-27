<template>
  <v-container>
    <!-- New Character -->
    <center class="pa-4">
      <v-btn
        x-large
        outlined
        color="primary"
        class="ma-2 zoom-xs"
        to="/character"
      >
        <v-icon
          left
          dark
        >
          mdi-human-handsup
        </v-icon>
        New Character
      </v-btn>
    </center>

    <!-- Divider -->
    <v-container>
      <v-divider class="ma-4" />
    </v-container>

    <!-- All Characterq -->
    <v-row align="center" justify="center">
      <!-- Iterate through the characters -->
      <v-col
        v-for="character in characters"
        :key="character.id"
        class="pa-6"
        cols="12"
        sm="6"
        lg="4"
        xl="3"
      >
        <!-- Card for the current character -->
        <router-link class="text-decoration-none white--text" :to="'/universe/character/' + character.name">
          <v-card class="zoom-sm">
            <v-row>
              <!-- Image on the left -->
              <v-col class="ma-0 pa-0" cols="4">
                <v-img min-height="200" max-height="200" lazy-src="/logo.png" :src="character.src" />
              </v-col>

              <!-- Text on the right -->
              <v-col cols="8">
                <!-- Character's name -->
                <h2 class="font-weight-bold pl-4">
                  {{ character.name }}
                </h2>

                <br>

                <!-- Character's creator -->
                <h3>
                  by
                  <router-link class="text-decoration-none white--text" :to="'/user/' + character.user.username">
                    <v-tooltip top :open-delay="250">
                      <template v-slot:activator="{ on, attrs }">
                        <span
                          class="font-italic"
                          v-bind="attrs"
                          v-on="on"
                        >{{ character.user.username }}</span>
                      </template>
                      <span>{{ character.user.username }}'s user page</span>
                    </v-tooltip>
                  </router-link>

                  <br>

                  <!-- Character's race... -->
                  <router-link class="text-decoration-none white--text" :to="'/universe/wiki/' + character.work">
                    <v-tooltip bottom :open-delay="250">
                      <template v-slot:activator="{ on, attrs }">
                        <span
                          v-bind="attrs"
                          v-on="on"
                        >{{ character.race }}</span>
                      </template>
                      <span>{{ character.race }}'s wiki page</span>
                    </v-tooltip>
                  </router-link>

                  <!-- ...and work -->
                  <router-link class="text-decoration-none white--text" :to="'/universe/wiki/' + character.work">
                    <v-tooltip bottom :open-delay="250">
                      <template v-slot:activator="{ on, attrs }">
                        <span
                          v-bind="attrs"
                          v-on="on"
                        >{{ character.job.toLowerCase() }}</span>
                      </template>
                      <span>{{ character.job }}'s wiki page</span>
                    </v-tooltip>
                  </router-link>
                </h3>
              </v-col>
            </v-row>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Imports
export default {
  name: 'PageCharacters',

  components: {
  },

  data: () => ({
    arrayRaces: ['Human', 'Ork', 'Argonian', 'Titan', 'Witcher', 'ELf', 'Dwarf'],
    arrayJobs: ['Soldier', 'Priest', 'Commoner', 'Brigand', 'Thief', 'Merchant']
  }),

  computed: {
    characters () {
      const array = []
      const max = 17

      for (let i = 0; i < max; i++) {
        const char = {
          id: i,
          user: {
            username: 'J3@n C@st3x'
          },
          name: 'John DOE',
          job: this.arrayJobs[Math.floor(Math.random() * this.arrayJobs.length)],
          race: this.arrayRaces[Math.floor(Math.random() * this.arrayRaces.length)],
          src: `https://picsum.photos/500/300?image=${i * 5 + 10}`
        }

        array.push(char)
      }

      return array
    }
  },

  mounted () {
  },

  methods: {
  }
}
</script>
