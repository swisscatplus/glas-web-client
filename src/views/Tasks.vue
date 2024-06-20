<script setup>
import { onMounted, ref } from 'vue';
import { api } from '../utils/api';
import Task from '../components/Task.vue';

const UPDATE_INTERVAL = 500;
const TERMINATION_TIMEOUT = 1000;

const runningTasks = ref({});

const addActiveTask = (task) => {
    runningTasks.value[task.uuid] = {
        workflow: task.workflow,
        activeStep: task.current_step,
    };
};

const removeActiveTask = (uuid) => {
    delete runningTasks.value[uuid];
};

const taskIsActive = (uuid) => {
    return uuid in runningTasks.value;
};

function updateTask(task) {
    if (taskIsActive(task.uuid)) {
        runningTasks.value[task.uuid].activeStep = task.current_step;
    } else {
        addActiveTask(task);
    }
}

function terminateTask(uuid) {
    runningTasks.value[uuid].activeStep = runningTasks.value[uuid].workflow.steps.length;

    setTimeout(() => {
        removeActiveTask(uuid);
    }, TERMINATION_TIMEOUT);
}

function fetchRunning() {
    runningTasks.value = {};

    api.get('/task/running').then((res) => {
        res.data.forEach((task) => {
            addPendingTask(task);
        });
    });
}

function fetchTasks() {
    api.get('/task/running').then((res) => {
        res.data.forEach((task) => {
            updateTask(task);
        });

        const remoteTasks = res.data.map((t) => t.uuid);
        const finishedTasks = Object.keys(runningTasks.value).filter(
            (uuid) => !remoteTasks.includes(uuid),
        );

        for (const uuid of finishedTasks) {
            terminateTask(uuid);
        }
    });
}

onMounted(() => {
    fetchRunning();

    setInterval(() => {
        fetchTasks();
    }, UPDATE_INTERVAL);
});
</script>

<template>
    <div class="w-full flex gap-5 items-center mb-10">
        <h2 class="text-4xl font-medium">Tasks</h2>
        <div class="text-2xl font-medium bg-emerald-600/25 px-4 py-1 rounded-lg text-emerald-600">
            {{ Object.keys(runningTasks).length }}
        </div>
    </div>

    <div class="w-full mx-auto grid grid-cols-2 gap-10 mb-24">
        <Task
            v-for="data in runningTasks"
            :key="data.workflow.id"
            :workflow="data.workflow"
            :activeStep="data.activeStep"
            :active="true"
        />
    </div>
</template>