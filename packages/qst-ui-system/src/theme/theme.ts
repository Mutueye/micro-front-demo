import { mix, toHex /* , toRgba */ } from 'color2k';
import { defaultThemeList } from './defaultThemeList';
import normalizeStyles from '../styles/normalize.css';
import overrideElementPlusStyles from '../styles/override_element_plus.css';

// theme css variable categories
export enum ThemeCategory {
  // 主题色
  Color = 'color',
  // 文字色
  TextColor = 'text-color',
  // 背景色
  BgColor = 'bg-color',
  // 边框色
  BorderColor = 'border-color',
  // 填充色
  FillColor = 'fill-color',
  // 圆角
  BorderRadius = 'border-radius',
  // 暂不启用box-shadow配置: BoxShadow = 'box-shadow',
  // 间距
  Space = 'space',
  // 字号
  FontSize = 'font-size',
  // 组件大小
  ComponentSize = 'component-size',
}

// 日间/夜间模式枚举
export enum DayNightModeEnum {
  light = 'light',
  dark = 'dark',
}

// 混合模式枚举，用于根据5种主色生成各主色的10个级别的亮色/暗色
export enum MixModeEnum {
  light = 'light',
  dark = 'dark',
}

export const cssVarCodex = {
  [ThemeCategory.Color]: ['primary', 'success', 'warning', 'danger', 'info'],
  [ThemeCategory.TextColor]: ['primary', 'regular', 'secondary', 'placeholder', 'disabled'],
  [ThemeCategory.BgColor]: ['DEFAULT', 'page', 'secondary'],
  [ThemeCategory.BorderColor]: ['extra-light', 'lighter', 'light', 'DEFAULT', 'dark', 'darker'],
  [ThemeCategory.FillColor]: [
    'blank',
    'extra-light',
    'lighter',
    'light',
    'DEFAULT',
    'dark',
    'darker',
  ],
  // border radius 在 element-plus 定义的变量之外，新增了'large'和'huge'值
  [ThemeCategory.BorderRadius]: ['small', 'base', 'large', 'huge', 'round', 'circle'],
  // [ThemeCategory.BoxShadow]: ['DEFAULT', 'light', 'lighter', 'dark'],
  // space不是element-plus原有变量，例--el-space-sm
  [ThemeCategory.Space]: ['xxxs', 'xxs', 'xs', 'sm', 'md', 'DEFAULT', 'lg', 'xl', 'xxl', 'xxxl'],
  [ThemeCategory.FontSize]: ['extra-small', 'small', 'base', 'medium', 'large', 'extra-large'],
  [ThemeCategory.ComponentSize]: ['small', 'DEFAULT', 'large', 'mini'],
} as const;

export type ThemeConfig = { [K in ThemeCategory]: Record<(typeof cssVarCodex)[K][number], string> };

export interface UITheme {
  name: string;
  config: {
    [T in DayNightModeEnum]: ThemeConfig;
  };
}

export const mixModeBaseColors = {
  [DayNightModeEnum.light]: {
    light: '#FFFFFF',
    dark: '#000000',
  },
  // light & dark are reversed in dark mode
  [DayNightModeEnum.dark]: {
    light: '#000000',
    dark: '#FFFFFF',
  },
};

/** 主题选项 */
export interface ThemeOption {
  /** 主题css变量命名空间 默认--el */
  namespace?: string;
  /** 主题列表 */
  themeList?: UITheme[];
  /** 主题样式设置完成后的回调函数 */
  onStylesSet?: () => void;
  /** 是否包含css重置样式(reset/normalize) 默认是 */
  cssReset?: boolean;
  /** 是否包含覆盖element-plus样式 默认是 */
  overrideElementPlus?: boolean;
}

const defaultThemeOption: ThemeOption = {
  namespace: '--el',
  themeList: defaultThemeList,
  cssReset: true,
  overrideElementPlus: true,
};

export const currentThemeList: UITheme[] = [];

/**
 * 初始化QstUI
 * @param option {ThemeOption} UI主题选项
 */
export const initQstTheme = (option?: ThemeOption) => {
  // add theme style tag to html header
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  head.appendChild(style);
  style.setAttribute('id', 'theme');

  // inject theme css var styles to the style tag
  injectThemeStyle(option);

  // set the first theme in theme list as current enabled theme
  setThemeClassByIndex(0);
};

export const injectThemeStyle = (option: ThemeOption) => {
  // combind default options
  const finalOption = Object.assign({}, defaultThemeOption, option ? option : {});
  // clear theme list
  currentThemeList.length = 0;
  // set current theme list
  currentThemeList.push(...finalOption.themeList);

  const styleEl = document.head.querySelector('#theme') as HTMLElement;
  let styleStr = '';
  const { namespace, themeList } = finalOption;
  themeList.forEach((theme) => {
    Object.keys(DayNightModeEnum).forEach((mode) => {
      const themeStyleStr = generateThemeStyle({
        namespace,
        targetTheme: theme,
        mode: mode as DayNightModeEnum,
      });
      if ((mode as DayNightModeEnum) === DayNightModeEnum.light) {
        styleStr += `.${theme.name} { ${themeStyleStr} }`;
      } else {
        styleStr += `.${theme.name}.${mode} { ${themeStyleStr} }`;
      }
    });
  });
  styleEl.innerText = `${generateResetStyles(finalOption)} ${styleStr}`;
  if (finalOption && typeof finalOption.onStylesSet === 'function') {
    finalOption.onStylesSet();
  }
};

/** 生成初始化样式&组件库(比如element-plus）的全局覆盖样式 */
const generateResetStyles = (option: ThemeOption) => {
  const { namespace, overrideElementPlus, cssReset } = option;

  let styleStr = `${
    cssReset ? normalizeStyles : ''
  } body { font-size: var(${namespace}-font-size-base); background-color: var(${namespace}-bg-color-page); }`;
  if (overrideElementPlus) {
    styleStr += (overrideElementPlusStyles as string).replace('--el-', `${namespace}-`);
  }
  return styleStr;
};

// const getNakedRgba = (str: string) => {
//   const rgbaStr = toRgba(str);
//   if (rgbaStr.startsWith('rgba(')) {
//     return rgbaStr.slice(5, rgbaStr.length - 1);
//   } else {
//     return rgbaStr;
//   }
// };

const generateThemeStyle = ({
  namespace,
  targetTheme,
  mode,
}: {
  namespace: string;
  targetTheme: UITheme;
  mode: DayNightModeEnum;
}) => {
  const config = targetTheme.config[mode];
  let styleStr = '';
  let configKey: ThemeCategory;
  for (configKey in config) {
    const oneConfig = config[configKey];
    Object.keys(oneConfig).forEach((valKey) => {
      const cssVarName =
        valKey === 'DEFAULT' ? `${namespace}-${configKey}` : `${namespace}-${configKey}-${valKey}`;
      styleStr += `${cssVarName}: ${oneConfig[valKey as keyof typeof oneConfig]}; `;
      // if (configKey.includes('color')) {
      //   styleStr += `${cssVarName + '-rgba'}: ${getNakedRgba(
      //     oneConfig[valKey as keyof typeof oneConfig],
      //   )}; `;
      // }
      if (configKey === ThemeCategory.Color) {
        Object.keys(MixModeEnum).forEach((mixmode) => {
          for (let i = 1; i < 10; i++) {
            styleStr += `${cssVarName}-${mixmode}-${i}: ${toHex(
              mix(
                oneConfig[valKey as keyof typeof oneConfig],
                mixModeBaseColors[mode][mixmode as MixModeEnum],
                i * 0.1,
              ),
            )}; `;
            // styleStr += `${cssVarName}-${mixmode}-${i}-rgba: ${getNakedRgba(
            //   mix(
            //     oneConfig[valKey as keyof typeof oneConfig],
            //     mixModeBaseColors[mode][mixmode as MixModeEnum],
            //     i * 0.1,
            //   ),
            // )}; `;
          }
        });
      }
    });
  }

  // 关联冗余的element变量到已赋值的变量
  // --el-color-error = --el-color-danger;
  styleStr = styleStr.concat(' ', `${namespace}-color-error: var(${namespace}-color-danger);`);
  // --el-bg-color-overlay = --el-bg-color;
  styleStr = styleStr.concat(' ', `${namespace}-bg-color-overlay: var(${namespace}-bg-color);`);

  return styleStr;
};

export const setThemeClassByIndex = (themeIndex: number) => {
  // set theme class name on "html" tag
  if (themeIndex > currentThemeList.length - 1) return;
  const htmlEl = document.getElementsByTagName('html')[0];
  const targetThemeName = currentThemeList[themeIndex].name;
  currentThemeList.forEach((theme) => {
    // delete previous theme classes
    if (htmlEl.classList.contains(theme.name) && theme.name !== targetThemeName) {
      htmlEl.classList.remove(theme.name);
    }
  });
  // add target theme class to html tag
  if (!htmlEl.classList.contains(targetThemeName)) {
    htmlEl.classList.add(targetThemeName);
  }
};
