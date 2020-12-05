<template>
  <div>
    <v-list v-for="user in users" :key="user.id">
      <h1>{{ user }}</h1>
    </v-list>
    <h1>{{ logged }}</h1> -->
    <!-- <v-list v-for="universe in universes" :key="universe.id">
      <h1>{{ universe }}</h1>
    </v-list> -->
    <!-- <v-list v-for="template in templateCategories" :key="template.id">
      <h5>{{ template }}</h5>
    </v-list> -->
    <!-- <v-list v-for="template in templateStats" :key="template.id">
      <h5>{{ template }}</h5>
    </v-list> -->
    <!-- <v-list v-for="character in characters" :key="character.id">
      <h5>{{ character }}</h5>
    </v-list> -->
    <!-- <h2>{{ character }}</h2>
    <h2>{{ stat }}</h2> -->
    <!-- <v-list v-for="item in inventories" :key="item.id">
      <h5>{{ item }}</h5>
    </v-list> -->
    <!-- <v-list v-for="group in groups" :key="group.id">
      <h5>{{ group }}</h5>
    </v-list> -->
    <!-- <v-list v-for="top in topics" :key="top.id">
      <h5>{{ top }}</h5>
    </v-list>
    <h5>{{ topic }}</h5>
    <h5>{{ article }}</h5> -->
    <!-- <v-list v-for="sub in subTopics" :key="sub.id">
      <h5>{{ sub }}</h5>
    </v-list>
    <h5>{{ subTopic }}</h5>
    <h5>{{ articleSub }}</h5> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('login', ['getLogged']),
    ...mapGetters('user', ['getUsers']),
    ...mapGetters('universe', ['getUniverses']),
    ...mapGetters('templateCategories', ['getTemplateCategories']),
    ...mapGetters('templateStat', ['getTemplateStats']),
    ...mapGetters('character', ['getCharacters', 'getCharacterByid', 'getCharacter', 'getStat']),
    ...mapGetters('inventory', ['getInventories', 'getInventory']),
    ...mapGetters('group', ['getGroups', 'getGroup']),
    ...mapGetters('topic', ['getTopics', 'getTopic', 'getTopicByid', 'getTopicArticle']),
    ...mapGetters('subTopic', ['getSubTopics', 'getSubTopicByid', 'getSubTopic', 'getSubTopicArticle']),
    logged () {
      return this.getLogged()
    },
    users () {
      return this.getUsers()
    },
    templateCategories () {
      return this.getTemplateCategories()
    },
    templateStats () {
      return this.getTemplateStats()
    },
    characters () {
      return this.getCharacters()
    },
    character () {
      return this.getCharacter()
    },
    stat () {
      return this.getStat()
    },
    inventories () {
      return this.getInventories()
    },
    groups () {
      return this.getGroups()
    },
    topics () {
      return this.getTopics()
    },
    topic () {
      return this.getTopic()
    },
    articleTopic () {
      return this.getTopicArticle()
    },
    articleSub () {
      return this.getSubTopicArticle()
    },
    subTopics () {
      return this.getSubTopics()
    },
    subTopic () {
      return this.getSubTopic()
    }
  },
  async mounted () {
    await this.login({ username: 'Eddy', password: 'edypaswor' })
    /* await this.fetchAllUsers()
    await this.fetchUniverseOwn()
    await this.fetchUniversePlay() */
    // await this.fetchUniverse(1)
    // await this.fetchForUniverse(4)
    // await this.fetchAllTemplateCategories()
    // await this.fetchAllTemplateStats()
    /* await this.putTemplateStat({ id: 14, template: { name: 'prout qui pue', bIsNumber: true, bIsRequired: false, idTemplateCategory: 1 } })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('yay')
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      }) */
    // await this.fetchCharactersForUser(2)
    /* await this.putCharacter({ character: { name: 'le juif', backstory: 'il est juif et ca craint mais genre vraiment beaucoup', bIsDeead: false, bIsSheetCompleted: false, idUser: 2, idUniverse: 2 }, id: 7 })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('yay')
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      }) */
    // await this.fetchCharacterWithStat(1)
    // await this.fetchForCharacter(1)
    // await this.fetchGroupForCharacter(1)
    // await this.fetchTopic(3)
    // await this.fetchTopicWithArticle(3)
    // await this.fetchSubTopicWithArticle(1)
  },
  methods: {
    ...mapActions('login', ['login', 'fetchUniverseOwn', 'fetchUniversePlay']),
    ...mapActions('user', ['fetchAllUsers', 'addUser', 'putUser', 'deleteUser']),
    ...mapActions('universe', ['fetchAllUniverses', 'fetchUniverse', 'addUniverse', 'putUniverse', 'deleteUniverse']),
    ...mapActions('templateCategories', ['fetchAllTemplateCategories', 'fetchTemplateCategory', 'fetchTemplateCategoryForUniverse', 'addTemplateCategory', 'putTemplateCategory', 'deleteTemplateCategory']),
    ...mapActions('templateStat', ['fetchAllTemplateStats', 'fetchTemplateStat', 'fetchTemplateStatForCategory', 'addTemplateStat', 'putTemplateStat', 'deleteTemplateStat']),
    ...mapActions('character', ['fetchAllCharacters', 'fetchCharacter', 'fetchCharactersForGroup', 'fetchCharactersForUniverse', 'fetchCharactersForUser', 'fetchCharacterWithStat', 'addCharacter', 'putCharacter', 'deleteCharacter']),
    ...mapActions('inventory', ['fetchAllInventories', 'fetchInventory', 'fetchInventoryForCharacter', 'deleteInventory']),
    ...mapActions('group', ['fetchAllGroups', 'fetchGroup', 'fetchGroupForCharacter', 'deleteGroup']),
    ...mapActions('topic', ['fetchAllTopics', 'fetchTopic', 'fetchTopicWithArticle', 'fetchTopicForUniverse']),
    ...mapActions('subTopic', ['fetchAllSubTopics', 'fetchSubTopic', 'fetchSubTopicWithArticle', 'fetchSubTopicForTopic'])

  }

}
</script>

<style>

</style>
