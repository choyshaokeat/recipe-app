<template>
  <div class="recipe_card">
    <img
      v-if="recipe?.image?.length > 0"
      class="recipe_img"
      :src="recipe?.image[0]"
      alt="img"
    />
    <div class="recipe_content">
      <div class="recipe_title_container">
        <h1 class="recipe_title">{{ recipe?.name }}</h1>
        <el-button
          :icon="isSaved ? Check : Plus"
          size="small"
          round
          @click="handleSave(recipe)"
        >
          {{ isSaved ? 'Saved' : 'Save' }}
        </el-button>
      </div>
      <p class="recipe_description">{{ recipe?.description }}</p>

      <div class="recipe_meta">
        <span>
          <strong>Prep:</strong> {{ formatPrepTime(recipe?.prepTime) }}
        </span>
        <span>
          <strong>Cook:</strong> {{ formatPrepTime(recipe?.cookTime) }}
        </span>
        <span>
          <strong>Total:</strong> {{ formatPrepTime(recipe?.totalTime) }}
        </span>
      </div>

      <div class="recipe_section">
        <h3>Ingredients</h3>
        <ul>
          <li v-for="(ingredient, i) in recipe?.recipeIngredient" :key="i">
            {{ ingredient }}
          </li>
        </ul>
      </div>

      <div class="recipe_section">
        <h3>Instructions</h3>
        <ol v-if="Array.isArray(recipe?.recipeInstructions)">
          <li v-for="(step, i) in recipe?.recipeInstructions" :key="i">
            {{ step.text }}
          </li>
        </ol>
        <div v-else class="instruction_text">
          {{ recipe?.recipeInstructions }}
        </div>
      </div>

      <div class="recipe_footer">
        <span v-if="recipe?.author?.name"> By {{ recipe?.author.name }}</span>
        <span v-if="recipe?.recipeCategory">
          Category: {{ recipe?.recipeCategory }}
        </span>
        <span v-if="recipe?.recipeCuisine">
          Cuisine: {{ recipe?.recipeCuisine }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check, Plus } from '@element-plus/icons-vue';
import { Recipe } from '@/types/recipe';
import { useRecipeStore } from '@/stores/recipeStore';
import { computed } from 'vue';
import { ElMessage } from 'element-plus';

const props = defineProps<{
  recipe?: Recipe;
}>();

const recipeStore = useRecipeStore();

const isSaved = computed(() =>
  recipeStore.localRecipe?.some(
    (i) => JSON.stringify(i) == JSON.stringify(props.recipe)
  )
);

const formatPrepTime = (text: string | null) => {
  if (!text) return 'N/A';
  return text.replace('PT', '');
};

const handleSave = (recipe: Recipe) => {
  if (isSaved.value) {
    recipeStore.removeLocalRecipe(recipe); // remove recipe from saved recipe store
    ElMessage({
      message: 'Recipe removed successfully',
      type: 'success',
      customClass: 'custom_message',
      showClose: true,
    });
  } else {
    recipeStore.addLocalRecipe(recipe); // add recipe to saved recipe store
    ElMessage({
      message: 'Recipe saved sucessfully',
      type: 'success',
      customClass: 'custom_message',
      showClose: true,
    });
  }
};
</script>

<style scoped lang="less">
.recipe_card {
  display: flex;
  flex-direction: column;
  background: #1a1a1a;
  color: #fff;
  border-radius: 12px;
  max-width: 700px;
  margin: auto;
  margin-bottom: 24px;
  overflow: hidden;

  .recipe_img {
    width: 100%;
    max-height: 320px;
    object-fit: cover;
  }

  .recipe_content {
    padding: 24px;

    .recipe_title_container {
      display: flex;
      gap: 16px;
      align-items: center;
      margin-bottom: 24px;
    }

    .recipe_title {
      font-size: 24px;
      margin: 0;
      color: @color-text-primary;
    }

    .recipe_description {
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 16px;
    }

    .recipe_meta {
      font-size: 13px;
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
      color: @color-text-muted;
    }

    .recipe_section {
      margin-bottom: 20px;

      h3 {
        color: @color-text-primary;
        margin-bottom: 8px;
      }

      ul,
      ol {
        margin: 0;
        padding-left: 20px;
        font-size: 14px;
      }

      .instruction_text {
        font-size: 14px;
      }
    }

    .recipe_footer {
      font-size: 12px;
      color: @color-text-muted;
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
  }

  .el-button {
    background-color: @color-grey-1;
    color: @color-black;
    border: none;

    &:hover {
      background-color: @color-grey-2;
      border: none;
    }
  }
}
</style>
