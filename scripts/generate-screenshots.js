import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectsDir = path.join(__dirname, "../public/html-projects");

async function generateScreenshots() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const projectFolders = fs
    .readdirSync(projectsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const folder of projectFolders) {
    const projectPath = path.join(projectsDir, folder);
    const htmlFilePath = path.join(projectPath, "index.html");
    const screenshotPath = path.join(projectPath, "screenshot.png");

    if (fs.existsSync(htmlFilePath)) {
      console.log(`Generating screenshot for ${folder}...`);
      try {
        await page.goto(`file://${htmlFilePath}`, {
          waitUntil: "networkidle0",
        });
        await page.screenshot({ path: screenshotPath });
        console.log(`Screenshot saved for ${folder}`);
      } catch (error) {
        console.error(`Error generating screenshot for ${folder}:`, error);
      }
    } else {
      console.warn(
        `No index.html found in ${folder}. Skipping screenshot generation.`
      );
    }
  }

  await browser.close();
}

generateScreenshots();
