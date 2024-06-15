import { createRouter, createWebHistory } from 'vue-router';
import Example from '../views/Example.vue';
import Nodes from '../views/Nodes.vue';

const routes = [
    { path: '/', name: 'Example', component: Example },
    { path: '/nodes', name: 'Nodes', component: Nodes},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
