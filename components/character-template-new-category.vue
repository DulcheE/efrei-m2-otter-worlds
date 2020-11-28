<template>
  <v-container>
    <!-- For each stat category, we add a card -->
    <v-container
      v-for="category in categories"
      :key="category.id"
    >
      <v-hover v-slot="{ hover }">
        <v-card :class="hover ? 'zoom-xs primary--text ma-8 pa-8' : 'ma-8 pa-8'" :style="hover ? 'border-color: #E9C490' : ''" outlined>
          <!-- category's name -->
          <v-text-field
            v-model="category.name"
            :label="category.name.length === 0 ? 'Category\'s name' : ''"
            :rules="[rules.required, rules.counter]"
            class="ma-4"
            type="text"
          />

          <!-- Button to add numbered stat -->
          <v-container>
            <v-btn
              class="ma-2 primary--text"
              outlined
              @click="addStat(category.id, true)"
            >
              Add numbered stat
            </v-btn>
          </v-container>

          <!-- category's number input -->
          <v-row>
            <v-col
              v-for="(stat, j) in category.content.filter((c) => c.isNumber)"
              :key="j"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-text-field
                v-model="stat.name"
                :label="stat.name.length === 0 ? 'statistic\'s name' : ''"
                :rules="[rules.required]"
                append-icon="mdi-delete"
                class="ma-4"
                type="text"
                @click:append="deleteStat(category.id, stat.id)"
              />
            </v-col>
          </v-row>

          <!-- A divider between numeric and alphabet values -->
          <v-divider class="ma-6" />

          <!-- Button to add alphabetic stat -->
          <v-container>
            <v-btn
              class="ma-2 primary--text"
              outlined
              @click="addStat(category.id, false)"
            >
              Add alphabetic stat
            </v-btn>
          </v-container>

          <!-- category's text input -->
          <v-row>
            <v-col
              v-for="(stat, j) in category.content.filter((c) => !c.isNumber)"
              :key="j"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-text-field
                v-model="stat.name"
                :label="stat.name.length === 0 ? 'statistic\'s name' : ''"
                :rules="[rules.required, rules.counter]"
                append-icon="mdi-delete"
                class="ma-4"
                type="text"
                @click:append="deleteStat(category.id, stat.id)"
              />
            </v-col>
          </v-row>

          <!-- Button to Remove the Category -->
          <center class="pa-4">
            <v-btn
              large
              outlined
              class="ma-2 error-text"
              color="error"
              @click="deleteCategory(category.id)"
            >
              <v-icon
                left
                dark
              >
                mdi-delete
              </v-icon>
              Remove Category
            </v-btn>
          </center>
        </v-card>
      </v-hover>
    </v-container>

    <!-- Button to Add a Stat category -->
    <center class="pa-4">
      <v-btn
        large
        outlined
        class="ma-2"
        @click="addCategory(isMagic)"
      >
        <v-icon
          left
          dark
        >
          mdi-plus-circle
        </v-icon>
        Add new category
      </v-btn>
    </center>
  </v-container>
</template>

<script>
// Imports
export default {
  name: 'CharacterTemplateNewCategory',

  props: {
    categories: {
      type: Array,
      required: true
    },
    isMagic: {
      type: Boolean,
      required: true
    },
    rules: {
      type: Object,
      required: true
    },
    addCategory: {
      type: Function,
      required: true
    },
    deleteCategory: {
      type: Function,
      required: true
    },
    addStat: {
      type: Function,
      required: true
    },
    deleteStat: {
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
