import { test, expect } from '@playwright/test';

test.describe('Challenge Registration E2E', () => {
  // Test data
  const challengeId = 'test-challenge-123';
  const testUsers = [
    { email: 'user1@example.com', password: 'password123' },
    { email: 'user2@example.com', password: 'password123' },
    { email: 'user3@example.com', password: 'password123' },
  ];

  test.beforeEach(async ({ page }) => {
    // Navigate to the challenge page
    await page.goto(`/challenges/${challengeId}`);
  });

  test('full registration flow: signup → queue → group assignment', async ({ browser }) => {
    // We'll use multiple browser contexts to simulate different users
    const contexts = [];
    const pages = [];

    // Create a browser context for each test user
    for (const user of testUsers) {
      const context = await browser.newContext();
      contexts.push(context);
      
      const page = await context.newPage();
      pages.push(page);
      
      // Navigate to the challenge page
      await page.goto(`/challenges/${challengeId}`);
      
      // Sign in (assuming there's a sign-in button that redirects to Clerk)
      await page.getByRole('button', { name: /sign in/i }).click();
      
      // Fill in the sign-in form
      await page.getByLabel(/email/i).fill(user.email);
      await page.getByLabel(/password/i).fill(user.password);
      await page.getByRole('button', { name: /sign in/i }).click();
      
      // Wait for redirect back to the challenge page
      await page.waitForURL(`/challenges/${challengeId}`);
      
      // Verify we're signed in
      await expect(page.getByText(/ya estás inscrito|unirse al evento/i)).toBeVisible();
    }

    // Register each user for the challenge
    for (let i = 0; i < testUsers.length; i++) {
      const page = pages[i];
      
      // Click the join button if not already registered
      const joinButton = page.getByRole('button', { name: /unirse al evento/i });
      if (await joinButton.isVisible()) {
        await joinButton.click();
        
        // Wait for the registration to complete
        await expect(page.getByText(/ya estás inscrito/i)).toBeVisible();
      }
    }

    // Verify that users are assigned to a group
    // Since we have exactly teamSize users, they should all be in the same group
    for (let i = 0; i < testUsers.length; i++) {
      const page = pages[i];
      
      // Check for group assignment message
      await expect(page.getByText(/has sido asignado a un grupo/i)).toBeVisible();
      
      // Get the group ID from the first user
      if (i === 0) {
        const groupIdText = await page.getByText(/has sido asignado a un grupo/i).textContent();
        const groupId = groupIdText?.match(/ID: ([a-z0-9_-]+)/i)?.[1];
        
        // Verify all users have the same group ID
        for (let j = 1; j < testUsers.length; j++) {
          const otherPage = pages[j];
          await expect(otherPage.getByText(new RegExp(`has sido asignado a un grupo.*${groupId}`, 'i'))).toBeVisible();
        }
      }
    }

    // Clean up
    for (const context of contexts) {
      await context.close();
    }
  });

  test('user remains in queue when not enough participants', async ({ page }) => {
    // Sign in as a single user
    await page.getByRole('button', { name: /sign in/i }).click();
    await page.getByLabel(/email/i).fill(testUsers[0].email);
    await page.getByLabel(/password/i).fill(testUsers[0].password);
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Wait for redirect back to the challenge page
    await page.waitForURL(`/challenges/${challengeId}`);
    
    // Register for the challenge
    const joinButton = page.getByRole('button', { name: /unirse al evento/i });
    await joinButton.click();
    
    // Verify registration was successful
    await expect(page.getByText(/ya estás inscrito/i)).toBeVisible();
    
    // Verify user is not yet assigned to a group (still in queue)
    await expect(page.getByText(/has sido asignado a un grupo/i)).not.toBeVisible();
  });

  test('users can unregister from a challenge', async ({ page }) => {
    // Sign in
    await page.getByRole('button', { name: /sign in/i }).click();
    await page.getByLabel(/email/i).fill(testUsers[0].email);
    await page.getByLabel(/password/i).fill(testUsers[0].password);
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Wait for redirect back to the challenge page
    await page.waitForURL(`/challenges/${challengeId}`);
    
    // Register for the challenge if not already registered
    const joinButton = page.getByRole('button', { name: /unirse al evento/i });
    if (await joinButton.isVisible()) {
      await joinButton.click();
      await expect(page.getByText(/ya estás inscrito/i)).toBeVisible();
    }
    
    // Unregister from the challenge
    await page.getByRole('button', { name: /ya estás inscrito/i }).click();
    
    // Verify unregistration was successful
    await expect(page.getByText(/unirse al evento/i)).toBeVisible();
  });
});