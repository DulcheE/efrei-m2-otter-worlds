<template>
  <div>
    <v-spacer />
    <v-tabs
      v-model="tab"
      grow
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
          </v-tab>
        </template>

        <!--List (if any) -->
        <v-list v-if="typeof item.content !== 'undefined' && item.content.length !== 0">
          <v-list-item
            v-for="(content, index) in item.content"
            :key="index"
            :to="content.to"
          >
            <!-- text -->
            <v-list-item-title>{{ content.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-tabs>
  </div>
</template>

<script>
export default {
  name: 'LayoutAppBarWiki',

  data () {
    return {
      tab: null
    }
  },

  computed: {
    /** Item to display when a user is in wiki */
    itemsTab () {
      return [
        {
          title: 'religion',
          to: '/universe/' + this.idUniverse + '/wiki/0',
          content: [
            {
              title: 'Boudiste',
              to: '/universe/' + this.idUniverse + '/wiki/0/0'
            },
            {
              title: 'Chretien',
              to: '/universe/' + this.idUniverse + '/wiki/0/0'
            },
            {
              title: 'Protestant',
              to: '/universe/' + this.idUniverse + '/wiki/0/0'
            },
            {
              title: 'Musulman',
              to: '/universe/' + this.idUniverse + '/wiki/0/0'
            }
          ]
        },
        {
          title: 'Ville',
          to: '/universe/' + this.idUniverse + '/wiki/0',
          content: [
            {
              title: 'Nantes',
              to: '/universe/' + this.idUniverse + '/wiki/0/0'
            },
            {
              title: 'Paris',
              to: '/universe/' + this.idUniverse + '/wiki/0/0'
            },
            {
              title: 'Marseille',
              to: '/universe/' + this.idUniverse + '/wiki/0/0'
            },
            {
              title: 'Bordeaux',
              to: '/universe/' + this.idUniverse + '/wiki/0/0'
            }
          ]
        },
        {
          title: 'Arme',
          to: '/universe/' + this.idUniverse + '/wiki/0',
          content: [
            {
              title: 'Arme a une main',
              to: '/universe/' + this.idUniverse + '/wiki/0/0'
            },
            {
              title: 'Arme a deux main',
              to: '/universe/' + this.idUniverse + '/wiki/0/0'
            },
            {
              title: 'Arme magique',
              to: '/universe/' + this.idUniverse + '/wiki/0/0'
            },
            {
              title: 'Arme a distance',
              to: '/universe/' + this.idUniverse + '/wiki/0/0'
            }
          ]
        },
        {
          title: 'Faune',
          to: '/universe/' + this.idUniverse + '/wiki/0',
          content: [
            {
              title: 'Mamifere',
              to: '/universe/' + this.idUniverse + '/wiki/0/0'
            },
            {
              title: 'reptile',
              to: '/universe/' + this.idUniverse + '/wiki/0/0'
            },
            {
              title: 'insect',
              to: '/universe/' + this.idUniverse + '/wiki/0/0'
            }
          ]
        }
      ]
    },

    /** Returns whether a universe is selected or not */
    isUniverseSelected () {
      return this.$router.currentRoute.name.startsWith('universe')
    },

    /** Return the id of the Universe, if he has one */
    idUniverse () {
      return this.isUniverseSelected ? parseInt(this.$route.params.idUniverse) : undefined
    }
  }
}
</script>
