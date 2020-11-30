<template>
  <v-container fill-height>
    <v-progress-circular
      class="ma-auto"
      :size="140"
      :width="10"
      color="primary"
      indeterminate
    />
  </v-container>
</template>

<script>
// Imports
export default {
  name: 'PageIndex',

  mounted () {
    // When mounted, automatically redirects the user to the "real" default page
    document.location.href = '/getting-started'
  }
}
</script>
