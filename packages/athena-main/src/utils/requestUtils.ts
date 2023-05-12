import axios from 'axios';
import type {
  AxiosResponse,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosInterceptorOptions,
} from 'axios';
import { useAuthStore } from '@/modules/auth/store/auth';
import { athena_api, uranus_api } from '@/utils/pathUtils';

// 约定的常规返回数据结构体
export interface ResultData<T> {
  code: number;
  status: number;
  success: boolean;
  message: string;
  /** 返回的数据 */
  data: T;
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

export const axiosUploadInstance = axios.create({
  headers: {
    'Content-Type': ContentTypeEnum.FORM_DATA,
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

setupAxiosRequestInterceptor({
  instance: axiosBaseInstance,
  onFulfilled: (config) => {
    const token = useAuthStore().token;
    if (token) {
      config.headers = Object.assign(config.headers, { 'X-Access-Token': token });
    }
    return config;
  },
  onRejected: (err) => {
    console.log('err:::', err);
    return err;
  },
});

export const ApiRoots = {
  portal: `${athena_api}/portal`,
  uranus: uranus_api,
};
