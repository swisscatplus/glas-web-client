import { createRouter, createWebHistory } from 'vue-router';
import Example from '../views/Example.vue';
import Nodes from '../views/Nodes.vue';
import StockingBay from '../views/StockingBay.vue';
import Tasks from '../views/Tasks.vue';

const routes = [
    { path: '/', name: 'Example', component: Example },
    { path: '/nodes', name: 'Nodes', component: Nodes},
    { path: '/stockingbay', name: 'Stocking Bay', component: StockingBay},
    { path: '/tasks', name: "Tasks", component: Tasks}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
