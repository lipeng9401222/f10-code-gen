import { defineMock, useStore, faker } from '@epframe/mock-server';

const records = Array.from({ length: 10 }).map(() => ({
  id: faker.string.uuid(),
  name: `订单-${faker.string.alphanumeric(4).toUpperCase()}`,
  amount: faker.number.int({ min: 100, max: 10000 }),
  status: faker.helpers.arrayElement(['pending', 'completed', 'cancelled']),
  customerName: faker.person.fullName(),
  customerPhone: faker.phone.number(),
  createTime: faker.date.past().toISOString().slice(0, 19).replace('T', ' '),
  remark: faker.lorem.sentence()
}));

const store = useStore('order-demo', { records });

export default defineMock([
  {
    url: '/api/demo/order/list',
    method: 'post',
    response({ body }) {
      const { current = 1, pageSize = 10, conditions = {} } = body.params || {};
      let list = store.get('records');
      if (conditions.name) list = list.filter((it) => it.name.includes(conditions.name));
      const start = (current - 1) * pageSize;
      return {
        data: list.slice(start, start + pageSize),
        total: list.length
      };
    }
  },
  {
    url: '/api/demo/order/info',
    method: 'post',
    response({ body }) {
      const { id } = body.params || {};
      const item = store.get('records').find((r) => r.id === id);
      if (item) return { state: true, data: item };
      return { state: false, message: '记录不存在' };
    }
  },
  {
    url: '/api/demo/order/add',
    method: 'post',
    response({ body }) {
      const records = store.get('records');
      records.push({ id: faker.string.uuid(), ...body.params });
      store.set('records', records);
      return { state: true, message: '新增成功' };
    }
  },
  {
    url: '/api/demo/order/update',
    method: 'post',
    response() {
      return { state: true, message: '更新成功' };
    }
  },
  {
    url: '/api/demo/order/delete',
    method: 'post',
    response() {
      return { state: true, message: '删除成功' };
    }
  },
  {
    url: '/api/demo/order/statusOptions',
    method: 'post',
    response() {
      return {
        data: [
          { label: '待处理', value: 'pending' },
          { label: '已完成', value: 'completed' },
          { label: '已取消', value: 'cancelled' }
        ]
      };
    }
  }
]);
