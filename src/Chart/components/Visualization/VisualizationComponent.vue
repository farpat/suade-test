<template>
    <div class="row">
        <div class="col-md-6">
            <h2>Step 1 : Filter by gender</h2>
            <GenderRepartitionComponent/>
        </div>

        <div class="col-md-6">
            <h2>Step 2 : Watch {{ this.animalsLabel }}</h2>
            <PetRepartitionComponent/>
        </div>
    </div>
</template>

<script lang="ts">
  import GenderRepartitionComponent from "./GenderRepartitionComponent.vue"
  import PetRepartitionComponent from "./PetRepartitionComponent.vue"
  import {Component, Vue} from "vue-property-decorator"


  @Component({
    components: {PetRepartitionComponent, GenderRepartitionComponent}
  })
  export default class VisualizationComponent extends Vue {
    private get animalsLabel(): string {
      if (this.$store.state.currentFilters.men && this.$store.state.currentFilters.women) {
        return 'all pets'
      } else if (this.$store.state.currentFilters.men) {
        return 'all pets of men'
      } else if (this.$store.state.currentFilters.women) {
        return 'all pets of women'
      }

      return 'no pets'
    }
  }
</script>