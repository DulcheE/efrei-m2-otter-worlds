<template>
  <v-app dark>
    <!-- Blabla error -->
    <h1 class="text-center pa-4">
      Oopsie doopsie, an error occured...
    </h1>

    <!-- Blabla status code -->
    <h2 class="text-center">
      Status code : {{ error.statusCode }}
    </h2>

    <!-- Blabla content of the error -->
    <h2 class="text-center font-italic">
      - {{ errorMessage() }} -
    </h2>

    <!-- Link to the Homepage -->
    <NuxtLink to="/" class="pa-8">
      Return to Home page
    </NuxtLink>

    <!-- Image of goodEnough -->
    <center>
      <v-img
        class="pa-8"
        src="/jdg_goodenough.jpg"
        height="450px"
        contain
      />
    </center>
  </v-app>
</template>

<script>
import Mixin from '@/mixins/mixin'

export default {
  layout: 'empty',

  mixins: {
    Mixin
  },

  props: {
    error: {
      type: Object,
      default: null
    }
  },

  methods: {
    /**
     * Returns a message depending on the error's status code
     */
    errorMessage () {
      // We check the error code and return a message accordingly
      switch (this.error.statusCode) {
        case 404:
          return '404 Not Found'
      }

      // Just to make the linter work 'cause... reasons.
      return 'An error occured'
    }
  },

  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>
