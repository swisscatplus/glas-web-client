<script setup>
import {ref, onMounted, onBeforeUnmount} from "vue";
import * as api from "../utils/api";
import Online from "../components/Online.vue";
import Badge from "../components/Badge.vue";
import Loader from "../components/Loader.vue";

const nodes = ref({})

const loading = ref(true);

let intervalId

function fetchNodes() {
    fetch(api.NODES_STATUS_ENDPOINT)
        .then((data) => data.json())
        .then((json) => {
            nodes.value = json
            loading.value = false
        })
}

onMounted(() => {
    fetchNodes()
    intervalId = setInterval(() => {
        fetchNodes();
    }, 5000)
})

onBeforeUnmount(() => {
    clearInterval(intervalId)
})

</script>


<template>
    <h2 class="text-4xl font-medium pb-4 mb-10">Nodes</h2>


<div class="w-full flex justify-center my-10" v-if="loading">
    <Loader />
</div>
<div class="w-full grid grid-cols-4 gap-5" v-if="!loading">
    <div
        class="bg-white p-4 rounded-lg shadow-md overflow-hidden flex flex-col"
        v-for="node of nodes"
    >
        <div class="w-full flex justify-between items-center">
            <div class="flex gap-4">
                <Online :status="node.online" />
                <div class="flex flex-col">
                    <span class="font-semibold">{{ node.name }}</span>
                </div>
            </div>
            <Badge :status="node    .status" v-if="node.online" />
        </div>
    </div>
</div>

</template>