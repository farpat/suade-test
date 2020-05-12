<template>
    <div>
        <nav>
            <ul class="nav nav-pills mb-1">
                <router-link tag="li" :to="{name: 'visualize'}" v-slot="{isActive, href}" class="nav-item">
                    <a :href="href" :class="{'nav-link':true, 'active':isActive}">Go to visualization</a>
                </router-link>

                <router-link tag="li" :to="{name: 'edit'}" v-slot="{isActive, href}" class="nav-item">
                    <a :href="href" :class="{'nav-link':true, 'active':isActive}">Go to edition</a>
                </router-link>

                <router-link tag="li" :to="{name: 'map'}" v-slot="{isActive, href}" class="nav-item">
                    <a :href="href" :class="{'nav-link':true, 'active':isActive}">Go to map</a>
                </router-link>
            </ul>
        </nav>

        <router-view></router-view>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator"

    @Component
    export default class ApplicationComponent extends Vue {
        private mounted() {
            this.$store.dispatch('loadApplication')
        }
    }
</script>