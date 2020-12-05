<template>
  <v-container>
    <v-form ref="form" v-model="validForm">
      <!-- Status of the character's card -->
      <v-row align="center" justify="center">
        <v-col class="pa-4" cols="12" sm="6" md="4">
          <v-select
            v-model="status"
            label="Status of the character's card"
            :items="statusItems.map(item => item.title)"
            :disabled="!isModifying"
            required
            prepend-icon="mdi-wrench"
            :color="statusItems.find(item => item.title === status).color"
            :item-color="statusItems.find(item => item.title === status).color"
            :class="'ma-4 ' + statusItems.find(item => item.title === status).color + '--text'"
            solo
          />
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
              <!-- Container with fill-height to vertically center the content -->
              <v-container class="pa-4" fill-height>
                <v-row align="center" justify="center">
                  <!-- Character's name -->
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="characterPlaceholder.name"
                      label="Name"
                      :disabled="!isModifying"
                      :clearable="isModifying"
                      :rules="[rules.required, rules.maxSmall]"
                      class="ma-4"
                      type="text"
                      required
                    />
                  </v-col>

                  <!-- Character's race -->
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="characterPlaceholder.race"
                      label="Race"
                      :disabled="!isModifying"
                      :clearable="isModifying"
                      :rules="[rules.required, rules.maxSmall]"
                      required
                      class="ma-4"
                      type="text"
                    />
                  </v-col>

                  <!-- Character's job -->
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="characterPlaceholder.job"
                      label="Job"
                      :disabled="!isModifying"
                      :clearable="isModifying"
                      :rules="[rules.required, rules.maxSmall]"
                      required
                      class="ma-4"
                    />
                  </v-col>

                  <!-- Character's age -->
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="characterPlaceholder.age"
                      label="Age"
                      :disabled="!isModifying"
                      :clearable="isModifying"
                      :rules="[rules.required]"
                      class="ma-4"
                      type="number"
                    />
                  </v-col>
                </v-row>

                <!-- A separator to divide both parts -->
                <v-container>
                  <v-divider v-if="statsEssential.content.length !== 0" class="ma-6" />
                </v-container>

                <!-- For each Essential stat, we add an input -->
                <!-- First, the number inputs -->
                <v-row align="center" justify="center">
                  <v-col
                    v-for="item in orderByName(statsEssential.content.filter(s => s.isNumber))"
                    :key="item.id"
                    cols="12"
                    sm="6"
                    md="3"
                  >
                    <v-text-field
                      v-model="item.value"
                      :label="item.name"
                      :disabled="!isModifying"
                      :clearable="isModifying"
                      :rules="[rules.required]"
                      class="ma-4"
                      type="number"
                    />
                  </v-col>
                </v-row>

                <!-- Second, the text inputs -->
                <v-row align="center" justify="center">
                  <v-col
                    v-for="item in orderByName(statsEssential.content.filter(s => !s.isNumber))"
                    :key="item.id"
                    cols="12"
                    sm="6"
                    md="3"
                  >
                    <v-text-field
                      v-model="item.value"
                      :label="item.name"
                      :disabled="!isModifying"
                      :clearable="isModifying"
                      :rules="[rules.required, rules.maxSmall]"
                      class="ma-4"
                      type="text"
                    />
                  </v-col>
                </v-row>
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
            <CharacterCardStatistics :is-modifying="isModifying" :stats="statsRegular" />
          </v-tab-item>

          <!-- Tab n° 2 - Inventory -->
          <v-tab-item>
            <CharacterCardInventory :is-modifying="isModifying" :inventory="inventory" />
          </v-tab-item>

          <!-- Tab n° 3 - Magic (may be passed) -->
          <v-tab-item v-if="hasMagic">
            <CharacterCardMagic :is-modifying="isModifying" :stats="statsMagic" />
          </v-tab-item>

          <!-- Tab n° 4 - BackStory -->
          <v-tab-item>
            <CharacterCardBackstory :is-modifying="isModifying" :backstory="backstory" />
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

    // TEMPORARY - Data about the character to be displayed
    character: {
      id: -1,
      user: {
        username: ''
      },
      name: '',
      race: '',
      job: '',
      age: 20,
      src: 'https://picsum.photos/500/300?image=1',
      stats: [
        {
          name: 'Essential',
          id: -1,
          isMagic: false,
          content: []
        }
      ]
    },
    characterPlaceholder: {
      id: -1,
      user: {
        username: ''
      },
      name: '',
      race: '',
      job: '',
      age: 20,
      src: 'https://picsum.photos/500/300?image=1',
      stats: [
        {
          name: 'Essential',
          id: -1,
          isMagic: false,
          content: []
        }
      ]
    },

    // Status of the character's card
    status: 'Work in progress',

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
    /** Items contained in the status widget */
    statusItems () {
      // We initialize a list
      const allItems = [
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
      ]

      // We return the correct / reduced list
      return allItems.filter(item => item.isForAdmin === this.isAdmin || item.title === this.status)
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

    /** Category (the first in order) containing all Essential stats */
    statsEssential () {
      return this.characterPlaceholder.stats[0]
    },

    /** Categories of stats that are neither Magic nor Essential */
    statsRegular () {
      return this.characterPlaceholder.stats.filter(category => !category.isMagic && category.id !== 0)
    },

    /** Categories of stats that are Magic */
    statsMagic () {
      return this.characterPlaceholder.stats.filter(category => category.isMagic)
    }
  },

  mounted () {
    // We initialize the value of the picture selected by the user
    // this.pictureSelected = this.characterPlaceholder.src

    // If accessing the page to CREATE a character's sheet for the 1st time, the user can directly modify his data
    const idCharacter = this.$route.params.idCharacter
    if (idCharacter === undefined) {
      this.isModifying = true
    }

    // TO BE REPLACED - We fill the character object
    this.character = {
      id: 1234,
      user: {
        username: 'J3@n C@st3x'
      },
      name: 'John Doe',
      race: 'Human',
      job: 'Soldier',
      age: 22,
      src: 'https://picsum.photos/500/300?image=1',
      stats: [
        {
          name: 'Essential',
          id: 0,
          isMagic: false,
          content: [
            {
              name: 'Reputation',
              value: 'Well-known',
              isNumber: false
            },
            {
              name: 'Strength',
              value: '8',
              isNumber: true
            },
            {
              name: 'Spirit',
              value: '3',
              isNumber: true
            },
            {
              name: 'Intelligence',
              value: '5',
              isNumber: true
            },
            {
              name: 'Karma',
              value: 'Non-existent',
              isNumber: false
            }
          ]
        },
        {
          name: 'General',
          id: 1,
          isMagic: false,
          content: [
            {
              name: 'Intelligence',
              value: 'Dumb fuck',
              isNumber: false
            },
            {
              name: 'Blablabla',
              value: 'bla bla ?',
              isNumber: false
            },
            {
              name: 'Blabla.',
              value: 'bla !',
              isNumber: false
            },
            {
              name: 'Deduction',
              value: '8',
              isNumber: true
            },
            {
              name: 'Education',
              value: '5',
              isNumber: true
            },
            {
              name: 'Language - elder',
              value: '3',
              isNumber: true
            },
            {
              name: 'Language - dwarf',
              value: '5',
              isNumber: true
            },
            {
              name: 'Opposition',
              value: '5',
              isNumber: true
            },
            {
              name: 'Contradiction',
              value: '5',
              isNumber: true
            },
            {
              name: 'Premonition',
              value: '5',
              isNumber: true
            },
            {
              name: 'Compromise',
              value: '5',
              isNumber: true
            },
            {
              name: 'Agitation',
              value: '5',
              isNumber: true
            },
            {
              name: 'Violation',
              value: '5',
              isNumber: true
            },
            {
              name: 'Mutilation',
              value: '5',
              isNumber: true
            },
            {
              name: 'Planet dies',
              value: '5',
              isNumber: true
            }
          ]
        },
        {
          name: 'Craft',
          id: 2,
          isMagic: false,
          content: [
            {
              name: 'Alchemy',
              value: 7,
              isNumber: true
            },
            {
              name: 'Cooking',
              value: 5,
              isNumber: true
            },
            {
              name: 'Forgery',
              value: 2,
              isNumber: true
            }
          ]
        },
        {
          name: 'Witchery',
          id: 3,
          isMagic: true,
          content: [
            {
              name: 'Mana',
              value: 7,
              isNumber: true
            },
            {
              name: 'Witchcraft',
              value: 'novice',
              isNumber: false
            }
          ]
        }
      ],
      inventory: [],
      backstory: ''
    }

    // We fill the placeholder with the character's data
    this.characterPlaceholder = lodash.cloneDeep(this.character)
  },

  methods: {
    /**
     * Discard the changes brought to the character card
     */
    discardChanges () {
      // We reset the placeholder
      this.characterPlaceholder = lodash.cloneDeep(this.character)

      // We close the modifications
      this.isModifying = false
    },

    /**
     * Saves the changes brought to the character's sheet, IF VALID
     */
    saveChanges () {
      // If the form is valid
      if (this.$refs.form.validate()) {
        // We modify the character's data
        this.character = lodash.cloneDeep(this.characterPlaceholder)

        // We close the modifications
        this.isModifying = false
      }
    }
  },

  head () {
    return { title: (this.$route.params.idCharacter === undefined) ? 'new character' : 'not new' } // this.character.name }
  }
}
</script>
