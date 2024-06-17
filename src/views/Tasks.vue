<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted, ref } from 'vue';
import * as api from '../utils/api';
import Task from '../components/Task.vue';

const UPDATE_INTERVAL = 500;
const TERMINATION_TIMEOUT = 1000;

const pendingTasks = ref({});
const runningTasks = ref({});

const addPendingTask = (task) => {
    pendingTasks.value[task.uuid] = {
        workflow: task.workflow,
        activeStep: task.current_step,
    };
};

const addActiveTask = (task) => {
    runningTasks.value[task.uuid] = {
        workflow: task.workflow,
        activeStep: task.current_step,
    };
};

const removePendingTask = (uuid) => {
    delete pendingTasks.value[uuid];
};

const removeActiveTask = (uuid) => {
    delete runningTasks.value[uuid];
};

const taskIsPending = (uuid) => {
    return uuid in pendingTasks.value;
};

const taskIsActive = (uuid) => {
    return uuid in runningTasks.value;
};

const taskExists = (uuid) => {
    return taskIsPending(uuid) || taskIsActive(uuid);
};

function updateTask(task) {
    if (taskIsPending(task.uuid) && task.state == "ACTIVE") {
        removePendingTask(task.uuid);
        addActiveTask(task);
    } else if (taskIsActive(task.uuid)) {
        runningTasks.value[task.uuid].activeStep = task.current_step;
    }
}

function terminateTask(uuid) {
    runningTasks.value[uuid].activeStep = runningTasks.value[uuid].workflow.steps.length;

    setTimeout(() => {
        removeActiveTask(uuid);
    }, TERMINATION_TIMEOUT);
}

function fetchRunning() {
    pendingTasks.value = {};
    runningTasks.value = {};

    fetch(api.TASKS_RUNNING)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((task) => {
                if (task.state === 1) {
                    addPendingTask(task);
                } else if (task.state === 2) {
                    addActiveTask(task);
                }
            });
        });
}

function fetchTasks() {
    fetch(api.TASKS_RUNNING)
        .then((res) => res.json())
        .then((tasks) => {
            tasks.forEach((task) => {
                if (taskExists(task.uuid)) {
                    updateTask(task);
                } else {
                    addPendingTask(task);
                }
            });

            const currentTasks = Object.keys(runningTasks.value).concat(
                Object.keys(pendingTasks.value),
            );
            const remoteTasks = tasks.map((t) => t.uuid);
            const finishedTasks = currentTasks.filter((uuid) => !remoteTasks.includes(uuid));

            for (const uuid of finishedTasks) {
                if (taskIsActive(uuid)) {
                    terminateTask(uuid);
                } else {
                    removePendingTask(uuid);
                }
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
    <div class="w-full flex justify-between items-center mb-10">
        <h2 class="text-4xl font-medium">Tasks</h2>
    </div>

    <div class="mb-10">
        <div class="flex items-center gap-5 mb-10">
            <h2 class="text-3xl font-medium">Running</h2>
            <div
                class="text-2xl font-medium bg-emerald-600/25 px-4 py-1 rounded-lg text-emerald-600"
            >
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
    </div>

    <div>
        <div class="flex items-center gap-10 mb-10">
            <h2 class="text-3xl font-medium">Pending</h2>
            <div class="text-2xl font-medium bg-slate-600/25 px-4 py-1 rounded-lg text-slate-600">
                {{ Object.keys(pendingTasks).length }}
            </div>
        </div>
        <div class="w-full mx-auto grid grid-cols-2 gap-10 mb-24">
            <Task
                v-for="data in pendingTasks"
                :key="data.workflow.id"
                :workflow="data.workflow"
                :activeStep="data.activeStep"
                :active="false"
            />
        </div>
    </div>
</template>