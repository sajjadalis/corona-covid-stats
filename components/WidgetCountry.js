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
            
            <h5 >{{ country.country_name }} <span class="cov-updated" :style="{ 'color': bgcolor }">{{ taken_at }}</span></h5>
            <i class="fas fa-virus cov-icon"></i>
            <div class="cov-grid">
                <div v-if="cases" class="cov-col">
                    <i class="fas fa-head-side-cough" :style="{ 'color': bgcolor }"></i>
                    <h4>{{ labelcases }}</h4>
                    <div class="cov-stats">{{ country.total_cases }} <span class="cov-new">+{{ country.new_cases }} New</span></div>
                </div>
                <div v-if="deaths" class="cov-col">
                    <i class="fas fa-head-side-virus" :style="{ 'color': bgcolor }"></i>
                    <h4>{{ labeldeaths }}</h4>
                    <div class="cov-stats">{{ country.total_deaths }} <span class="cov-new">+{{ country.new_deaths }} New</span></div>
                </div>
                <div v-if="critical" class="cov-col">
                    <i class="fas fa-lungs-virus" :style="{ 'color': bgcolor }"></i>
                    <h4>{{ labelcritical }}</h4>
                    <div class="cov-stats">{{ country.serious_critical }}</div>
                </div>
                <div v-if="recovered" class="cov-col">
                    <i class="fas fa-lungs" :style="{ 'color': bgcolor }"></i>
                    <h4>{{ labelrecovered }}</h4>
                    <div class="cov-stats">{{ country.total_recovered }}</div>
                </div>
                <div v-if="active" class="cov-col">
                    <i class="fas fa-syringe" :style="{ 'color': bgcolor }"></i>
                    <h4>{{ labelactive }}</h4>
                    <div class="cov-stats">{{ activeCases }}</div>
                </div>
                <div v-if="casesperm" class="cov-col">
                    <i class="fas fa-viruses" :style="{ 'color': bgcolor }"></i>
                    <h4>{{ labelcasesperm }}</h4>
                    <div class="cov-stats">{{ country.total_cases_per1m }}</div>
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
        countryData(country) {
            this.loading = true;
            let stat_by_country = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php';

            axios.get(stat_by_country, { 
                headers: { 'x-rapidapi-host': host, 'x-rapidapi-key': key },
                params: { 'country': country,  } 
            } )
            .then(res => {
                this.country = res.data.latest_stat_by_country[0];

                //console.log(this.country.record_date)

                this.taken_at = moment(this.country.record_date).format('MMMM Do, YYYY');
                let cases = parseInt(this.country.total_cases.replace(/,/g, ''), 10);
                let recoverd = parseInt(this.country.total_recovered.replace(/,/g, ''), 10);
                let deaths = parseInt(this.country.total_deaths.replace(/,/g, ''), 10);
                let activeCases = cases - recoverd - deaths;
                this.activeCases = this.numberWithCommas(activeCases);                

            })
            .catch(function(e) {
                console.log(e);
            })
            .finally(() => {
                this.loading = false;
            });            
        },
        
    },
    mounted() {
        this.countryData(this.country);
    }
})