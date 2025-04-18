<template>
  <el-container>
    <!-- desktop -->
    <el-aside v-if="!isMobile" width="200px" class="header">
      <Navbar />
    </el-aside>

    <!-- tablet/mobile -->
    <el-button
      v-if="isMobile"
      type="primary"
      @click="handleDrawerOpen"
      class="menu_button"
      size="large"
      circle
      :icon="Menu"
    >
    </el-button>

    <el-drawer
      v-model="drawerOpen"
      title="I am the title"
      :with-header="false"
      :size="180"
      class="menu_drawer"
    >
      <Navbar />
    </el-drawer>

    <el-main class="main">
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useDeviceStore } from '@/stores/deviceStore';
import { storeToRefs } from 'pinia';
import { Menu } from '@element-plus/icons-vue';

const deviceStore = useDeviceStore();
const { isMobile, isTablet } = storeToRefs(deviceStore);

const drawerOpen = ref<boolean>(false);

const handleDrawerOpen = () => {
  drawerOpen.value = !drawerOpen.value;
};

const handleResize = () => {
  const width = window.innerWidth;
  deviceStore.isMobile = width <= 767;
  deviceStore.isTablet = width <= 1024;
};

const init = () => {
  handleResize();
  window.addEventListener('resize', handleResize);
};

const destroy = () => {
  window.removeEventListener('resize', handleResize);
};

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  destroy();
});
</script>

<style lang="less" scoped>
.main {
  height: 100vh;
  padding: 0;
}

.menu_button {
  position: absolute;
  right: 0;
  bottom: 16px;
  background-color: @color-primary;
  color: @color-background-base;
  border: none;

  &.el-button {
    width: 60px;
    height: 60px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: rgba(@color-primary, 0.6) 0 0 10px;
  }

  :deep(.el-icon) {
    font-size: 18px;
  }
}

::v-deep .menu_drawer {
  background: rgba(@color-background-light, 0.95);

  .el-drawer__body {
    padding: 0;
  }
}
</style>
