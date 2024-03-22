<script setup>
import {reactive, defineEmits, ref} from 'vue';
import axios from 'axios'

let now = new Date();
let bill_info = reactive({
    goods_title : '',
    goods_money : 0,
    income_expenditure : 'expenditure',
    date : `${now.getFullYear()}-${(now.getMonth()+1) >= 10? (now.getMonth()+1) : '0'+(now.getMonth()+1)}-${(now.getDate())>=10?(now.getDate()):'0'+now.getDate()}`,
    time : `${now.getHours()>=10?now.getHours():'0'+now.getHours()}:${now.getMinutes()>=10?now.getMinutes():'0'+now.getMinutes()}`
});

const addbill = ()=> {
    if(bill_info.goods_title) {
        const datas = {
            title : bill_info.goods_title,
            money : bill_info.goods_money,
            income : bill_info.income_expenditure=='income'?1:0,
            date : bill_info.date+' '+bill_info.time
        };
        axios.post('/php/bill.php',{
            operation : 'a',
            bill_info : JSON.stringify(datas)
        },{
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).then(response=> {
            if(response.data == 1) {
                emits('getdata_success', '添加成功!');
            }
            // 清空表单
            bill_info.goods_title = '';
            bill_info.goods_money = 0;
            bill_info.income_expenditure = 'expenditure';
            // 关闭表单并重新获取数据
            emits('closeAddbill', false);
        }).catch(error=>{
            console.warn(error.message);
        });
    } else alert('请正确填写数据！！！');
};
const emits = defineEmits(['closeAddbill', 'getdata_success']);

let [goods_title_sel, money_sel] = [ref(false), ref(false)];
</script>
<template>
    <div class="addbill_outside" @click="emits('closeAddbill', false);">
        <form @submit.prevent="void(0)" @click.stop="void(0)">
            <h3 class="ao_title">Add Record</h3>
            <div class="ao_formbody">
                <div class="ao_input">
                    <label for="ao_form_title">物品：</label>
                    <div :class="{select : goods_title_sel}">
                        <input type="text" id="ao_form_title" @focus="goods_title_sel = true" @blur="goods_title_sel = false" v-model="bill_info.goods_title">
                    </div>
                </div>
                <div class="ao_input">
                    <label for="ao_form_money">金额：</label>
                    <div :class="{select : money_sel}">
                        <input type="text" id="ao_form_money" @focus="money_sel = true" @blur="money_sel = false" v-model.number="bill_info.goods_money">
                    </div>
                </div>
                <div class="ao_ex_in">
                    <span>收支：</span>
                    <div>
                        <span>
                            <input type="radio" value="expenditure" name="ao_form_income" v-model="bill_info.income_expenditure" id="ao_form_expenditured">
                            <label for="ao_form_expenditured">支出</label>&nbsp;
                        </span>
                        <span>
                            <input type="radio" value="income" name="ao_form_income" v-model="bill_info.income_expenditure" id="ao_form_income">
                            <label for="ao_form_income">收入</label>&nbsp;
                        </span>
                    </div>
                </div>
                <div class="ao_date_time">
                    <span>时间：</span>
                    <div>
                        <div>
                            <span>{{bill_info.date}}</span>
                            <input type="date" v-model="bill_info.date">
                        </div>
                        <div>
                            <span>{{bill_info.time}}</span>
                            <input type="time" v-model="bill_info.time">
                        </div>
                    </div>
                </div>
                <div class="submit_btn" @click="addbill">提 交</div>
            </div>
        </form>
    </div>
</template>
<style scoped>
.addbill_outside {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

form {
    width: 90%;
    margin: 0 auto;
    box-sizing: border-box;
    background-color: white;
    border-radius: 5px;
    padding: 10px 20px;
    box-sizing: border-box;
    color: rgb(28, 28, 28);
}

.ao_formbody {
    padding: 0 10px;
}

/* 物品名称、金额 输入框 */
.ao_input {
    height: 30px;
    margin: 15px 0;
    display: flex;
}

.ao_input label,
.ao_ex_in >span,
.ao_date_time >span {
    width: 20%;
    display: inline-block;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.ao_input >div {
    width: 80%;
    border-bottom: solid 1px rgba(150, 150, 150);
    position: relative;
}

.ao_input >div.select::after {
    content: '';
    display: inline-block;
    width: 0;
    height: 1px;
    position: absolute;
    bottom: -1px;
    left: 0;
    background-color: rgb(0, 234, 16);
    animation: border .3s linear forwards;
}

@keyframes border {
    0% {
        width: 0;
    }
    100% {
        width: 100%;
    }
}

.ao_input >div input {
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
    outline: none;
    text-indent: 0.5em;
    font-size: 14px;
}

/* 收入支出单选按钮 */
.ao_ex_in {
    margin: 15px 0;
    display: flex;
    align-items: center;
}

.ao_ex_in >div {
    width: 80%;
    display: flex;
}

.ao_ex_in >div span {
    margin: 0 3px;
    display: flex;
    align-items: center;
}

.ao_ex_in >div label {
    font-size: 14px;
}

/* 时间选项 */
.ao_date_time {
    display: flex;
}

.ao_date_time >div {
    width: 80%;
    display: flex;
}

.ao_date_time >div >div {
    position: relative;
    margin: 0 5px;
    color: gray;
    font-size: 14px;
    border-bottom: solid 1px gray;
    box-sizing: border-box;
}

.ao_date_time >div >div input[type='date'],
.ao_date_time >div >div input[type='time'] {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
}

.ao_date_time >div >div input[type='date']::-webkit-calendar-picker-indicator,
.ao_date_time >div >div input[type='time']::-webkit-calendar-picker-indicator {
    cursor: pointer;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: aqua;
}

/* 提交按钮 */
.submit_btn {
    width: 35%;
    height: 30px;
    border-radius: 5px;
    border: solid 1px rgb(64, 64, 64);
    color: rgb(64, 64, 64);
    background-color: white;
    box-sizing: border-box;
    font-family: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .1s linear;
    margin-top: 20px;
}

.submit_btn:hover {
    cursor: pointer;
    background-color: rgb(64, 64, 64);
    color: white;
}
</style>