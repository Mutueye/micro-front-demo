import axios from 'axios';
import type {
  AxiosResponse,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosInterceptorOptions,
} from 'axios';

// 约定的常规返回数据结构体
export interface ResultData<T> {
  code: number;
  status: number;
  success: boolean;
  message: string;
  // 正常返回的数据内容
  data: T & { message?: string };
  // 额外的返回数据，比如用户中心的extras.failureCount，返回登录错误的次数
  extras?: Record<string, unknown>;
}

// 返回的分页数据
export interface PaginationResult<T> {
  total: number;
  offset: number;
  limit: number;
  pageNumber: number;
  pageSize: number;
  rows: T[];
}

export type PromiseResult<T> = Promise<AxiosResponse<ResultData<T>>>;

// request contentType
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

export const axiosBaseInstance = axios.create({
  headers: {
    'Content-Type': ContentTypeEnum.JSON,
  },
});

export const setupAxiosRequestInterceptor = ({
  instance,
  onFulfilled,
  onRejected,
  options,
}: {
  instance: AxiosInstance;
  onFulfilled?: (
    value: InternalAxiosRequestConfig<any>,
  ) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>;
  onRejected?: (error: any) => any;
  options?: AxiosInterceptorOptions;
}) => {
  instance.interceptors.request.use(onFulfilled, onRejected, options);
};

export const setupAxiosResponseInterceptor = ({
  instance,
  onFulfilled,
  onRejected,
  options,
}: {
  instance: AxiosInstance;
  onFulfilled?: (
    value: AxiosResponse<any, any>,
  ) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>;
  onRejected?: (error: any) => any;
  options?: AxiosInterceptorOptions;
}) => {
  instance.interceptors.response.use(onFulfilled, onRejected, options);
};

// setupAxiosRequestInterceptor({
//   instance: axiosBaseInstance,
//   onFulfilled: (config) => {
//     // config.headers = Object.assign(config.headers, { 'X-Access-Token': 'TOKEN' });
//     return config;
//   },
//   onRejected: (err) => {
//     // TODO error handler
//     console.log('err:::', err);
//   },
// });

// axiosBaseInstance.interceptors.request.use((config) => {
//   console.log('config');
//   return config;
// });
