import type { MockHandler } from '@epframe/mock-server';

const stageList = [
  {
    id: 'stage-1',
    stageName: 'TR1-概念阶段',
    reviewType: 'TR',
    startDate: '2026-05-28',
    endDate: '2026-06-01',
    attendees: '张三, 李四'
  }
];

export default [
  {
    url: '/api/ipd-lite/trdcp-review/stageList',
    method: 'post',
    response: () => ({ data: stageList, total: stageList.length })
  },
  {
    url: '/api/ipd-lite/trdcp-review/stageDetail',
    method: 'post',
    response: () => stageList[0]
  },
  {
    url: '/api/ipd-lite/trdcp-review/addStage',
    method: 'post',
    response: () => ({ state: true, message: '阶段新增成功' })
  },
  {
    url: '/api/ipd-lite/trdcp-review/updateStage',
    method: 'post',
    response: () => ({ state: true, message: '阶段更新成功' })
  },
  {
    url: '/api/ipd-lite/trdcp-review/deleteStage',
    method: 'post',
    response: () => ({ state: true, message: '阶段删除成功' })
  }
] as MockHandler[];
