<template>
  <v-container>
    <div>
      <v-row>
        <h1 class="ma- 4">
          {{ title_subtopic }}
        </h1>

        <v-spacer />
        <!-- button modify -->
        <v-btn
          class="ma-4"
          fab
          dark
          color="dark"
          to="/wiki_modify"
        >
          <v-icon dark>
            mdi-pencil
          </v-icon>
        </v-btn>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-img min-height="200" max-height="200" lazy-src="/logo.png" :src="souce" />
        </v-col>
        <v-textarea
          class="mt-5"
          name="description"
          filled
          auto-grow
          :value="text"
          readonly
        />
      </v-row>
    </div>

    <!-- All article -->
    <v-list>
      <v-list-group
        v-for="truc in items"
        :key="truc.name"
        v-model="truc.active"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-itel-title v-text="truc.name" />
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="bidule in truc.item"
          :key="bidule.nom"
          :to="bidule.to"
        >
          <v-list-item-content>
            <v-list-item-title v-text="bidule.nom" />
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-container>
</template>

<script>

export default {
  name: 'PageArticle',

  data: () => ({
    formModifyArticle: false,
    dialogModifyArticle: false,
    title_subtopic: 'lieux',
    text: "L'usage commun est de considérer l'Église catholique ou le catholicisme comme une confession, mais les textes de l'institution concernée ne donnent guère d'éléments qui permettraient d'affirmer qu'elle a telle ou telle désignation officielle. Dans les textes des évêques ou du pape, le terme le plus courant est celui d'« Église », sans autre précision : le mot « Église » n'y vise pas seulement une institution mais aussi un objet de foi. Dans la « communication tous publics » (revues, sites internet des diocèses, livres…), lorsqu'il n'est pas tout simplement question de l'« Église », c'est l'expression « Église catholique » qui est généralement employée.",
    items: [
      {
        name: 'article',
        item: [
          {
            nom: 'personne',
            to: '/wiki_article'
          },
          {
            nom: 'objets',
            to: '/wiki_article'
          }
        ]
      },
      {
        name: 'subTopics',
        item: [
          {
            nom: 'boudiste',
            to: '/wiki_subtopics'
          },
          {
            nom: 'protestant',
            to: '/wiki_subtopics'
          }

        ]
      }
    ],
    source: `https://picsum.photos/500/300?image=${5 * 5 + 10}`
  }),

  head () {
    return { title: 'wiki_article' }
  }
}
</script>
