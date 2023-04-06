import { defineStore } from 'pinia';
// import { axiosBaseInstance, ApiRoots, ResultData } from '@/utils/requestUtils';
// import { goLogout } from '@/utils/authUtils';
// import { baseLocation } from '@/utils/pathUtils';

export interface UserInfo {
  /** 头像地址 */
  avatar: string;
  /** memberId */
  id: string;
  /** 手机号 */
  mobile: string;
  name: string;
  /** 昵称 */
  nickname: string;
  /** 机构 */
  // organs: string[];
  /** 性别： 1: 男 2: 女 */
  sex: '1' | '2' | '';
  /** 账号名 默认和nickname相等 */
  username: string;
}

export enum UserIdentity {
  Business = 'Business',
  Teacher = 'Teacher',
  Student = 'Student',
}

interface AuthState {
  token: string;
  userInfo: UserInfo | Record<string, never>;
  identity: UserIdentity | '';
}

/** 登录信息通过localstorage同步基座应用 */
export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: '',
    userInfo: {},
    identity: '',
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'auth',
        storage: localStorage,
      },
    ],
  },
});
