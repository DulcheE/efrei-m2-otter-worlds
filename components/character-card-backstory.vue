<template>
  <v-container>
    <v-card flat>
      <v-card-text>Backstory</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
// Imports
export default {
  name: 'CharacterCardBackstory',

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
    },
    stats: {
      type: Array,
      required: true,
      default: () => []
    },
    statsNonEssential: {
      type: Array,
      required: true,
      default: () => []
    },
    orderByName: {
      type: Function,
      required: true
    }
  },

  data: () => ({}),

  computed: {},

  mounted () {},

  methods: {
  }
}
</script>
