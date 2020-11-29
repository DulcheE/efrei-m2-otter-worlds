<template>
  <div>
    <!--<v-list v-for="user in users" :key="user.id">
      <h1>{{ user }}</h1>
    </v-list> -->
    <h1>{{ logged }}</h1>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('login', ['getLogged']),
    ...mapGetters('user', ['getUsers']),
    logged () {
      return this.getLogged()
    },
    users () {
      return this.getUsers()
    }
  },
  async mounted () {
    await this.login({ username: 'Eddy', password: 'edypaswor' })
    await this.fetchAllUsers()
    await this.fetchUniverseOwn()
    await this.fetchUniversePlay()
  },
  methods: {
    ...mapActions('login', ['login', 'fetchUniverseOwn', 'fetchUniversePlay']),
    ...mapActions('user', ['fetchAllUsers'])

  }

}
</script>

<style>

</style>
