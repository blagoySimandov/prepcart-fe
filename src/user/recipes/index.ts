import { Recipe } from "./types";

const MOCK_RECIPE: Recipe = {
  displayTitle: "Easy & Delicious Fudgy Brownies",
  displayDescription:
    "This recipe delivers incredibly fudgy and moist brownies with a perfect crackly top. It's easy to follow and guaranteed to be a crowd-pleaser!",
  cookTimeMinutes: 40,
  thumbnail:
    "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=200&fit=crop&crop=center",
  ingredients: [
    {
      name: "butter",
      quantity: "1",
      unit: "cup",
    },
    {
      name: "sugar",
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
      quantity: "1/4",
      unit: "cup",
    },
    {
      name: "cocoa powder",
      quantity: "1/3",
      unit: "cup",
    },
    {
      name: "all-purpose flour",
      quantity: "1/2",
      unit: "cup",
    },
    {
      name: "cornstarch",
      quantity: "1",
      unit: "tablespoon",
    },
    {
      name: "baking soda",
      quantity: "1/2",
      unit: "teaspoon",
    },
    {
      name: "salt",
      quantity: "1/4",
      unit: "teaspoon",
    },
    {
      name: "chocolate chips",
      quantity: "1",
      unit: "cup",
    },
  ],
  instructions: [
    {
      instruction: "Melt butter in a bowl.",
      startTimestamp: 5,
      endTimestamp: 7,
      timer: null,
    },
    {
      instruction: "Add sugar to the melted butter and whisk until combined.",
      startTimestamp: 7,
      endTimestamp: 10,
      timer: null,
    },
    {
      instruction: "Add eggs and vanilla extract to the bowl.",
      startTimestamp: 11,
      endTimestamp: 15,
      timer: null,
    },
    {
      instruction: "Whisk until the mixture is smooth.",
      startTimestamp: 15,
      endTimestamp: 17,
      timer: null,
    },
    {
      instruction: "Add vegetable oil to the mixture.",
      startTimestamp: 17,
      endTimestamp: 19,
      timer: null,
    },
    {
      instruction:
        "Add cocoa powder, flour, cornstarch, baking soda, and salt.",
      startTimestamp: 19,
      endTimestamp: 27,
      timer: null,
    },
    {
      instruction: "Gently stir with a spatula until just combined.",
      startTimestamp: 27,
      endTimestamp: 30,
      timer: null,
    },
    {
      instruction: "Fold in chocolate chips.",
      startTimestamp: 30,
      endTimestamp: 31,
      timer: null,
    },
    {
      instruction:
        "Preheat oven to 325 degrees Fahrenheit (160 degrees Celsius).",
      startTimestamp: 33,
      endTimestamp: 35,
      timer: {
        durationMinutes: null,
      },
    },
    {
      instruction:
        "Grease and line an 8x8 inch baking pan with parchment paper.",
      startTimestamp: 35,
      endTimestamp: 41,
      timer: null,
    },
    {
      instruction: "Pour the batter into the prepared pan.",
      startTimestamp: 41,
      endTimestamp: 42,
      timer: null,
    },
    {
      instruction:
        "Bake for 40 minutes, or until a toothpick inserted into the center comes out with moist crumbs.",
      startTimestamp: 42,
      endTimestamp: 44,
      timer: {
        durationMinutes: 40,
      },
    },
    {
      instruction: "Let the brownies cool completely before cutting.",
      startTimestamp: 44,
      endTimestamp: 46,
      timer: null,
    },
    {
      instruction: "Cut into squares and enjoy!",
      startTimestamp: 46,
      endTimestamp: 47,
      timer: null,
    },
  ],
};

export function useUserRecipes() {
  return [MOCK_RECIPE];
}
