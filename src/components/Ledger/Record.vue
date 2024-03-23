<script setup>
import { defineProps, ref, defineEmits } from 'vue';

const emits = defineEmits(['get_bill_data', 'remove_success', 'isdel_record']);
const bill_infos = defineProps(['bill_info']);
let [cur_sel, no_cur_sel] = [ref(false), ref(false)];

// 删除记录
const delete_bill_info = () => {
    emits('isdel_record');
};

</script>
<template>
    <div class="records_outside" @click="() => {
        cur_sel = true;
        no_cur_sel = false;
    }">
        <div :class="{ cur_sel: cur_sel, no_cur_sel: no_cur_sel }">
            <div class="selects">
                <div class="close" @click.stop="() => {
                    cur_sel = false;
                    no_cur_sel = true;
                }"><span class="iconfont icon-guanbi"></span></div>
                <div>
                    <span>修改</span>
                    <span class="iconfont icon-xiugai"></span>
                </div>
                <div @click.stop="delete_bill_info">
                    <span>删除</span>
                    <span class="iconfont icon-shanchu"></span>
                </div>
            </div>
            <div class="r_contents">
                <div class="r_goods_date">
                    <p>{{ bill_info.title }}</p>
                    <p>{{ bill_info.date }}</p>
                </div>
                <div class="money">
                    <span :class="bill_info.income ? 'add' : 'rem'">{{ bill_info.income ? '+' : '-' }}{{
        bill_info.money.toFixed(2)
    }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
/* 记录选项 */
.records_outside .selects {
    width: 100%;
    height: 60px;
    background-color: rgba(0, 0, 0, .8);
    color: rgb(215, 215, 215);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: relative;
}

.records_outside .selects div:not(.close) {
    display: flex;
    align-items: center;
}

.records_outside .selects div:hover {
    color: white;
}

.records_outside .selects div:not(.close) span:nth-child(1) {
    font-size: 12px;
}

.selects .close {
    height: 60px;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    padding: 0 3px;
    box-sizing: border-box;
    background-color: gray;
}

.selects .close span {
    font-size: 25px;
}

/* 最外层 */
.records_outside {
    width: 100%;
    height: 60px;
    margin-top: 10px;
    border-bottom: solid 1px rgba(0, 0, 0, .2);
    transition: all .1s linear;
    overflow: hidden;
    position: relative;
}

.records_outside >div {
    width: 100%;
    height: 120px;
    overflow: hidden;
    position: absolute;
    top: -60px;
    box-sizing: border-box;
}

.records_outside >div.cur_sel {
    animation: to_bottom .1s linear forwards;
}

@keyframes to_bottom {
    0% {
        top: -60px;
    }
    100% {
        top: 0;
    }
}

.records_outside >div.no_cur_sel {
    animation: to_top .1s linear forwards;
}

@keyframes to_top {
    0% {
        top: 0;
    }
    100% {
        top: -60px;
    }
}


.records_outside:hover {
    cursor: pointer;
    background-color: rgb(250, 250, 250);
}

.r_contents {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2px;
    box-sizing: border-box;
}

.r_goods_date p:nth-child(1) {
    font-size: 18px;
}

.r_goods_date p:nth-child(2) {
    font-size: 11px;
    color: rgb(100, 100, 100);
    margin-top: 4px;
}

.money {
    font-size: 20px;
}

.money .add {
    color: green;
}

.money .rem {
    color: red;
}
</style>