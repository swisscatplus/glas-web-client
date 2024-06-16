import { createRouter, createWebHistory } from 'vue-router';
import Example from '../views/Example.vue';
import Nodes from '../views/Nodes.vue';
import StockingBay from '../views/StockingBay.vue';

const routes = [
    { path: '/', name: 'Example', component: Example },
    { path: '/nodes', name: 'Nodes', component: Nodes},
    { path: '/stockingbay', name: 'Stocking Bay', component: StockingBay},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
