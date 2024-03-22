import { createRouter, createWebHistory } from "vue-router";
import Ledger from '@cs/Ledger/Ledger.vue';
import BillDetailed from '@cs/AccountingBook/BillDetailed.vue';

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
        path : '/bill_detailed',
        name : 'bill_detailed',
        component : BillDetailed
    }
];

const router = createRouter({
    history : createWebHistory(),
    routes
});

export default router;