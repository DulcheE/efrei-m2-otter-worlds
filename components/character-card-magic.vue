<template>
  <v-container>
    <v-card flat>
      <v-card-text>Magic</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
// Imports
export default {
  name: 'CharacterCardMagic',

  props: {
    isModifying: {
      type: Boolean,
      required: true,
      default: false
    },
    rules: {
      type: Object,
      required: true,
      default: () => {}
    }
  },

  data: () => ({}),

  computed: {},

  mounted () {},

  methods: {
  }
}
</script>
