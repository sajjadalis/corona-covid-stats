Vue.component('table-view', {
    template: `
    <div class="table-view">
        <div v-if="loading" class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
        <div v-else-if="tabledata.length > 0">
            <div>
                <input class="cov-input" type="text" v-model="search" placeholder="Filter Data by Country Name">
                </div>
            <Vue-Tabulator id="countriesData" v-model="filteredCountries" :options="options" />
        </div>
        <div v-else>
            <h2>Error</h2>
            <p>We're having issues with retrieving data. Please try again in few moments</p>
        </div>
    </div>
    `,
    data() {
        return {
            loading: false,
            tabledata: [],
            countries: {},
            search: '',
            options: {
                layout:"fitColumns",
                movableColumns: true,
                tooltips: true,
                tooltipsHeader: true,
                pagination:"local",
                height: '100%',
                paginationSize:15,
                paginationSizeSelector:[10, 15, 25, 50, 'All'],
                columnMinWidth: '100',
                initialSort : [
                    { column: "confirmed", dir: "desc" }
                ],
                columns: [
                    {title:"Country", field:"country"},
                    {title:"Cases", field:"confirmed", sorter:"number", formatter:"money", formatterParams:{precision:false}},
                    {title:"New Cases", field:"cases_new", sorter:"number", formatter:"money", formatterParams:{precision:false}},
                    {title:"Deaths", field:"deaths", sorter:"number", formatter:"money", formatterParams:{precision:false}},
                    {title:"New Deaths", field:"deaths_new", sorter:"number", formatter:"money", formatterParams:{precision:false}},
                    {title:"Total Recovered", field:"recovered", sorter:"number", formatter:"money", formatterParams:{precision:false}},
                    {title:"Active Cases", field:"active_cases", sorter:"number", formatter:"money", formatterParams:{precision:false}}
                ]
            }
        }
    },
    mounted() {
        this.countriesTable();
    },
    methods: {
        async countriesTable() {

            this.loading = true;

            await axios.get("https://pomber.github.io/covid19/timeseries.json")
            .then(res => {

                let yesterday = []
                for (let [key, value] of Object.entries(res.data)) {
                    yesterday.push(value[value.length - 2]);
                }
                
                let yesterday_cases = yesterday.reduce((a, {confirmed}) => a + confirmed, 0);
                let yesterday_deaths = yesterday.reduce((a, {deaths}) => a + deaths, 0);

                for (let [key, value] of Object.entries(res.data)) {
                    this.tabledata.push(
                        {
                            country:key,
                            cases_new: value[value.length - 1].confirmed - value[value.length - 2].confirmed,
                            deaths_new: value[value.length - 1].deaths - value[value.length - 2].deaths,
                            active_cases: value[value.length - 1].confirmed - value[value.length - 1].deaths - value[value.length - 1].recovered,
                            ...value[value.length - 1]
                        }
                    );
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
    computed: {
        filteredCountries() {
            return this.tabledata.filter((country) => {
                return country.country.toLowerCase().match(this.search.toLowerCase())
            })
        }
    }
})

// Table Instance
new Vue({
    el: '#table-app',
});