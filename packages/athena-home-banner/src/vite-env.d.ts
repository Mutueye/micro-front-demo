/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_GATEWAY: string;
  VITE_APP_BASE_PATH: string;
  VITE_API_PATH_ATHENA: string;
  VITE_API_PATH_URANUS: string;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
