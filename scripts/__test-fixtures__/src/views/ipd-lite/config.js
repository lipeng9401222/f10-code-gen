export const COMMON_OPTIONS = {
  people: [
    { label: '张三', value: 'zhangsan' },
    { label: '李四', value: 'lisi' }
  ],
  reviewType: [
    { label: 'TR', value: 'TR' },
    { label: 'DCP', value: 'DCP' }
  ]
};

export const MODULE_CONFIGS = {
  requirement: {
    key: 'requirement',
    title: '需求管理',
    baseUrl: '/api/ipd-lite/requirement',
    optionModels: [
      { key: 'feedbackStatusOptions', url: '/api/ipd-lite/requirement/feedbackStatusOptions' },
      { key: 'sourceOptions', url: '/api/ipd-lite/requirement/sourceOptions' }
    ],
    columns: [
      { title: '需求名称', dataIndex: 'name' },
      { title: '负责人', dataIndex: 'owner', optionKey: 'personOptions' },
      { title: '反馈状态', dataIndex: 'feedbackStatus', optionKey: 'feedbackStatusOptions' },
      { title: '登记时间', dataIndex: 'createTime' }
    ],
    filters: [
      { label: '反馈状态', field: 'feedbackStatus', optionKey: 'feedbackStatusOptions' }
    ],
    formFields: [
      { label: '需求名称', prop: 'name', required: true, type: 'input' },
      { label: '负责人', prop: 'owner', required: true, type: 'select', options: COMMON_OPTIONS.people },
      { label: '需求来源', prop: 'source', type: 'select', optionKey: 'sourceOptions' },
      { label: '需求内容', prop: 'content', required: true, type: 'textarea' }
    ],
    detailFields: [
      { label: '需求名称', prop: 'name' },
      { label: '负责人', prop: 'owner' },
      { label: '反馈状态', prop: 'feedbackStatus', optionKey: 'feedbackStatusOptions' },
      { label: '需求来源', prop: 'source', optionKey: 'sourceOptions' },
      { label: '需求内容', prop: 'content' }
    ],
    detailLists: [
      { title: '反馈记录', prop: 'feedbackList', fields: ['feedbackBy', 'feedbackTime', 'content'] }
    ]
  },
  trdcpReview: {
    key: 'trdcpReview',
    title: 'TR/DCP评审',
    baseUrl: '/api/ipd-lite/trdcp-review',
    detailFields: [
      { label: '阶段名称', prop: 'stageName' },
      { label: '评审类型', prop: 'reviewType' },
      { label: '开始日期', prop: 'startDate' },
      { label: '结束日期', prop: 'endDate' },
      { label: '参会人', prop: 'attendees' }
    ],
    extraLists: [
      { title: '阶段列表', url: '/api/ipd-lite/trdcp-review/stageList', fields: ['stageName', 'reviewType', 'startDate', 'endDate', 'attendees'] }
    ]
  }
};

export const ACTION_FORM_CONFIGS = {
  stage: {
    title: '阶段配置',
    submitUrl: '/api/ipd-lite/trdcp-review/updateStage',
    addUrl: '/api/ipd-lite/trdcp-review/addStage',
    detailUrl: '/api/ipd-lite/trdcp-review/stageDetail',
    fields: [
      { label: '阶段名称', prop: 'stageName', required: true, type: 'input' },
      { label: '评审类型', prop: 'reviewType', required: true, type: 'select', options: COMMON_OPTIONS.reviewType },
      { label: '开始日期', prop: 'startDate', required: true, type: 'date' },
      { label: '结束日期', prop: 'endDate', required: true, type: 'date' },
      { label: '参会人', prop: 'attendees', required: true, type: 'input' }
    ]
  }
};
