<script setup>
import * as api from "../utils/api";

console.log("Write the page code here...");

fetch(api.WORKFLOWS_ENDPOINT)
.then((data) => data.json())
.then((json) => {
    console.log(json)
})

</script>

<template>
    <div class="w-full flex justify-between items-center mb-10">
        <h2 class="text-4xl font-medium">Example page</h2>
    </div>
</template>