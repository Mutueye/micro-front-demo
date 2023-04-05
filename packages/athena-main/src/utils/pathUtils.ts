export const basePath = import.meta.env.VITE_APP_BASE_PATH
  ? import.meta.env.VITE_APP_BASE_PATH
  : '/';

// 适配单域名部署时 跳转站内url要带上根路径
export const joinBasePath = (url: string) => {
  if (url.startsWith('//') || url.startsWith('http://') || url.startsWith('https://')) {
    // 如果是完整的url 直接跳转
    return url;
  } else {
    // 环境变量配置的根路径 + 要跳转的站内url
    const basePathEndsWithSlash = basePath[basePath.length - 1] === '/';
    const urlStartsWidthSlash = url[0] === '/';
    if (basePathEndsWithSlash && urlStartsWidthSlash) {
      return basePath.slice(0, basePath.length - 1) + url;
    } else if (!basePathEndsWithSlash && !urlStartsWidthSlash) {
      return basePath + '/' + url;
    } else {
      return basePath + url;
    }
  }
};

// 给绝对地址静态资源的图片样式增加basePath
export const bgImgStyleWithBastPath = (bgUrl: string) => {
  return { backgroundImage: `url(${joinBasePath(bgUrl)})` };
};

// 路径拼接到windows.location.origin后面，以得到完整的url
export const joinLocationWithPath = (path: string) => {
  if (path.startsWith('//') || path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return `${window.location.origin}${
    path.startsWith('/') || path.startsWith('?') ? '' : '/'
  }${path}`;
};

export const baseLocation = joinLocationWithPath(basePath);

// 覆盖window.open，处理单域名部署时 直接window.open()缺少根路径的问题
export const overrideWindowOpen = (windowOpen: typeof window.open) => {
  return (
    url?: string | URL | undefined,
    target?: string | undefined,
    features?: string | undefined,
  ) => {
    const newUrl = joinBasePath(url as string);
    if (typeof windowOpen === 'function') {
      return windowOpen(newUrl, target, features);
    } else {
      return window.open(newUrl, target, features);
    }
  };
};
