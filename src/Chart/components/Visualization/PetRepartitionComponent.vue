<template>
    <div>
        <canvas id="pet-repartition-chart"></canvas>
    </div>
</template>

<script lang="ts">
    import {Chart} from "chart.js"
    import ChartStore, {Person} from "../../store/ChartStore"
    import {Component, Vue, Watch} from "vue-property-decorator"

    declare global {
        interface Window {
            petRepartitionChart: Chart
        }
    }

    @Component
    export default class PetRepartition extends Vue {
        state = ChartStore.state

        private mounted() {
            const repartition = this.getData(this.state.currentPeople)

            window.petRepartitionChart = new Chart(<HTMLCanvasElement>this.$el.querySelector('#pet-repartition-chart'), {
                type: 'bar',
                data: this.getDataForChartJs(repartition),
                options: {
                    legend: {display: false},
                    scales: {yAxes: [{ticks: {beginAtZero: true}}]}
                }
            })
        }

        @Watch('state', {deep: true})
        private onStateChanged(value: { currentPeople: Person[] }) {
            const repartition = this.getData(value.currentPeople)

            window.petRepartitionChart.data = this.getDataForChartJs(repartition)
            window.petRepartitionChart.update()
        }

        private getData(people: Person[]): Object {
            let repartition = {}

            for (let person of people) {
                const petKey = person.preferences.pet
                if (repartition[petKey] === undefined) {
                    repartition[petKey] = 0
                }
                repartition[petKey]++
            }

            return repartition
        }

        private getDataForChartJs(people: Object) {
            const keys = Object.keys(people)
            keys.sort()

            return {
                labels: keys,
                datasets: [{
                    data: keys.map(key => people[key]),
                    backgroundColor: ['lightblue', 'lightcoral', 'lightgreen', 'lightgray']
                }]
            }
        }
    }
</script>