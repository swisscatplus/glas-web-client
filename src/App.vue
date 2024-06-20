<script setup>
import { TruckIcon } from '@heroicons/vue/24/outline';
import { onMounted, ref } from 'vue';
import Emergency from './components/Emergency.vue';
import NavLink from './components/NavLink.vue';
import RunOrchestrator from './components/RunOrchestrator.vue';
import { api } from './utils/api';

let orchestratorOnline = ref(false);

function fetchOrchestratorStatus(status) {
    orchestratorOnline.value = status;
}

onMounted(() => {
    api.get('/orchestrator/status').then((res) => fetchOrchestratorStatus(res.status === 204));
});
</script>

<template>
    <div class="flex h-screen p-10 text-slate-900">
        <aside class="h-full flex flex-col items-center gap-20 bg-slate-800 rounded-xl">
            <RouterLink to="/" class="pt-8">
                <img src="/images/logo-2.png" alt="swisscat-logo" class="w-40" />
            </RouterLink>

            <nav class="w-full flex flex-col gap-5 text-white/50">
                <NavLink to="/tasks" name="Tasks">
                    <TruckIcon class="w-10 h-10" />
                </NavLink>
            </nav>

            <div class="flex-grow"></div>

            <Emergency v-if="orchestratorOnline" :callback="fetchOrchestratorStatus" />
            <RunOrchestrator v-if="!orchestratorOnline" :callback="fetchOrchestratorStatus" />
        </aside>

        <main class="flex flex-col w-full px-10 h-full max-h-full overflow-y-scroll">
            <RouterView />
        </main>
    </div>
</template>
