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

```javascript
1.  不带参数
 
this.$router.push('/home')
this.$router.push({name:'home'})
this.$router.push({path:'/home'})
 
 
 
2. query传参 
 
this.$router.push({name:'home',query: {id:'1'}})
this.$router.push({path:'/home',query: {id:'1'}})
 
// html 取参  $route.query.id
// script 取参  this.$route.query.id
 
 
 
3. params传参
 
this.$router.push({name:'home',params: {id:'1'}})  // 只能用 name
 
// 路由配置 path: "/home/:id" 或者 path: "/home:id" ,
// 不配置path ,第一次可请求,刷新页面id会消失
// 配置path,刷新页面id会保留
 
// html 取参  $route.params.id
// script 取参  this.$route.params.id
 
 
 
4. query和params区别
query类似 get, 跳转之后页面 url后面会拼接参数,类似?id=1, 非重要性的可以这样传, 密码之类还是用params刷新页面id还在
 
params类似 post, 跳转之后页面 url后面不会拼接参数 , 但是刷新页面id 会消失
```

