<template>
  <v-container>
    <v-form ref="form" v-model="validForm">
      <!-- Button to save the template -->
      <center class="pa-4">
        <!-- Button to discard the template -->
        <v-btn
          large
          outlined
          color="error"
          class="ma-2"
          @click="discardChanges"
        >
          <v-icon
            left
            dark
          >
            mdi-delete
          </v-icon>
          Discard changes
        </v-btn>

        <!-- Button to save the template -->
        <v-btn
          large
          outlined
          color="success"
          class="ma-2"
          @click="saveChanges"
        >
          <v-icon
            left
            dark
          >
            mdi-check
          </v-icon>
          Save changes
        </v-btn>
      </center>

      <!-- If there is an error, display an error alert -->
      <v-row align="center" justify="center">
        <v-col class="pa-4" cols="12" sm="6" md="4">
          <v-alert
            v-model="errorIsActive"
            outlined
            dismissible
            type="error"
            text
            transition="scale-transition"
          >
            {{ errorMessage }}
          </v-alert>
        </v-col>
      </v-row>

      <!-- Card containing all data about the character -->
      <v-card shaped>
        <!-- Title for all the essential data about the character -->
        <v-container class="pa-4">
          <v-row>
            <!-- Image on the left -->
            <v-col class="pa-4" cols="12" lg="4">
              <!-- Container with fill-height to vertically center the image -->
              <v-container class="pa-4" fill-height>
                <!-- small image for small screens -->
                <v-img
                  class="shrink d-flex d-sm-none"
                  min-height="150"
                  max-height="150"
                  lazy-src="/logo.png"
                  src="https://blog.headway-advisory.com/wp-content/uploads/2018/01/fmeunier_paris-1024x1024.jpeg"
                  contain
                />

                <!-- big image for bigger screens -->
                <v-img
                  class="shrink d-none d-sm-flex"
                  min-height="350"
                  max-height="350"
                  lazy-src="/logo.png"
                  src="https://blog.headway-advisory.com/wp-content/uploads/2018/01/fmeunier_paris-1024x1024.jpeg"
                />
              </v-container>
            </v-col>

            <!-- Inputs on the right -->
            <v-col cols="12" lg="8">
              <!-- Container with fill-height to vertically center the content -->
              <v-container class="pa-4" fill-height>
                <v-row align="center" justify="center">
                  <!-- Character's name -->
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      label="Name"
                      class="ma-4"
                      disabled
                    />
                  </v-col>

                  <!-- Character's race -->
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      label="Race"
                      class="ma-4"
                      disabled
                    />
                  </v-col>

                  <!-- Character's job -->
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      label="Job"
                      class="ma-4"
                      disabled
                    />
                  </v-col>

                  <!-- Character's age -->
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      label="Age"
                      class="ma-4"
                      disabled
                    />
                  </v-col>
                </v-row>

                <!-- A separator to divide both parts -->
                <v-container>
                  <v-divider class="ma-6" />
                </v-container>

                <!-- A text to present the 1st category of stats -->
                <v-container>
                  <h3 class="text-center pa-4">
                    Here is the <span class="font-weight-bold primary--text">'Essential'</span> category of stats : each character's sheet needs it
                  </h3>
                </v-container>

                <!-- Form to add inputs for essential stats -->
                <!-- Button to add numbered stat -->
                <v-container>
                  <v-btn
                    class="ma-2 primary--text"
                    outlined
                    @click="addStat(statsEssential.id, true)"
                  >
                    Add numbered stat
                  </v-btn>
                </v-container>

                <!-- The inputs for numbered stats -->
                <v-row>
                  <v-col
                    v-for="item in statsEssential.content.filter((c) => c.isNumber)"
                    :key="item.id"
                    cols="12"
                    sm="6"
                    md="3"
                  >
                    <v-text-field
                      v-model="item.name"
                      :label="item.name.length === 0 ? 'statistic\'s name' : ''"
                      :rules="[rules.required, rules.counter, rules.ascii]"
                      append-icon="mdi-delete"
                      class="ma-4"
                      type="text"
                      @click:append="deleteStat(statsEssential.id, item.id)"
                    />
                  </v-col>
                </v-row>

                <!-- Button to add alphabetic stat -->
                <v-container>
                  <v-btn
                    class="ma-2 primary--text"
                    outlined
                    @click="addStat(statsEssential.id, false)"
                  >
                    Add alphabetic stat
                  </v-btn>
                </v-container>

                <!-- The inputs for numbered stats -->
                <v-row>
                  <v-col
                    v-for="item in statsEssential.content.filter((c) => !c.isNumber)"
                    :key="item.id"
                    cols="12"
                    sm="6"
                    md="3"
                  >
                    <v-text-field
                      v-model="item.name"
                      :label="item.name.length === 0 ? 'statistic\'s name' : ''"
                      :rules="[rules.required, rules.counter, rules.ascii]"
                      append-icon="mdi-delete"
                      class="ma-4"
                      type="text"
                      @click:append="deleteStat(statsEssential.id, item.id)"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-card>

      <v-divider class="ma-12" />

      <v-card shaped>
        <!-- Tabs for each data about the character -->
        <v-tabs
          v-model="tab"
          grow
          icons-and-text
          center-active
          centered
        >
          <v-tab
            v-for="(item, i) in tabItems"
            :key="i"
            exact
          >
            <span class="shrink d-none d-sm-flex">{{ item.title }}</span>
            <v-icon>{{ item.icon }}</v-icon>
          </v-tab>
        </v-tabs>

        <!-- Tabs -->
        <v-tabs-items v-model="tab">
          <!-- Tab n° 1 - Statistics -->
          <v-tab-item>
            <CharacterTemplateNewCategory
              :categories="statsRegular"
              :is-magic="false"
              :rules="rules"
              :add-category="addCategory"
              :delete-category="deleteCategory"
              :add-stat="addStat"
              :delete-stat="deleteStat"
            />
          </v-tab-item>

          <!-- Tab n° 2 - Magic -->
          <v-tab-item>
            <v-container>
              <!-- A switch to (dis)able the magic in this template -->
              <div class="d-flex justify-center">
                <v-switch
                  v-model="hasMagic"
                  inset
                  label="Does the character have access to magic stats ?"
                />
              </div>

              <!-- The creator of category, if the template has magic -->
              <CharacterTemplateNewCategory
                v-if="hasMagic"
                :categories="statsMagic"
                :is-magic="true"
                :rules="rules"
                :add-category="addCategory"
                :delete-category="deleteCategory"
                :add-stat="addStat"
                :delete-stat="deleteStat"
              />
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
// Imports
import CharacterTemplateNewCategory from '@/components/character-template-new-category'

export default {
  name: 'PageCharacterTemplate',

  components: {
    CharacterTemplateNewCategory
  },

  data: () => ({
    // Some booleans
    hasMagic: false,
    isAdmin: false,

    // Whether the form is valid or not
    validForm: false,

    // Error message, if the template contains an error
    errorMessage: '',
    errorIsActive: false,

    // Rules for the inputs
    rules: {
      required: value => !!value || 'Required',
      counter: value => value.length <= 20 || 'Max 20 characters',
      ascii: value => (value !== null && value.split('').every(v => v.charCodeAt(0) >= 32 && v.charCodeAt(0) <= 255)) || 'Contains invalid character',
      empty: value => value.length !== 0 || 'No empty value !'
    },

    // Counter for both categories and statistics, which starts at the smallest negative number
    idCpt: -1,

    // Tab currently selected on the menu
    tab: null,
    tabItems: [
      {
        title: 'Statistics',
        icon: 'mdi-counter'
      },
      {
        title: 'Magic',
        icon: 'mdi-wizard-hat'
      }
    ],

    // TEMPORARY - arrays to contain some data
    // A new Stat array is initiated as follow (only has 1 category, the 'Essential', which is required)
    stats: [
      {
        name: 'Essential',
        id: 0,
        isMagic: false,
        content: []
      }
    ]
  }),

  computed: {
    /** Category (the first in order) containing all Essential stats */
    statsEssential () {
      return this.stats[0]
    },

    /** Categories of stats that are neither Magic nor Essential */
    statsRegular () {
      return this.stats.filter(category => !category.isMagic && category.id !== 0)
    },

    /** Categories of stats that are Magic */
    statsMagic () {
      return this.stats.filter(category => category.isMagic)
    }
  },

  mounted () {
  },

  methods: {
    /**
     * Discard the changes brought to the template
     */
    discardChanges () {
      this.isModifying = false
    },

    /**
     * Saves the changes brought to the template, IF VALID
     */
    saveChanges () {
      // If the form is valid
      if (this.$refs.form.validate()) {
        alert('VALID - changes saved !')

        // Do display all the stats
        /*
        this.stats.forEach((category) => {
          console.log('CAT : ', category.name)
          category.content.forEach(stat => console.log('STAT : ', stat.name))
        })
        */
      }
    },

    /**
     * Adds a new Category to the character's card
     * @param {Boolean} isMagic whether the new Category is a magic one or not
     */
    addCategory (isMagic) {
      this.stats.push({
        name: '',
        id: this.idCpt--,
        isMagic,
        content: []
      })
    },

    /**
     * Deletes a Category of given id
     * @param {Int} idCategory position at which the category is located
     */
    deleteCategory (idCategory) {
      // We get the position of the category of given id
      const index = this.stats.findIndex(category => category.id === idCategory)

      // If found, we remove the Category
      if (index !== -1) {
        this.stats.splice(index, 1)
      }
    },

    /**
     * Adds a stat to the category of given id, and precises if it is a number or an alphabetic value
     * @param {Int} idCategory id of the category where the stat is located
     * @param {Boolean} isNumber whether the new stat is a number or not
     */
    addStat (idCategory, isNumber) {
      // We get the position of the category of given id
      const indexCategory = this.stats.findIndex(category => category.id === idCategory)

      // If found, we continue
      if (indexCategory !== -1) {
        this.stats[indexCategory].content.push({
          name: '',
          value: (isNumber) ? 0 : '',
          isNumber,
          id: this.idCpt--
        })
      }
    },

    /**
     * Deletes a stat of the category of given index
     * @param {Int} idCategory position of the category where the stat is located
     * @param {Int} idStat id of the stat to delete
     */
    deleteStat (idCategory, idStat) {
      // We get the position of the category of given id
      const indexCategory = this.stats.findIndex(category => category.id === idCategory)

      // If found, we continue
      if (indexCategory !== -1) {
        // We get the position of the stat to delete
        const indexStat = this.stats[indexCategory].content.findIndex(stat => stat.id === idStat)

        // If found, we remove the stat
        if (indexStat !== -1) {
          this.stats[indexCategory].content.splice(indexStat, 1)
        }
      }
    }
  },

  head () {
    return { title: 'Character template' }
  }
}
</script>
