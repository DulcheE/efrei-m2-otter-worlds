<template>
  <v-app dark>
    <!-- App bar (navbar) -->
    <LayoutAppBar />

    <!-- Game Master's dashboard, if the user is in his universe -->
    <LayoutGmDashboard v-if="isMJ" />

    <!-- Container for Nuxt's page -->
    <v-main class="background">
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
import LayoutGmDashboard from '@/components/layout-gm-dashboard'
import MixinCss from '@/mixins/mixin-css'

export default {
  components: {
    LayoutAppBar,
    LayoutGmDashboard
  },

  mixins: [MixinCss],

  data () {
    return {
      isMJ: true
    }
  },

  methods: {
  }
}
</script>
