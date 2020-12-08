<template>
  <v-container>
    <v-hover v-slot="{ hover }">
      <v-card
        class="ma-8 pa-8"
        :class="hover && isHighlighted ? 'zoom-xs primary--text' : ''"
        :style="hover && isHighlighted ? 'border-color: #E9C490' : ''"
        :outlined="isHighlighted"
        elevation="0"
      >
        <!-- category's name -->
        <h1 v-if="isHighlighted" :class="hover ? 'primary--text' : ''">
          {{ category.name }}
        </h1>

        <!-- category's number input -->
        <v-row>
          <v-col
            v-for="stat in orderByName(category.stats.filter((c) => c.bIsNumber))"
            :key="stat.id"
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
              :rules="[rules.required]"
              class="ma-4"
              type="number"
            />
          </v-col>
        </v-row>

        <v-divider
          v-if="category.stats.filter((c) => c.bIsNumber).length !== 0 && category.stats.filter((c) => !c.bIsNumber).length !== 0"
          class="ma-6"
        />

        <!-- category's text input -->
        <v-row>
          <v-col
            v-for="stat in orderByName(
              category.stats.filter((c) => !c.bIsNumber)
            )"
            :key="stat.id"
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
              :rules="[rules.required, rules.maxSmall]"
              class="ma-2"
              type="text"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-hover>
  </v-container>
</template>

<script>
// Imports
import MixinRules from '@/mixins/mixin-rules'
import MixinOrderByName from '@/mixins/mixin-order-by-name'

export default {
  name: 'CharacterCardStatisticCategory',

  mixins: [MixinRules, MixinOrderByName],

  props: {
    isModifying: {
      type: Boolean,
      required: true
    },
    category: {
      type: Object,
      required: true
    },
    isHighlighted: {
      type: Boolean,
      required: true
    }
  }
}
</script>
