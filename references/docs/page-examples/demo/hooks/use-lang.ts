// 存储国际化翻译t方法
// NOTE: 以防止非Vue使用场景无法直接获取vue实例, 避免每次都需要进行初始化
type TFn = (value: string) => string;

const defaultT: TFn = (value: string) => value;

let proxyT: TFn = defaultT;

export const setLangT = (tFn: TFn) => {
  if (tFn && proxyT !== tFn) {
    proxyT = tFn;
  }
};

export const t = (value: string, ...args) => {
  const string = proxyT(value, ...args);

  return string;
};
