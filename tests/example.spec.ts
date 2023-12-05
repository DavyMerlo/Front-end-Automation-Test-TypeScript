import {test, expect} from '@playwright/test';

const constants = {
  testUrl: 'https://www.bol.com/nl/nl/',
  acceptButton: 'Alles Accepteren',
  closeButton: 'Sluit venster',
  searchBar: '#searchfor',
  searchButton: 'Zoeken',
  cartButton: '//*[@id=\"9300000153468617\"]',
  productTitle: '.product-details__title',
  selectedArticle: 'call of duty: modern warfare 3',
  expectedArticle: 'Call of Duty: Modern Warfare III - PS5',
}


test.describe('Shopping Flow', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(constants.testUrl);
    const acceptButton = page.getByRole('button', { name: `${constants.acceptButton}` });
    const closeButton = page.getByRole('button', { name: `${constants.closeButton}` });
    await acceptButton.click();
    await closeButton.click();
    console.log("Step 1: Go to the page and handle the popup");
  });

  test.beforeEach('Search an article', async ({ page }) => {
    const searchBar = page.locator(constants.searchBar);
    await searchBar.fill(constants.selectedArticle);
    const searchButton = page.getByRole('button', { name: `${constants.searchButton}` });
    await searchButton.click();
    console.log("Step 2: Search for an article");
  });

  test.beforeEach('Add article to cart', async ({ page }) => {
    const cartButton = page.locator(constants.cartButton);
    await cartButton.click();
    console.log("Step 3: Add the article to cart");
  });

  test('Check if article is in cart', async ({ page }) => {
    const itemCount = page.getByLabel("Aantal");
    await expect(itemCount).toHaveValue("1");
    console.log("Step 4: Check if selected article is in cart");
  });
});
