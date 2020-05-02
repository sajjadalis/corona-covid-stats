Vue.component("country-chart", {
    template: `
    <div class="country-widget-chart">
        <div class="cov-chart" :style="{ 'width': cardwidth }">

            <div v-if="loading" class="cov-spinner">
                <div class="cov-bounce1"></div>
                <div class="cov-bounce2"></div>
                <div class="cov-bounce3"></div>
            </div>

            <div v-else-if="country" class="">
                <h3>{{ labeltitle }}</h3>
                <h5 >{{ country.country }}</h5>
                <i class="fas fa-virus cov-icon"></i>
                <ul class="chart-list">
                    <li v-if="cases" class="cases">{{ labelcases }}: {{ country.cases.toLocaleString() }} <span>+{{ country.todayCases }} New</span></li>
                    <li v-if="deaths" class="deaths">{{ labeldeaths }}: {{ country.deaths.toLocaleString() }} <span>+{{ country.todayDeaths }} New</span></li>
                    <li v-if="critical" class="critical">{{ labelcritical }}: {{ country.critical.toLocaleString() }}</li>
                    <li v-if="recovered" class="recovered">{{ labelrecovered }}: {{ country.recovered.toLocaleString() }}</li>
                    <li v-if="active" class="active-cases">{{ labelactive }}: {{ country.active.toLocaleString() }}</li>
                    <li v-if="casesperm" class="casesper1m">{{ labelcasesperm }}: {{ country.casesPerOneMillion.toLocaleString() }}</li>
                </ul>
            </div>

            <div v-else>
                <p>Error: Issue with retrieving data. Please try again in few moments</p>
            </div>
            
            <div id="canvas-holder" style="width:100%">
                <canvas id="countryChart"></canvas>
            </div>

        </div>
    </div>
    `,
    props: {
        'country': {
            type: String,
        },
        'charttype': {
            type: String,
            default: 'bar'
        },
        'bgcolor': {
            type: String,
            default: '#043785'
        },
        'cardwidth': {
            type: String,
            default: '450px'
        },
        'cases': {
            type: Boolean,
            default: 1
        },
        'deaths': {
            type: Boolean,
            default: 1
        }, 
        'recovered': {
            type: Boolean,
            default: 1
        },
        'active': {
            type: Boolean,
            default: 1
        },
        'critical': {
            type: Boolean,
            default: 1
        },
        'casesperm': {
            type: Boolean,
            default: 1
        },
        'labeltitle': {
            type: String,
            default: 'Corona (COVID-19)'
        },
        'labelcases': {
            type: String,
            default: 'Cases'
        },
        'labelcases': {
            type: String,
            default: 'Cases'
        },
        'labeldeaths': {
            type: String,
            default: 'Deaths'
        },
        'labelrecovered': {
            type: String,
            default: 'Recovered'
        },
        'labelactive': {
            type: String,
            default: 'Active Cases'
        },
        'labelcritical': {
            type: String,
            default: 'Critical'
        },
        'labelcasesperm': {
            type: String,
            default: 'Cases / 1M'
        }
    },
    data() {
        return {
            loading: true,
            country: null,
        }
    },
    methods: {
        async countryData(country) {
            this.loading = true;

            await axios.get("https://disease.sh/v2/countries/" + country)
            .then(res => {

                this.country = res.data;
                
                let chartLabel = 'Corona Stats for ' + country;
                
                let chartBg = ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(161, 196, 102, 1)', 'rgba(153, 102, 255, 1)'];
                
                let chartLabels = ['Total Cases', 'Deaths', 'Critical', 'Total Recoverd', 'Active Cases', 'Cases/1M'];
                
                let data = [this.country.cases, this.country.deaths, this.country.critical, this.country.recovered, this.country.active, this.country.casesPerOneMillion];

                let chartData = {
                    labels: chartLabels,
                    datasets: [{
                        label: chartLabel,
                        data: data,
                        backgroundColor: chartBg,
                        borderColor: "#fff",
                    }],
                };
                let chartOptions = {
                    legend: {
                        display: false
                    }
                }

                // CHART JS //
                let ctx = document.getElementById('countryChart');
                this.chart = new Chart(ctx, {
                        type: this.charttype,
                        data: chartData,
                        options: chartOptions
                });

            })
            .catch(function(e) {
                console.log(e);
            })
            .finally(() => {
                this.loading = false;
            });
        }
    },
    mounted() {
        this.countryData(this.country);
    }
})