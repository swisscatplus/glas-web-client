<script setup>
const { to, name } = defineProps(['to', 'name']);
</script>

<template>
    <RouterLink
        :to="to"
        class="w-full flex items-center gap-2 py-3 px-8 border-l-8 border-transparent hover:border-white/50"
        active-class="text-white !border-blue-500"
    >
        <slot></slot>
        <h2 class="font-medium">{{ name }}</h2>
    </RouterLink>
</template>
