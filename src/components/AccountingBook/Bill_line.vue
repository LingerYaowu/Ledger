<script setup>
import {defineProps} from 'vue'

const bill = defineProps(['billline']);
</script>
<template>
    <div :class="{bill_line:true,reverse:billline.direction}">
        <div class="line"></div>
        <div class="data">
            <p v-for="item in billline.bill_info" :key="item.id">
                <span class="time">{{item.date.split(' ')[1]}}</span>
                <span class="title" :title="item.title">{{ item.title }}</span>
                <span :class="{money:true, income:item.income}">￥{{ item.money }}</span>
            </p>
        </div>
        <div class="date">
            {{ billline.date }}
        </div>
    </div>
</template>
<style scoped>
    .bill_line {
        width: 100%;
        position: relative;
        padding: 0 5px 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bill_line:hover {
        background-color: rgb(255, 252, 246)
    }

    .line {
        width: 1px;
        height: 100%;
        background-color: #394952;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 0;
    }

    .line::after {
        content: '';
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #394952;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
    }

    .bill_line >div:not(.line) {
        width: 50%;
        height: 100%;
        box-sizing: border-box;
    }

    .reverse {
        flex-direction: row-reverse!important;
    }

    .reverse .data {
        text-align: left;
    }

    .reverse .data p {
        flex-direction: row-reverse;
    }

    /* 日期 */
    .date {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        color: rgb(30, 30, 30);
    }

    /* 数据 */
    .data {
        text-align: right;
        padding: 10px 0;
        box-sizing: border-box;
        margin: 15px 0;
    }

    .data p {
        border-bottom: solid 1px rgb(70, 70, 70);
        display: flex;
        align-items: flex-end;
        margin: 20px 0;
        padding: 0 5px;
        box-sizing: border-box;
    }

    .data p span {
        text-align: center;
    }

    .data p span.time {
        width: 18%;
        font-size: 11px;
        color: gray;
    }

    .data p span.title {
        width: 60%;
        font-size: 11px;
        color: rgb(49, 49, 49);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .data p span.money {
        width: 22%;
        font-size: 14px;
        color: red;
    }

    .data p span.income {
        color: green;
    }
</style>