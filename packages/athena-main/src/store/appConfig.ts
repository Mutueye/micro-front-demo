import { defineStore } from 'pinia';
import axios from 'axios';
import { axiosBaseInstance, ApiRoots } from '@/utils/requestUtils';
// import { athena_api, uranus_api } from '@/utils/pathUtils';

// 首页类型： 默认 / 高校专属 / 区域专属
type HomeType = '' | 'school' | 'area';

interface AppConfig {
  /** 大数据地址 */
  BIGDATA?: string;
  /** 学校编码 */
  CODE?: string;
  /** 竞赛平台地址 */
  COMPETITION?: string;
  /** 考试系统地址 */
  EXAM?: string;
  /** 毕设平台地址 */
  GRAD?: string;
  /** 当前系统名称 */
  NAME?: string;
  /** 优加就业企业端地址 */
  OUREA_HR?: string;
  /** 优加就业学生端地址 */
  OUREA_STUDENT?: string;
  /** 用户中心地址 */
  QUC?: string;
  /** 首页类型：SAAS版为空; 'school': 高校首页, 'area': 区域专属首页 */
  TYPE?: HomeType;
  /** U+首页 */
  UPLUS?: string;
  /** U+课程 */
  UPLUS_TEACHER?: string;
  /** 高校首页模块列表，带顺序 */
  HOME_PAGE_MODULES?: string;
  [T: string]: any;
}

const dev_config: AppConfig = {
  QUC: 'https://uc.qstcloud.net',
  OUREA_HR: 'https://hr.qstcloud.net',
  OUREA_STUDENT: 'https://jiuye.qstcloud.net',
  EXAM: 'https://tev-exam.qstcloud.net',
  GRAD: 'https://tev-grad.qstcloud.net',
  UPLUS: 'https://uea.qstcloud.net',
  COMPETITION: 'https://tev-competition.qstcloud.net',
  UPLUS_TEACHER: 'http://tev-course.qstcloud.net',
  BIGDATA: 'https://tev-bd.qstcloud.net',
  // CODE: '4111010050-C001',
  CODE: 'qstcloud',
  // CODE: 'Area-tev-athena-area',
  // TYPE: 'area',
  TYPE: '',
  HOME_PAGE_MODULES: 'PROJECT,INTERN_PROJECT,COURSE,CAREER_COURSE',
  // HOME_PAGE_MODULES: 'PROJECT,INTERN_PROJECT,COURSE,CAREER_COURSE,COURSE_SYSTEM,HOT_JOB,JOB_FAIR,PREFERRED_ENTERPRISE'
};

interface AppConfigState {
  config: AppConfig;
  areaConfig: AppConfig;
}

export const useAppConfigStore = defineStore('appConfig', {
  state: (): AppConfigState => {
    return {
      config: {},
      areaConfig: {},
    };
  },
  actions: {
    getAppConfig() {
      return axios
        .get<AppConfig>('/get_appconfig?r=' + Math.random())
        .then((res) => {
          const homeType = import.meta.env.DEV && dev_config.TYPE ? dev_config.TYPE : res.data.TYPE;
          this.config = res.data;
          if (homeType === 'school') {
            // TODO
          } else if (homeType === 'area') {
            // TODO
          }
        })
        .catch((err) => {
          document.write(err, '获取配置失败！请检查 nginx 配置');
        });
    },
    // async getAppConfig() {
    //   console.log('getAppConfig:::::');
    //   // if (import.meta.env.DEV) {
    //   //   // 开发环境配置
    //   //   this.config = {
    //   //     QUC: 'https://uc.qstcloud.net',
    //   //     OUREA_HR: 'https://hr.qstcloud.net',
    //   //     OUREA_STUDENT: 'https://jiuye.qstcloud.net',
    //   //     EXAM: 'https://tev-exam.qstcloud.net',
    //   //     GRAD: 'https://tev-grad.qstcloud.net',
    //   //     UPLUS: 'https://uea.qstcloud.net',
    //   //     COMPETITION: 'https://tev-competition.qstcloud.net',
    //   //     UPLUS_TEACHER: 'http://tev-course.qstcloud.net',
    //   //     BIGDATA: 'https://tev-bd.qstcloud.net',
    //   //     // CODE: '4111010050-C001',
    //   //     CODE: 'qstcloud',
    //   //     // CODE: 'Area-tev-athena-area',
    //   //     // TYPE: 'area',
    //   //     TYPE: '',
    //   //     HOME_PAGE_MODULES: 'PROJECT,INTERN_PROJECT,COURSE,CAREER_COURSE',
    //   //     // HOME_PAGE_MODULES: 'PROJECT,INTERN_PROJECT,COURSE,CAREER_COURSE,COURSE_SYSTEM,HOT_JOB,JOB_FAIR,PREFERRED_ENTERPRISE'
    //   //   };
    //   //   if (this.config.TYPE.toLowerCase() === 'school') {
    //   //     await this.getCollegeConfig(this.config.CODE);
    //   //   }
    //   //   if (this.config.TYPE.toLowerCase() === 'area') {
    //   //     await this.getAreaConfig();
    //   //   }
    //   // } else {
    //   try {
    //     const appConfig = await axios.get('/get_appconfig');
    //     console.log('appConfig::::', appConfig);
    //     // this.config = { ...appConfig.data };
    //     // // 如果是学院专属页面，则获取学院相关配置
    //     // if (this.config.TYPE.toLowerCase() === 'school') {
    //     //   await this.getCollegeConfig(this.config.CODE);
    //     //   // if (getToken()) {
    //     //   //   await this.getUserConfig()
    //     //   // }
    //     // }
    //     // if (this.config.TYPE.toLowerCase() === 'area') {
    //     //   await this.getAreaConfig();
    //     // }
    //   } catch (err: any) {
    //     document.write(err, '获取配置失败！请检查 nginx 配置');
    //   }
    //   // }
    // },

    /** 获取学院相关配置 */
    async getCollegeConfig(collegeCode: string) {
      // interface Config {
      //   [propName: string]: any;
      // }
      // const collegeConfig: Config = {};
      const res = await axiosBaseInstance.get(
        `${ApiRoots.uranus}/base/config/college?param=${collegeCode}`,
      );
      console.log('college res::::', res);
      // getResult(res).forEach((el: Config) => {
      //   collegeConfig[el.configKey] = el.configValue;
      // });
      // // 覆盖 appConfig 中相同配置项；增加 appConfig 中没有的配置项
      // for (const key in collegeConfig) {
      //   this.config[key] = collegeConfig[key];
      // }
      // this.updateConfig('college');
    },

    /** 更新配置 */
    updateConfig(type: string) {
      // 兼容历史数据
      this.config.LOGO = this.config.LOGO || this.config.badge;
      this.config.CUSTOMPAGE_LOGO =
        type === 'user' ? this.config.LOGO : this.config.CUSTOMPAGE_LOGO || this.config.pageLogo;
      this.config.WEB_ICON = this.config.WEB_ICON || this.config.pageIcon;
      this.config.PRODUCT_CODE = this.config.PRODUCT_CODE || 'uplus';
      // 设置页签
      document.title = this.config.TITLE || '产教融合云';
      if (this.config.WEB_ICON) {
        const link: any =
          document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = this.config.WEB_ICON;
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      // console.log('---config---', this.config)
    },

    /* 获取区域专属首页配置 */
    async getAreaConfig() {
      try {
        const res = await axiosBaseInstance.get(
          `${ApiRoots.portal}/website_configs/${this.config.CODE}`,
        );

        if (res?.data?.data) {
          // const areaConfig = getResult(res);
          // this.config.TITLE = areaConfig?.browserTabTitle || '产教融合云';
          // this.config.WEB_ICON = areaConfig?.browserTabIcon || null;
          // this.config.HOMO_BANNER = areaConfig?.banner || [];
          // this.config.CUSTOMPAGE_LOGO = areaConfig?.domainLogo || null;
        }
        // 设置页签
        document.title = this.config.TITLE || '产教融合云';
        if (this.config.WEB_ICON) {
          const link: any =
            document.querySelector("link[rel*='icon']") || document.createElement('link');
          link.type = 'image/x-icon';
          link.rel = 'shortcut icon';
          link.href = this.config.WEB_ICON;
          document.getElementsByTagName('head')[0].appendChild(link);
          // link.remove()
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
});
