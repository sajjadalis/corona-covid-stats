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
                <h5 >{{ country.country_name }} <span class="cov-updated" style="background-color: #333; color: #fff;">{{ taken_at }}</span></h5>
                <i class="fas fa-virus cov-icon"></i>
                <ul class="chart-list">
                    <li v-if="cases" class="cases">{{ labelcases }}: {{ country.total_cases }} <span>+{{ country.new_cases }} New</span></li>
                    <li v-if="deaths" class="deaths">{{ labeldeaths }}: {{ country.total_deaths }} <span>+{{ country.new_deaths }} New</span></li>
                    <li v-if="critical" class="critical">{{ labelcritical }}: {{ country.serious_critical }}</li>
                    <li v-if="recovered" class="recovered">{{ labelrecovered }}: {{ country.total_recovered }}</li>
                    <li v-if="active" class="active-cases">{{ labelactive }}: {{ activeCases }}</li>
                    <li v-if="casesperm" class="casesper1m">{{ labelcasesperm }}: {{ country.total_cases_per1m }}</li>
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
        'critical': {
            type: Boolean,
            default: 1
        },
        'active': {
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
        'labelcritical': {
            type: String,
            default: 'Critical'
        },
        'labelactive': {
            type: String,
            default: 'Active Cases'
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
            activeCases: null,
            taken_at: ''
        }
    },
    methods: {
        numberWithCommas(n) {
            return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        countryDataChart(country) {
            this.loading = true;

            let stat_by_country = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php';

            axios.get(stat_by_country, { 
                headers: { 'x-rapidapi-host': host, 'x-rapidapi-key': key },
                params: { 'country': country,  } 
            } )
            .then(res => {
                this.country = res.data.latest_stat_by_country[0];

                console.log(this.country.record_date)

                this.taken_at = moment(this.country.record_date).format('MMMM Do, YYYY');
                let cases = parseInt(this.country.total_cases.replace(/,/g, ''), 10);
                let recoverd = parseInt(this.country.total_recovered.replace(/,/g, ''), 10);
                let deaths = parseInt(this.country.total_deaths.replace(/,/g, ''), 10);
                let activeCases = cases - recoverd - deaths;
                this.activeCases = this.numberWithCommas(activeCases);
                let critical = parseInt(this.country.serious_critical.replace(/,/g, ''), 10);
                let caseper1m = parseInt(this.country.total_cases_per1m.replace(/,/g, ''), 10);
                
                let chartLabel = 'Corona Stats for ' + this.country.country_name;
                
                let chartBg = ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(161, 196, 102, 1)', 'rgba(153, 102, 255, 1)'];
                
                let chartLabels = ['Total Cases', 'Deaths', 'Critical', 'Total Recoverd', 'Active Cases', 'Cases/1M'];
                
                let data = [cases, deaths, critical, recoverd, activeCases, caseper1m];

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
                let chart = new Chart(ctx, {
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
        this.countryDataChart(this.country);
    }
})