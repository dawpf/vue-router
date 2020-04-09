<template>
  <div>
    <h1>news222222222页面</h1>
    <button class="bd0" @click="goUser">跳转至user页面</button>
  </div>
</template>


<script>
export default {
  methods: {
    goUser() {
      this.$router.push('/user')
    }
  }
}
</script>