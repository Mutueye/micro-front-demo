type Arrayable<T> = T | T[];

interface ThemeAnimation {
  keyframes?: Record<string, string>;
  durations?: Record<string, string>;
  timingFns?: Record<string, string>;
  properties?: Record<string, object>;
  counts?: Record<string, string | number>;
}
interface Colors {
  [key: string]: Colors | string;
}
export interface Theme {
  width?: Record<string, string>;
  height?: Record<string, string>;
  maxWidth?: Record<string, string>;
  maxHeight?: Record<string, string>;
  minWidth?: Record<string, string>;
  minHeight?: Record<string, string>;
  inlineSize?: Record<string, string>;
  blockSize?: Record<string, string>;
  maxInlineSize?: Record<string, string>;
  maxBlockSize?: Record<string, string>;
  minInlineSize?: Record<string, string>;
  minBlockSize?: Record<string, string>;
  borderRadius?: Record<string, string>;
  breakpoints?: Record<string, string>;
  verticalBreakpoints?: Record<string, string>;
  colors?: Colors;
  fontFamily?: Record<string, string>;
  fontSize?: Record<string, string | [string, string]>;
  lineHeight?: Record<string, string>;
  letterSpacing?: Record<string, string>;
  wordSpacing?: Record<string, string>;
  boxShadow?: Record<string, string | string[]>;
  textIndent?: Record<string, string>;
  textShadow?: Record<string, string | string[]>;
  textStrokeWidth?: Record<string, string>;
  ringWidth?: Record<string, string>;
  lineWidth?: Record<string, string>;
  spacing?: Record<string, string>;
  duration?: Record<string, string>;
  aria?: Record<string, string>;
  data?: Record<string, string>;
  blur?: Record<string, string>;
  dropShadow?: Record<string, string | string[]>;
  easing?: Record<string, string>;
  media?: Record<string, string>;
  supports?: Record<string, string>;
  containers?: Record<string, string>;
  animation?: ThemeAnimation;
  gridAutoColumn?: Record<string, string>;
  gridAutoRow?: Record<string, string>;
  gridColumn?: Record<string, string>;
  gridRow?: Record<string, string>;
  gridTemplateColumn?: Record<string, string>;
  gridTemplateRow?: Record<string, string>;
  container?: {
    center?: boolean;
    padding?: string | Record<string, string>;
  };
  /** Used to generate CSS variables placeholder in preflight */
  preflightRoot?: Arrayable<string>;
  preflightBase?: Record<string, string | number>;
}

// css变量前缀
export type CssVarConfigType = Record<string, (string | CssVarConfigType)[]>;
export interface ConfigList {
  [key: string]: ConfigList | string;
}

// 主题配置css变量对照表
// TODO get css var config from cssVarCodex
const cssVarConfig: CssVarConfigType = {
  color: ['primary', 'success', 'warning', 'danger', 'error', 'info'],
  'text-color': ['primary', 'regular', 'secondary', 'placeholder', 'disabled'],
  'bg-color': ['DEFAULT', 'overlay', 'page', 'secondary'],
  'border-color': ['DEFAULT', 'light', 'lighter', { extra: ['light'] }, 'dark', 'darker'],
  'fill-color': ['DEFAULT', 'light', 'lighter', { extra: ['light'] }, 'dark', 'darker', 'blank'],
  'border-radius': ['base', 'small', 'round', 'circle'],
  'box-shadow': ['DEFAULT', 'light', 'lighter', 'dark'],
  space: ['xxxs', 'xxs', 'xs', 'sm', 'md', 'DEFAULT', 'lg', 'xl', 'xxl', 'xxxl'],
  'font-size': ['extra-small', 'small', 'base', 'medium', 'large', 'extra-large'],
  'component-size': ['small', 'DEFAULT', 'large'],
};

// 生成主题色变量配置表
const generateMainColors = (namespace: string) => {
  const colors: Record<string, unknown> = {};
  cssVarConfig.color.forEach((colorType) => {
    colors[colorType as string] = { DEFAULT: `var(${namespace}-color-${colorType})` };
    const mixModes = ['light', 'dark'];
    mixModes.forEach((mixMode) => {
      const subColors: Record<number, string> = {};
      for (let i = 1; i < 10; i++) {
        subColors[i] = `var(${namespace}-color-${colorType}-${mixMode}-${i})`;
      }
      colors[colorType as string][mixMode] = subColors;
    });
  });
  return colors;
};

// 根据类型生成对应的css变量配置列表
const generateCssVarFromConfig = (
  config: CssVarConfigType,
  key: string,
  namespace: string,
  keyPrepend = '',
) => {
  const list: ConfigList = {};
  const targetCnofigSource = config[key];
  if (targetCnofigSource) {
    targetCnofigSource.forEach((type) => {
      if (typeof type === 'string') {
        if (type === 'DEFAULT') {
          list[keyPrepend ? keyPrepend : type] = `var(${namespace}-${key})`;
        } else {
          list[keyPrepend ? keyPrepend + '-' + type : type] = `var(${namespace}-${key}-${type})`;
        }
      } else {
        const subKey = Object.keys(type as CssVarConfigType)[0];
        list[keyPrepend ? keyPrepend + '-' + subKey : subKey] = generateCssVarFromConfig(
          type as CssVarConfigType,
          subKey,
          `${namespace}-${key}`,
        );
      }
    });
  }
  return list;
};

const getDefaultSizes = (namespace: string) => {
  return {
    ...generateCssVarFromConfig(cssVarConfig, 'space', namespace, 'space'),
    ...generateCssVarFromConfig(cssVarConfig, 'component-size', namespace, 'component-size'),
    header: '72px',
    'left-menu': '300px',
  };
};

// theme配置示例。默认theme配置详见unocss源码：
// https://github.com/unocss/unocss/tree/main/packages/preset-mini/src/_theme
export const generateUnocssTheme: (namespace?: string) => Theme = (namespace = '--el') => {
  return {
    width: getDefaultSizes(namespace),
    height: getDefaultSizes(namespace),
    spacing: getDefaultSizes(namespace),
    boxShadow: {
      // 示例
      none: 'none',
      sm: '0 1px 2px 0 rgb(0 0 0 / 5%)',
      DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 5%), 0 1px 2px 0 rgb(0 0 0 / 2%)',
      md: '0 4px 6px -1px rgb(0 0 0 / 7%), 0 2px 4px -1px rgb(0 0 0 / 6%)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 10%), 0 10px 10px -5px rgb(0 0 0 / 4%)',
      ...generateCssVarFromConfig(cssVarConfig, 'box-shadow', namespace),
    },
    // 如果自定义breakpoints，会覆盖默认配置，而不是像其他一样合并默认配置
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px',
    },
    borderRadius: {
      none: '0',
      xs: '2px',
      sm: '4px',
      md: '6px',
      lg: '8px',
      xl: '10px',
      xxl: '12px',
      full: '9999px',
      ...generateCssVarFromConfig(cssVarConfig, 'border-radius', namespace),
    },
    colors: {
      theme: `var(${namespace}-color-primary)`,
      ...generateMainColors(namespace),
      text: generateCssVarFromConfig(cssVarConfig, 'text-color', namespace),
      bg: generateCssVarFromConfig(cssVarConfig, 'bg-color', namespace),
      border: generateCssVarFromConfig(cssVarConfig, 'border-color', namespace),
      fill: generateCssVarFromConfig(cssVarConfig, 'fill-color', namespace),
    },
    fontFamily: {
      main: 'PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif',
    },
    fontSize: {
      ...(generateCssVarFromConfig(cssVarConfig, 'font-size', namespace) as Record<string, string>),
    },
  };
};
