<template>
  <div>
    <v-list v-for="user in users" :key="user.id">
      <h1>{{ user }}</h1>
    </v-list>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('user', ['getUsers']),
    users () {
      return this.getUsers()
    }
  },
  async mounted () {
    await this.fetchAllUsers()
  },
  methods: {
    ...mapActions('user', ['fetchAllUsers'])

  }

}
</script>

<style>

</style>
