<template>
  <table class="demo-border">
    <tbody>
      <tr>
        <td class="text">名称</td>
        <td class="text">粗细</td>
        <td class="line">示例</td>
      </tr>
      <tr>
        <td class="text">实线</td>
        <td class="text">1px</td>
        <td class="line">
          <div />
        </td>
      </tr>
      <tr>
        <td class="text">虚线</td>
        <td class="text">1px</td>
        <td class="line">
          <div class="dashed" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped>
.demo-border .text {
  width: 15%;
}
.demo-border .line {
  width: 70%;
}
.demo-border .line div {
  width: 100%;
  height: 0;
  border-top: 1px solid var(--e-border-color);
}
.demo-border .line .dashed {
  border-top: 1px dashed var(--e-border-color);
}
</style>
