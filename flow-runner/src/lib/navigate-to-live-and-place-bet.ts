import { launch } from 'puppeteer';
import { Config, startFlow } from 'lighthouse';
import { betOption, handleInitialBanner, handleSelect, sleep, softNavigationToLive } from "./utils.js";
import { App, BASE_URL, BET_OPTION_SELECTOR, HOME_PATH } from "./fixtures.js";

export async function navigateToLiveAndPlaceBet(app: App, config: Config): Promise<string> {
  const hasTouch = config.settings!.screenEmulation!.mobile!;
  const browser = await launch({ headless: 'shell' });

  const page = await browser.newPage();

  await page.goto(`${BASE_URL[app]}${HOME_PATH[app]}`);

  const closeBannerSelector = '#messages-with-overlay > div > vn-content-message > div > span';
  await handleInitialBanner(closeBannerSelector, page, hasTouch);

  const skipAudits =  (config.settings?.skipAudits || []).concat('full-page-screenshot');
  const _config = {
    ...config,
    settings: {
      ...config.settings,
      skipAudits: skipAudits,
      categories: ['Performance']
  }};

  const flow = await startFlow(page, {config: _config, name: 'Navigate to live and place bet'});

  await flow.startTimespan({ name: 'Navigate to live' });
  await softNavigationToLive('[href*="live"]', page, hasTouch);
  await flow.endTimespan();

  await flow.startTimespan({ name: 'Select First Bet' });
  const firstBetOption = await betOption(BET_OPTION_SELECTOR[app], 0, page);
  await handleSelect(firstBetOption, hasTouch);
  await sleep(5_000);
  await flow.endTimespan();

  await flow.startTimespan({ name: 'Select Second & Third Bet' });
  const secondBetOption = await betOption(BET_OPTION_SELECTOR[app], 1, page);
  await handleSelect(secondBetOption, hasTouch);
  const thirdBetOption = await betOption(BET_OPTION_SELECTOR[app], 2, page);
  await handleSelect(thirdBetOption, hasTouch);
  await sleep(5_000);
  await flow.endTimespan();

  await browser.close();

  return JSON.stringify(await flow.createFlowResult());
}
