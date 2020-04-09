<template>
  <div>
    <h1>这是user页面</h1>

    <button class="bd0" @click="goIndex">跳转至首页</button>
  </div>
</template>


<script>
export default {
  methods: {
    goIndex() {
      this.$router.push('/')
    }
  }
}
</script>