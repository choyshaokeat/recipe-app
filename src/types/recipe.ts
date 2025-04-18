interface Author {
  name: string;
}
interface RecipeBase {
  name: string;
  url: string;
  image: string[] | string;
  author: Author;
  datePublished: string;
  dateModified: string;
  description: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  keywords: string;
  recipeCuisine: string;
  recipeCategory: string;
  recipeIngredient: string[];
  recipeInstructions: string[] | string;
  [key: string]: any /* to cater other fields */;
}

export type Recipe = RecipeBase[];
