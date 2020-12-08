<template>
  <v-container>
    <v-form ref="form" v-model="validForm">
      <!-- Status of the character's sheet -->
      <v-row align="center" justify="center">
        <v-col class="pa-4" cols="12" sm="6" md="4">
          <v-select
            v-model="status"
            label="Status of the character's card"
            :items="itemsStatus.map(item => item.title)"
            :disabled="!isModifying"
            required
            prepend-icon="mdi-wrench"
            solo
            :color="itemsStatus.find(item => item.title === status).color"
            :item-color="itemsStatus.find(item => item.title === status).color"
            :class="'ma-4 ' + itemsStatus.find(item => item.title === status).color + '--text'"
          />
        </v-col>
      </v-row>

      <!-- Card containing all data about the character -->
      <v-card shaped>
        <!-- Title for all the essential data about the character -->
        <v-container class="pa-4">
          <!-- Character's name -->
          <v-row align="center" justify="center">
            <v-col class="pa-4" cols="8" sm="6" md="4">
              <v-text-field
                v-model="characterPlaceholder.character.name"
                label="Character's name"
                prepend-icon="mdi-face"
                :rules="[rules.required, rules.maxSmall]"
                :disabled="!isModifying"
              />
            </v-col>
          </v-row>

          <v-row>
            <!-- Image on the left -->
            <v-col class="pa-4" cols="12" lg="4">
              <!-- Container with fill-height to vertically center the image -->
              <v-container class="pa-4" fill-height>
                <!-- Dialog for the user to change his image -->
                <v-dialog
                  v-model="dialogPicture"
                  width="500"
                >
                  <!-- An image is the activator -->
                  <template v-slot:activator="{ on, attrs }">
                    <!-- small image for small screens -->
                    <v-img
                      class="shrink d-flex d-sm-none pointer"
                      :class="isModifying && 'pointer'"
                      min-height="150"
                      max-height="150"
                      lazy-src="/logo.png"
                      :src="characterPlaceholder.src"
                      contain
                      v-bind="isModifying && attrs"
                      v-on="isModifying && on"
                    />

                    <!-- big image for bigger screens -->
                    <v-img
                      class="'shrink d-none d-sm-flex"
                      :class="isModifying && 'pointer'"
                      min-height="350"
                      max-height="350"
                      lazy-src="/logo.png"
                      :src="characterPlaceholder.src"
                      v-bind="isModifying && attrs"
                      v-on="isModifying && on"
                    />
                  </template>

                  <!-- The Dialog to change the image -->
                  <v-card v-if="isModifying">
                    <!-- Some text -->
                    <v-card-title class="headline">
                      Please select a picture
                    </v-card-title>

                    <v-divider />

                    <!-- All images -->
                    <v-row justify="center" align="center">
                      <!-- We iterate through the images -->
                      <v-col
                        v-for="(pic, i) in pictures"
                        :key="i"
                        cols="4"
                        md="3"
                      >
                        <center>
                          <v-avatar
                            :class="pictureSelected === pic ? 'primary' : 'indigo lighten-5'"
                            class="pointer"
                            size="68"
                            @click="pictureSelected = pic"
                          >
                            <v-avatar
                              class="blue-grey darken-3"
                              size="64"
                            >
                              <v-img contain :src="pic" />
                            </v-avatar>
                          </v-avatar>
                        </center>
                      </v-col>
                    </v-row>

                    <v-divider />

                    <!-- Buttons -->
                    <v-card-actions>
                      <v-spacer />
                      <!-- Cancel the choice -->
                      <v-btn color="warning" text @click="dialogPicture = false; pictureSelected = characterPlaceholder.src">
                        Cancel
                      </v-btn>

                      <!-- Save the choice -->
                      <v-btn color="success" text @click="dialogPicture = false; characterPlaceholder.src = pictureSelected">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-container>
            </v-col>

            <!-- Inputs on the right -->
            <v-col cols="12" lg="8">
              <v-container>
                <!-- For each stat category, we add a card -->
                <CharacterCardStatisticCategory
                  :is-modifying="isModifying"
                  :category="statsEssential"
                  :is-highlighted="false"
                />
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-card>

      <v-divider class="ma-12" />

      <!-- Tabs for each data about the character -->
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
            <CharacterCardStatistics :is-modifying="isModifying" :categories="statsRegular" />
          </v-tab-item>

          <!-- Tab n° 2 - Inventory -->
          <v-tab-item>
            <CharacterCardInventory :is-modifying="isModifying" :inventory="characterPlaceholder.inventory" />
          </v-tab-item>

          <!-- Tab n° 3 - Magic (may be passed) -->
          <v-tab-item v-if="hasMagic">
            <CharacterCardMagic :is-modifying="isModifying" :categories="statsMagic" />
          </v-tab-item>

          <!-- Tab n° 4 - BackStory -->
          <v-tab-item>
            <CharacterCardBackstory :is-modifying="isModifying" :backstory="characterPlaceholder.character.backstory" />
          </v-tab-item>
        </v-tabs-items>
      </v-card>

      <!-- Buttons for modification -->
      <div v-if="isUsersCharacter">
        <!-- Button to activate the modification -->
        <center v-if="!isModifying" class="pa-16">
          <v-btn
            large
            outlined
            color="primary"
            class="ma-2"
            @click="isModifying = true"
          >
            <v-icon
              left
              dark
            >
              mdi-wrench
            </v-icon>
            Modify the character
          </v-btn>
        </center>

        <!-- Buttons when modifying -->
        <center v-else class="pa-16">
          <!-- Button to discard the modifications -->
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
            Discard the changes
          </v-btn>

          <!-- Button to save the modifications -->
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
            Save the changes
          </v-btn>
        </center>
      </div>
    </v-form>
  </v-container>
</template>

<script>
// Imports
import { mapActions, mapGetters } from 'vuex'
import MixinRules from '@/mixins/mixin-rules'
import MixinOrderByName from '@/mixins/mixin-order-by-name'
import CharacterCardStatistics from '@/components/character-card-statistics'
import CharacterCardInventory from '@/components/character-card-inventory'
import CharacterCardMagic from '@/components/character-card-magic'
import CharacterCardBackstory from '@/components/character-card-backstory'
const lodash = require('lodash')

export default {
  name: 'PageCharacter',

  components: {
    CharacterCardStatistics,
    CharacterCardInventory,
    CharacterCardMagic,
    CharacterCardBackstory
  },

  mixins: [MixinRules, MixinOrderByName],

  data: () => ({
    // Whether the user is able to modify its data or not
    isModifying: false,
    hasMagic: true,
    isAdmin: false,
    isUsersCharacter: true,

    // Whether the form is valid or not
    validForm: false,

    // Data about the character to be STORED
    character: {
      name: '',
      bIsDead: 0,
      bIsSheetCompleted: 0,
      backstory: '',
      src: 'https://picsum.photos/500/300?image=1'
    },
    statCategories: [
      {
        id: -1,
        name: 'essential',
        order: -1,
        stats: [
          {
            id: -1,
            name: 'default',
            value: 0,
            bIsNumber: true,
            bIsRequired: true
          }
        ]
      }
    ],
    inventory: {},

    // Data about the character to be DISPLAYED
    characterPlaceholder: {
      character: {
        name: '',
        bIsDead: 0,
        bIsSheetCompleted: 0,
        backstory: '',
        src: 'https://picsum.photos/500/300?image=1'
      },
      statCategories: [
        {
          id: -1,
          name: 'essential',
          order: -1,
          stats: [
            {
              id: -1,
              name: 'default',
              value: 0,
              bIsNumber: true,
              bIsRequired: true
            }
          ]
        }
      ],
      inventory: []
    },

    // Status of the character's card
    status: 'Work in progress',
    itemsAllStatus: [
      {
        title: 'Work in progress',
        color: 'primary',
        isForAdmin: false
      },
      {
        title: 'Waiting validation',
        color: 'warning',
        isForAdmin: false
      },
      {
        title: 'Refused by MJ',
        color: 'error',
        isForAdmin: true
      },
      {
        title: 'Validated by MJ',
        color: 'success',
        isForAdmin: true
      }
    ],

    // Whether the picture dialog is open or not
    dialogPicture: false,
    pictureSelected: '',
    pictures: [
      'https://qph.fs.quoracdn.net/main-qimg-4ab11fd74be31e6c46ee07a7de8a050c',
      'http://www.pokepedia.fr/images/thumb/7/70/Simiabraz-DP.png/250px-Simiabraz-DP.png',
      'http://images.wikia.com/es.pokemon/images/b/bb/Empoleon_%28dream_world%29.png'
    ],

    // Tab currently selected on the menu
    tab: null
  }),

  computed: {
    ...mapGetters('character', ['getCharacter', 'getStat']),
    ...mapGetters('inventory', ['getInventories']),
    ...mapGetters('templateCategory', ['getTemplateCategories']),
    ...mapGetters('templateStat', ['getTemplateStats']),

    /** Items contained in the status widget */
    itemsStatus () {
      // We return the correct / reduced list
      return this.itemsAllStatus.filter(item => item.isForAdmin === this.isAdmin || item.title === this.status.title)
    },

    /** Items contained in the tab */
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

    /** Category (the first in order) containing all Essential statCategories */
    statsEssential () {
      return this.characterPlaceholder.statCategories[0] || []
    },

    /** Category containing non-Essential statCategories (all but the first) */
    statsNonEssential () {
      return this.characterPlaceholder.statCategories.slice(1, this.characterPlaceholder.statCategories.length) || []
    },

    /** Categories of statCategories that are neither Magic nor Essential */
    statsRegular () {
      return this.statsNonEssential.filter(category => !category.isMagic) || []
    },

    /** Return the id of the Universe, if he has one */
    idUniverse () {
      return parseInt(this.$route.params.idUniverse) || undefined
    },

    /** Categories of statCategories that are Magic (but not Essential) */
    statsMagic () {
      return this.statsNonEssential.filter(category => category.isMagic) || []
    },

    /** Return whether this page is for a new Character or not */
    isNewCharacter () {
      return this.$route.params.idCharacter === undefined
    },

    /** Return the id of the Character, if he has one */
    idCharacter () {
      return (this.isNewCharacter) ? undefined : parseInt(this.$route.params.idCharacter)
    }
  },

  async mounted () {
    // GOING FORWARD, we consider that this is a valid character in a valid universe
    // We initialize the value of the picture selected by the user
    this.pictureSelected = this.characterPlaceholder.character.src

    // First, we fetch the Template categories for this Universe
    await this.fetchTemplateCategoryForUniverse(this.idUniverse)
    this.statCategories = this.getTemplateCategories()

    // Second, for each category, we fetch the Template stat, and put it inside the category
    await Promise.all(this.statCategories.map((category) => {
      return this.fetchTemplateStatForCategory(category.id)
        .then(() => {
          category.stats = this.getTemplateStats()
        })
    }))

    // we define an array to host the character's existing statCategories
    let statsFromCharacter = []

    // If it is a new character :
    // we get the default template
    // the user can directly modify his data
    // Otherwise :
    // We get the character's data
    if (this.isNewCharacter) {
      this.isModifying = true
    } else {
      // We fetch the character's own data
      await this.fetchCharacterWithStat(this.idCharacter)
      await this.fetchInventoryForCharacter(this.idCharacter)

      // We get the data
      this.character = this.getCharacter()
      statsFromCharacter = this.getStat().categories
      this.inventory = this.getInventories()
    }

    // We fill the template with the data from the database
    this.statCategories.forEach((category) => {
      // We get the matching category
      const categoryPlayer = statsFromCharacter.find(c => c.id === category.id)

      // we iterate through the stat of the category
      category.stats.forEach((stat) => {
        // If the player has no such category, we put a default value
        // Otherwise : we try to get the stat's value, or give it a default value if none is found
        if (categoryPlayer === undefined) {
          stat.value = (stat.bIsNumber) ? 0 : ''
        } else {
          // We get the stat (from the player)
          const statPlayer = categoryPlayer.stats.find(s => s.id === stat.id)

          // We set the stat
          stat.value = (statPlayer !== undefined) ? statPlayer.value : (stat.bIsNumber) ? 0 : ''
        }
      })
    })

    // We fill the placeholder
    this.initPlaceholder()
  },

  methods: {
    ...mapActions('character', ['fetchCharacterWithStat']),
    ...mapActions('inventory', ['fetchInventoryForCharacter']),
    ...mapActions('templateCategory', ['fetchTemplateCategoryForUniverse']),
    ...mapActions('templateStat', ['fetchTemplateStatForCategory']),

    initPlaceholder () {
      // We fill the placeholder with the character's data
      this.characterPlaceholder = {
        character: lodash.cloneDeep(this.character),
        statCategories: lodash.cloneDeep(this.statCategories),
        inventory: lodash.cloneDeep(this.inventory)
      }

      // We set the status according to the placeholder
      const index = this.characterPlaceholder.character.bIsSheetCompleted ? 1 : 0
      this.status = this.itemsAllStatus[index].title
    },

    /**
     * Discard the changes brought to the character card
     */
    discardChanges () {
      // We reset the placeholder
      this.initPlaceholder()

      // We close the modifications
      this.isModifying = false
    },

    /**
     * Saves the changes brought to the character's sheet, IF VALID
     */
    saveChanges () {
      // If the form is valid
      if (this.$refs.form.validate()) {
        // Before we continue, we morph some data
        this.characterPlaceholder.character.bIsSheetCompleted = true // this.itemsAllStatus.findIndex(item => item.title === this.status)

        // We modify the ACTUAL character's data
        this.character = lodash.cloneDeep(this.characterPlaceholder.character)
        this.statCategories = lodash.cloneDeep(this.characterPlaceholder.statCategories)

        // stuff ?

        // We close the modifications
        this.isModifying = false
      }
    }
  },

  head () {
    return { title: (this.isNewCharacter) ? 'new character' : this.character.name }
  }
}
</script>
