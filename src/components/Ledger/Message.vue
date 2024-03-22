<script setup>
import { defineProps } from 'vue';
const messages = defineProps({
    message : {
        type : String,
        default : '默认消息~'
    },
});
</script>
<template>
    <div class="message_outside">
        <span>{{ message }}</span>
    </div>
</template>
<style scoped>
.message_outside {
    position: absolute;
    left: 50%;
    top: 50%;
    opacity: 0;
    z-index: -1;
    transform: translate(-50%, -50%);
    padding: 6px 13px;
    background-color: rgba(0, 0, 0, .5);
    border-radius: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: rgb(255, 255, 255);
}

.init {
    animation: to_opacity .2s linear forwards;
}

@keyframes to_opacity {
    0% {
        opacity: 0;
        z-index: -1;
    }
    100% {
        opacity: 1;
        z-index: 100;
    }
}
</style>