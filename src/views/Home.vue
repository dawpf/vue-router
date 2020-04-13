<template>
  <div class="home">
    <h1>home页面</h1>
    <div>
      <button class="bd0" @click="goNews">news</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
  methods: {
    goNews() {
      // 跳转到news页面
      this.$router.push({
        path: '/news',
        query: {
          id: 111111
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>

