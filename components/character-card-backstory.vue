<template>
  <v-container>
    <v-container>
      <v-textarea
        v-model="backstory"
        class="ma-4"
        :disabled="!isModifying"
        :rules="isModifying ? [rules.required, rules.ascii] : []"
        :placeholder="backstory || 'Please write your backstory !'"
        outlined
        auto-grow
        rows="8"
      />
    </v-container>
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
    backstory: {
      type: String,
      required: true,
      default: () => ''
    }
  },

  data: () => ({}),

  computed: {},

  mounted () {},

  methods: {
  }
}
</script>
