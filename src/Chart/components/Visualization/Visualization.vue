<template>
    <div class="row">
        <div class="col-md-6">
            <h2>Step 1 : Filter by gender</h2>
            <GenderRepartition></GenderRepartition>
        </div>

        <div class="col-md-6">
            <h2>Step 2 : Watch {{ this.getAnimalsLabel }}</h2>
            <PetRepartition></PetRepartition>
        </div>
    </div>
</template>

<script>
    import ChartStore from "../../store/ChartStore";
    import GenderRepartition from "./GenderRepartition";
    import PetRepartition from "./PetRepartition";


    /**
     * @property {Person[]} people
     */
    export default {
        components: {PetRepartition, GenderRepartition},
        data() {
            return {
                state: ChartStore.state,
            }
        },
        computed:   {
            getAnimalsLabel() {
                if (this.state.currentFilters.men && this.state.currentFilters.women) {
                    return 'all pets';
                } else if (this.state.currentFilters.men) {
                    return 'all pets of men';
                } else if (this.state.currentFilters.women) {
                    return 'all pets of women';
                }

                return 'no pets';
            },
        },
    }
</script>