import { CATEGORIES, HAND_TOOLS, OTHER, POWER_TOOLS } from '../typings/categories';

export const dataCategories: {
  categoriesToSelect: (HAND_TOOLS | POWER_TOOLS | OTHER | CATEGORIES)[];
  expectedCategories: (HAND_TOOLS | POWER_TOOLS | OTHER)[];
}[] = [
  {
    categoriesToSelect: [POWER_TOOLS.SANDER],
    expectedCategories: [POWER_TOOLS.SANDER],
  },
  {
    categoriesToSelect: [POWER_TOOLS.SANDER, POWER_TOOLS.DRILL],
    expectedCategories: [POWER_TOOLS.SANDER, POWER_TOOLS.DRILL],
  },
  {
    categoriesToSelect: [CATEGORIES.POWER_TOOLS],
    expectedCategories: [POWER_TOOLS.SANDER, POWER_TOOLS.GRINDER, POWER_TOOLS.SAW, POWER_TOOLS.DRILL],
  },
];