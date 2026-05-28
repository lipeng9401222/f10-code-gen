import type { MockHandler } from '@epframe/mock-server';

const requirementList = Array.from({ length: 3 }, (_, i) => ({
  id: `req-${i + 1}`,
  name: `需求${i + 1}`,
  owner: i % 2 === 0 ? 'zhangsan' : 'lisi',
  feedbackStatus: i % 2 === 0 ? 'processing' : 'completed',
  source: 'business',
  createTime: '2026-05-28 09:00:00'
}));

const requirementDetail = {
  id: 'req-1',
  name: '需求1',
  owner: 'zhangsan',
  feedbackStatus: 'processing',
  source: 'business',
  content: '需求内容',
  feedbackList: [
    { feedbackBy: '李四', feedbackTime: '2026-05-28 10:00:00', content: '建议纳入开发' }
  ]
};

export default [
  {
    url: '/api/ipd-lite/requirement/list',
    method: 'post',
    response: (req) => {
      const { current = 1, pageSize = 10 } = req.body || {};
      const start = (current - 1) * pageSize;
      return { data: requirementList.slice(start, start + pageSize), total: requirementList.length };
    }
  },
  {
    url: '/api/ipd-lite/requirement/detail',
    method: 'post',
    response: () => requirementDetail
  },
  {
    url: '/api/ipd-lite/requirement/add',
    method: 'post',
    response: () => ({ state: true, message: '新增成功' })
  },
  {
    url: '/api/ipd-lite/requirement/update',
    method: 'post',
    response: () => ({ state: true, message: '更新成功' })
  },
  {
    url: '/api/ipd-lite/requirement/delete',
    method: 'post',
    response: () => ({ state: true, message: '删除成功' })
  },
  {
    url: '/api/ipd-lite/requirement/batchDelete',
    method: 'post',
    response: () => ({ state: true, message: '批量删除成功' })
  },
  {
    url: '/api/ipd-lite/requirement/feedbackStatusOptions',
    method: 'post',
    response: () => ({
      data: [
        { label: '处理中', value: 'processing' },
        { label: '已完成', value: 'completed' }
      ]
    })
  },
  {
    url: '/api/ipd-lite/requirement/sourceOptions',
    method: 'post',
    response: () => ({
      data: [
        { label: '业务部门', value: 'business' },
        { label: '客户反馈', value: 'customer' }
      ]
    })
  }
] as MockHandler[];
