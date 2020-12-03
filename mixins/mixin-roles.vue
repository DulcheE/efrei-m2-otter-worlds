<script>
export default {
  name: 'MixinRoles',

  data: () => ({
    roles: [
      { name: 'Game Master' },
      { name: 'Player' }
    ]
  }),

  methods: {
    getRolesNames () {
      return this.roles.map(r => r.name)
    }
  }
}
</script>
