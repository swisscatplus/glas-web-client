import { createRouter, createWebHistory } from 'vue-router';
import Tasks from '../views/Tasks.vue';
import Home from '../views/Home.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/tasks', name: 'Tasks', component: Tasks },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
