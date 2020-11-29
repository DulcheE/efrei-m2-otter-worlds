<template>
  <v-container>
    <h1>Universe {{ universe.name }}</h1>
  </v-container>
</template>

<script>
// Imports
export default {
  name: 'PageUniverse',

  components: {
  },

  data: () => ({
    universe: {
      id: 0,
      name: 'who cares ?'
    }
  }),

  computed: {
  },

  mounted () {
  },

  methods: {
  },

  head () {
    return { title: this.universe.name }
  }
}
</script>
