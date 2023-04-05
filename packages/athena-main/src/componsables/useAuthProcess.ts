import { UserIdentity, useAuthStore } from '@/modules/auth/store/auth';
import { ElMessage } from 'element-plus';

/** 登录拿到token后的一系列处理流程 */
export const useAuthProcess = () => {
  const authStore = useAuthStore();

  /** 取得token后，获取用户信息和角色，根据角色进行后续处理 */
  const processAuth = (processFinished?: () => void) => {
    // 获取用户信息
    authStore
      .getUserInfo()
      .then(() => {
        // 获取用户身份
        authStore
          .getUserIdentity()
          .then((res) => {
            if (res === UserIdentity.Business) {
              if (processFinished) processFinished();
              // TODO 企业用户跳转提示页面
            } else {
              if (processFinished) processFinished();
              // TODO Uplus信息同步
              // TODO 获取U+的学院配置
            }
          })
          .catch((err) => {
            ElMessage.error(err.message);
            if (processFinished) processFinished();
          });
      })
      .catch((err: any) => {
        ElMessage.error(err.message);
        if (processFinished) processFinished();
      });
  };

  return { processAuth };
};
