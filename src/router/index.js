import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue'
import Asn from '../views/Asn.vue'
import About from '../views/About.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'IP Lookup', subtitle: 'Welcome to IP Lookup' },
  },
  {
    path: '/asn',
    name: 'ASN',
    component: Asn,
    meta: { title: 'ASN Lookup', subtitle: 'Advanced ASN Lookup' },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: 'About Lookup', subtitle: 'Learn more about Lookup' }
  },
  {
    path: '/contact',
    name: 'Contact',
    meta: { title: 'Contact US', subtitle: 'Get in touch with us' },
    component: () => import(/* webpackChunkName: "route-contact" */ '../views/Contact.vue')
  },
  {
    path: '/documentation',
    name: 'Docs',
    meta: { title: 'Documentation', subtitle: 'Explore the documentation' },
    component: () => import(/* webpackChunkName: "route-contact" */ '../views/Docs.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title || '默认标题'
  const subtitle = to.meta.subtitle || ''
  document.title = subtitle ? `${title} - ${subtitle}` : title
  next()
})

export default router
