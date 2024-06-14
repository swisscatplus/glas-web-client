<script setup>
import { STOP_ENDPOINT } from '../utils/api';

const { callback } = defineProps(['callback']);

function emergencyStop() {
    fetch(STOP_ENDPOINT, { method: 'DELETE' })
        .then((data) => {
            callback(!(data.status == 204)); // inverse the condition to indicate that the orchestrato is stopped
        })
        .catch((e) => console.log(e));
}
</script>

<template>
    <div class="w-full p-4">
        <div
            class="w-full py-5 gap-5 flex flex-col items-center bg-red-600 rounded-xl text-white hover:cursor-pointer hover:animate-wiggle"
            @click="emergencyStop"
        >
            <h2 class="capitalize text-2xl font-medium text-center">Panic button</h2>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-20 h-20"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                />
            </svg>
        </div>
    </div>
</template>
