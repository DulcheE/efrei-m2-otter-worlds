<template>
  <div>
    <!-- App bar (navbar) -->
    <v-app-bar
      hide-on-scroll
      app
    >
      <v-spacer />

      <!-- App-bar logo -->
      <router-link to="/">
        <!-- Logo for small screens -->
        <v-img
          class="zoom-sm shrink d-flex d-md-none"
          src="/logo.png"
          max-height="50"
          max-width="50"
          contain
        />

        <!-- Logo for big screens -->
        <v-img
          class="zoom-sm shrink d-none d-md-flex"
          src="/logo-text.png"
          max-height="80"
          max-width="180"
          contain
        />
      </router-link>

      <v-spacer />

      <!-- Search bar -->
      <!-- Search bar (on small screen) -->
      <v-text-field
        class="shrink d-flex d-md-none"
        placeholder="..."
        hide-details
        single-line
        clearable
      >
        <v-icon slot="prepend">
          mdi-magnify
        </v-icon>
      </v-text-field>

      <!-- Search bar (on big screen) -->
      <v-text-field
        class="shrink d-none d-md-flex"
        :placeholder="populateSearchBar"
        hide-details
        single-line
        clearable
      >
        <v-icon slot="prepend">
          mdi-magnify
        </v-icon>
      </v-text-field>

      <v-spacer />

      <!-- if logged : profile tab -->
      <v-menu
        v-if="isUserLogged"
        open-on-hover
        offset-y
        bottom
        origin="center center"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <!-- button to activate menu -->
          <v-btn
            class="ma-2"
            outlined
            x-large
            v-bind="attrs"
            v-on="on"
          >
            <v-badge
              v-if="isUserLogged"
              class="ma-2"
              bordered
              bottom
              color="red lighten-1"
              dot
              offset-x="10"
              offset-y="10"
            >
              <v-avatar size="40">
                <v-img
                  src="https://tse1.mm.bing.net/th?id=OIP.UYxX1vxsuqp7EKw6eFQr7QHaE8&pid=Api"
                />
              </v-avatar>
            </v-badge>
            <span class="shrink d-none d-lg-flex">{{ name }}</span>
          </v-btn>
        </template>

        <!-- menu displaying a user's action -->
        <v-list>
          <v-list-item
            v-for="(item, index) in itemsProfile"
            :key="index"
            :to="item.to"
          >
            <v-icon
              class="ma-2"
            >
              {{ item.icon }}
            </v-icon>
            <v-list-item-title class="shrink d-none d-lg-flex">
              - {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- otherwise : login / signin tab -->
      <v-btn
        v-else
        class="ma-2"
        outlined
        x-large
        @click="openDialog"
      >
        <v-icon class="mr-2">
          mdi-account-circle
        </v-icon>
        Login / Sign in
      </v-btn>

      <v-spacer />

      <!-- Tabs -->
      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          grow
          icons-and-text
          center-active
          centered
        >
          <v-menu
            v-for="(item, i) in itemsTab"
            :key="i"
            offset-y
            open-on-hover
            origin="center center"
            transition="scale-transition"
          >
            <!-- TRIGGER -->
            <template v-slot:activator="{ on, attrs }">
              <v-tab
                :to="item.to"
                router
                exact
                v-bind="attrs"
                v-on="on"
              >
                <span class="shrink d-none d-sm-flex">{{ item.title }}</span>
                <v-icon>{{ item.icon }}</v-icon>
              </v-tab>
            </template>

            <!-- LIST (if any) -->
            <v-list v-if="typeof item.content !== 'undefined' && item.content.length !== 0">
              <v-list-item
                v-for="(content, index) in item.content"
                :key="index"
                :to="content.to"
              >
                <!-- image (if exists !) -->
                <v-img
                  v-if="typeof content.src !== 'undefined'"
                  class="ma-2"
                  :src="content.src"
                  max-height="25"
                  max-width="25"
                  contain
                />

                <!-- icon (if exists !) -->
                <v-icon
                  v-if="typeof content.srcIcon !== 'undefined'"
                  class="ma-2"
                >
                  {{ item.icon }}
                </v-icon>

                <!-- text -->
                <v-list-item-title>{{ content.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-tabs>
      </template>
    </v-app-bar>

    <!-- Login Form -->
    <LayoutLoginDialog :is-dialog-active="isDialogActive" @closeDialog="closeDialog" />
  </div>
</template>

<script>
import LayoutLoginDialog from '@/components/layout-login-dialog'
import { mapGetters } from 'vuex'
const traverson = require('traverson-promise')

export default {
  name: 'LayoutAppBar',

  components: {
    LayoutLoginDialog
  },

  data () {
    return {
      name: '',
      // name: 'John DOE',
      isDialogActive: false,
      tab: null,
      universes: [],
      itemsProfile: [
        {
          icon: 'mdi-earth',
          title: 'My universes',
          to: '/universe'
        },
        {
          icon: 'mdi-human-handsup',
          title: 'My characters',
          to: '/characters'
        },
        {
          icon: 'mdi-cog',
          title: 'Settings',
          to: '/user/settings'
        },
        {
          icon: 'mdi-logout-variant',
          title: 'Logout',
          to: '/logout'
        }
      ]
    }
  },

  computed: {
    // Imports
    ...mapGetters('login', ['getLogged']),

    /** Items to display when a user is NOT browsing an universe */
    itemsTabDefault () {
      return [
        {
          icon: 'mdi-login',
          title: 'Getting Started',
          to: '/getting-started'
        },
        {
          icon: 'mdi-earth',
          title: 'Create / Discover Universes',
          to: '/most-known-universes',
          content: this.universes.map((u) => {
            return {
              title: u.name,
              src: 'https://i.pinimg.com/originals/48/cb/53/48cb5349f515f6e59edc2a4de294f439.png',
              to: '/universe/' + u.id
            }
          })
        },
        {
          icon: 'mdi-account-group',
          title: 'About us...',
          to: '/about-us'
        }
      ]
    },

    /** Items to display when a user is browsing an universe */
    itemsTabAdvanced () {
      // We declare some items
      const items = [
        {
          icon: 'mdi-human-handsup',
          title: 'Characters',
          to: '/characters',
          content: [
            {
              title: 'Eddy',
              src: 'http://pngimg.com/uploads/witcher/witcher_PNG56.png',
              to: '/characters/eddy'
            },
            {
              title: 'François',
              src: 'https://risibank.fr/cache/stickers/d910/91038-full.png',
              to: '/characters/francois'
            },
            {
              title: 'Hugues',
              src: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c225ee22-742c-4b8c-bf24-046ecca04e42/d7gluxa-95a2d14f-619b-42c4-8591-5b7cf38eb672.png/v1/fill/w_800,h_800,q_75,strp/more_argonian_by_pa1nful-d7gluxa.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi9jMjI1ZWUyMi03NDJjLTRiOGMtYmYyNC0wNDZlY2NhMDRlNDIvZDdnbHV4YS05NWEyZDE0Zi02MTliLTQyYzQtODU5MS01YjdjZjM4ZWI2NzIucG5nIiwid2lkdGgiOiI8PTgwMCIsImhlaWdodCI6Ijw9ODAwIn1dXX0.ZyMft0maq8-AKhPfI6dHblFmznry3Suvvh-8JelRyGA',
              to: '/characters/hugues'
            },
            {
              title: 'Paul',
              src: 'https://image.noelshack.com/fichiers/2017/37/6/1505512943-jdg-11.png',
              to: '/characters/paul'
            }
          ]
        },
        {
          icon: 'mdi-feather',
          title: 'Wiki',
          to: '/wiki',
          content: [
            {
              title: 'Alpha',
              to: '/wiki/alpha'
            },
            {
              title: 'Beta',
              to: '/wiki/beta'
            },
            {
              title: 'Omega',
              to: '/wiki/omega'
            }
          ]
        },
        {
          icon: 'mdi-map-legend',
          title: 'Maps',
          to: '/map',
          content: [
            {
              title: 'The Shire',
              srcIcon: 'mdi-map',
              to: '/map/shire'
            },
            {
              title: 'Mordor',
              srcIcon: 'mdi-map',
              to: '/map/mordor'
            }
          ]
        },
        {
          icon: 'mdi-help',
          title: 'Forums',
          to: '/forum'
        }
      ]

      // We return the items
      return items
    },

    /** Returns the items to display in the App bar Tabs depending on the situation */
    itemsTab () {
      if (this.isUniverseSelected) {
        return this.itemsTabAdvanced
      } else {
        return this.itemsTabDefault
      }
    },

    /** Returns whether a user is logged or not */
    isUserLogged () {
      return this.getLogged().logged
    },

    /** Returns whether a universe is selected or not */
    isUniverseSelected () {
      return false
    },

    /** Items to put in the search bar */
    searchBarItems () {
      return [
        'John Frusciante',
        'James Hetlfield',
        'Kirk Hammett',
        'Cliff Burton',
        'Tobias Forge',
        'Synister Gate',
        'Corey Taylor',
        'Jim Root',
        'Louka Diamond',
        'Dawn Pearl',
        'Luke Skywalker',
        'Darth Maul',
        'Darth Tyrannus',
        'Darth Sidious',
        'Darth Vader',
        'Darth Nihilus',
        'Kylo Ren',
        'General Grievous',
        'Karl Franz',
        'Krog-Gar',
        'Ulthuan',
        'Archaon',
        'Tobby-One-Eye'
      ]
    },

    /** Fills the Search bar with a string containing some of the items from a list */
    populateSearchBar () {
      // We create a copy of the searchBarItems (since we'll use slice)
      const items = this.searchBarItems

      // We initialize a random number (from 1 to 3)
      const rnd = Math.floor(Math.random() * 3) + 1

      // We initialize a string
      let placeholder = ''

      // We add all the questions to our List several times
      for (let i = 0; i < rnd; i++) {
        // We initialize a 2nd random number
        const rnd2 = Math.floor(Math.random() * items.length)

        // We update the placeholder
        placeholder += items[rnd2]

        // Add '...' or ', ' depending on whether we add something after or not
        if (i === rnd - 1) {
          placeholder += '...'
        } else {
          placeholder += ', '
        }

        // We remove the used string from the list
        items.splice(rnd2, 1)
      }

      // We return the placeholder
      return placeholder
    }
  },

  mounted () {
    traverson.from('http://localhost:3000/api/v1')
      .follow('$._links.universes')
      .getResource().result
      .then((document) => {
        this.universes = document.list
        return Promise.all(this.universes.map((universe) => {
          traverson.from(universe._links.user.href)
            .getResource().result
            .then((document) => {
              this.$set(universe, 'user', document)
            })
        }))
      })
      .catch((err) => {
        throw err.message
      })
  },

  methods: {
    /** Opens the dialog */
    openDialog () {
      this.isDialogActive = true
    },

    /** Close the dialog */
    closeDialog () {
      this.isDialogActive = false
      // eslint-disable-next-line no-console
      console.log('logged : ', this.isUserLogged)
    }
  }
}
</script>
