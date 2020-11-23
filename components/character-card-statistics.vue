<template>
  <v-container>
    <!-- For each stat category, we add a card -->
    <v-container v-for="(category, i) in statsNonEssential" :key="i">
      <v-hover v-slot="{ hover }">
        <v-card
          :class="hover ? 'zoom-xs primary--text ma-8 pa-8' : 'ma-8 pa-8'"
          :style="hover ? 'border-color: #E9C490' : ''"
          outlined
        >
          <!-- category's name -->
          <h1 :class="hover ? 'primary--text' : ''">
            {{ category.name }}
          </h1>

          <!-- category's number input -->
          <v-row>
            <v-col
              v-for="(stat, j) in orderByName(
                category.content.filter((c) => c.isNumber)
              )"
              :key="j"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-text-field
                v-model="stat.value"
                :label="stat.name"
                :disabled="!isModifying"
                :clearable="isModifying"
                required
                class="ma-4"
                type="number"
              />
            </v-col>
          </v-row>

          <v-divider
            v-if="category.content.filter((c) => c.isNumber).length !== 0 && category.content.filter((c) => !c.isNumber).length !== 0"
            class="ma-6"
          />

          <!-- category's text input -->
          <v-row>
            <v-col
              v-for="(stat, j) in orderByName(
                category.content.filter((c) => !c.isNumber)
              )"
              :key="j"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-text-field
                v-model="stat.value"
                :label="stat.name"
                :disabled="!isModifying"
                :clearable="isModifying"
                :rules="isModifying ? [rules.ascii] : []"
                required
                class="ma-2"
                type="text"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-hover>
    </v-container>
  </v-container>
</template>

<script>
// Imports
export default {
  name: 'CharacterCardStatistics',

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
