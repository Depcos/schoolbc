import { createWebHistory, createRouter } from "vue-router";

import frontPageComponent from "@/components/frontPage/frontPageComponent";
//import CategorySelectComponent from "@/components/admin/CategorySelectComponent";
import adminPageComponent from "@/components/admin/adminPageComponent";
const routes = [
    {
        path: "/",
        name: "Home",
        component: frontPageComponent,
    },
    {
        path: "/admin",
        name: "Admin",
        component: adminPageComponent,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;