<template>
  <div>
    <div class="home_container">
      <!-- Public recipe -->
      <div class="home_container--inner">
        <h3 class="title">BROWSE</h3>
        <RecipeFilter
          :data="allRecipes"
          @update:filtered="filteredRecipes = $event"
        />
        <el-skeleton v-if="allRecipes.length <= 0" :rows="5" animated />
        <div class="recipe_container">
          <div v-if="allRecipes > 0 && filteredRecipes.length <= 0">
            No item found
          </div>
          <div
            v-else
            v-for="(recipe, i) in filteredRecipes"
            :key="i"
            class="recipe_card"
          >
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
        <h3 class="title">DETAILS</h3>
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
          <h3 class="title">DETAILS</h3>
          <el-icon class="close_icon" @click="drawerOpen = false">
            <CloseBold />
          </el-icon>
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
import { useDeviceStore } from '@/stores/deviceStore';

const deviceStore = useDeviceStore();
const { isMobile } = storeToRefs(deviceStore);
const allRecipes = ref<Recipe[]>([]);
const filteredRecipes = ref<Recipe[]>([]);
const selectedRecipe = ref<Recipe | null>(null);
let drawerOpen = ref<boolean>(false);

watch(
  () => drawerOpen.value,
  (newVal: boolean) => {
    if (!newVal) selectedRecipe.value = null;
  }
);

onMounted(async () => {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/micahcochran/json-cookbook/refs/heads/main/cookbook-100.json'
    );
    if (!response.ok) throw new Error('Failed to fetch recipes');
    const data: Recipe[] = await response.json();
    allRecipes.value = data;
  } catch (error) {
    console.error(error);
  }
});

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
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
}

.recipe_card {
  flex: 1 1 calc(50% - 8px);
  min-width: 280px;
}

:deep(.el-skeleton.is-animated .el-skeleton__item) {
  background: @color-background-light;
}

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
});
</style>
