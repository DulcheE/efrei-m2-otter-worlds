<template>
  <div>
    <!-- GM's drawer activator -->
    <v-btn
      class="ma-2 zoom-xs"
      label="GM"
      fab
      outlined
      color="primary"
      style="position: fixed; top: 50%; left: 0; z-index: 1; border-width: 4px;"
      @click.stop="drawer = !drawer"
    >
      GM
    </v-btn>

    <!-- GM's drawer -->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <!-- Head of the drawer -->
      <center>
        <v-img
          class="ma-4"
          :src="universe.src || '/logo.png'"
          max-height="50"
          max-width="50"
          contain
        />
        <h3 v-text="universe.name" />
      </center>

      <!-- Divider -->
      <v-divider class="mt-4" />

      <!-- List of links -->
      <v-list dense>
        <v-subheader>Links</v-subheader>
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon" />
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <!-- Divider -->
      <v-divider class="mt-4" />

      <!-- Dialog to invite new user -->
      <v-dialog
        v-model="dialogInviteUser"
        max-width="600px"
      >
        <!-- Dialog's trigger -->
        <template v-slot:activator="{ on, attrs }">
          <center>
            <v-btn
              class="ma-4"
              color="primary"
              dark
              text
              v-bind="attrs"
              v-on="on"
              v-text="'Invite user'"
            />
          </center>
        </template>

        <!-- Dialog -->
        <!-- Form -->
        <v-form ref="formInviteUser" v-model="formInviteUser">
          <v-card>
            <!-- Dialog's title -->
            <v-card-title>
              <span class="headline">Invite User</span>
            </v-card-title>

            <!-- Dialog's input(s) -->
            <v-card-text>
              <!-- New user's name -->
              <v-container>
                <v-text-field
                  v-model="newUser.username"
                  label="username"
                  :rules="[rules.required, rules.maxSmall]"
                />
              </v-container>

              <!-- New user's role -->
              <v-container>
                <v-select
                  v-model="newUser.role"
                  :items="getRolesNames()"
                  label="role"
                  :rules="[rules.required]"
                />
              </v-container>
            </v-card-text>

            <!-- Dialog's actions -->
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="warning"
                text
                @click="dialogInviteUser = false"
              >
                Close
              </v-btn>
              <v-btn
                color="success"
                text
                @click="inviteUser"
              >
                Invite
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>

      <!-- Divider -->
      <v-divider class="mt-4" />

      <!-- List of useful data -->
      <v-list dense>
        <!-- Cpt players -->
        <v-list-item>
          <v-list-item-content>Players :</v-list-item-content>
          <v-list-item-content class="align-end" v-text="universe.characters.length" />
        </v-list-item>

        <!-- Cpt players ready -->
        <v-list-item>
          <v-list-item-content class="success--text" v-text="'Ready'" />
          <v-list-item-content class="success--text align-end" v-text="universe.characters.filter(c => c.status === 3).length" />
        </v-list-item>

        <!-- Cpt players waiting validation -->
        <v-list-item>
          <v-list-item-content class="warning--text" v-text="'Waiting validation'" />
          <v-list-item-content class="warning--text align-end" v-text="universe.characters.filter(c => c.status === 1).length" />
        </v-list-item>

        <!-- Cpt players wip -->
        <v-list-item>
          <v-list-item-content class="error--text" v-text="'Work in progress'" />
          <v-list-item-content class="error--text align-end" v-text="universe.characters.filter(c => c.status === 0 || c.status === 2).length" />
        </v-list-item>

        <!-- Divider small -->
        <v-container>
          <v-divider class="mx-8" />
        </v-container>

        <!-- Cpt maps -->
        <v-list-item>
          <v-list-item-content v-text="'Maps'" />
          <v-list-item-content class="align-end" v-text="universe.maps.length" />
        </v-list-item>

        <!-- Cpt timelines -->
        <v-list-item>
          <v-list-item-content v-text="'Timelines'" />
          <v-list-item-content class="align-end" v-text="universe.timelines.length" />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
// Imports
import MixinRules from '@/mixins/mixin-rules'
import MixinRoles from '@/mixins/mixin-roles'

export default {
  name: 'LayoutGmDashboard',

  mixins: [MixinRules, MixinRoles],

  data: () => ({
    // Drawer
    drawer: false,
    group: null,
    selectedItem: -1,
    items: [
      { title: 'Character template', icon: 'mdi-human-handsup', to: '/universe/0/character-template' },
      { title: 'New map', icon: 'mdi-map', to: '/universe/0/map' },
      { title: 'New timeline', icon: 'mdi-chart-timeline-variant', to: '/universe/0/timeline' },
      { title: 'Settings', icon: 'mdi-cog', to: '/universe/0/settings' }
    ],

    // Universe's data
    universe: {
      name: 'Wololo',
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

    // All about the form to invite a user
    dialogInviteUser: false,
    formInviteUser: false,
    newUser: {
      username: '',
      role: ''
    }
  }),

  watch: {
    group () {
      this.drawer = false
    }
  },

  methods: {
    inviteUser () {
      // If the form is valid
      if (this.$refs.formInviteUser.validate()) {
        // We display the name of the invited user
        alert('inviting ' + this.newUser.username + ' as a ' + this.newUser.role)

        // We reset the form
        this.$refs.formInviteUser.reset()

        // We close the dialog
        this.dialogInviteUser = false
      }
    }
  }
}
</script>
