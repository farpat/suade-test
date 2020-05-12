<template>
    <div>
        <canvas id="gender-repartition-chart"></canvas>
    </div>
</template>

<script lang="ts">
  import {Chart} from "chart.js"
  import {Component, Vue, Watch} from "vue-property-decorator"
  import {IDataChart, IGenderRepartition, IPerson} from "../../../type"

  @Component
  export default class GenderRepartition extends Vue {
    private $genderRepartitionChart?: Chart

    private computeRepartition(people: IPerson[]): IGenderRepartition {
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

    private getDataForChartJs(repartition: IGenderRepartition): IDataChart {
      return {
        labels: ['men', 'women'],
        datasets: [{
          data: [repartition.men, repartition.women],
          backgroundColor: ['lightblue', 'lightcoral'],
          label: 'Gender Repartition'
        }]
      }
    }

    @Watch('$store.state.currentPeople')
    private onCurrentPeopleChanged(): void {
      if (this.$genderRepartitionChart) {
        this.$genderRepartitionChart.data = this.getDataForChartJs(this.computeRepartition(this.$store.state.currentPeople))
        this.$genderRepartitionChart.update()
      }
    }

    private mounted(): void {
      const defaultLegendClickHandler = Chart.defaults.doughnut.legend.onClick
      const self = this
      const newLegendClickHandler = function (this, event, legendItem) {
        defaultLegendClickHandler.call(this, event, legendItem) //this references newLegendClickHandler

        if (self.$store.getters.isTheFilterActivated(legendItem.text)) {
          self.$store.commit('removeFilter', legendItem.text)
        } else {
          self.$store.commit('addFilter', legendItem.text)
        }

        self.$store.commit('applyFilter', self.$store.state.currentFilters)
      }


      this.$genderRepartitionChart = new Chart(<HTMLCanvasElement>this.$el.querySelector('#gender-repartition-chart'), {
        type: 'pie',
        data: this.getDataForChartJs(this.computeRepartition(this.$store.state.currentPeople)),
        options: {
          legend: {onClick: newLegendClickHandler}
        }
      })
    }
  }
</script>