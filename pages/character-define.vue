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
                    @click="addStat(0, true)"
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
                      @click:append="deleteStat(0, item.id)"
                    />
                  </v-col>
                </v-row>

                <!-- Button to add alphabetic stat -->
                <v-container>
                  <v-btn
                    class="ma-2 primary--text"
                    outlined
                    @click="addStat(0, false)"
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
                      @click:append="deleteStat(0, item.id)"
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
            v-for="(item, i) in itemsTab"
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
            <v-container>
              <!-- For each stat category, we add a card -->
              <v-container
                v-for="(category, i) in statsNonEssential"
                :key="i"
              >
                <v-hover v-slot="{ hover }">
                  <v-card :class="hover ? 'zoom-xs primary--text ma-8 pa-8' : 'ma-8 pa-8'" :style="hover ? 'border-color: #E9C490' : ''" outlined>
                    <!-- category's name -->
                    <v-text-field
                      v-model="category.name"
                      :label="category.name.length === 0 ? 'Category\'s name' : ''"
                      :rules="[rules.required, rules.counter, rules.ascii]"
                      class="ma-4"
                      type="text"
                    />

                    <!-- Button to add numbered stat -->
                    <v-container>
                      <v-btn
                        class="ma-2 primary--text"
                        outlined
                        @click="addStat(i+1, true)"
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
                          :rules="[rules.required, rules.counter, rules.ascii]"
                          append-icon="mdi-delete"
                          class="ma-4"
                          type="text"
                          @click:append="deleteStat(i+1, stat.id)"
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
                        @click="addStat(i+1, false)"
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
                          :rules="[rules.required, rules.counter, rules.ascii]"
                          append-icon="mdi-delete"
                          class="ma-4"
                          type="text"
                          @click:append="deleteStat(i+1, stat.id)"
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
                        @click="deleteCategory(i+1)"
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
                  @click="addCategory"
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
          </v-tab-item>

          <!-- Tab n° 2 - Inventory -->
          <v-tab-item>
            <v-card flat>
              <v-card-text>Inventory</v-card-text>
            </v-card>
          </v-tab-item>

          <!-- Tab n° 3 - Magic (may be passed) -->
          <v-tab-item v-if="hasMagic">
            <v-card flat>
              <v-card-text>Magic</v-card-text>
            </v-card>
          </v-tab-item>

          <!-- Tab n° 4 - BackStory -->
          <v-tab-item>
            <v-card flat>
              <v-card-text>BackStory</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
// Imports
export default {
  name: 'PageCharacterDefine',

  components: {
  },

  data: () => ({
    // Whether the user is able to modify its data or not
    isModifying: false,
    hasMagic: true,
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

    // TEMPORARY - arrays to contain some data
    // A new Stat array is initiated as follow (only has 1 category, the 'Essential', which is required)
    stats: [
      {
        name: 'Essential',
        id: 0,
        content: []
      }
    ]
  }),

  computed: {
    itemsTab () {
      const items = [
        {
          title: 'Statistics',
          icon: 'mdi-counter'
        },
        {
          title: 'Inventory',
          icon: 'mdi-bag-checked'
        },
        {
          title: 'Magic',
          icon: 'mdi-wizard-hat'
        },
        {
          title: 'Backstory',
          icon: 'mdi-feather'
        }
      ]

      if (!this.hasMagic) {
        items.splice(2, 1)
      }

      return items
    },

    statsEssential () {
      return this.stats[0]
    },

    statsNonEssential () {
      return this.stats.slice(1, this.stats.length)
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
      }
    },

    /**
     * Adds a new Category to the character's card
     */
    addCategory () {
      this.stats.push({
        name: '',
        content: [],
        id: this.idCpt--
      })
    },

    /**
     * Deletes a Category of given index
     * @param {Int} index position at which the category is located
     */
    deleteCategory (index) {
      // We remove the Category IFF it is not the first one, which is required
      if (index !== 0) {
        this.stats.splice(index, 1)
      }
    },

    /**
     * Adds a stat to the category of given index, and precises if it is a number or an alphabetic value
     * @param {Int} index position of the category where the stat is located
     * @param {Boolean} isNumber whether the new stat is a number or not
     */
    addStat (index, isNumber) {
      this.stats[index].content.push({
        name: '',
        value: (isNumber) ? 0 : '',
        isNumber,
        id: this.idCpt--
      })
    },

    /**
     * Deletes a stat of the category of given index
     * @param {Int} index position of the category where the stat is located
     * @param {Int} id id of the stat to delete
     */
    deleteStat (index, id) {
      // We get the position of the stat to delete
      const position = this.stats[index].content.findIndex(stat => stat.id === id)

      // If found, we remove the stat
      if (position !== -1) {
        this.stats[index].content.splice(position, 1)
      }
    }
  }
}
</script>
