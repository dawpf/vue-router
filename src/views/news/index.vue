<template>
  <div>
    <h1>news页面</h1>

    <div class="flex">
      <button class="bd0" @click="goNews1">news1</button>
      <button class="bd0 ml15" @click="goNews2">news2</button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$route.query)
  },
  methods: {
    goNews1() {
      this.$router.push('/news')
    },
    goNews2() {
      this.$router.push('/news/news2')
    }
  }
}
</script>


