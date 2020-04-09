## vue路由管理

### 项目结构

![](/Users/macadmin/Desktop/vue路由管理/项目结构.png)

### 路由配置

src / router / index.js 文件

```javascript
import Vue from "vue";
import VueRouter from "vue-router";

// 引入 News 和 User 两个模块
import News from "./modules/news"
import User from "./modules/user"

Vue.use(VueRouter);

const routes = [
// 配置路由，以下路由页面为平行关系
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/aaa",
    name: "Aaa",
    component: () => import("@/views/aaa/index.vue")
  },
  ...等,
// 模块化开发，路由中可能包含嵌套路由
  News, User
];

const router = new VueRouter({
  mode: "history", // 路由模式 history
  base: process.env.BASE_URL, // vue.config.js 配置基础地址
  routes
});

export default router;
```

### 模块化及嵌套路由

router / modules / news.js 文件

```javascript
// news 模块路由
const NewsRoute = {    // 注意：返回的格式是一个对象，不是一个数组！！
  path: "/news",
  name: "News",
  component: () => import("@/views/news/index.vue"),
  children: [
    {
      path: "", // 进入news页面是默认首先显示此组件
      component: () => import("@/views/news/components/news1.vue"),
    },
    {
      path: "news2",
      component: () => import("@/views/news/components/news2.vue"),
    }
  ]
}

export default NewsRoute
```

### 路由跳转

home 页面：

```html
<template>
  <div class="home">
    <h1>home页面</h1>
    <div>
      <button class="bd0" @click="goNews">news</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  methods: {
    goNews() {
      // 跳转到news页面
      this.$router.push('/news')
    }
  }
}
</script>
```

news 页面：

```html
<template>
  <div>
    <h1>news页面</h1>

    <div class="flex">
      <button class="bd0" @click="goNews1">news1</button>
      <button class="bd0 ml15" @click="goNews2">news2</button>
    </div>
		
    // 用来存放嵌套路由，如：点击 news2 按钮，此处就会显示 news2 组件的内容
    <router-view></router-view>   
  </div>
</template>

<script>
export default {
  methods: {
    goNews1() {
      // 因为 news1 是news模块展示的时候默认显示的内容，所以跳转到 news 页面即可
      // 可以设置 news1 不是默认，path:"news1" 则 this.$router.push('/news1')
      this.$router.push('/news')
    },
    goNews2() {
      this.$router.push('/news/news2')
    }
  }
}
</script>
```

