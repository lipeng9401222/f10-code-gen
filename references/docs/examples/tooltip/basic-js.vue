<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <e-tooltip class="box-item" effect="dark" content="Top Left prompts info" placement="top-start">
        <e-button>top-start</e-button>
      </e-tooltip>
      <e-tooltip class="box-item" effect="dark" content="Top Center prompts info" placement="top">
        <e-button>top</e-button>
      </e-tooltip>
      <e-tooltip class="box-item" effect="dark" content="Top Right prompts info" placement="top-end">
        <e-button>top-end</e-button>
      </e-tooltip>
    </div>
    <div class="row">
      <e-tooltip class="box-item" effect="dark" content="Left Top prompts info" placement="left-start">
        <e-button>left-start</e-button>
      </e-tooltip>
      <e-tooltip class="box-item" effect="dark" content="Right Top prompts info" placement="right-start">
        <e-button>right-start</e-button>
      </e-tooltip>
    </div>
    <div class="row">
      <e-tooltip class="box-item" effect="dark" content="Left Center prompts info" placement="left">
        <e-button class="mt-3 mb-3">left</e-button>
      </e-tooltip>
      <e-tooltip class="box-item" effect="dark" content="Right Center prompts info" placement="right">
        <e-button>right</e-button>
      </e-tooltip>
    </div>
    <div class="row">
      <e-tooltip class="box-item" effect="dark" content="Left Bottom prompts info" placement="left-end">
        <e-button>left-end</e-button>
      </e-tooltip>
      <e-tooltip class="box-item" effect="dark" content="Right Bottom prompts info" placement="right-end">
        <e-button>right-end</e-button>
      </e-tooltip>
    </div>
    <div class="row center">
      <e-tooltip class="box-item" effect="dark" content="Bottom Left prompts info" placement="bottom-start">
        <e-button>bottom-start</e-button>
      </e-tooltip>
      <e-tooltip class="box-item" effect="dark" content="Bottom Center prompts info" placement="bottom">
        <e-button>bottom</e-button>
      </e-tooltip>
      <e-tooltip class="box-item" effect="dark" content="Bottom Right prompts info" placement="bottom-end">
        <e-button>bottom-end</e-button>
      </e-tooltip>
    </div>
  </div>
</template>

<style scoped>
.tooltip-base-box {
  width: 600px;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>
