<template>
  <v-container>
    <!-- For each stat category, we add a card -->
    <CharacterCardStatisticCategory
      v-for="category in categories"
      :key="category.id"
      :is-modifying="isModifying"
      :category="category"
      :is-highlighted="true"
    />
  </v-container>
</template>

<script>
// Imports
import CharacterCardStatisticCategory from '@/components/character-card-statistic-category'

export default {
  name: 'CharacterCardStatistics',

  components: {
    CharacterCardStatisticCategory
  },

  props: {
    isModifying: {
      type: Boolean,
      required: true
    },
    categories: {
      type: Array,
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
