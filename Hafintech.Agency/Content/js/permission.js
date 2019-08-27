var menu = new Vue({
    el: '#sidebar',
    data: {
        data: {
            loadLocCd: ""
        },
        isShowAccountManager: false,
        isBusinessInfo: false,
        isSetSecureCode: false,
        isVNACCS: false,
        isPersonalSearch: false,
        isListAccRegistry: false,
        isReviewRegistry: false,
        isListRegNumber: false,
    },
    methods: {
        loadPermission: async function () {
            try {
                //debugger;
                var token = window.localStorage.getItem("token");
                const response = await axios.get(Config.API_Login + "Permission/get?application=agency",
                    {
                        headers: { "Authorization": "Bearer " + token }
                    });
                var res = response.data.Data;
                this.isSetSecureCode = res.some(p => p.includes("agency:personal:security"));
                this.isBusinessInfo = res.some(p => p.includes("agency:business:search"));
                this.isVNACCS = res.some(p => p.includes("updateVNACCS"));
                this.isPersonalSearch = res.some(p => p.includes("agency:personal:search"));

                this.isListAccRegistry = res.some(p => p.includes("agency:business:search"));
                this.isReviewRegistry = res.some(p => p.includes("signature:update"));
                this.isListRegNumber = res.some(p => p.includes("signature:getList"));

            } catch (error) {
                console.error(error);
            }
        },

    },
    mounted() {
        this.loadPermission();
    },
    computed: {
        // a computed getter

    },
    watch: {

    }
});