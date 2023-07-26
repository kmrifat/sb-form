import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '',
        component: () => import('../views/FormView')
    },
    {
        name: "edit-form",
        path: "/edit-form/:id",
        component: () => import('../views/EditFormView')
    },
    {
        path: '/data-table',
        component: () => import('../views/TableView'),
        name: 'dataTable',
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes
})

export default router
