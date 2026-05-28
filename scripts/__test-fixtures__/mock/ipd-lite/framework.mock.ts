import type { MockHandler } from '@epframe/mock-server';

export default [
  {
    url: '/resourceaction/getSysBoot',
    method: 'get',
    response: () => ({ state: true, data: { sysName: 'IPD Lite' } })
  },
  {
    url: '/auth/getAuthExpressions',
    method: 'post',
    response: () => ({ state: true, data: [] })
  },
  {
    url: '/api/ipd-lite/common/personOptions',
    method: 'post',
    response: () => ({
      data: [
        { label: '张三', value: 'zhangsan' },
        { label: '李四', value: 'lisi' }
      ]
    })
  }
] as MockHandler[];
