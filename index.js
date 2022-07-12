require("dotenv").config();

const puppeteer = require("puppeteer");

// Configuration des options chrome

const chromeOptions = {
  headless: true,
  deafultViewport: null,
  args: [
    "--incognito",
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--single-process",
    "--no-zygote",
  ],
};

(async () => {
  // Les variables environementales

  const email = process.env.EMAIL;
  const pass = process.env.PASS;
  const website = process.env.WEBSITE;

  // Initialisation du navigateur

  const browser = await puppeteer.launch(chromeOptions);
  const page = await browser.newPage();

  // Navigation vers la page de connexion
  await page.goto(website, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(5000);

  // Remplissage du formulaire de connexion

  await page.click('input[type="text"]');
  await page.type('input[type="text"]', email);
  await page.click('input[type="password"]');
  await page.type('input[type="password"]', pass);

  // Connexion vers la page d'acceuil

  await page.waitForTimeout(5000);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(10000);

  await page.screenshot({ path: "example.png" });
  console.log("okay");

  await browser.close();
})();
