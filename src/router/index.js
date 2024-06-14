import { createRouter, createWebHistory } from 'vue-router';
import Example from '../views/Example.vue';

const routes = [
    { path: '/', name: 'Example', component: Example },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
