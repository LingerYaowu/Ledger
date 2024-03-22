import { createRouter, createWebHistory } from "vue-router";
import Ledger from '@cs/Ledger/Ledger.vue';
import Accounting from '@cs/AccountingBook/Accounting.vue';

const routes = [
    {
        path : '/',
        redirect : '/home'
    },
    {
        path : '/home',
        name : 'home',
        component : Ledger
    },
    {
        path : '/Accounting',
        name : 'Accounting',
        component : BillDetailed
    }
];

const router = createRouter({
    history : createWebHistory(),
    routes
});

export default router;