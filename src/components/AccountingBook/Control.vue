<script setup>
import {defineEmits, ref} from 'vue'

let cur_status = ref('');
</script>
<template>
    <div class="control">
        <div class="select">
            <div class="current">正序&nbsp;<span class="iconfont icon-xia"></span></div>
            <div class="sels">
                <div>正序</div>
                <div>倒序</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .control {
        width: 100%;
        height: 21px;
        background-color: rgb(228, 228, 228);
        display: flex;
        justify-content: flex-end;
        padding: 0 8px;
        box-sizing: border-box;
    }

    .select {
        display: inline-block;
        height: 18px;
        font-size: 12px;
        padding: 0 3px;
        box-sizing: border-box;
        cursor: pointer;
        color: rgb(129, 129, 129);
        position: relative;
    }

    .select .current {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: none;
    }

    .select:hover .sels {
        display: block;
    }

    .select .current:hover {
        color: rgb(10, 10, 10);
    }

    .select .current >span {
        font-size: 10px;
    }

    .select .sels {
        display: none;
        width: 100%;
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 100;
    }

    .select .sels >div {
        width: 100%;
        border-bottom: solid 1px rgb(220, 238, 254);
        box-sizing: border-box;
        text-align: center;
    }

    .select .sels >div:hover {
        background-color: rgb(220, 238, 254);
    }
</style>