Vue.component("global-widget", {
    template: `
    <div class="global-widget">

        <div v-if="loading" class="cov-spinner">
            <div class="cov-bounce1"></div>
            <div class="cov-bounce2"></div>
            <div class="cov-bounce3"></div>
        </div>

        <div v-else-if="global" class="cov-card" :style="{ 'width': cardwidth, 'background-color': bgcolor, 'box-shadow': '0 0 30px 0' + bgcolor + 80  }">
            <h3>{{ labeltitle }}</h3>
            <h5>{{ labelglobal }} <span class="cov-updated" :style="{ 'color': bgcolor }">{{ global.date }}</span></h5>
            <i class="fas fa-virus cov-icon"></i>
            <div class="cov-grid">
                <div v-if="cases" class="cov-col">
                    <i class="fas fa-head-side-cough" :style="{ 'color': bgcolor }"></i>
                    <h4>{{ labelcases }}</h4>
                    <div class="cov-stats">{{ global.cases.toLocaleString() }} <span class="cov-new">+{{ global.cases_new.toLocaleString() }} New</span></div>
                </div>
                <div v-if="deaths" class="cov-col">
                    <i class="fas fa-head-side-virus" :style="{ 'color': bgcolor }"></i>
                    <h4>{{ labeldeaths }}</h4>
                    <div class="cov-stats">{{ global.deaths.toLocaleString() }} <span class="cov-new">+{{ global.deaths_new.toLocaleString() }} New</span></div>
                </div>
                <div v-if="recovered" class="cov-col">
                    <i class="fas fa-lungs" :style="{ 'color': bgcolor }"></i>
                    <h4>{{ labelrecovered }}</h4>
                    <div class="cov-stats">{{ global.recovered.toLocaleString() }}</div>
                </div>
                <div v-if="active" class="cov-col">
                    <i class="fas fa-lungs" :style="{ 'color': bgcolor }"></i>
                    <h4>{{ labelactive }}</h4>
                    <div class="cov-stats">{{ global.active.toLocaleString() }}</div>
                </div>
            </div>
        </div>

        <div v-else>
            <p>Error: Issue with retrieving data. Please try again in few moments</p>
        </div>
    </div>
    `,
    props: {
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
            default: true
        },
        'labeltitle': {
            type: String,
            default: 'Corona (COVID-19)'
        },
        'labelglobal': {
            type: String,
            default: 'Global Stats'
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
            global: null,
        }
    },
    methods: {
        async globalData() { 

            await axios.get("https://pomber.github.io/covid19/timeseries.json")
            .then(res => {

                // Define yesterday global data in order to get new cases and deaths
                let yesterday = []
                for (let [key, value] of Object.entries(res.data)) {
                    yesterday.push(value[value.length - 2]);
                }
                
                let yesterday_cases = yesterday.reduce((a, {confirmed}) => a + confirmed, 0);
                let yesterday_deaths = yesterday.reduce((a, {deaths}) => a + deaths, 0);

                // Define latest global data
                let global = [];

                for (let [key, value] of Object.entries(res.data)) {
                    global.push(value[value.length - 1]);
                }
                
                let date = moment( global[global.length - 1].date, "YYYY-M-DD" ).format('MMMM Do, YYYY');
                let cases = global.reduce((a, {confirmed}) => a + confirmed, 0);
                let deaths = global.reduce((a, {deaths}) => a + deaths, 0);
                let recovered = global.reduce((a, {recovered}) => a + recovered, 0);
                let active = cases - deaths - recovered;
                let cases_new = cases - yesterday_cases;
                let deaths_new = deaths - yesterday_deaths;

                this.global = {
                    date: date,
                    cases: cases,
                    cases_new: cases_new,
                    deaths: deaths,
                    deaths_new: deaths_new,
                    recovered: recovered,
                    active: active
                }
                
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                this.loading = false;
            });
        }
    },
    mounted() {
        this.globalData();
    }
})