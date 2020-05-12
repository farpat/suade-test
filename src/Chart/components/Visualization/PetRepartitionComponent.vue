<template>
    <div>
        <canvas id="pet-repartition-chart"></canvas>
    </div>
</template>

<script lang="ts">
    import {Chart} from "chart.js"
    import {Component, Vue, Watch} from "vue-property-decorator"
    import {IDataChart, IPerson} from "../../../type"

    @Component
    export default class PetRepartition extends Vue {
        private mounted(): void {
            const repartition = this.getData(this.$store.state.currentPeople)

            window.petRepartitionChart = new Chart(<HTMLCanvasElement>this.$el.querySelector('#pet-repartition-chart'), {
                type: 'bar',
                data: this.getDataForChartJs(repartition),
                options: {
                    legend: {display: false},
                    scales: {yAxes: [{ticks: {beginAtZero: true}}]}
                }
            })
        }

        @Watch('$store.state.currentPeople')
        private onCurrentPeopleChanged(): void {
            if (window.petRepartitionChart) {
                const repartition = this.getData(this.$store.state.currentPeople)
                window.petRepartitionChart.data = this.getDataForChartJs(repartition)
                window.petRepartitionChart.update()
            }
        }

        private getData(people: IPerson[]): Object {
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

        private getDataForChartJs(people: Object): IDataChart {
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