import { getHomeHotSuggests, getCategories, getHouseList } from "@/services";
import { defineStore } from "pinia";

const useHomeStore = defineStore("home", {
    state: () => ({
        hotSuggests: [],
        categories: [],
        houseList: []
    }),
    actions: {
        async fetchHotSuggestData() {
            const res = await getHomeHotSuggests()
            this.hotSuggests = res.data
        },
        async fetchCategoriesData() {
            const res = await getCategories()
            this.categories = res.data
        },
        async fetchHouseListData() {
            const res = await getHouseList()
            this.houseList = res.data
        }
    }
})

export default useHomeStore