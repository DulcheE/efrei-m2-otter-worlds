<template>
  <v-container>
    <!-- Card containing all data about the universe -->
    <v-card shaped>
      <!-- Head of the card -->
      <v-container>
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
      </v-container>

      <!-- Divider -->
      <v-divider />

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
        <!-- Tab n° 1 - Form the regular universe's data -->
        <v-tab-item>
          <v-container>
            <v-form ref="formUniverseData" v-model="formUniverseData">
              <!-- Name of the universe -->
              <v-row class="d-flex justify-center ma-4">
                <v-col cols="8" md="4">
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
                <v-col cols="12" md="8">
                  <v-textarea
                    v-model="universePlaceholder.description"
                    label="Description of the universe"
                    :disabled="!isModifyingUniverseData"
                    :rules="[rules.required]"
                    :placeholder="universePlaceholder.description || 'Please describe your universe !'"
                    outlined
                    auto-grow
                  />
                </v-col>
              </v-row>

              <!-- If the universe is public -->
              <v-row class="d-flex justify-center ma-4">
                <v-col class="d-flex justify-center" cols="12" md="4">
                  <v-switch
                    v-model="universePlaceholder.bIsPublic"
                    :disabled="!isModifyingUniverseData"
                    inset
                    label="Is the universe public ?"
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
                    <v-icon left>
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
            </v-form>
          </v-container>
        </v-tab-item>

        <!-- Tab n° 2 - All users in the universe -->
        <v-tab-item>
          <v-container>
            <!-- Data table -->
            <v-data-table
              :headers="headers"
              :items="universe.users"
              sort-by="name"
            >
              <template v-slot:top>
                <!-- Toolbar -->
                <v-toolbar flat>
                  <v-toolbar-title>Users</v-toolbar-title>
                  <v-divider
                    class="mx-4"
                    inset
                    vertical
                  />
                  <v-spacer />

                  <!-- Dialog to add / modify a user -->
                  <v-form ref="formUser" v-model="formUser">
                    <v-dialog v-model="dialogUser" max-width="500px">
                      <template v-slot:activator="{ on, attrs }">
                        <!-- Button to add a user -->
                        <v-btn
                          color="primary"
                          text
                          v-bind="attrs"
                          v-on="on"
                          v-text="'New user'"
                        />
                      </template>

                      <!-- Form to add / modify a user -->
                      <v-card>
                        <v-card-title>
                          <span class="headline">{{ editedIndex === -1 ? 'New User' : 'Edit User' }}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <!-- User's name (disabled if modifying a user) -->
                              <v-col cols="12" md="6">
                                <v-text-field
                                  v-model="editedUser.username"
                                  label="username"
                                  :disabled="editedIndex >= 0"
                                  :rules="[rules.required, rules.maxSmall]"
                                />
                              </v-col>

                              <!-- User's role -->
                              <v-col cols="12" md="6">
                                <v-select
                                  v-model="editedUser.role"
                                  :items="getRolesNamesCanAdd(user.role)"
                                  label="role"
                                  :rules="[rules.required]"
                                />
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer />
                          <v-btn color="warning" text @click="closeUser" v-text="'Cancel'" />
                          <v-btn color="success" text @click="saveUser" v-text="'Save'" />
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-form>
                </v-toolbar>
              </template>

              <!-- Column for Cpt character -->
              <template v-slot:[`item.characterCpt`]="{ item }">
                <h3> {{ item.characters.length }}</h3>
              </template>

              <!-- Column for user's status -->
              <template v-slot:[`item.status`]="{ item }">
                <h3>
                  {{ item.status === 0 ? 'Invited' : 'Member' }}
                </h3>
              </template>

              <!-- Column to modify / delete a user -->
              <template v-slot:[`item.actions`]="{ item }">
                <!-- Edit -->
                <v-icon
                  small
                  class="mr-2"
                  @click="editUser(item)"
                >
                  mdi-pencil
                </v-icon>

                <!-- Delete -->
                <v-icon
                  small
                  @click="deleteUser(item)"
                >
                  mdi-delete
                </v-icon>
              </template>

              <!-- What to display if there no data in the table -->
              <template v-slot:no-data>
                <h1>Sorry, it seems there is no user in your universe :(</h1>
              </template>
            </v-data-table>
          </v-container>
        </v-tab-item>

        <!-- Tab n° 3 - Critical section -->
        <v-tab-item>
          <v-container v-if="user.role.name === 'Game Master'">
            <!-- Button to delete the universe -->
            <center class="pa-16">
              <v-btn
                large
                outlined
                color="error"
                class="ma-2"
                @click.stop="dialogDeleteUniverse = true"
              >
                <v-icon left>
                  mdi-delete
                </v-icon>
                Delete the universe
              </v-btn>
            </center>

            <!-- Dialog to delete the universe -->
            <v-dialog
              v-model="dialogDeleteUniverse"
              max-width="500px"
            >
              <v-card>
                <!-- Title -->
                <v-card-title class="headline error--text">
                  Delete the universe
                </v-card-title>

                <!-- Content -->
                <v-card-text>
                  <!-- Content -->
                  This action is not reversible : if you delete this universe, no one will have access to any of its content afterwards !

                  <!-- Universe's name (for verification) -->
                  <v-form ref="formUniverseData" v-model="formUniverseData">
                    <v-container>
                      <v-text-field
                        v-model="deleteUniverseName"
                        label="Name of the universe"
                        clearable
                        :rules="[rules.required, rules.maxSmall]"
                        type="text"
                      />
                    </v-container>
                  </v-form>
                </v-card-text>

                <!-- Actions -->
                <v-card-actions>
                  <v-spacer />

                  <!-- Button : cancel -->
                  <v-btn
                    color="warning"
                    text
                    @click="dialogDeleteUniverse = false"
                    v-text="'Cancel'"
                  />

                  <!-- Button : delete -->
                  <v-btn
                    color="error"
                    text
                    @click="dialogDeleteUniverse = false"
                    v-text="'Delete'"
                  />
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
// Imports
import MixinRoles from '@/mixins/mixin-roles'
import MixinRules from '@/mixins/mixin-rules'

export default {
  name: 'PageUniverseSettings',

  mixins: [MixinRoles, MixinRules],

  data: () => ({
    // User's data
    user: {
      role: { name: 'Game Master' }
    },

    // Universe's data
    universe: {
      name: 'Wololo',
      description: 'lorem ipsum dolor amet',
      bIsPublic: true,
      src: 'https://i.pinimg.com/originals/48/cb/53/48cb5349f515f6e59edc2a4de294f439.png',
      users: [
        {
          username: 'john Doe',
          role: 'Game Master',
          status: 1,
          characters: [
            { name: '' }
          ]
        }
      ],
      maps: [
        { },
        { }
      ],
      timelines: [
        { }
      ]
    },

    // Tabs
    tab: null,
    tabItems: [
      { icon: 'mdi-earth', title: 'Universe' },
      { icon: 'mdi-human-handsup', title: 'Users' },
      { icon: 'mdi-human-handsup', title: 'Danger Zone' }
    ],

    // Section 2 - Placeholder in which we modify the data of the universe
    formUniverseData: false,
    isModifyingUniverseData: false,
    universePlaceholder: {
      name: '',
      description: ''
    },

    // Section 3 - all users in the universe
    formUser: false,
    dialogUser: false,
    headers: [
      { text: 'username', value: 'username', sortable: true, align: 'center' },
      { text: 'Role', value: 'role', sortable: true, align: 'center' },
      { text: 'Number of characters', value: 'characterCpt', sortable: true, align: 'center' },
      { text: 'Status', value: 'status', sortable: true, align: 'center' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    editedIndex: -1,
    editedUser: {
      username: '',
      role: ''
    },

    // Section 4 - delete the universe
    dialogDeleteUniverse: false,
    deleteUniverseName: ''
  }),

  watch: {
    dialogUser (val) {
      val || this.closeUser()
    }
  },

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
    },

    /**
     * Edit the user currently selected
     * @param {[]} user The currently selected user
     */
    editUser (user) {
      this.editedIndex = this.universe.users.indexOf(user)
      this.editedUser = Object.assign({}, user)
      this.dialogUser = true
    },

    /**
     * Delete the user currently selected
     * @param {[]} user The currently selected user
     */
    deleteUser (user) {
      const index = this.universe.users.indexOf(user)
      confirm('Are you sure you want to delete this user ?') && this.universe.users.splice(index, 1)
    },

    /**
     * Close the dialog
     */
    closeUser () {
      // We close the dialog
      this.dialogUser = false

      // We reset the form
      this.$refs.formUser.reset()

      // We reset the index
      this.$nextTick(() => {
        this.editedIndex = -1
      })
    },

    /**
     * Save a new user, or a selected user that has been modified
     */
    saveUser () {
      // If the form is valid
      if (this.$refs.formUser.validate()) {
        // IF - modify an existing user
        // ELSE - invite a new user
        if (this.editedIndex > -1) {
          Object.assign(this.universe.users[this.editedIndex], this.editedUser)
        } else {
          this.universe.users.push({
            username: this.editedUser.username,
            role: this.editedUser.role,
            status: 0,
            characters: []
          })
        }

        // We close the dialog
        this.closeUser()
      }
    }
  },

  head () {
    return { title: this.universe.name + ' settings' }
  }
}
</script>
