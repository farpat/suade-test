<template>
    <div>
        <nav>
            <ul class="nav nav-pills mb-1">
                <router-link :to="{name: 'visualize'}" class="nav-item" tag="li" v-slot="{isActive, href}">
                    <a :class="{'nav-link':true, 'active':isActive}" :href="href">Go to visualization</a>
                </router-link>

                <router-link :to="{name: 'edit'}" class="nav-item" tag="li" v-slot="{isActive, href}">
                    <a :class="{'nav-link':true, 'active':isActive}" :href="href">Go to edition</a>
                </router-link>

                <router-link :to="{name: 'map'}" class="nav-item" tag="li" v-slot="{isActive, href}">
                    <a :class="{'nav-link':true, 'active':isActive}" :href="href">Go to map</a>
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