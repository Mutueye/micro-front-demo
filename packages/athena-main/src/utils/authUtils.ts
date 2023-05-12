import { Base64 } from 'js-base64';
import { useAppConfigStore } from '@/store/appConfig';
import { athena_api } from './pathUtils';

export const redirectUri = encodeURIComponent(
  `${location.origin}${athena_api}/login?redirect_uri=${location.href}`,
);

export const goLogin = () => {
  const url = `${
    useAppConfigStore().config.QUC
  }/login?theme=athena&layout=${qucLayoutJson()}&redirect_uri=${redirectUri}`;
  location.href = url;
};

/** quc layout 携带的页签标题、logo、logo 跳转地址参数 */
export function qucLayoutJson() {
  if (useAppConfigStore().config.TYPE === '') {
    return '';
  } else {
    // logo图片和跳转地址
    const layoutJson = {
      // logo图片地址
      logoSrc: useAppConfigStore().config.CUSTOMPAGE_LOGO,
      // 点击logo要跳转的地址
      logoLink: `${window.location.protocol}//${window.location.host}`,
      // 浏览器标签的标题
      pageTitle: useAppConfigStore().config.TITLE,
      // 浏览器favicon
      pageIcon: useAppConfigStore().config.WEB_ICON,
    };
    // 转码
    const encodedLogoData = Base64.encodeURI(JSON.stringify(layoutJson));
    return encodedLogoData;
  }
}

/** 跳转到登出页面 */
export const goLogout = () => {
  location.href = `${
    useAppConfigStore().config.QUC
  }/logout?theme=athena&layout=${qucLayoutJson()}&redirect_uri=${redirectUri}`;
};
