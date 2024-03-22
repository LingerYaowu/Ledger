<script setup>
    import BigNumber from 'bignumber.js';
import {ref, computed, defineEmits, defineProps} from 'vue'
    const money_info = defineProps(['current_date_bill']);
    let expenditure = computed(()=> {
        let result = 0;
        for(let item in money_info.current_date_bill) {
            if(!money_info.current_date_bill[item].income) {
                result = BigNumber(result).plus(BigNumber(money_info.current_date_bill[item].money));
            }
        }
        return result;
    });
    let income = computed(()=> {
        let result = 0;
        for(let item in money_info.current_date_bill) {
            if(money_info.current_date_bill[item].income) {
                result = BigNumber(result).plus(BigNumber(money_info.current_date_bill[item].money));
            }
        }
        return result;
    });
    let now = new Date();
    let nowDate = ref(`${now.getFullYear()}-${(now.getMonth()+1) >= 10? (now.getMonth()+1) : '0'+(now.getMonth()+1)}-${(now.getDate())>=10?(now.getDate()):'0'+now.getDate()}`);
    let week = computed(()=> {
        let now = new Date(nowDate.value);
        const weeks = ['七', '一', '二', '三', '四', '五', '六'];
        return weeks[now.getDay()];
    });
    const emits = defineEmits([
        'date_change'
    ]);
    const trigger_emits = ()=> {
        emits('date_change', nowDate.value);
    };
    trigger_emits();
</script>
<template>
    <div class="today_outside">
        <div class="t_date">
            <input type="date" v-model="nowDate" @change="trigger_emits">
            <span v-show="nowDate"> {{ nowDate }} 星期{{ week }}</span>
            <span v-show="!nowDate">点击选择日期</span>
            &nbsp;
            <span class="iconfont icon-xia"></span>
        </div>
        <div class="t_expenditure_income">
            <span>收入：{{ income }}</span>
            &nbsp;
            <span>支出：{{ expenditure }}</span>
        </div>
    </div>
</template>
<style scoped>
.today_outside {
    width: 100%;
    height: 28px;
    background-color: rgb(229, 229, 229);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    box-sizing: border-box;
    color: rgb(116, 115, 115);
}

.t_date {
    padding: 3px;
    box-sizing: border-box;
    font-size: 12px;
    position: relative;
    overflow: hidden;
}

.t_date:hover {
    color: rgb(71, 71, 71);
}

.t_date input[type='date'] {
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    opacity: 0;
}

.t_date input[type='date']::-webkit-calendar-picker-indicator {
    cursor: pointer;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
}

.t_date span {
    font-size: 11px;
}

.t_expenditure_income {
    font-size: 11px;
}
</style>