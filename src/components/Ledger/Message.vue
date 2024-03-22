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
    width: 80%;
    height: 40px;
    background-color: rgb(51, 51, 51);
    backdrop-filter: blur(1px);
    position: absolute;
    left: 50%;
    top: 110%;
    transform: translate(-50%, -50%);
    color: white;
    padding: 2px 10px;
    border-radius: 5px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    box-shadow: 5px 5px 3px rgb(183, 183, 183);
}

.init {
    animation: to_top .1s linear forwards;
}

@keyframes to_top {
    0% {
        top: 110%;
    }
    100% {
        top: 50%;
    }
}
</style>