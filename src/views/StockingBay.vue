<script setup>
import {ref, onMounted, onBeforeUnmount} from "vue";
import * as api from "../utils/api";
import Loader from "../components/Loader.vue";

const stockingbay = ref({})
const loading = ref(true)

let intervalId

function fetchStockingBay() {
    fetch(api.STOCKING_BAY_ENDPOINT)
    .then((data) => data.json())
    .then((json) => {
        stockingbay.value = json
        loading.value = false
    })

}

onMounted(() => {
    fetchStockingBay()

    intervalId = setInterval(() => {
        fetchStockingBay()
    }, 5000)
})

onBeforeUnmount(() => {
    clearInterval(intervalId)
})

</script>

<template>
<h2 class="text-4xl font-medium pb-4 mb-10">Stocking Bay</h2>

<div class="w-full flex justify-center my-10" v-if="loading">
    <Loader />
</div>

<div class="w-full grid grid-cols-3 gap-5" v-if="!loading">
    <div
        class="bg-white p-4 rounded-lg shadow-md overflow-hidden flex flex-col"
        v-for="(id) in Object.keys(stockingbay)"
    >
        <div  class="flex mx-auto w-full items-center gap-4 justify-between divide-x-2">
            <div class="flex w-1/12 justify-center">
                <span class="font-semibold">{{ id }}</span>
            </div>
            <div class="w-11/12 flex justify-center flex-1">
                <span class="font-semibold" v-if="!stockingbay[id]">{{ "Pod Empty" }}</span>
                <span class="font-semibold" v-if="stockingbay[id]">{{ stockingbay[id] }}</span>
            </div>
        </div>
    </div>
</div>


</template>