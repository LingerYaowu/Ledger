<script setup>
import {defineProps, defineEmits} from 'vue'

const emits = defineEmits(['result']);

const props = defineProps({
    message : {
        type : String,
        default : '未知提示信息~'
    }
});
</script>
<template>
    <div class="confirm_outside">
        <div class="co_box">
            <h3>零贰幺伍：</h3>
            <p>你真的要删除这一条记录吗？</p>
            <div>
                <div @click="emits('result', true)">确定</div>
                <div @click="emits('result', false)">取消</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.confirm_outside {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
    inset: 0;
    background-color: rgba(0, 0, 0, .7);
    display: flex;
    justify-content: center;
    align-items: center;
}

.co_box {
    width: 92%;
    padding: 15px 20px;
    box-sizing: border-box;
    box-shadow: 0 0 3px rgb(245, 245, 245);
    background-color: rgb(250, 250, 250);
    border-radius: 5px;
    color: rgb(67, 67, 67);
}

.co_box p {
    text-indent: 1em;
    margin: 25px 0;
    font-size: 14px;
}

.co_box >div {
    width: 100%;
    display: flex;
}

.co_box >div div {
    background-color: rgb(93, 135, 174);
    font-size: 13px;
    margin: 0 10px;
    padding: 4px 12px;
    color: white;
    user-select: none;
    cursor: pointer;
    transition: background-color .1s linear;
}

.co_box >div div:hover {
    background-color: rgb(69, 105, 139);
}
</style>