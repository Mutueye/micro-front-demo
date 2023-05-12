import { defineConfig, loadEnv } from 'vite';
import * as path from 'path';
import vue from '@vitejs/plugin-vue';
import Unocss from 'unocss/vite';
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import { theme, uplusIconCollection } from './unocss.theme';

const baseConfig = defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            const tagList = ['hex-color-picker', 'hex-alpha-color-picker'];
            return tagList.includes(tag);
          },
        },
      },
    }),
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1,
          warn: true,
          collections: {
            uplus: uplusIconCollection,
          },
        }),
      ],
      // unocss can't render icon class dynamically, when adding menu icon class
      // in route.meta.menuConfig, you must also add the icon class in safelist.
      // TODO get icon name list from all route's meta.iconName automatically
      safelist: ['i-mdi-collage', 'i-mdi-form-textbox-password', 'i-mdi-clover'],
      transformers: [transformerDirectives(), transformerVariantGroup()],
      theme,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  envDir: '../../env',
});

/**
 * 通过不同模式的dev命令来启动不同的开发环境：
 * npm run dev - .env.dev环境
 * npm run dev:prod- .env.prod环境
 * npm run dev:local - 启动本地服务调试，需要根据你的本地服务地址，在/env/.env.local里配置VITE_API_BASEPATH和ITE_API_GATEWAY变量
 */
export default defineConfig(({ mode }) => {
  // 取env环境变量配置，没取到则默认开发环境
  const viteEnvs = loadEnv(mode, '../../env');
  for (const k in viteEnvs) {
    process.env[k] = viteEnvs[k];
  }
  // api前缀
  const athena_api = process.env.VITE_API_PATH_ATHENA
    ? process.env.VITE_API_PATH_ATHENA
    : '/athena_api';
  const uranus_api = process.env.VITE_API_PATH_URANUS ? process.env.VITE_API_PATH_URANUS : '/api';

  // 要代理的地址
  const gateway = process.env.VITE_API_GATEWAY
    ? process.env.VITE_API_GATEWAY
    : 'https://qstcloud.com';

  return {
    build: {
      outDir: `../../dist/${process.env.npm_package_name}`,
    },
    ...baseConfig,
    base: process.env.VITE_APP_BASE_PATH ? process.env.VITE_APP_BASE_PATH : '/',
    server: {
      open: true,
      host: '0.0.0.0',
      port: 5100,
      proxy: {
        '/get_appconfig': {
          target: gateway,
          changeOrigin: true,
          secure: false,
        },
        [athena_api]: {
          target: `${gateway}`,
          changeOrigin: true,
          secure: false,
        },
        [uranus_api]: {
          target: `${gateway}`,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
