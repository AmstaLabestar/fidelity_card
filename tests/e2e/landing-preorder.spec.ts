import { test, expect } from '@playwright/test';

test.describe('Landing Page & Preorder Flow', () => {
  test('User can see hero section and navigate to preorder', async ({ page }) => {
    // 1. Visit the landing page
    await page.goto('/');
    
    // We wait for the hero section CTA to appear
    const primaryCta = page.locator('a.btn-primary').first();
    await expect(primaryCta).toBeVisible();

    // The text content is loaded via next-intl, but let's test the href attribute
    await expect(primaryCta).toHaveAttribute('href', /register\?intent=preorder/);
    
    // 2. Click the CTA
    await primaryCta.click();
    
    // 3. Ensure navigation happens (User ends up on the register page)
    await expect(page).toHaveURL(/.*\/register\?intent=preorder/);
  });

  test('User can fill the auth form (simulation)', async ({ page }) => {
    await page.goto('/register?intent=preorder');
    
    // Basic form interactions - verify inputs exist
    const nameInput = page.getByLabel(/Name/i).or(page.locator('input[name="name"]'));
    const emailInput = page.getByLabel(/Email/i).or(page.locator('input[type="email"]'));
    const passwordInput = page.getByLabel(/Password/i).or(page.locator('input[type="password"]'));
    const submitButton = page.locator('button[type="submit"]');

    if (await submitButton.count() > 0) {
      await nameInput.fill('Test User');
      await emailInput.fill('test@example.com');
      await passwordInput.fill('password123');
      
      // Stop before actual submission to prevent polluting a real remote DB by default, 
      // but ensure elements are interactable.
      await expect(submitButton).toBeEnabled();
    }
  });
});
