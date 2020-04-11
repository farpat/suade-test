<template>
    <div>
        <canvas id="gender-repartition-chart"></canvas>
    </div>
</template>

<script>
    import {Chart} from "chart.js";
    import ChartStore from "../../store/ChartStore";

    export default {
        methods: {
            computeRepartition(people) {
                let repartition = {men: 0, women: 0};
                for (let person of people) {
                    if (person.gender === 'male') {
                        repartition.men++;
                    } else if (person.gender === 'female') {
                        repartition.women++;
                    }
                }

                return repartition;
            },
        },
        mounted() {
            const repartition = this.computeRepartition(ChartStore.state.currentPeople);

            const defaultLegendClickHandler = Chart.defaults.doughnut.legend.onClick;
            const newLegendClickHandler = function (event, legendItem) {
                defaultLegendClickHandler.call(this, event, legendItem);

                if (legendItem.hidden === false) {
                    ChartStore.removeInCurrentFilters(legendItem.text);
                } else {
                    ChartStore.addInCurrentFilters(legendItem.text);
                }

                ChartStore.updatePeople(ChartStore.state.currentFilters);
            };

            const pieChart = new Chart(this.$el.querySelector('#gender-repartition-chart'), {
                type:    'pie',
                data:    {
                    datasets: [{
                        data:            [repartition.men, repartition.women],
                        backgroundColor: ['lightblue', 'lightcoral'],
                        label:           'Gender repartition',
                    }],
                    labels:   ['men', 'women'],
                },
                options: {
                    legend: {onClick: newLegendClickHandler}
                }
            });
        }
    }
</script>