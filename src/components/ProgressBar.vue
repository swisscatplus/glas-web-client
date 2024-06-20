<script setup>
const { total, current } = defineProps(['total', 'current']);
</script>
<template>
    <div class="flex flex-col w-60">
        <div class="w-full relative h-4 rounded overflow-hidden bg-gray-200">
            <div
                class="absolute top-0 left-0 h-full bg-emerald-600 transition-all ease-in-out duration-200"
                :style="{ width: (current / total) * 100 + '%' }"
            ></div>
        </div>
        <div class="w-full flex flex-row-reverse">
            <p class="uppercase text-black/50 font-semibold">{{ current }} / {{ total }} steps</p>
        </div>
    </div>
</template>