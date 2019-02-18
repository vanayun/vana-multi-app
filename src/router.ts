import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/todo',
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('./views/TodoView.vue'),
    },
    {
      path: '/cropper',
      name: 'cropper',
      component: () => import('./views/CropperView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
