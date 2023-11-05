import {createRouter, createWebHistory} from 'vue-router'
import PatientLogin from '@/views/Login/PatientLogin.vue'
import DoctorLogin from '@/views/Login/DoctorLogin.vue'
import ClinicLogin from '@/views/Login/ClinicLogin.vue'

const routes = [
    {
        path: '/',
        name: 'PatientLogin',
        component : PatientLogin
    },

    {
        path: '/DoctorLogin',
        name: 'DoctorLogin',
        component : DoctorLogin
    },

    {
        path: '/ClinicLogin',
        name: 'ClinicLogin',
        component : ClinicLogin
    }
]

const router = createRouter(
    {
        history: createWebHistory(),
        routes
    }
)

export default router