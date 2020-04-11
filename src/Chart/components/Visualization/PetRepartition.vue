<template>
    <div>
        <canvas id="pet-repartition-chart"></canvas>
    </div>
</template>

<script>
    import {Chart} from "chart.js";
    import ChartStore from "../../store/ChartStore";

    /**
     * @property {Chart} $barChart
     */
    export default {
        data() {
            return {
                state: ChartStore.state
            }
        },
        methods: {
            getData(people) {
                let repartition = {};

                for (let person of people) {
                    const petKey = person.preferences.pet;
                    if (repartition[petKey] === undefined) {
                        repartition[petKey] = 0
                    }
                    repartition[petKey]++;
                }

                return repartition;
            },
            getDataForChartJs(people) {
                const keys = Object.keys(people);
                keys.sort();

                return {
                    labels:   keys,
                    datasets: [{
                        data:            keys.map(key => people[key]),
                        backgroundColor: ['lightblue', 'lightcoral', 'lightgreen', 'lightgray'],
                    }],
                };
            }
        },
        watch:   {
            state: {
                handler: function (value) {
                    const repartition = this.getData(value.currentPeople);

                    window.petReparitionChart.data = this.getDataForChartJs(repartition);
                    window.petReparitionChart.update();
                },
                deep:    true
            }
        },
        mounted() {
            const repartition = this.getData(this.state.currentPeople);

            window.petReparitionChart = new Chart(this.$el.querySelector('#pet-repartition-chart'), {
                type:    'bar',
                data:    this.getDataForChartJs(repartition),
                options: {
                    legend: {display: false},
                    scales: {
                        yAxes: [{ticks: {beginAtZero: true}}]
                    }
                }
            });
        }
    }
</script>