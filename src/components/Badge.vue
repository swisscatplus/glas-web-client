<script setup>
const { status } = defineProps(['status']);
</script>

<template>
    <span
        class="h-6 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full"
        :class="{
            'bg-blue-100 text-blue-800': status === 'IN_USE',
            'bg-green-100 text-green-800': status === 'AVAILABLE',
            'bg-red-100 text-red-800': status === 'ERROR',
        }"
        >{{ status }}</span
    >
</template>