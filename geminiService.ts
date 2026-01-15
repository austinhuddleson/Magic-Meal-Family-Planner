
import { GoogleGenAI, Type } from "@google/genai";
import { PlannerPreferences, MealPlan } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMealPlan = async (prefs: PlannerPreferences): Promise<MealPlan> => {
  const prompt = `
    Create a ${prefs.numberOfDays}-day family meal planner.
    Number of People to serve: ${prefs.servings}.
    Theme Type: ${prefs.themeType}.
    Dietary Specifications: ${prefs.dietaryRestrictions.join(", ") || "None"}.
    ${prefs.dietaryRestrictions.includes('Anemia Busters' as any) ? "Crucial: Focus on high-iron foods (e.g., spinach, lentils, lean red meat, fortified cereals) for the 'Anemia Busters' requirement." : ""}
    Available Cooking Appliances: ${prefs.cookingMechanisms.join(", ") || "Any"}.
    Specific Foods to Include: ${prefs.inclusions || "None"}.
    Specific Foods to Exclude: ${prefs.exclusions || "None"}.
    Acceptable Prep/Cook Time Ranges: ${prefs.timeLimit.join(", ") || "Any duration"}.
    Include a themed dessert for each day: ${prefs.includeDessert ? "Yes" : "No"}.
    
    Each recipe (including desserts) must:
    1. Have a fun name related to the movie theme.
    2. Be kid-friendly but delicious for adults.
    3. Scale ingredient quantities appropriately for ${prefs.servings} people.
    4. Include a 'kidsHelp' section with specific tasks for young children (3-7 years old).
    5. Categorize ingredients by grocery store sections (e.g., Produce, Dairy, Meat, Pantry, Frozen).
    6. ONLY use the specified cooking appliances if provided (appliances don't apply to desserts as strictly, but try to stick to them).
  `;

  const recipeSchema = {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING },
      name: { type: Type.STRING },
      theme: { type: Type.STRING },
      movieReference: { type: Type.STRING },
      description: { type: Type.STRING },
      prepTime: { type: Type.STRING },
      cookTime: { type: Type.STRING },
      ingredients: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            amount: { type: Type.STRING },
            section: { type: Type.STRING },
          },
          required: ["name", "amount", "section"]
        }
      },
      instructions: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      },
      kidsHelp: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    },
    required: ["id", "name", "theme", "movieReference", "description", "prepTime", "cookTime", "ingredients", "instructions", "kidsHelp"]
  };

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          days: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING },
                recipe: recipeSchema,
                dessert: { ...recipeSchema, nullable: true }
              },
              required: ["day", "recipe"]
            }
          }
        },
        required: ["title", "days"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text.trim()) as MealPlan;
};
