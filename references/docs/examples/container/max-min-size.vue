<template>
  <div class="common-layout">
    <e-container>
      <e-aside :width="200" :min-width="100" :max-width="300" resizeable> 侧边栏 (100-300px) </e-aside>
      <e-container>
        <e-header :height="60" :min-height="40" :max-height="100"> 头部 (40-100px) </e-header>
        <e-main>主要内容</e-main>
        <e-footer :height="50" :min-height="30" :max-height="80"> 页脚 (30-80px) </e-footer>
      </e-container>
      <e-rightbar :width="150" :min-width="80" :max-width="250" resizeable> 右侧栏 (80-250px) </e-rightbar>
    </e-container>
  </div>
</template>
