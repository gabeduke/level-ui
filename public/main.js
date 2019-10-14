var app = new Vue({
    el: '#app',
    data: {
        level: null,
        image: 'https://water.weather.gov/resources/hydrographs/rmdv2_hg.png',
    },
    methods: {
        loadData() {
            axios
            .get('https://level-6y4rumxsfq-uc.a.run.app/api/v1/level')
            .then(response => (this.level = response.data.reading))
        }
    },
    mounted () {
        this.loadData();
    }
})