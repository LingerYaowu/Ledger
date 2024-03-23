<script setup>
import axios from 'axios'
import BigNumber from 'bignumber.js';
import { ref, reactive, computed } from 'vue';
import CurrenBalanceVue from '@cs/Ledger/CurrentBalance.vue'
import TodayDataVue from '@cs/Ledger/TodayData.vue'
import RecordVue from '@cs/Ledger/Record.vue'
import AddBillVue from '@cs/Ledger/Add_bill.vue'
import { useRouter } from 'vue-router'
import MessageVue from '@cs/Message.vue'
import ConfirmVue from '@cs/Confirm.vue';

// 版本
let version = ref('v 1.1.8');

// 接收useRouter()
let router = useRouter();

const billData = reactive({
    init_money: 500+109,//微信+现金
    bill: null
});
// 获取/更新数据信息
const get_bill_data = () => {
    axios.post('/php/bill.php', {
        operation: 'q'
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        billData.bill = response.data;
        for (let item of billData.bill) {
            item.money = +item.money;
            item.income = item.income == '0' ? false : true
        }
    }).catch(error => {
        alert(error.message);
        console.error(error.message);
    })
}
get_bill_data();
// 余额
let currentMoney = computed(() => {
    if (billData.bill) {
        let current_money = billData.init_money;
        for (let item of billData.bill) {
            if (item.income) {
                current_money = BigNumber(current_money).plus(BigNumber(item.money));
            } else {
                current_money = BigNumber(current_money).minus(BigNumber(item.money));
            }
        }
        return current_money;
    }
});

// 支出总数
let expenditure = computed(() => {
    if (billData.bill) {
        let expenditure_money = 0;
        for (let item of billData.bill) {
            if (!item.income) {
                expenditure_money = BigNumber(expenditure_money).plus(BigNumber(item.money));
            }
        }
        return expenditure_money;
    }
});

// 收入总数
let income = computed(() => {
    if (billData.bill) {
        let income_money = 0;
        for (let item of billData.bill) {
            if (item.income) {
                income_money = BigNumber(income_money).plus(BigNumber(item.money));
            }
        }
        return income_money;
    }
});

// 组件传来的日期信息
let current_date = ref(null);
const set_current_date = (nowDate) => {
    current_date.value = nowDate;
};

// 当前日期的消费记录
let current_date_bill = computed(() => {
    if (billData.bill && current_date.value) {
        const cur_bill = billData.bill.filter(item => {
            if (item.date.split(' ')[0] == current_date.value) {
                return true;
            }
            return false;
        });
        return cur_bill;
    }
});

// 是否显示添加记录页面
let isshow_editbill = ref(false);

// 触发消息框
let isshow_message = ref(false);
let message_content = ref('');
const tigger_message = () => {
    if (isshow_message.value === false) {
        isshow_message.value = true;
        setTimeout(() => {
            isshow_message.value = false;
        }, 2000);
    }
};

// 确定框
let isshow_confirm = ref(false);
let confirm_message = ref('');
// 删除记录函数
let rm_id = ref(null);
const del_record = bool=> {
    if(bool) {
        axios.post('/php/bill.php', {
            operation: 'r',
            id: rm_id.value
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            message_content.value = '删除成功!';
            tigger_message();
            get_bill_data();
        }).catch(error => {
            message_content.value = (error.message);
            tigger_message();
        });
    } else {
        isshow_confirm.value = false;
    }
    isshow_confirm.value = false;
    rm_id.value = null;
};
</script>
<template>
    <div class="ledger_outside">
        <!--去确定框-->
        <ConfirmVue  v-if="isshow_confirm" :message="confirm_message" @result="del_record"/>
        <!-- 消息提醒框 -->
        <MessageVue v-if="isshow_message" :message="message_content" :class="{ init: isshow_message }" />
        <AddBillVue v-if="isshow_editbill" @getdata_success="message => {
            message_content = message;
            tigger_message();
        }" @closeAddbill="bool => {
            isshow_editbill = bool;
            get_bill_data();
        }" />
        <div class="l_header">
            <div class="l_tit">
                <div class="l_left">
                    <span>✖</span>
                    <span>记账 <span style="color:gray;font-size: 14px;">(2024/3/14 始)</span></span>
                </div>
                <div class="l_right">
                    <span>{{ version }}</span>
                </div>
            </div>
            <CurrenBalanceVue :currentMoney="currentMoney" :expenditure="expenditure" :income="income" />
        </div>
        <div class="l_body">
            <TodayDataVue @date_change="set_current_date" :current_date_bill="current_date_bill" />
            <div class="l_body_content">
                <div class="l_records">
                    <div class="none" v-show="!(current_date_bill ? current_date_bill.length : current_date_bill)">
                        当前日期还没有消费记录哦~
                    </div>
                    <RecordVue v-for="item in current_date_bill" :key="item.id" :bill_info="item"
                        @get_bill_data="get_bill_data" 
                        @isdel_record="()=>{
                            isshow_confirm = true;
                            rm_id=item.id;
                            confirm_message = `确定要删除【${item.title}】吗？？`
                        }"
                        @remove_success="message => {
                        message_content = message;
                        tigger_message();
                    }" />
                </div>
                <div class="l_tools">
                    <div class="all_bill" @click="router.push({ path: '/Accounting' })">
                        <span class="iconfont icon-zhangdan"></span>
                        <span>账单</span>
                    </div>
                    <div class="add_bill" @click="isshow_editbill = true">
                        <span class="iconfont icon-jia"></span>
                    </div>
                    <div class="statistics">
                        <span class="iconfont icon-tongji"></span>
                        <span>统计</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
/* 外层容器 */
.ledger_outside {
    width: 100vw;
    max-width: 550px;
    margin: 0 auto;
    height: 100vh;
    box-shadow: 0 0 3px gray;
    overflow: hidden;
    position: relative;
}

/* 头部内容 */
.l_header {
    width: 100%;
    height: 170px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-image: linear-gradient(to top, #313e48, #3e4e58);
    color: #ededed;
    padding: 12px 8px;
    box-sizing: border-box;
}

/* 顶部标题栏 */
.l_tit {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.l_left {
    display: flex;
    align-items: center;
}

.l_left>span:nth-child(1) {
    width: 40px;
    height: 25px;
    border-right: solid 1px rgba(255, 255, 255, .4);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    user-select: none;
}

.l_left>span:nth-child(1):hover {
    cursor: pointer;
    font-size: 14px;
}

.l_left span:nth-child(2) {
    font-size: 16px;
    margin-left: 12px;
}

.l_right span {
    font-size: 12px;
    color: rgb(190, 189, 189);
}

/* 主体内容 */
.l_body {
    width: 100%;
    height: calc(100% - 170px);
}

/* 主体内容 */
.l_body_content {
    width: 100%;
    height: calc(100% - 28px);
    overflow: hidden;
}

.l_tools {
    height: 80px;
    background-color: rgb(244, 246, 248);
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
}

.l_tools>div {
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.l_tools .add_bill {
    background-color: rgb(77, 159, 229);
    color: white;
    width: 70px;
    height: 70px;
    position: relative;
    top: -35%;
}

.l_tools .add_bill:hover {
    background-color: rgb(55, 142, 218);
}

.l_tools .add_bill span {
    font-size: 25px;
}

.l_tools>div:not(.add_bill) {
    color: rgb(107, 107, 107);
    flex-direction: column;
}

.l_tools>div:not(.add_bill):hover {
    color: rgb(73, 73, 73);
}

.l_tools>div:not(.add_bill) span:nth-child(1) {
    font-size: 25px;
}

.l_tools>div:not(.add_bill) span:nth-child(2) {
    font-size: 13px;
}

/* 当前日期没有记录 */
.none {
    color: gray;
    width: 100%;
    text-align: center;
    margin-top: 20px;
}

/* 支出/收入 记录 */
.l_records {
    width: 100%;
    height: calc(100% - 80px);
    padding: 0 10px;
    box-sizing: border-box;
    overflow-y: scroll;
}

.l_records::-webkit-scrollbar {
    width: 5px;
}

.l_records::-webkit-scrollbar-thumb {
    background-color: #313e48;
}
</style>