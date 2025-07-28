import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/view/Map/MapView.vue"),
    name: "mapView",
  },
  {
    path: "/floodData",
    component: () => import("@/view/dataView/FloodData.vue"),
    name: "floodData",
  },
];
const router = createRouter({
 history: createWebHashHistory(),
  routes
});

export default router;
