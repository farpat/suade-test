import ChartStore from "./Chart/store/ChartStore";
import Visualization from "./Chart/components/Visualization/Visualization";
import Edition from "./Chart/components/Edition/Edition";
import Map from "./Chart/components/Map/Map";
import Vue from "vue";
import VueRouter from "vue-router";
/**
 * Data provided by Suade
 * @typedef {Object} Person
 * @property {String}  _id
 * @property {Number}  age
 * @property {String}  eyeColor
 * @property {String}  name
 * @property {String}  gender
 * @property {Object}  location
 * @property {Number}  location.latitude
 * @property {Number}  location.longitude
 * @property {Object}  preferences
 * @property {String}  preferences.pet
 * @property {String}  preferences.fruit
 */


ChartStore.loadPeople()
    .then(() => {
        Vue.use(VueRouter);
        const routes = [
            {
                path: '/', redirect: '/visualize', name: 'home'
            },
            {
                path: '/visualize', component: Visualization, name: 'visualize'
            },
            {
                path: '/edit', component: Edition, name: 'edit'
            },
            {
                path: '/map', component: Map, name: 'map', meta: {reuse: true}
            },
        ];

        const router = new VueRouter({
            routes
        });

        new Vue({
            el: '#app',
            router
        });

        router.beforeEach((to, from, next) => {
            if (to.matched.some(record => record.meta.reuse === false)) {
                app.key = to.path
            } else {
                app.key = null
            }
            next()
        })
    })
    .catch(error => console.error(error));
