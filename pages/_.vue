<template>
  <v-container>
    <!-- Blabla doesn't exist -->
    <h1 class="text-center pa-4">
      Sorry, <span class="font-italic">{{ $route.params.pathMatch }} </span> is not a valid page :'(
    </h1>

    <!-- Link to the Homepage -->
    <NuxtLink to="/" class="pa-8">
      Return to Home page
    </NuxtLink>

    <!-- Image of goodEnough -->
    <center class="pa-16">
      <v-img
        src="https://media1.tenor.com/images/b5bec02d7e57bdad7ca254d7f5efffb4/tenor.gif?itemid=7667729"
        height="200px"
        contain
      />
    </center>
  </v-container>
</template>

<script>
// Imports
export default {
  name: 'PageDefault',

  components: {
  },

  data: () => ({
  }),

  computed: {
  },

  mounted () {
  },

  methods: {
  },

  head () {
    return { title: this.$route.params.pathMatch }
  }
}
</script>
