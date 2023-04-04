import axios, { AxiosResponse } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Result<T> {
  code: number;
  status: number;
  success: boolean;
  message: string;
  data: T & { message?: string };
  extras?: Record<string, unknown>;
}

export interface PaginationResult<T> {
  total: number;
  offset: number;
  limit: number;
  pageNumber: number;
  pageSize: number;
  rows: T[];
}

export type PromiseResult<T> = Promise<AxiosResponse<Result<T>>>;

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
  baseURL: import.meta.env.VITE_API_BASE_PATH,
  headers: {
    'Content-Type': ContentTypeEnum.JSON,
  },
});
