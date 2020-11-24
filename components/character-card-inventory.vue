<template>
  <v-container>
    <!-- Data table to display the inventory -->
    <v-data-table
      fixed-header
      :headers="headers()"
      :items="inventory"
      :hide-default-footer="true"
      sort-by="name"
    >
      <!-- Slot for the 'name' field -->
      <template v-slot:[`item.name`]="{ item }">
        <v-text-field
          v-model="item.name"
          :disabled="!isModifying"
          :clearable="isModifying"
          :rules="isModifying ? [rules.required, rules.ascii] : []"
          type="text"
        />
      </template>

      <!-- Slot for the 'description' field -->
      <template v-slot:[`item.description`]="{ item }">
        <v-text-field
          v-model="item.description"
          :disabled="!isModifying"
          :clearable="isModifying"
          :rules="isModifying ? [rules.required, rules.ascii] : []"
          type="text"
        />
      </template>

      <!-- Slot for the 'number' field -->
      <template v-slot:[`item.number`]="{ item }">
        <v-text-field
          v-model="item.number"
          :disabled="!isModifying"
          :clearable="isModifying"
          :rules="isModifying ? [rules.required] : []"
          type="number"
        />
      </template>

      <!-- Slot for the 'weight' field -->
      <template v-slot:[`item.weight`]="{ item }">
        <v-text-field
          v-model="item.weight"
          :disabled="!isModifying"
          :clearable="isModifying"
          :rules="isModifying ? [rules.required] : []"
          type="number"
        />
      </template>

      <!-- Slot for the 'weightTotal' field -->
      <template v-slot:[`item.weightTotal`]="{ item }">
        {{ item.number * item.weight }}
      </template>

      <!-- Slot for the 'actions' field -->
      <template v-slot:[`item.actions`]="{ item }">
        <!-- Action to delete the item -->
        <v-icon color="error" small @click="dialogDeleteOpen(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <!-- Dialog to add a new item -->
    <v-dialog
      v-if="isModifying"
      v-model="dialogAdd"
      max-width="500px"
    >
      <!-- Dialog's trigger -->
      <template v-slot:activator="{ on, attrs }">
        <center class="pa-8">
          <v-btn
            color="primary"
            outlined
            class="mb-2"
            v-bind="attrs"
            v-on="on"
            @click="dialogAddOpen"
          >
            New Item
          </v-btn>
        </center>
      </template>

      <!-- Dialog -->
      <v-card>
        <v-card-title>
          <span class="headline">New Item</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-form ref="formInventory" v-model="formInventory">
              <!-- Inputs for the new item -->
              <v-row>
                <!-- New item : name -->
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="newItem.name"
                    label="Name"
                    :rules="isModifying ? [rules.required, rules.ascii] : []"
                  />
                </v-col>

                <!-- New item : description -->
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="newItem.description"
                    label="Description"
                    :rules="isModifying ? [rules.required, rules.ascii] : []"
                  />
                </v-col>

                <!-- New item : number -->
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="newItem.number"
                    label="Number"
                    :rules="isModifying ? [rules.required] : []"
                  />
                </v-col>

                <!-- New item : weight -->
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="newItem.weight"
                    label="Weight"
                    :rules="isModifying ? [rules.required] : []"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <!-- Button to cancel the new item -->
          <v-btn class="zoom-sm ma-8" color="warning" outlined @click="dialogAdd = false">
            Cancel
          </v-btn>

          <!-- Button to save the new item -->
          <v-btn class="zoom-sm ma-8" color="success" outlined @click="dialogAddConfirm">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog to delete an item -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <!-- Title -->
        <v-card-title class="headline">
          Are you sure you want to delete this item ?
        </v-card-title>

        <!-- Buttons -->
        <v-card-actions>
          <v-spacer />
          <!-- Cancel deletion -->
          <v-btn class="zoom-sm ma-8" color="warning" outlined @click="dialogDelete = false">
            Cancel
          </v-btn>

          <!-- Confirm deletion -->
          <v-btn class="zoom-sm ma-8" color="error" outlined @click="dialogDeleteConfirm">
            OK
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
// Imports
export default {
  name: 'CharacterCardInventory',

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
    inventory: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  data: () => ({
    // Whether the form to add a dialog is valid or not
    formInventory: false,

    // Whether the dialogs are active or not
    dialogAdd: false,
    dialogDelete: false,

    deleteIndex: -1,
    newItem: {},
    defaultItem: {
      name: '',
      number: undefined,
      description: '',
      weight: undefined
    }
  }),

  computed: {
  },

  created () {
    this.inventory = [
      {
        name: 'Apple',
        number: 5,
        description: '1 doctor a day keeps the apple away',
        weight: 0.1,
        weightTotal: 0.1
      },
      {
        name: 'Dagger',
        number: 1,
        description: 'That\'s not a knife...',
        weight: 0.5,
        weightTotal: 0.5
      },
      {
        name: 'Claymore',
        number: 1,
        description: 'That\'s a knife !',
        weight: 15,
        weightTotal: 15
      }
    ]
  },

  mounted () {},

  methods: {
    /**
     * Headers for the data table
     */
    headers () {
      // We define an array
      const headerArray = [
        { text: 'Name', value: 'name', align: 'center' },
        { text: 'Description', value: 'description', align: 'center' },
        { text: 'Number', value: 'number', align: 'center' },
        { text: 'weight', value: 'weight', align: 'center' },
        { text: 'Total weight', value: 'weightTotal', align: 'center' }
      ]

      // We add the 'action' slot if the user is modifying
      if (this.isModifying) {
        headerArray.push({ text: 'Actions', value: 'actions', align: 'center', sortable: false })
      }

      // We return the array
      return headerArray
    },

    /**
     * Method for when the Dialog to add an item is to be opened
     * @param {} item Item to (maybe ?) add
     */
    dialogAddOpen () {
      // We reset the item template
      this.newItem = this.defaultItem

      // We open the Add dialog
      this.dialogAdd = true
    },

    /**
     * Method for when the Dialog to add an item is validated
     */
    dialogAddConfirm () {
      // If the form is valid
      if (this.$refs.formInventory.validate()) {
        // We remove the item to delete
        this.inventory.push(this.newItem)

        // We close the Add dialog
        this.dialogAdd = false
      }
    },

    /**
     * Method for when the Dialog to delete an item is to be opened
     * @param {} item Item to (maybe ?) delete
     */
    dialogDeleteOpen (item) {
      // We set the index of the item to delete
      this.deleteIndex = this.inventory.indexOf(item)

      // We open the Delete dialog
      this.dialogDelete = true
    },

    /**
     * Method for when the Dialog to delete an item is validated
     */
    dialogDeleteConfirm () {
      // We remove the item to delete
      this.inventory.splice(this.deleteIndex, 1)

      // We close the Delete dialog
      this.dialogDelete = false
    }
  }
}
</script>
