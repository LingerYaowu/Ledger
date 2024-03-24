<script setup>
import {ref,} from 'vue'
import A_title from '@cs/AccountingBook/A_title.vue';
import Bill_line from '@cs/AccountingBook/Bill_line.vue';
import ControlVue from '@cs/AccountingBook/Control.vue';
import axios from 'axios'
import MessageVue from '@cs/Message.vue'

const bills = ref(null);
axios.post('/php/bill.php', {
    operation: 'q'
}, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}).then(response => {
    bills.value = response.data;
    for (let item of bills.value) {
        item.money = +item.money;
        item.income = item.income == '0' ? false : true
    }
    for(let i = 0;i < bills.value.length;i++) {
        for(let j = 0;j < bills.value.length-(i+1);j++) {
            let before_date = bills.value[j].date.split(' ')[0].split('-');
            let after_date = bills.value[j+1].date.split(' ')[0].split('-');
            let before_time = bills.value[j].date.split(' ')[1].split(':');
            let after_time = bills.value[j+1].date.split(' ')[1].split(':');
            for(let x = 0; x < 3;x++) {
                before_date[x] = +before_date[x];
                after_date[x] = +after_date[x];
            }
            if(before_date[0] < after_date[0] 
            || (before_date[0] <= after_date[0] && before_date[1] < after_date[1]) 
            || (before_date[0] <= after_date[0] && before_date[1] <= after_date[1] && before_date[2] < after_date[2])
            || (before_date[0] <= after_date[0] && before_date[1] <= after_date[1] && before_date[2] <= after_date[2] && before_time[0] < after_time[0])
            || (before_date[0] <= after_date[0] && before_date[1] <= after_date[1] && before_date[2] <= after_date[2] && before_time[0] <= after_time[0] && before_time[1] <= after_time[1])) {
                [bills.value[j], bills.value[j+1]] = [bills.value[j+1], bills.value[j]];
            }
        }
    }
    const date_tit = new Set();
    bills.value.forEach(item=> {
        date_tit.add(item.date.split(' ')[0]);
    });
    const after_sort_bill = ref([]);
    let direction = true;
    for(let item of date_tit) {
        const temp_bill = bills.value.filter(res=> {
            let date = res.date.split(' ')[0];
            return item == date;
        });
        after_sort_bill.value.push({date:item,bill_info:temp_bill,direction:direction});
        direction = !direction;
    }
    bills.value = after_sort_bill.value;
}).catch(error => {
    alert(error.message);
    console.error(error.message);
})

</script>
<template>
    <div class="account_outside">
        <MessageVue />
        <div class="at_head">
            <A_title />
        </div>
        <div class="at_body">
            <ControlVue />
            <Bill_line v-for="item in bills" :key="item.date" :billline="item" />
        </div>
    </div>
</template>
<style scoped>
.account_outside {
    width: 100vw;
    height: 100vh;
}

.at_head {
    width: 100%;
    height: 50px;
    padding: 12px 8px;
    box-sizing: border-box;
    background-color: #394952;
}

.at_body {
    width: 100%;
    height: calc(100% - 50px);
    overflow-y: scroll;
}

.at_body::-webkit-scrollbar {
    width: 4px;
}

.at_body::-webkit-scrollbar-thumb {
    background-color: #394952;
}
</style>