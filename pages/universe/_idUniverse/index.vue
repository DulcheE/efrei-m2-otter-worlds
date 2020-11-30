<template>
  <v-container>
    <h1>Universe {{ $route.params.idUniverse }}</h1>
  </v-container>
</template>

<script>
// Imports
export default {
  name: 'PageUniverse',

  components: {
  },

  data: () => ({
    universe: {}
  }),

  computed: {
  },

  mounted () {
  },

  methods: {
  },

  head () {
    return { title: this.$route.params.idUniverse }
  }
}
</script>
