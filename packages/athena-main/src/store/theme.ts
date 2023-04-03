import { defineStore } from 'pinia';
import { setThemeClassByIndex } from 'qst-ui-system';
import WujieVue from 'wujie-vue3';

interface ThemeState {
  currentThemeIndex: number;
}

export const useThemeStore = defineStore('persist', {
  state: (): ThemeState => ({
    currentThemeIndex: 0,
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'theme',
        storage: localStorage,
      },
    ],
  },
  actions: {
    setCurrentThemeIndex(themeIndex: number) {
      // set theme class name on "html" tag
      setThemeClassByIndex(themeIndex);
      this.currentThemeIndex = themeIndex;
      const { bus } = WujieVue;
      bus.$emit('theme-change', themeIndex);
    },
  },
});
