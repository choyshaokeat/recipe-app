<template>
  <div>
    <div class="home_container">
      <!-- Saved recipe -->
      <div class="home_container--inner">
        <h3 class="title">Saved Recipes</h3>
        <RecipeFilter
          :data="localRecipe"
          @update:filtered="filteredRecipes = $event"
        />
        <div class="recipe_container">
          <div v-if="filteredRecipes.length <= 0">No item found</div>
          <div v-else v-for="(recipe, i) in filteredRecipes" :key="i">
            <RecipeCard
              :recipe="recipe"
              :selected="
                recipe.name == selectedRecipe?.name &&
                recipe.image == selectedRecipe?.image
              "
              @click="selectRecipe(recipe)"
            />
          </div>
        </div>
      </div>

      <!-- Recipe detail -->
      <!-- desktop -->
      <div v-if="!isMobile" class="home_container--inner">
        <h3 class="title">Details</h3>
        <RecipeDetail v-if="selectedRecipe" :recipe="selectedRecipe" />
        <div v-else>No recipe selected</div>
      </div>
      <!-- mobile -->
      <el-drawer
        v-else
        v-model="drawerOpen"
        direction="btt"
        size="100%"
        :withHeader="false"
      >
        <div :class="['header_container', { mobile_dialog: isMobile }]">
          <h3 class="title">Details</h3>
          <el-icon class="close_icon" @click="drawerOpen = false"
            ><CloseBold
          /></el-icon>
        </div>
        <RecipeDetail :recipe="selectedRecipe" />
      </el-drawer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import RecipeCard from '@/components/RecipeCard.vue';
import RecipeDetail from '@/components/RecipeDetail.vue';
import RecipeFilter from '@/components/RecipeFilter.vue';
import { Recipe } from '@/types/recipe';
import { storeToRefs } from 'pinia';
import { useRecipeStore } from '@/stores/recipeStore';
import { useDeviceStore } from '@/stores/deviceStore';

const deviceStore = useDeviceStore();
const { isMobile } = storeToRefs(deviceStore);

const recipeStore = useRecipeStore();
const { localRecipe } = storeToRefs(recipeStore);
const filteredRecipes = ref<Recipe[]>([]);
const selectedRecipe = ref<Recipe | null>(null);
let drawerOpen = ref<boolean>(false);

watch(
  () => drawerOpen.value,
  (newVal: boolean) => {
    if (!newVal) selectedRecipe.value = null;
  }
);

const toArray = (data: string | string[]) => {
  return Array.isArray(data) ? data : [data];
};

const selectRecipe = (data: Recipe) => {
  selectedRecipe.value = {
    ...data,
    recipeCategory: toArray(data.recipeCategory).join(','),
    recipeCuisine: toArray(data.recipeCuisine).join(','),
  };
  drawerOpen.value = true;
};
</script>

<style lang="less" scoped>
.title {
  color: @color-primary;
  font-weight: 900;
}

.mobile_dialog {
  margin-top: 300px;
}

.header_container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .close_icon {
    padding-top: 8px;
    color: @color-primary;
  }
}

.home_container {
  display: flex;
  // gap: 24px;

  .home_container--inner {
    flex: 1;
    height: 100vh;
    overflow-y: auto;
    padding-right: 24px;
  }

  ::v-deep .el-drawer {
    background-color: transparent !important;
  }
}

.recipe_container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin-bottom: 24px;
}

/* Tablet */
.tablet({
  .recipe_container {
    grid-template-columns: 1fr;
  }
});

/* Mobile */
.mobile({
  .home_container {
    gap: 12px;
    padding: 12px;
    
    .home_container--inner {
      padding-right: 0;
      height: auto;
    }
  }

  .recipe_container {
    gap: 12px;
    margin-bottom: 24px;
  }
});
</style>
