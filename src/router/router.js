import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/view/Map/MapView.vue"),
    name: "mapView",
  },
];
const router = createRouter({
 history: createWebHashHistory(),
  routes
});

export default router;
