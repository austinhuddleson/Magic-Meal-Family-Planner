
export enum DietaryRestriction {
  None = 'None',
  Vegan = 'Vegan',
  Vegetarian = 'Vegetarian',
  GlutenFree = 'Gluten-Free',
  DairyFree = 'Dairy-Free',
  NutFree = 'Nut-Free',
  LowCarb = 'Low Carb',
  HighProtein = 'High Protein',
  AnemiaBusters = 'Anemia Busters'
}

export enum CookingMechanism {
  Oven = 'Oven',
  Stovetop = 'Stovetop',
  AirFryer = 'Air Fryer',
  Griddle = 'Griddle',
  PizzaOven = 'Pizza Oven',
  Microwave = 'Microwave'
}

export enum TimeLimit {
  Quick = '15-20 mins',
  Moderate = '30-40 mins',
  Standard = '45-60 mins',
  Slow = '60+ mins'
}

export interface Ingredient {
  name: string;
  amount: string;
  section: string; // e.g., Produce, Meat, Dairy, Pantry
}

export interface Recipe {
  id: string;
  name: string;
  theme: string;
  movieReference: string;
  description: string;
  prepTime: string;
  cookTime: string;
  ingredients: Ingredient[];
  instructions: string[];
  kidsHelp: string[];
  isDessert?: boolean;
}

export interface DayPlan {
  day: string;
  recipe: Recipe;
  dessert?: Recipe;
}

export interface MealPlan {
  title: string;
  days: DayPlan[];
}

export interface PlannerPreferences {
  dietaryRestrictions: DietaryRestriction[];
  cookingMechanisms: CookingMechanism[];
  timeLimit: TimeLimit[];
  themeType: string;
  numberOfDays: number;
  servings: number;
  inclusions: string;
  exclusions: string;
  includeDessert: boolean;
}
