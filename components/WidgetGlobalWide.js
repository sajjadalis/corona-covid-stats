Vue.component("global-wide", {
    template: `
    <div class="global-wide">

        <div v-if="loading" class="cov-spinner">
            <div class="cov-bounce1"></div>
            <div class="cov-bounce2"></div>
            <div class="cov-bounce3"></div>
        </div>

        <div v-else-if="global" class="cov-global-wide cov-numbers cov-center" :style="{ 'background-color': bgcolor  }">
            <div class="cov-date" :style="{ 'background-color': textcolor, 'color': bgcolor }">{{ taken_at }}</div>
            <div class="cov-grid">
                <div>
                    <h3 :style="{ 'color': textcolor }">{{ labelcases }}</h3>
                    <h2 :style="{ 'color': textcolor }">{{ global.total_cases }}</h2>
                </div>
                <div>
                    <h3 :style="{ 'color': textcolor }">{{ labeldeaths }}</h3>
                    <h2 :style="{ 'color': textcolor }">{{ global.total_deaths }}</h2>
                </div>
                <div>
                    <h3 :style="{ 'color': textcolor }">{{ labelrecovered }}</h3>
                    <h2 :style="{ 'color': textcolor }">{{ global.total_recovered }}</h2>
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
            taken_at: ''
        }
    },
    methods: {
        globalData() {
            let worldstat = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php';

            axios.get(worldstat, 
            { headers: { 'x-rapidapi-host': host, 'x-rapidapi-key': key }  } )
            .then(res => {
                this.global = res.data;
                this.taken_at = moment(this.global.statistic_taken_at).format('MMMM Do, YYYY');
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
        this.globalData();
    }
})