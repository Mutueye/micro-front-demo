import { axiosBaseInstance, PaginationResult, PromiseResult } from '@/utils/axios';

export interface SchoolModel {
  id: string;
  code: string;
  name: string;
  version: string;
  accessUrl: string;
}

export interface ConfigModel {
  collegeCode: string;
  collegeId: string;
  configKey: string;
  configValue: string;
  id: string;
  scope: string;
  scopeTitle: string;
}

/**
 * 取学校列表
 */
export const getSchoolList = (): PromiseResult<PaginationResult<SchoolModel>> => {
  return axiosBaseInstance.get('/base/schools?scope=app&organNature=Normal');
};

/**
 * 取学院配置列表
 */
export const getConfigList = (): PromiseResult<ConfigModel[]> => {
  return axiosBaseInstance.get('/base/config/college?param=UPLUS');
};
