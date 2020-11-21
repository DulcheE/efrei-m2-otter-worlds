<template>
  <v-app dark>
    <!-- App bar (navbar) -->
    <LayoutAppBar />

    <!-- Container for Nuxt's page -->
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <!-- Footer to display the year -->
    <v-footer app>
      <span>
        &copy; {{ new Date().getFullYear() }} - made for Louis Cherel, with love
      </span>
    </v-footer>
    <!-- END FOOTER -->
  </v-app>
</template>

<script>
import LayoutAppBar from '@/components/layout-app-bar'
import Mixin from '@/mixins/mixin'

export default {
  components: {
    LayoutAppBar
  },

  mixins: {
    Mixin
  },

  data () {
    return {
    }
  },

  methods: {
  }
}
</script>
