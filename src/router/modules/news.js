// news 模块路由

const NewsRoute = {
  path: "/news",
  name: "News",
  component: () => import("@/views/news/index.vue"),
  children: [
    {
      path: "",
      component: () => import("@/views/news/components/news1.vue"),
    },
    {
      path: "news2",
      component: () => import("@/views/news/components/news2.vue"),
    }
  ]
}


export default NewsRoute