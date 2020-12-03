<script>
export default {
  name: 'MixinRules',

  data: () => ({
    rules: {
      required: value => !!value || 'Required',
      maxSmall: value => (value !== null && value !== undefined && value.length <= 50) || 'Max 50 characters',
      maxBig: value => (value !== null && value !== undefined && value.length <= 65535) || 'Max 65535 characters',
      ascii: value => (value !== null && value !== undefined && value.split('').every(v => v.charCodeAt(0) >= 32 && v.charCodeAt(0) <= 255)) || 'Contains invalid character'
    }
  })
}
</script>
