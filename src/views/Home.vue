<script>
export default {
  name: 'HomePage',
  mounted () {
    if (!this.checkCookieExists()) {
      this.$router.push('/login')
    }
  },
  methods: {
    checkCookieExists () {
      // Check if the cookie exists
      // Return true if the cookie exists, false otherwise
      return document.cookie.includes('jwt')
    }
  }
}
</script>

<template>
  Home
</template>

<style scoped>

</style>
