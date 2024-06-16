<style scoped>

.selected {
    background-color: rgb(229 229 229);
}

</style>

<script setup>
import {ref, onMounted, onBeforeUnmount} from "vue";
import * as api from "../utils/api";
import Loader from "../components/Loader.vue";

const stockingbay = ref({})
const loading = ref(true)
const selected = ref({})

let intervalId

function fetchStockingBay() {
    fetch(api.STOCKING_BAY_ENDPOINT)
    .then((data) => data.json())
    .then((json) => {
        stockingbay.value = json
        loading.value = false
    })

}

function clearSelected() {
    const cards = document.querySelectorAll('.card')
    cards.forEach((_d) => _d.classList.remove("selected"))
    selected.value = {}
}

function selectPod(id, e) {

    clearSelected()
    e.target.closest(".card").classList.add("selected")
    if(id === null) {
        selected.value = {}
        return
    }

    fetch(api.TASK_ENDPOINT + "/" + id[0])
    .then((data) => data.json())
    .then((json) => {
        selected.value = json
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

<div class="flex-1 flex">

    <div class="w-1/6 border-r-4 border-slate-500 pr-10">
        <div
                v-if="Object.keys(selected).length === 0"
                class="w-full h-full flex justify-center items-center text-2xl text-center"
            >
                Select an element to retrieve information
        </div>
        <div
            v-if="Object.keys(selected).length === 1"
            class="w-full h-full flex justify-center items-center text-2xl text-center"
        >
            Waiting data...
        </div>
        <div v-if="Object.keys(selected).length > 1" class="flex flex-col">
            <h3 class="text-xl">
                <span class="font-bold">Workflow</span>: {{ selected.workflow['name'] }}
            </h3>
            <h3 class="text-xl">
                <span class="font-bold">Method</span>: {{ selected.task.args.method }}
            </h3>
            <h3 class="text-xl">
                <span class="font-bold">Solvant</span>: {{ selected.task.args.solvant }}
            </h3>
            <h3 class="text-xl">
                <span class="font-bold">Dilution</span>: {{ selected.task.args.dilution }}
            </h3>
            <h3 class="text-xl">
                <span class="font-bold">Filled wells</span>: {{ Object.keys(selected.task.args.plate).length }}
            </h3>
        </div>
    </div>

    <div class="w-5/6 flex justify-center items-center ml-2">
        <div class="w-full flex justify-center my-10" v-if="loading">
            <Loader />
        </div>
        
        <div class="w-full grid grid-cols-3 gap-5" v-if="!loading">
            <div
                class="card bg-white p-4 rounded-lg shadow-md overflow-hidden flex flex-col hover:bg-neutral-400 hover:cursor-pointer"
                v-for="(id) in Object.keys(stockingbay)"
                v-on:click="selectPod(stockingbay[id], $event)"
            >
                <div  class="flex mx-auto w-full items-center gap-4 justify-between divide-x-2 divide-inherit">
                    <div class="flex w-1/12 justify-center">
                        <span class="font-semibold">{{ id }}</span>
                    </div>
                    <div class="w-11/12 flex justify-center flex-1">
                        <span class="font-semibold" v-if="!stockingbay[id]">{{ "-" }}</span>
                        <span class="font-semibold" v-if="stockingbay[id]">{{ stockingbay[id][0] }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>



</template>