# 🎭 yajsc-playwright

A learning repository for mastering automated web testing using [Playwright](https://playwright.dev/).

## 📚 Description

This project was created to learn and practice Playwright-based test automation. It includes examples of working with UI tests, creating branches, pushing to GitHub, and opening Pull Requests.

## 🚀 Getting Started

1. Install [Node.js](https://nodejs.org/) (v16 or later).
2. Initialize a new Playwright project:

```bash
npm init playwright@latest

❗ During setup, choose TypeScript as the project language.

3. Push your project to this repository:
https://github.com/ViktoriaKalba/yajsc-playwright/tree/main

4. Create a new branch, write your tests, commit, push, and open a Pull Request.

💻 Usage
Paste the following example into a .spec.ts file inside the tests folder:

import { test, expect } from '@playwright/test';

test('Alert disappears in 8 seconds', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');
  await page.click('#show-alert-button'); // Adjust selector if needed
  const alert = page.locator('.alert');
  await expect(alert).toBeVisible();
  await expect(alert).not.toBeVisible({ timeout: 8000 });
});

Run your test:
npx playwright test

🤝 Contributing
Feel free to fork the repo, create branches, and open Pull Requests as part of your learning process.

📄 License
This project is open-source and free to use.

📬 Contact
Created by Viktoriia Khomyk
GitHub Repo: yajsc-playwright