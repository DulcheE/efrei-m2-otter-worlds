<template>
  <v-container>
    <h1>Universe {{ universe.name }}'s forum</h1>
  </v-container>
</template>

<script>
// Imports
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PageForum',

  components: {
  },

  data: () => ({
    universe: {}
  }),

  computed: {
    ...mapGetters('universe', ['getUniverse', 'getUniverses']),

    idUniverse () {
      return parseInt(this.$route.params.idUniverse)
    }
  },

  async mounted () {
    // We fetch the Universe from the database
    await this.fetchUniverse(this.idUniverse)

    // We get the universe
    this.universe = await this.getUniverse(this.idUniverse)
  },

  methods: {
    ...mapActions('universe', ['fetchUniverse'])
  },

  head () {
    return { title: this.universe.name + '\'s forum' }
  }
}
</script>
