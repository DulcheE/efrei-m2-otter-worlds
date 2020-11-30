<template>
  <div>
    <!--<v-list v-for="user in users" :key="user.id">
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
    <v-list v-for="character in characters" :key="character.id">
      <h5>{{ character }}</h5>
    </v-list>
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
    ...mapGetters('character', ['getCharacters', 'getCharacterByid', 'getCharacter']),
    logged () {
      return this.getLogged()
    },
    users () {
      return this.getUsers()
    },
    universes () {
      return this.getUniverses()
    },
    templateCategories () {
      return this.getTemplateCategories()
    },
    templateStats () {
      return this.getTemplateStats()
    },
    characters () {
      return this.getCharacters()
    }
  },
  async mounted () {
    /* await this.login({ username: 'Eddy', password: 'edypaswor' })
    await this.fetchAllUsers()
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
    await this.fetchCharactersForUser(2)
    await this.putCharacter({ character: { name: 'le juif', backstory: 'il est juif et ca craint mais genre vraiment beaucoup', bIsDeead: false, bIsSheetCompleted: false, idUser: 2, idUniverse: 2 }, id: 7 })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('yay')
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
  },
  methods: {
    ...mapActions('login', ['login', 'fetchUniverseOwn', 'fetchUniversePlay']),
    ...mapActions('user', ['fetchAllUsers', 'addUser', 'putUser', 'deleteUser']),
    ...mapActions('universe', ['fetchAllUniverses', 'fetchUniverse', 'addUniverse', 'putUniverse', 'deleteUniverse']),
    ...mapActions('templateCategories', ['fetchAllTemplateCategories', 'fetchTemplateCategory', 'fetchForUniverse', 'addTemplateCategory', 'putTemplateCategory', 'deleteTemplateCategory']),
    ...mapActions('templateStat', ['fetchAllTemplateStats', 'fetchTemplateStat', 'fetchForCategory', 'addTemplateStat', 'putTemplateStat', 'deleteTemplateStat']),
    ...mapActions('character', ['fetchAllCharacters', 'fetchCharacter', 'fetchCharactersForUniverse', 'fetchCharactersForUser', 'addCharacter', 'putCharacter', 'deleteCharacter'])
  }

}
</script>

<style>

</style>
