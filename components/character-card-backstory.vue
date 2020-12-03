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
import MixinRules from '@/mixins/mixin-rules'

export default {
  name: 'CharacterCardBackstory',

  mixins: [MixinRules],

  props: {
    isModifying: {
      type: Boolean,
      required: true,
      default: false
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
