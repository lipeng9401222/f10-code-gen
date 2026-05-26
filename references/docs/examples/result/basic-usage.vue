<template>
  <e-row>
    <e-col :sm="12" :lg="6">
      <e-result icon="success" title="Success Tip" sub-title="Please follow the instructions">
        <template #extra>
          <e-button type="primary">Back</e-button>
        </template>
      </e-result>
    </e-col>
    <e-col :sm="12" :lg="6">
      <e-result icon="warning" title="Warning Tip" sub-title="Please follow the instructions">
        <template #extra>
          <e-button type="primary">Back</e-button>
        </template>
      </e-result>
    </e-col>
    <e-col :sm="12" :lg="6">
      <e-result icon="error" title="Error Tip" sub-title="Please follow the instructions">
        <template #extra>
          <e-button type="primary">Back</e-button>
        </template>
      </e-result>
    </e-col>
    <e-col :sm="12" :lg="6">
      <e-result icon="info" title="Info Tip">
        <template #sub-title>
          <p>Using slot as subtitle</p>
        </template>
        <template #extra>
          <e-button type="primary">Back</e-button>
        </template>
      </e-result>
    </e-col>
  </e-row>
</template>
