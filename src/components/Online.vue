<script setup>
const { status } = defineProps(['status']);
</script>

<template>
    <div class="flex gap-3 items-center">
        <!-- <h3 class="-mt-1 font-semibold text-slate-500">online</h3> -->
        <span class="relative flex h-4 w-4">
            <span
                v-if="!status"
                class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-red-600"
            ></span>
            <span
                class="relative inline-flex rounded-full h-4 w-4"
                :class="{
                    'bg-emerald-600': status,
                    'bg-red-600': !status,
                }"
            ></span>
        </span>
    </div>
</template>