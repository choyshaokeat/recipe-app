<template>
  <div :class="['card', { active: selected }]">
    <div class="left_content">
      <div class="recipe_name mb-5">{{ recipe.name }}</div>
      <div class="recipe_meta">
        <strong>Estimated time:</strong>
        {{ formatPrepTime(recipe?.totalTime) }}
      </div>
    </div>

    <div class="right_img_content">
      <img
        v-if="recipe.image && recipe.image.length > 0"
        :src="recipe.image[0]"
        alt="image"
        class="right_img"
      />
      <div v-else class="fallback_err">
        <el-icon size="large"><Failed /></el-icon>
        <span>No Image</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Recipe } from '@/types/recipe';

defineProps<{
  recipe: Recipe;
  selected: boolean;
}>();

const formatPrepTime = (text: string | null) => {
  if (!text) return 'N/A';
  return text.replace('PT', '');
};
</script>

<style lang="less" scoped>
.card {
  background: @color-black;
  border-radius: 12px;
  display: flex;
  overflow: hidden;
  cursor: pointer;
  height: 170px;

  &.active {
    background: @color-black;

    .left_content {
      color: @color-text-primary;
      background: linear-gradient(
        133deg,
        rgb(21, 46, 39) 0%,
        rgba(11, 11, 11, 1) 80%
      );
    }
  }

  .right_img_content {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 115px;
    overflow: hidden;
    object-fit: cover;

    .right_img {
      height: 100%;
      width: auto;
      object-fit: cover;
    }

    .fallback_err {
      color: @color-text-muted;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      span {
        font-size: 12px;
      }
    }
  }

  .left_content {
    padding: 24px;
    width: 100%;
    font-weight: 700;
    background: linear-gradient(
      133deg,
      rgb(38, 38, 38) 0%,
      rgba(11, 11, 11, 1) 80%
    );
    // text-overflow: ellipsis;
    // overflow: hidden;
    // white-space: nowrap;

    .recipe_meta {
      font-size: 12px;
      color: @color-text-muted;
    }
  }

  .el-tag {
    border-radius: 20px;
  }
}
</style>
