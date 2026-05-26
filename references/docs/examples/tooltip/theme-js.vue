<template>
  <e-tooltip content="Top center" placement="top">
    <e-button>Dark</e-button>
  </e-tooltip>
  <e-tooltip content="Bottom center" placement="bottom" effect="light">
    <e-button>Light</e-button>
  </e-tooltip>
  <e-tooltip content="Bottom center" placement="bottom" effect="danger">
    <e-button>Danger</e-button>
  </e-tooltip>
  <e-tooltip content="Bottom center" effect="customized">
    <e-button>Customized theme</e-button>
  </e-tooltip>
</template>

<style>
.e-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.e-popper.is-customized .e-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
</style>
