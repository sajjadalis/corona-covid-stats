Vue.component("global-wide", {
    template: `
    <div class="global-wide">

        <div v-if="loading" class="cov-spinner">
            <div class="cov-bounce1"></div>
            <div class="cov-bounce2"></div>
            <div class="cov-bounce3"></div>
        </div>

        <div v-else-if="global" class="cov-global-wide cov-numbers cov-center" :style="{ 'background-color': bgcolor  }">
            <div class="cov-date" :style="{ 'background-color': textcolor, 'color': bgcolor }">{{ global.date }}</div>
            <div class="cov-grid-wide">
                <div>
                    <h3 :style="{ 'color': textcolor }">{{ labelcases }}</h3>
                    <h2 :style="{ 'color': textcolor }">{{ global.cases.toLocaleString() }}</h2>
                    <p :style="{ 'color': textcolor }">+{{ casesPercentageSinceYesterday.toFixed(2) }}% since Yesterday</p>
                    <p :style="{ 'color': textcolor }">+{{ casesPercentageSince3DaysAgo.toFixed(2) }}% since 3 days ago</p>
                </div>
                <div>
                    <h3 :style="{ 'color': textcolor }">{{ labeldeaths }}</h3>
                    <h2 :style="{ 'color': textcolor }">{{ global.deaths.toLocaleString() }}</h2>
                    <p :style="{ 'color': textcolor }">+{{ deathsPercentageSinceYesterday.toFixed(2) }}% since Yesterday</p>
                    <p :style="{ 'color': textcolor }">+{{ deathsPercentageSince3DaysAgo.toFixed(2) }}% since 3 days ago</p>
                </div>
                <div>
                    <h3 :style="{ 'color': textcolor }">{{ labelrecovered }}</h3>
                    <h2 :style="{ 'color': textcolor }">{{ global.recovered.toLocaleString() }}</h2>
                    <p :style="{ 'color': textcolor }">+{{ recoveredPercentageSinceYesterday.toFixed(2) }}% since Yesterday</p>
                    <p :style="{ 'color': textcolor }">+{{ recoveredPercentageSince3DaysAgo.toFixed(2) }}% since 3 days ago</p>
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
        'textcolor': {
            type: String,
            default: '#ffffff'
        },
        'cases': {
            type: Boolean,
            default: true
        },
        'deaths': {
            type: Boolean,
            default: true
        }, 
        'recovered': {
            type: Boolean,
            default: true
        },
        'labelcases': {
            type: String,
            default: 'Confirmed Cases'
        },
        'labeldeaths': {
            type: String,
            default: 'Confirmed Deaths'
        },
        'labelrecovered': {
            type: String,
            default: 'Total Recovered'
        }
    },
    data() {
        return {
            loading: true,
            global: null,
            casesPercentageSinceYesterday: null,
            deathsPercentageSinceYesterday: null,
            recoveredPercentageSinceYesterday: null,
            casesPercentageSince3DaysAgo: null,
            deathsPercentageSince3DaysAgo: null,
            recoveredPercentageSince3DaysAgo: null,
        }
    },
    methods: {
        async globalData() {  

            await axios.get("https://pomber.github.io/covid19/timeseries.json")
            .then(res => {

                // Define yesterday global data in order to get new cases, new deaths & precentage
                let yesterday = [];
                for (let [key, value] of Object.entries(res.data)) {
                    yesterday.push(value[value.length - 2]);
                }
                
                let yesterday_cases = yesterday.reduce((a, {confirmed}) => a + confirmed, 0);
                let yesterday_deaths = yesterday.reduce((a, {deaths}) => a + deaths, 0);
                let yesterday_recovered = yesterday.reduce((a, {recovered}) => a + recovered, 0);

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
                let recovered_new = recovered - yesterday_recovered;

                this.global = {
                    date: date,
                    cases: cases,
                    cases_new: cases_new,
                    deaths: deaths,
                    deaths_new: deaths_new,
                    recovered: recovered,
                    active: active
                }

                this.casesPercentageSinceYesterday = cases_new * 100 / cases;
                this.deathsPercentageSinceYesterday = deaths_new * 100 / deaths;
                this.recoveredPercentageSinceYesterday = recovered_new * 100 / recovered;

                                // Define 3 days ago global data in order to get precentage
                let threeDaysAgo = [];

                for (let [key, value] of Object.entries(res.data)) {
                    threeDaysAgo.push(value[value.length - 4]);
                }

                let threeDaysAgo_cases = threeDaysAgo.reduce((a, {confirmed}) => a + confirmed, 0);
                let threeDaysAgo_deaths = threeDaysAgo.reduce((a, {deaths}) => a + deaths, 0);
                let threeDaysAgo_recovered = threeDaysAgo.reduce((a, {recovered}) => a + recovered, 0);

                let casesNewSince3DaysAgo = cases - threeDaysAgo_cases;
                let deathsNewSince3DaysAgo = deaths - threeDaysAgo_deaths;
                let recoveredNewSince3DaysAgo = recovered - threeDaysAgo_recovered;

                this.casesPercentageSince3DaysAgo = casesNewSince3DaysAgo * 100 / cases;
                this.deathsPercentageSince3DaysAgo = deathsNewSince3DaysAgo * 100 / deaths;
                this.recoveredPercentageSince3DaysAgo = recoveredNewSince3DaysAgo * 100 / recovered;

                
                
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