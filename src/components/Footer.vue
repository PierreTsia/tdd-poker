<template>
  <footer class="text-center p-2">
    <ul class="flex justify-between w-1/3 mx-auto mb-8">
      <li class="cursor-pointer text-2xl">
        <a
          href="#"
          @click="toggleLocales"
          class="footer-link text-cyan-700 hover:text-cyan-500"
          :title="t('toggle_language')"
        >
          <i class="iconify" :data-icon="'ant-design:translation-outlined'" />
        </a>
      </li>
      <li class="cursor-pointer text-2xl">
        <a href="#" @click="toggleDark" class="text-cyan-700 hover:text-cyan-500" :title="t('toggle_theme')">
          <i class="iconify" :data-icon="'mdi:theme-light-dark'" />
        </a>
      </li>
      <li class="cursor-pointer text-2xl">
        <a
          href="https://github.com/PierreTsia"
          rel="noreferrer"
          target="_blank"
          class="footer-link text-cyan-700 hover:text-cyan-500"
          title="Github repo"
        >
          <i class="iconify" :data-icon="'mdi:github'" />
        </a>
      </li>
    </ul>

    <span class="text-xs"
      >{{ t('made_by') }}
      <a
        class="footer-link text-cyan-400 hover:text-cyan-500"
        href="https://github.com/alvarosaburido"
        rel="noreferrer"
        target="_blank"
        >Pierre Tsiakkaros</a
      ></span
    >
  </footer>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import { useTheme } from '/@/composables';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'Footer',
  setup: () => {
    const { t, availableLocales, locale } = useI18n();

    const toggleLocales = () => {
      const locales = availableLocales;
      locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
    };

    const { isDark, toggleDark } = useTheme();

    return { locale, t, toggleLocales, isDark, toggleDark };
  },
});
</script>
<style>
a,
.footer-link {
  @apply transition-all ease-out duration-100;
}

.footer-link {
  opacity: 0.8;
}
</style>
