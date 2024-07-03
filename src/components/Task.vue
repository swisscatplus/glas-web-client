<script setup>
import ProgressBar from './ProgressBar.vue';
import { XMarkIcon, ForwardIcon, ArrowPathIcon } from '@heroicons/vue/16/solid';
import { api } from '../utils/api';
import { ref } from 'vue';

let { workflow, activeStep, status, uuid } = defineProps(['workflow', 'activeStep', 'status', 'uuid']);

const continuing = ref(false);

function continueTask(id) {
    continuing.value = true;
    api.patch(`/task/continue/${id}`).then((res) => {
        continuing.value = false;
    });
}
</script>

<template>
    <div class="flex rounded-xl shadow-lg bg-white overflow-hidden">
        <div class="w-1/3 h-full bg-slate-800 text-white p-8 flex flex-col gap-3">
            <div class="uppercase font-semibold text-white/50">workflow</div>
            <div class="font-bold text-3xl">{{ workflow.name }}</div>
            <div class="flex-grow"></div>
            <div v-if="status == 'ERROR' && !continuing" class="w-full rounded-lg flex items-center justify-center font-bold bg-red-500 h-12 gap-2 cursor-pointer hover:scale-105 transition duration-100" @click="continueTask(uuid)">
                Continue
                <ForwardIcon class="w-6 h-6" />
            </div>
            <div v-if="continuing" class="w-full rounded-lg flex items-center justify-center font-bold bg-red-500 h-12 cursor-progress">Continuing</div>
        </div>
        <div class="w-2/3 h-full p-8 flex flex-col gap-4">
            <div class="flex justify-between">
                <div class="uppercase font-semibold text-black/50">steps</div>
                <ProgressBar :total="workflow.steps.length" :current="activeStep" />
            </div>

            <ol class="grid grid-cols-3 gap-4 items-center w-full">
                <li
                    v-for="(step, i) in workflow.steps"
                    class="flex items-center space-x-2 p-2 rounded-lg transition-all duration-150 ease-in-out"
                    :class="{
                        'text-violet-500 bg-violet-100': activeStep == i && workflow.steps[activeStep].status == 'RESTARTING',
                        'text-red-500 bg-red-100': activeStep == i && workflow.steps[activeStep].status == 'ERROR',
                        'text-emerald-600 bg-emerald-100': activeStep > i,
                        'text-blue-600 bg-blue-100': activeStep == i,
                        'text-gray-400 bg-gray-100': activeStep < i,
                    }"
                >
                    <span
                        v-if="activeStep >= i"
                        class="flex items-center justify-center w-8 h-8 border rounded-full shrink-0"
                        :class="{
                            'border-emerald-600': activeStep > i,
                        }"
                    >
                        <svg
                            v-if="activeStep == i && status != 'ERROR'"
                            class="animate-spin h-8 w-8 text-blue-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                            ></circle>
                            <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        <XMarkIcon v-if="activeStep == i && workflow.steps[activeStep].status == 'ERROR'" />
                        <ArrowPathIcon v-if="activeStep == i && workflow.steps[activeStep].status == 'RESTARTING'" />
                        <span v-if="activeStep != i">{{ i + 1 }}</span>
                    </span>
                    <span
                        v-else
                        class="flex items-center justify-center w-8 h-8 border rounded-full shrink-0 border-gray-400 border-dashed"
                    >
                        {{ i + 1 }}
                    </span>
                    <span>
                        <h3 class="font-semibold leading-tight">{{ step.name }}</h3>
                    </span>
                </li>
            </ol>
        </div>
    </div>
</template>