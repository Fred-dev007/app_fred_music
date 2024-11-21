import { createRouter,createWebHistory } from "vue-router";
import Frysic from "./components/Frysic.vue";
import LoginView from "./components/views/auth/loginView.vue";
import Error404 from "./components/views/auth/Error404.vue";
import AlbumView from "./components/views/AlbumView.vue";


const routes =[
    {path:'/', component: LoginView },
    {path:'/login', component: LoginView },
    {path:'/home', component: Frysic},
    {path:'/album/:id', component: AlbumView },
    {path:'/:pathMatch(.*)*', component: Error404},
]

const router = createRouter({
    history:createWebHistory(),
    routes
})


export default router;