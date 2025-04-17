import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Recipe } from '@/types/recipe';

export const useRecipeStore = defineStore(
  'recipe',
  () => {
    const localRecipe = ref<Recipe[]>([]);

    const addLocalRecipe = (recipe: Recipe) => {
      localRecipe.value.unshift(recipe);
    };

    const removeLocalRecipe = (recipe: Recipe) => {
      localRecipe.value = localRecipe.value.filter(
        (i) => JSON.stringify(i) !== JSON.stringify(recipe)
      );
    };

    return {
      localRecipe,
      addLocalRecipe,
      removeLocalRecipe,
    };
  },
  {
    persist: true,
  }
);
