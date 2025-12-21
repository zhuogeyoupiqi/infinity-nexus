import { ref, computed, watchEffect } from 'vue';
import { themePalette, type ThemeKey, type ThemeConfig } from '@/config/theme-config';

// 全局单例状态 (放在函数外，保证多组件共享状态)
const currentThemeKey = ref<ThemeKey>('infinity');

export function useAppTheme() {
  const currentTheme = computed<ThemeConfig>(() => themePalette[currentThemeKey.value]);

  // 核心切换逻辑
  const switchTheme = (key: ThemeKey) => {
    currentThemeKey.value = key;
  };

  // 监听主题变化，注入 CSS 变量
  watchEffect(() => {
    const config = currentTheme.value;
    const root = document.documentElement;

    // 1. 设置 data-theme 属性，方便做 CSS 作用域隔离
    root.setAttribute('data-theme', config.key);

    // 2. 注入 CSS 变量 (架构核心)
    // 变量名建议加前缀 --app- 以防冲突
    const cssVars = {
      '--app-primary': config.colors.primary,
      '--app-gradient': config.colors.primaryGradient,
      '--app-bg-layout': config.colors.bgLayout,
      '--app-bg-container': config.colors.bgContainer,
      '--app-bg-sidebar': config.colors.bgSidebar,
      '--app-text-main': config.colors.textMain,
      '--app-text-sub': config.colors.textSub,
      '--app-glass-border': config.colors.glassBorder,
    };

    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  });

  return {
    currentTheme,
    switchTheme,
    themeList: Object.values(themePalette),
  };
}