import { computed } from 'vue';
import { DayNightModeEnum } from '@itshixun/qst-ui-system';
import { useDark, useToggle } from '@vueuse/core';
import WujieVue from 'wujie-vue3';

export const useToggleDayNight = () => {
  // 是否夜间模式
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
  const { bus } = WujieVue;

  // 切换日间/夜间模式
  const toggleDayNight = () => {
    toggleDark(!isDark.value);
    bus.$emit('toggle-dark');
  };

  const dayNightMode = computed(() =>
    isDark.value ? DayNightModeEnum.dark : DayNightModeEnum.light,
  );

  return { isDark, toggleDayNight, dayNightMode };
};
