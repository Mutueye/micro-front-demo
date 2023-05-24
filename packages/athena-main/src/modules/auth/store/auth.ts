import { defineStore } from 'pinia';
// import Wujie from 'wujie-vue3';
import { axiosBaseInstance, ApiRoots, ResultData } from '@/utils/requestUtils';
import { goLogout } from '@/utils/authUtils';
import { basePath } from '@/utils/pathUtils';
import { pathUtils } from 'common-utils';

// const { bus } = Wujie;

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
  actions: {
    /** 保存Token */
    setToken(token: string) {
      this.token = token;
      // bus.$emit('login', this.token);
    },

    /** 获取用户信息：头像/memberId/手机号/账号等 */
    getUserInfo() {
      return axiosBaseInstance
        .get<ResultData<UserInfo>>(`${ApiRoots.portal}/customers/name_avatar`)
        .then((res) => {
          this.userInfo = res.data.data;
          return res.data.data;
        });
    },

    /** 获取用户身份 */
    getUserIdentity() {
      return axiosBaseInstance
        .get<ResultData<UserIdentity>>(`${ApiRoots.portal}/customers/prioritized_identity`)
        .then((res) => {
          this.identity = res.data.data;
          return res.data.data;
        });
    },

    /** 同步 U+ 新工科 session */
    async syncUplusSession() {
      try {
        // 同步 U+ 新工科 session
        await axiosBaseInstance.get(`${ApiRoots.uranus}/auth/session/sync?ticket=${this.token}`);
        await axiosBaseInstance.get(
          `${ApiRoots.uranus}/auth/session/generate?ticket=${this.token}`,
        );
      } catch (err: any) {
        // generate 接口会返回 302，虽然 302 但代表已同步成功，所以此处 catch 一下，不然会阻塞正常流程
      }
    },

    logout() {
      if (this.token) {
        this.token = '';
        this.userInfo = {};
        this.identity = '';
        goLogout();
      } else {
        location.href = pathUtils.baseLocation(basePath);
      }
      // bus.$emit('logout');
    },
  },
});
