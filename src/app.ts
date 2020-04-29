import ChartStore from "./Chart/store/ChartStore"
import Vue from "vue"
import VueRouter from "vue-router"
import VisualizationComponent from "./Chart/components/Visualization/VisualizationComponent.vue"
import MapComponent from "./Chart/components/Map/MapComponent.vue"
import EditionComponent from "./Chart/components/Edition/EditionComponent.vue"
import ApplicationComponent from "./Chart/components/ApplicationComponent.vue"


ChartStore.loadPeople()
    .then(() => {
        Vue.use(VueRouter)

        const routes = [
            {path: '/', redirect: '/visualize', name: 'home'},
            {path: '/visualize', component: VisualizationComponent, name: 'visualize'},
            {path: '/edit', component: EditionComponent, name: 'edit'},
            {path: '/map', component: MapComponent, name: 'map', meta: {reuse: true}}
        ]

        const router = new VueRouter({routes})

        new Vue({
            el: '#app',
            router,
            render: createElement => createElement(ApplicationComponent)
        })
    })
    .catch(error => console.error(error))
