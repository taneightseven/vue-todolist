<template>
<div>   
<a @click="ClickHANDLE" href="https://todomvc.com/examples/vue/dist/#/">参考网址链接</a>
</div>
</template>

<script lang="ts" setup> 
const ClickHANDLE = (event: MouseEvent) => {
    const SureConfirm = window.confirm("请确认您是否要跳转到参考网址")
    if(SureConfirm){
        console.log("即将跳转 ")
    }else{
        event.preventDefault()
    }
}
</script>

<style scoped>
div {
    position: fixed;
    top: 20px;
    right: 24px;
    z-index: 20;
    padding: 0;
    line-height: 1;
}

a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 14px;
    border: 1px solid rgba(184, 63, 69, 0.22);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.9);
    color: #b83f45;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(31, 34, 37, 0.06);
    backdrop-filter: blur(8px);
    transition:
        color 0.2s ease,
        background-color 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease,
        transform 0.2s ease;
}

/* 用伪元素补一个“外链”箭头，不修改模板结构 */
a::after {
    content: "↗";
    font-size: 12px;
    opacity: 0.7;
}

a:hover {
    color: #ffffff;
    background: #b83f45;
    border-color: #b83f45;
    box-shadow: 0 6px 18px rgba(184, 63, 69, 0.26);
    transform: translateY(-1px);
}

a:active {
    transform: translateY(0);
}

a:focus-visible {
    outline: 2px solid #b83f45;
    outline-offset: 3px;
}

@media (max-width: 768px) {
    /* 小屏时回到文档流，避免和居中的电子木鱼条重叠 */
    div {
        position: static;
        display: flex;
        justify-content: flex-end;
        padding: 12px 16px 0;
    }

    a {
        padding: 7px 11px;
        font-size: 12px;
    }
}
</style>