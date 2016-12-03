import Vue from 'vue/dist/vue.js';
import routes from './routes';
import VueRouter from 'vue-router/dist/vue-router';
Vue.use(VueRouter);
var router = new VueRouter({
    routes
});
export default router;