<template>
  <v-container>
    <!-- Card containing all data about the character -->
    <v-card shaped>
      <!-- Title for all the essential data about the character -->
      <v-card-title class="text-center justify-center py-6">
        <v-row>
          <!-- Image on the left -->
          <v-col class="pa-4" xs="12" sm="4">
            <v-img
              class="shrink d-flex d-md-none"
              min-height="150"
              max-height="150"
              lazy-src="/logo.png"
              :src="character.src"
              contain
            />
            <v-img
              class="shrink d-none d-md-flex"
              min-height="350"
              max-height="350"
              lazy-src="/logo.png"
              :src="character.src"
            />
          </v-col>

          <!-- Text on the right -->
          <v-col xs="12" sm="8">
            <v-row align="center" justify="center">
              <!-- Character's name -->
              <v-text-field
                v-model="character.name"
                label="Name"
                :readonly="!isModifying"
                :clearable="isModifying"
                required
                class="ma-4"
                cols="12"
                sm="6"
                md="4"
              />

              <!-- Character's race -->
              <v-select
                v-model="character.race"
                label="Race"
                :items="arrayRaces"
                :readonly="!isModifying"
                required
                class="ma-4"
                cols="12"
                sm="6"
                md="4"
              />

              <!-- Character's job -->
              <v-select
                v-model="character.job"
                label="Job"
                :items="arrayJobs"
                :readonly="!isModifying"
                required
                class="ma-4"
                cols="12"
                sm="6"
                md="4"
              />

              <!-- Character's age -->
              <v-text-field
                v-model="character.age"
                label="Age"
                :readonly="!isModifying"
                :clearable="isModifying"
                required
                class="ma-4"
                type="number"
                cols="12"
                sm="6"
                md="4"
              />
            </v-row>

            <v-divider class="ma-6" />

            <v-row align="center" justify="center">
              <!-- For each stat, we add an input -->
              <v-col
                v-for="(item, i) in statsEssential.content"
                :key="i"
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="item.value"
                  :label="item.name"
                  :readonly="!isModifying"
                  :clearable="isModifying"
                  required
                  class="ma-4"
                  :type="item.isNumber ? 'number' : 'text'"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-title>
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
                  <!-- category's title -->
                  <h1 :class="hover ? 'primary--text' : ''">
                    {{ category.title }}
                  </h1>

                  <!-- category's number input -->
                  <v-row>
                    <v-text-field
                      v-for="(stat, j) in category.content.filter((c) => c.isNumber)"
                      :key="j"
                      v-model="stat.value"
                      :label="stat.name"
                      :readonly="!isModifying"
                      :clearable="isModifying"
                      required
                      class="ma-4"
                      type="number"
                    />
                  </v-row>

                  <v-divider
                    v-if="category.content.filter((c) => c.isNumber).length !== 0 && category.content.filter((c) => !c.isNumber).length !== 0"
                    class="ma-6"
                  />

                  <!-- category's text input -->
                  <v-row>
                    <v-text-field
                      v-for="(stat, j) in category.content.filter((c) => !c.isNumber)"
                      :key="j"
                      v-model="stat.value"
                      :label="stat.name"
                      :readonly="!isModifying"
                      :clearable="isModifying"
                      required
                      class="ma-2"
                      type="text"
                    />
                  </v-row>
                </v-card>
              </v-hover>
            </v-container>
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
  </v-container>
</template>

<script>
// Imports
export default {
  name: 'PageCharacter',

  components: {
  },

  data: () => ({
    // Whether the user is able to modify its data or not
    isModifying: false,
    hasMagic: true,
    // TEMPORARY - Data about the character to be displayed
    character: {
      id: 1234,
      user: {
        username: 'J3@n C@st3x'
      },
      name: 'John DOE',
      race: 'Human',
      job: 'Soldier',
      age: 22,
      src: 'https://picsum.photos/500/300?image=1'
    },
    // Tab currently selected on the menu
    tab: null,
    // TEMPORARY - arrays to contain some data
    arrayRaces: ['Human', 'Ork', 'Argonian', 'Titan', 'Witcher', 'ELf', 'Dwarf'],
    arrayJobs: ['Soldier', 'Priest', 'Commoner', 'Brigand', 'Thief', 'Merchant'],
    stats: [
      {
        title: 'Essential',
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
            name: 'Agility',
            value: '5',
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
          }
        ]
      },
      {
        title: 'General',
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
        title: 'Craft',
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
  }
}
</script>
