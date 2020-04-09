// user 模块路由

const UserRoute = {
  path: "/user",
  name: "User",
  component: () => import("@/views/user/index.vue"),
}

export default UserRoute