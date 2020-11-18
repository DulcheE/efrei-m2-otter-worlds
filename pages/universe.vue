<template>
  <v-container>
    <v-row>
      <!-- Iterate through the universes -->
      <v-col
        v-for="universe in universes"
        :key="universe.id"
        class="d-flex pa-6"
        cols="12"
        sm="6"
        md="6"
        lg="4"
      >
        <!-- Card for the current universe -->
        <router-link class="text-decoration-none white--text" :to="'/universe/' + universe.name">
          <v-card class="zoom-sm">
            <v-row>
              <!-- Image on the left -->
              <v-col class="ma-0 pa-0" cols="4">
                <v-img min-height="200" max-height="200" lazy-src="/logo.png" :src="universe.src" />
              </v-col>

              <!-- Text on the right -->
              <v-col cols="8">
                <!-- Universe's name -->
                <h2 class="font-weight-bold primary--text pl-4">
                  {{ universe.name }}
                </h2>

                <br>

                <!-- Universe's creator -->
                <h3>
                  by
                  <router-link class="text-decoration-none white--text" :to="'/user/' + universe.user.username">
                    <v-tooltip top :open-delay="250">
                      <template v-slot:activator="{ on, attrs }">
                        <span
                          class="font-italic"
                          v-bind="attrs"
                          v-on="on"
                        >{{ universe.user.username }}</span>
                      </template>
                    </v-tooltip>
                  </router-link>

                  <br>

                  <!-- ...and work -->
                  <router-link class="text-decoration-none white--text" :to="'/universe/wiki/'">
                    <v-tooltip bottom :open-delay="250">
                    </v-tooltip>
                  </router-link>
                </h3>
              </v-col>
            </v-row>
          </v-card>
        </router-link>

        <!-- some spaces -->
        <br><br>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Imports
export default {
  name: 'PageUniverses',

  components: {
  },

  data: () => ({
    arrayNames: ['Terre oublié', 'je me souviens plus', 'Monde Perdu', 'ou suis je', 'Quelque part']
  }),

  computed: {
    universes () {
      const array = []
      const max = 18

      for (let i = 0; i < max; i++) {
        const char = {
          id: i,
          user: {
            username: 'J3@n C@st3x'
          },
          name: this.arrayNames[Math.floor(Math.random() * this.arrayNames.length)],
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
