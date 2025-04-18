<!-- RecipeFilter.vue -->
<template>
  <div class="filter_wrapper">
    <!-- Keyword/Ingredient filter -->
    <el-input
      v-model="filters[searchOption]"
      placeholder="Search"
      :suffix-icon="Search"
      clearable
      class="filter"
    >
      <template #prepend>
        <el-select
          v-model="searchOption"
          placeholder="Select"
          style="width: 115px"
        >
          <el-option label="Keyword" value="keyword" />
          <el-option label="Ingredient" value="ingredient" />
        </el-select>
      </template>
    </el-input>

    <!-- Category filter -->
    <el-select
      v-model="filters.category"
      placeholder="Select Category"
      clearable
      class="filter"
    >
      <el-option
        v-for="cat in categoryOptions"
        :key="cat"
        :label="cat"
        :value="cat"
      />
    </el-select>

    <!-- Cuisine filter -->
    <el-select
      v-model="filters.cuisine"
      placeholder="Select Cuisine"
      clearable
      class="filter"
    >
      <el-option v-for="c in cuisineOptions" :key="c" :label="c" :value="c" />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits, watch, onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { Recipe } from '@/types/recipe';

const props = defineProps<{
  data: Recipe[];
}>();

const emit = defineEmits<{
  (e: 'update:filtered', value: Recipe[]): void;
}>();

const filters = ref({
  category: '',
  cuisine: '',
  keyword: '',
  ingredient: '',
});

const searchOption = ref<'keyword' | 'ingredient'>('keyword');

const normalizeToStringArray = (
  input: string | string[] | undefined | null
): string[] => {
  if (!input) return [];
  if (Array.isArray(input)) return input.map((s) => s.trim().toLowerCase());
  return input.split(',').map((s) => s.trim().toLowerCase());
};

/* Flatten all categories */
const categoryOptions = computed(() => {
  const cats = props.data.flatMap((d) =>
    normalizeToStringArray(d.recipeCategory)
  );
  return [...new Set(cats)];
});

/* Flatten all cuisines */
const cuisineOptions = computed(() => {
  const cuisines = props.data.flatMap((d) =>
    normalizeToStringArray(d.recipeCuisine)
  );
  return [...new Set(cuisines)];
});

/* Filter function */
const filterData = () => {
  const { category, cuisine, keyword, ingredient } = filters.value;

  /* If no filter is selected */
  if (category == '' && cuisine == '' && keyword == '' && ingredient == '')
    emit('update:filtered', props.data);

  /* Filter selected */
  const filtered = props.data.filter((item) => {
    const matchCategory = category
      ? normalizeToStringArray(item.recipeCategory).includes(category)
      : true;

    const matchCuisine = cuisine
      ? normalizeToStringArray(item.recipeCuisine).includes(cuisine)
      : true;

    const matchKeyword = keyword
      ? item.keywords
          ?.toLowerCase()
          .includes(keyword.toLowerCase()) /* check keywords */ ||
        item.name
          ?.toLowerCase()
          .includes(keyword.toLowerCase()) /* check recipe name */
      : true;

    const matchIngredient = ingredient
      ? item.recipeIngredient?.some((ing) =>
          ing.toLowerCase().includes(ingredient.toLowerCase())
        )
      : true;

    return matchCategory && matchCuisine && matchKeyword && matchIngredient;
  });

  emit('update:filtered', filtered);
};

watch(
  () => [filters.value, props.data],
  () => {
    filterData();
  },
  { deep: true, immediate: true }
);
</script>

<style lang="less" scoped>
.filter_wrapper {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;

  ::v-deep {
    .el-input,
    .el-input-group__prepend,
    .el-input__wrapper,
    .el-select__wrapper {
      background-color: transparent !important;
      box-shadow: none !important;
    }

    .el-input-group__prepend {
      border-right: 1.5px solid @color-primary;
    }
  }

  .filter {
    border-radius: 10px;
    border: 1.5px solid @color-primary;
  }
}
</style>
