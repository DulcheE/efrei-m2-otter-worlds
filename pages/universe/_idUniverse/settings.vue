<template>
  <v-container>
    <!-- Card containing all data about the universe -->
    <v-card>
      <!-- Head of the drawer -->
      <center>
        <v-img
          class="ma-4"
          :src="universe.src || '/logo.png'"
          max-height="200"
          max-width="200"
          contain
        />
        <h1 v-text="universe.name" />
      </center>

      <!-- Divider -->
      <v-divider class="ma-8" />

      <!-- Form the regular universe's data -->
      <v-form ref="formUniverseData" v-model="formUniverseData">
        <v-container>
          <!-- Name of the universe -->
          <v-row class="d-flex justify-center ma-4">
            <v-col cols="4">
              <v-text-field
                v-model="universePlaceholder.name"
                label="Name of the universe"
                :disabled="!isModifyingUniverseData"
                :clearable="isModifyingUniverseData"
                :rules="[rules.required, rules.maxSmall]"
                type="text"
              />
            </v-col>
          </v-row>

          <!-- Description of the universe -->
          <v-row class="d-flex justify-center ma-4">
            <v-col cols="8">
              <v-textarea
                v-model="universePlaceholder.description"
                label="Description of the universe"
                :disabled="!isModifyingUniverseData"
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>

          <!-- Buttons for modification -->
          <div>
            <!-- Button to activate the modification -->
            <center v-if="!isModifyingUniverseData" class="pa-4">
              <v-btn
                large
                outlined
                color="primary"
                class="ma-2"
                @click="isModifyingUniverseData = true"
              >
                <v-icon
                  left
                  dark
                >
                  mdi-wrench
                </v-icon>
                Modify the universe
              </v-btn>
            </center>

            <!-- Buttons when modifying -->
            <center v-else class="pa-4">
              <!-- Button to discard the modifications -->
              <v-btn
                large
                outlined
                color="error"
                class="ma-2"
                @click="discardChangesUniverse"
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
                @click="saveChangesUniverse"
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
        </v-container>
      </v-form>

      <!-- Divider -->
      <v-divider class="ma-8" />

      <!-- Section 1 - basic data of the universe -->
      <h1 v-text="universe.name" />
    </v-card>
  </v-container>
</template>

<script>
// Imports
import MixinRules from '@/mixins/mixin-rules'

export default {
  name: 'PageUniverseSettings',

  mixins: [MixinRules],

  data: () => ({

    // Universe's data
    universe: {
      name: 'Wololo',
      description: 'lorem ipsum dolor amet',
      src: 'https://i.pinimg.com/originals/48/cb/53/48cb5349f515f6e59edc2a4de294f439.png',
      characters: [
        { status: 0 },
        { status: 1 },
        { status: 2 },
        { status: 3 }
      ],
      maps: [
        { },
        { }
      ],
      timelines: [
        { }
      ]
    },

    // Placeholder in which we modify the data of the universe, but not the reference itself
    universePlaceholder: {
      name: '',
      description: ''
    },

    // All about the forms
    formUniverseData: false,
    isModifyingUniverseData: false
  }),

  mounted () {
    // We fill the placeholder with the universe's data
    this.universePlaceholder.name = this.universe.name
    this.universePlaceholder.description = this.universe.description
  },

  methods: {
    /**
     * Discard the changes brought to the universe
     */
    discardChangesUniverse () {
      this.isModifyingUniverseData = false
    },

    /**
     * Saves the changes brought to the universe, IF VALID
     */
    saveChangesUniverse () {
      // If the form is valid
      if (this.$refs.formUniverseData.validate()) {
        // We set the data received to the universe
        this.universe.name = this.universePlaceholder.name
        this.universe.description = this.universePlaceholder.description

        // We close the modification
        this.isModifyingUniverseData = false
      }
    }
  },

  head () {
    return { title: this.universe.name + ' settings' }
  }
}
</script>
