<template>
  <div>
    <!--<v-list v-for="user in users" :key="user.id">
      <h1>{{ user }}</h1>
    </v-list>
    <h1>{{ logged }}</h1> -->
    <v-list v-for="universe in universes" :key="universe.id">
      <h1>{{ universe }}</h1>
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
    logged () {
      return this.getLogged()
    },
    users () {
      return this.getUsers()
    },
    universes () {
      return this.getUniverses()
    }
  },
  async mounted () {
    /* await this.login({ username: 'Eddy', password: 'edypaswor' })
    await this.fetchAllUsers()
    await this.fetchUniverseOwn()
    await this.fetchUniversePlay() */
    await this.fetchUniverse(1)
  },
  methods: {
    ...mapActions('login', ['login', 'fetchUniverseOwn', 'fetchUniversePlay']),
    ...mapActions('user', ['fetchAllUsers', 'addUser', 'putUser', 'deleteUser']),
    ...mapActions('universe', ['fetchAllUniverses', 'fetchUniverse', 'addUniverse', 'putUniverse', 'deleteUniverse'])

  }

}
</script>

<style>

</style>
