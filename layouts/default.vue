<template>
  <v-app dark>
    <!-- We call our CSS page -->
    <CSS />

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
import CSS from '@/assets/css'
import LayoutAppBar from '@/components/layout-app-bar'
import Mixin from '@/mixins/mixin'

export default {
  components: {
    CSS,
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
