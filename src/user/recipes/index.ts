import { Recipe } from "./types";

export function useUserRecipes() {
  return [MOCK_RECIPE];
}

const MOCK_RECIPE: Recipe = {
  videoLink:
    "https://storage.googleapis.com/download/storage/v1/b/prepcart-prod-videos/o/videos%2FoEr5NAeuUSge9DokTC8bDBgaaBs8KWQtRFncE4?generation=1753390847760855&alt=media",
  thumbnail:
    "https://storage.googleapis.com/download/storage/v1/b/prepcart-prod-videos/o/thumbnails%2F6a799365103e4cde9f264c27b882eb58_1678329400~tplv-tiktokx-cropcenter-q:300:400:q72.heic?generation=1753390846430964&alt=media",
  dynamicCover:
    "https://storage.googleapis.com/download/storage/v1/b/prepcart-prod-videos/o/dynamic-covers%2F6a799365103e4cde9f264c27b882eb58_1678329400~tplv-tiktokx-cropcenter-q:300:400:q72.heic?generation=1753390845690183&alt=media",
  id: "94301f6e-3aa3-48e7-bccc-5abbc96eb527",
  source:
    "https://www.tiktok.com/@thelittlecake.la/video/7208369840007007531?lang=en",
  displayTitle: "Easy Fudgy Brownies",
  displayDescription:
    "A simple and delicious brownie recipe that is sure to become a favorite. These brownies are rich, fudgy, and perfect for any occasion.",
  cookTimeMinutes: 40,
  ingredients: [
    {
      name: "butter",
      quantity: "1",
      unit: "cup",
    },
    {
      name: "granulated sugar",
      quantity: "1",
      unit: "cup",
    },
    {
      name: "eggs",
      quantity: "3",
      unit: "large",
    },
    {
      name: "vanilla extract",
      quantity: "1",
      unit: "teaspoon",
    },
    {
      name: "vegetable oil",
      quantity: "1/2",
      unit: "cup",
    },
    {
      name: "unsweetened cocoa powder",
      quantity: "1/3",
      unit: "cup",
    },
    {
      name: "all-purpose flour",
      quantity: "1/2",
      unit: "cup",
    },
    {
      name: "baking soda",
      quantity: "1/4",
      unit: "teaspoon",
    },
    {
      name: "salt",
      quantity: "1/4",
      unit: "teaspoon",
    },
    {
      name: "chocolate chips",
      quantity: "1/2",
      unit: "cup",
    },
  ],
  instructions: [
    {
      instruction: "Melt the butter in a bowl.",
      startTimestamp: 5,
      endTimestamp: 6,
      timer: null,
    },
    {
      instruction:
        "Add the granulated sugar to the melted butter and whisk until combined.",
      startTimestamp: 6,
      endTimestamp: 10,
      timer: {
        durationMinutes: 1,
      },
    },
    {
      instruction: "Add the eggs and vanilla extract to the bowl.",
      startTimestamp: 11,
      endTimestamp: 14,
      timer: null,
    },
    {
      instruction: "Whisk until the mixture is smooth.",
      startTimestamp: 14,
      endTimestamp: 16,
      timer: {
        durationMinutes: 1,
      },
    },
    {
      instruction: "Pour in the vegetable oil and whisk until combined.",
      startTimestamp: 17,
      endTimestamp: 18,
      timer: null,
    },
    {
      instruction: "Add the cocoa powder and gently stir with a spatula.",
      startTimestamp: 19,
      endTimestamp: 22,
      timer: null,
    },
    {
      instruction: "Add the flour, baking soda, and salt.",
      startTimestamp: 24,
      endTimestamp: 27,
      timer: null,
    },
    {
      instruction: "Stir gently with a spatula until just combined.",
      startTimestamp: 28,
      endTimestamp: 30,
      timer: null,
    },
    {
      instruction: "Fold in the chocolate chips.",
      startTimestamp: 30,
      endTimestamp: 31,
      timer: null,
    },
    {
      instruction:
        "Preheat your oven to 325°F (160°C) and grease an 8x8 inch pan.",
      startTimestamp: 33,
      endTimestamp: 36,
      timer: null,
    },
    {
      instruction: "Line the pan with parchment paper.",
      startTimestamp: 36,
      endTimestamp: 40,
      timer: null,
    },
    {
      instruction: "Pour the batter into the prepared pan.",
      startTimestamp: 40,
      endTimestamp: 41,
      timer: null,
    },
    {
      instruction: "Bake for 40 minutes.",
      startTimestamp: 42,
      endTimestamp: 43,
      timer: {
        durationMinutes: 40,
      },
    },
    {
      instruction: "Let the brownies cool before cutting.",
      startTimestamp: 43,
      endTimestamp: 46,
      timer: null,
    },
  ],
};
