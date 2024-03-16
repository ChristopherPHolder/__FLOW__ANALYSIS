import { launch } from 'puppeteer';
import { Config, startFlow } from 'lighthouse';
import { App, BASE_URL, HOME_PATH } from "./fixtures.js";

export async function hardNavigation(app: App, config: Config ): Promise<string> {
  const browser = await launch({ headless: false });
  const page = await browser.newPage();

  const flow = await startFlow(page, { config, name: 'Hard Navigations' });
  await flow.navigate(`${BASE_URL[app]}${HOME_PATH[app]}`, {
    name: 'New Visit',
  });

  await page.goto('about:blank')

  await flow.navigate(`${BASE_URL[app]}${HOME_PATH[app]}`, {
    name: 'Return Visit'
  });

  await browser.close();

  return JSON.stringify(await flow.createFlowResult());
}
