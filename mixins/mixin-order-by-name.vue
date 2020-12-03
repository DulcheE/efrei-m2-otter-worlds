<script>
export default {
  name: 'MixinOrderByName',

  methods: {
    /**
     * Sorts a complex array by it's string field "name"
     * @param {[]} array Array of complex objects containing a field "name"
     */
    orderByName (array) {
      return array.sort((a, b) => {
        const na = a.name.toLowerCase()
        const nb = b.name.toLowerCase()

        if (na < nb) {
          return -1
        }
        if (na > nb) {
          return 1
        }
        return 0
      })
    }
  }
}
</script>
