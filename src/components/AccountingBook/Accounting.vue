<script setup>
import A_title from './A_title.vue';
import Bill_line from './Bill_line.vue';
</script>
<template>
    <div class="account_outside">
        <div class="at_head">
            <A_title />
        </div>
        <div class="at_body">
            <Bill_line />
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
    }
</style>