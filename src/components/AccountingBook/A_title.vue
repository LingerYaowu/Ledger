<script setup>
import {useRouter} from 'vue-router'
const router = useRouter();
</script>
<template>
    <div class="at_outside">
        <div @click="router.go(-1)">
            <span class="iconfont icon-zuohua"></span>
        </div>
        <div>账单</div>
        <div>⋮</div>
    </div>
</template>
<style scoped>
    .at_outside {
        width: 100%;
        height: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        color: rgb(220, 220, 220);
        display: flex;
        justify-content: space-between;
    }

    .at_outside div:nth-child(1) {
        cursor: pointer;
        font-size: 15px;
    }

    .at_outside div:nth-child(1):hover,
    .at_outside div:nth-child(3):hover {
        color: white;
        text-shadow: 0 0 1px white;
    }

    .at_outside div:nth-child(3) {
        font-size: 19px;
        cursor: pointer;
    }
</style>