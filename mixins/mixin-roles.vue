<script>
export default {
  name: 'MixinRoles',

  data: () => ({
    roles: [
      { name: 'Game Master' },
      { name: 'sub-Game Master' },
      { name: 'Player' }
    ]
  }),

  methods: {
    /**
     * Returns all the role's names
     */
    getRolesNames () {
      return this.roles.map(r => r.name)
    },

    /**
     * Returns all the role's names can add
     */
    getRolesNamesCanAdd (role) {
      // We get the index of the role
      const index = this.roles.findIndex(r => r.name === role.name)

      // We return the role's names the role can add, if any
      return (index >= 0) ? this.roles.slice(index, this.roles.lengthà).map(r => r.name) : []
    }
  }
}
</script>
