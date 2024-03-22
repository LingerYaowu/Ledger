<script setup>
import {defineProps} from 'vue'
const parentData = defineProps([
    'currentMoney',
    'expenditure',
    'income'
]);
</script>
<template>
    <div class="current_balance">
        <div class="cb_balance">
            <p>
                <span>余额：</span>
                <span>￥{{ currentMoney }}</span></p>
        </div>
        <div class="cb_expenditure_income">
            <div class="cb_expenditure">
                <p>￥{{ income }}</p>
                <p>收入</p>
            </div>
            <span class="cb_branch_line"></span>
            <div class="cb_income">
                <p>￥{{ expenditure }}</p>
                <p>支出</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
.current_balance {
    width: 100%;
    padding: 3px;
    box-sizing: border-box;
}

/* 余额 */
.cb_balance {
    box-sizing: border-box;
    text-align: center;
}

.cb_balance span:nth-child(1) {
    color: rgba(255, 255, 255, .8);
}

.cb_balance span:nth-child(2) {
    font-size: 32px;
    font-weight: bolder;
}

/* 支出与收入 */
.cb_expenditure_income {
    height: 30px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 20px;
}

.cb_expenditure_income div p:nth-child(1) {
    font-weight: bolder;
}

.cb_expenditure_income div p:nth-child(2) {
    text-align: center;
    font-size: 14px;
} 

.cb_expenditure {
    color: rgb(0, 169, 0);
}

.cb_income {
    color: rgb(255, 87, 87);
}

/* 分割线 */
.cb_branch_line {
    display: inline-block;
    height: 100%;
    width: 1px;
    background-image: linear-gradient(to bottom, transparent, rgba(255, 255, 255, .5), transparent);
}
</style>