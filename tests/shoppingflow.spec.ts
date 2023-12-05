import {test, expect, Page, Browser} from '@playwright/test';

const constants = {
  testUrl: 'https://www.bol.com/nl/nl/',
  acceptButton: 'Alles Accepteren',
  closeButton: 'Sluit venster',
  searchBar: '#searchfor',
  searchButton: 'Zoeken',
  cartButton: '//*[@id=\"9300000153468617\"]',
  label: 'aria-label',
  expectedButtonText: "In winkelwagen",
  productTitle: '.product-details__title',
  selectedArticle: 'call of duty: modern warfare 3',
  expectedArticle: 'Call of Duty: Modern Warfare III - PS5',
  count: 'Aantal',
  expectedValue : '1'
}


let page: Page;

test.describe.configure({ mode: 'serial' });

test.describe('Shopping Flow', () => {

  test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto(constants.testUrl);
    await handlePopUps(page);
  })

  test.afterAll(async () => {
    await page.close();
  })

  test('Go to page',async () => {
    const searchBar = page.locator(constants.searchBar);
    await expect(searchBar).toBeVisible();
    console.log("Step 1: Go to the page and handle the popup");
  });

  test('Search an article', async () => {
    const searchBar = page.locator(constants.searchBar);
    await searchBar.fill(constants.selectedArticle);
    const searchButton = page.getByRole('button', { name: `${constants.searchButton}` });
    await searchButton.click();
    await expect(searchBar).toHaveValue(constants.selectedArticle);
    console.log("Step 2: Search for an article");
  });

  test('Add article to cart', async () => {
    const cartButton = page.locator(constants.cartButton);
    await expect(cartButton).toHaveAttribute(constants.label, constants.expectedButtonText);
    await cartButton.click();
    console.log("Step 3: Add the article to cart");
  });

  test('Check if article is in cart', async () => {
    await page.waitForLoadState();
    const itemCount = page.getByLabel(constants.count);
    await expect(itemCount).toHaveValue(constants.expectedValue);
    console.log("Step 4: Check if selected article is in cart");
  });
});

async function handlePopUps(page: Page){
  const acceptButton = page.getByRole('button', { name: `${constants.acceptButton}` });
  const closeButton = page.getByRole('button', { name: `${constants.closeButton}` });
  await acceptButton.click();
  await closeButton.click();
}
