import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDeviceStore = defineStore(
  'device',
  () => {
    const isMobile = ref<boolean>(false);
    const isTablet = ref<boolean>(false);

    return {
      isMobile,
      isTablet,
    };
  },
  {
    persist: true,
  }
);
