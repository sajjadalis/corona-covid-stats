Vue.component("country-widget", {
    template: `
    <div class="country-widget">
        <div v-if="loading" class="cov-spinner">
            <div class="cov-bounce1"></div>
            <div class="cov-bounce2"></div>
            <div class="cov-bounce3"></div>
        </div>

        <div v-else-if="country" class="cov-card" :style="{ 'width': cardwidth, 'background-color': bgcolor, 'box-shadow': '0 0 30px 0' + bgcolor + 80  }">
                              
            <h3>{{ labeltitle }}</h3>
            
            <h5 >{{ country.name }} <span class="cov-updated" :style="{ 'color': bgcolor }">{{country.date}}</span></h5>
            <i class="fas fa-virus cov-icon"></i>
            <div class="cov-grid">
                <div v-if="cases" class="cov-col">
                    <i class="fas fa-head-side-cough" :style="{ 'color': bgcolor }"></i>
                    <h4>{{ labelcases }}</h4>
                    <div class="cov-stats">{{ country.cases.toLocaleString() }} <span class="cov-new">+{{ country.cases_new.toLocaleString() }} New</span></div>
                </div>
                <div v-if="deaths" class="cov-col">
                    <i class="fas fa-head-side-virus" :style="{ 'color': bgcolor }"></i>
                    <h4>{{ labeldeaths }}</h4>
                    <div class="cov-stats">{{ country.deaths.toLocaleString() }} <span class="cov-new">+{{ country.deaths_new.toLocaleString() }} New</span></div>
                </div>
                <div v-if="recovered" class="cov-col">
                    <i class="fas fa-lungs" :style="{ 'color': bgcolor }"></i>
                    <h4>{{ labelrecovered }}</h4>
                    <div class="cov-stats">{{ country.recovered.toLocaleString() }}</div>
                </div>
                <div v-if="active" class="cov-col">
                    <i class="fas fa-syringe" :style="{ 'color': bgcolor }"></i>
                    <h4>{{ labelactive }}</h4>
                    <div class="cov-stats">{{ country.active.toLocaleString() }}</div>
                </div>
            </div>
            
        </div>

        <div v-else>
            <p>Error: Issue with retrieving data. Please try again in few moments</p>
        </div>
    </div>
    `,
    props: {
        'country': {
            type: String,
            default: 'USA'
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

            await axios.get("https://pomber.github.io/covid19/timeseries.json")
            .then(res => {

                let latest = res.data[country][res.data[country].length - 1]
                let yesterday = res.data[country][res.data[country].length - 2];              

                this.country = {
                    name: country,
                    date: moment(latest.date, "YYYY-M-DD").format('MMMM Do, YYYY'),
                    cases: latest.confirmed,
                    deaths: latest.deaths,
                    recovered: latest.recovered,
                    active: latest.confirmed - latest.deaths - latest.recovered,
                    cases_new: latest.confirmed - yesterday.confirmed,
                    deaths_new : latest.deaths - yesterday.deaths
                }

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