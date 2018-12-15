<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
      chartdata: Array,
      options: Object
  },
  mounted () {
    console.log(this.chartdata);
    this.renderChart(
      {
      // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          // data: [40, 39, 10, 40, 39, 80, 40]
          data: [
            {
              x: '2018-12-11',
              y: 5
            },
            {
              x: '2018-12-15',
              y: 1
            },
            {
              x: '2018-12-17',
              y: 10
            },
            {
              x: '2018-12-18',
              y: 15
            }
          ]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false}
    )
  }
}
</script>

<style>
</style>