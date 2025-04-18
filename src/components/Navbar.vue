<template>
  <el-menu :default-active="active" router class="menu">
    <div class="logo_container">
      <div class="logo_text mb-3">EncoreFoodie</div>
    </div>
    <el-menu-item index="/browse">
      <el-icon><Search /></el-icon>
      <template #title>Browse</template>
    </el-menu-item>
    <el-menu-item index="/home">
      <el-icon><HomeFilled /></el-icon>
      <template #title>Home</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';

const route = useRoute();
const active = computed(() => route.path);
</script>

<style scoped lang="less">
.menu {
  background-color: transparent;
  margin: 16px;
  border: none;
  // width: 200px;
  padding: 2px 8px 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .logo_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .logo {
      height: 40px;
      width: 40px;
    }

    .logo_text {
      font-size: 20px;
      font-weight: 900;
    }
  }
}

.el-menu-item {
  background-color: @color-background-base;
  border-radius: 32px;
  color: @color-text-regular;
  font-weight: 700;

  &:hover {
    background-color: @color-background-hover;
  }

  &.is-active {
    color: @color-text-primary;
  }
}
</style>
