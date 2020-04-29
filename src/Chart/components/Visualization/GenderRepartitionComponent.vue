<template>
    <div>
        <canvas id="gender-repartition-chart"></canvas>
    </div>
</template>

<script lang="ts">
    import {Chart} from "chart.js"
    import ChartStore, {Person} from "../../store/ChartStore"
    import {Component, Vue} from "vue-property-decorator"

    @Component
    export default class GenderRepartition extends Vue {
        state = ChartStore.state

        private computeRepartition(people: Person[]): { men: number; women: number } {
            let repartition = {men: 0, women: 0}
            for (let person of people) {
                if (person.gender === 'male') {
                    repartition.men++
                } else if (person.gender === 'female') {
                    repartition.women++
                }
            }

            return repartition
        }

        private mounted() {
            const repartition = this.computeRepartition(this.state.currentPeople)

            const defaultLegendClickHandler = Chart.defaults.doughnut.legend.onClick
            const newLegendClickHandler = function (this: { onClick: (event: any, legendItem: any) => void }, event, legendItem) {
                defaultLegendClickHandler.call(this, event, legendItem)

                if (legendItem.hidden === false) {
                    ChartStore.removeInCurrentFilters(legendItem.text)
                } else {
                    ChartStore.addInCurrentFilters(legendItem.text)
                }

                ChartStore.updatePeople(ChartStore.state.currentFilters)
            }

            new Chart(<HTMLCanvasElement>this.$el.querySelector('#gender-repartition-chart'), {
                type: 'pie',
                data: {
                    datasets: [{
                        data: [repartition.men, repartition.women],
                        backgroundColor: ['lightblue', 'lightcoral'],
                        label: 'Gender repartition'
                    }],
                    labels: ['men', 'women']
                },
                options: {
                    legend: {onClick: newLegendClickHandler}
                }
            })
        }
    }
</script>