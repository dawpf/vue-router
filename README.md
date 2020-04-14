# Vue-router

### 准备
```
npm install

npm run serve
npm run build
```

### 项目结构

```markdown
-assets
-components
-router
	|-modules
		|-news.js
		|-user.js
	|-index.js
-store
-views
	|-news
		|-components
			|-news1.vue
			|-news2.vue
		|-index.vue
	|-user
		|-index.vue
	|-Home.vue
	|-app.less
	|-app.vue
	|-main.js
	
...
```

### 路由配置

src / router / index.js 文件

路由由上往下依次进行匹配知道找到相匹配的路径，当所有路径都不匹配的时候，重定向到 404页面

```javascript
import Vue from "vue";
import VueRouter from "vue-router";

// 引入 News 和 User 两个模块
import News from "./modules/news"
import User from "./modules/user"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import("@/404.vue")
  },
  
  News, User,
  
  {
    path: '*',  // 输入的路径在routes里面没有匹配到的时候，重定向到404页面
    redirect: '/404'
  }
];

const router = new VueRouter({
  mode: "history", // 路由模式 history
  base: process.env.BASE_URL, // vue.config.js 配置基础地址
  routes
});

// 添加导航守卫 --  to:准备要进入的路由对象，from:即将离开的路由对象，next()
// 例如:可以在路由跳转之前判断用户是否登录，没有登陆的话重定向到 login页面
// router.beforeEach((to, from, next) => {
//   // ...
// })

export default router;
```

### 模块化及嵌套路由

router / modules / news.js 文件

```javascript
// news 模块路由
const NewsRoute = {    // 注意：返回的格式是一个对象，不是一个数组！！
  path: "/news",
  // name: "News",  // 因为news路径下有默认加载的模块 news1 ，所以此处的name属性省去
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

home 页面跳转到 news页面：

**注意**：官方文档有备注，使用this.$router.push( { path:'/news' , params:{id:123} } )时，params不生效，需要把prams替换为query，导航栏路径里面会显示参数信息

或者使用 this.$router.push( { name:'路由配置的name' , params:{id:123} } ) 这种形式来进行传递参数

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
      this.$router.push({
        path: '/news',
        query: {
          id: 123
        }
      })
    }
  }
}
</script>
```

news 页面：

news 页面使用 this.$route.query 或 this.$route.params 来接收上一个页面传递下来的参数

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
  created() {
    console.log(this.$route.query)  // 打印出来为 { id:123 }
  },
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

