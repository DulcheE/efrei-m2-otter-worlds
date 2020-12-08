<template>
  <v-container>
    <!-- For each stat category, we add a card -->
    <CharacterCardStatisticCategory
      v-for="category in categories"
      :key="category.id"
      :is-modifying="isModifying"
      :category="category"
      is-highlighted="true"
    />

    <!-- If this category is empty -->
    <v-else>
      <v-container>
        <h1> Sorry !</h1>
        <h3> It seems that for some unfortunate reasons, this category is empty...</h3>
      </v-container>
    </v-else>
  </v-container>
</template>

<script>
// Imports
import CharacterCardStatisticCategory from '@/components/character-card-statistic-category'

export default {
  name: 'CharacterCardMagic',

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
