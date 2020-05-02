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
            <div class="cov-grid">
                <div>
                    <h3 :style="{ 'color': textcolor }">{{ labelcases }}</h3>
                    <h2 :style="{ 'color': textcolor }">{{ global.cases.toLocaleString() }}</h2>
                    <p v-if="percentageSinceYesterday" :style="{ 'color': textcolor }">+{{ percentageSinceYesterday.cases.toFixed(2) }}% since Yesterday</p>
                </div>
                <div>
                    <h3 :style="{ 'color': textcolor }">{{ labeldeaths }}</h3>
                    <h2 :style="{ 'color': textcolor }">{{ global.deaths.toLocaleString() }}</h2>
                    <p v-if="percentageSinceYesterday" :style="{ 'color': textcolor }">+{{ percentageSinceYesterday.deaths.toFixed(2) }}% since Yesterday</p>
                </div>
                <div>
                    <h3 :style="{ 'color': textcolor }">{{ labelrecovered }}</h3>
                    <h2 :style="{ 'color': textcolor }">{{ global.recovered.toLocaleString() }}</h2>
                    <p v-if="percentageSinceYesterday" :style="{ 'color': textcolor }">+{{ percentageSinceYesterday.recovered.toFixed(2) }}% since Yesterday</p>
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
            percentageSinceYesterday: null
        }
    },
    methods: {
        async globalData() {  

            await axios.get("https://disease.sh/v2/all")
            .then(res => {

                this.global = res.data;

                // Yesterdays Response
                axios.get("https://disease.sh/v2/all?yesterday=true")
                .then(res => {
                    
                    let todayRecovered = this.global.recovered - res.data.recovered;

                    this.percentageSinceYesterday = {}
                    this.percentageSinceYesterday.cases = this.global.todayCases * 100 / this.global.cases;
                    this.percentageSinceYesterday.deaths = this.global.todayDeaths * 100 / this.global.deaths;
                    this.percentageSinceYesterday.recovered = todayRecovered * 100 / this.global.recovered;

                })
                .catch(error => {
                    console.log(error);
                })
                
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