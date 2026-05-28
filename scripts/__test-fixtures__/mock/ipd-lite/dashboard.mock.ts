import type { MockHandler } from '@epframe/mock-server';

export default [
  {
    url: '/api/ipd-lite/dashboard/data',
    method: 'post',
    response: () => ({
      requirementTotal: 10,
      requirementCompleted: 6,
      taskTotal: 8,
      taskCompleted: 5,
      onTimeRate: 90
    })
  }
] as MockHandler[];
