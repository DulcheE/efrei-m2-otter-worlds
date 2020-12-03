<template>
  <v-container>
    <!-- For each stat category, we add a card -->
    <CharacterCardStatisticCategory
      v-for="category in stats"
      :key="category.id"
      :is-modifying="isModifying"
      :category="category"
      :order-by-name="orderByName"
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
    stats: {
      type: Array,
      required: true
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
