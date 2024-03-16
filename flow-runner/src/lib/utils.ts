import { ElementHandle, Page } from "puppeteer";


export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function handleSelect(element: ElementHandle | null, hasTouch: boolean): Promise<void> {
  return hasTouch ? await element?.tap() : await element?.click()
}

export async function softNavigationToLive(liveBtnSelector: string, page: Page, hasTouch: boolean): Promise<void> {
  const liveBtn = await page.waitForSelector(liveBtnSelector);
  if (!liveBtn) throw new Error(`NavigationSelector was not found ${liveBtnSelector}`);
  await handleSelect(liveBtn, hasTouch);
  try {
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
  } catch (e) {
    console.log('Network was not stable enough ot consider the navigation ended');
    await sleep(15_000);
  }
}

export async function handleInitialBanner(closeBtnSelector: string, page: Page, hasTouch: boolean): Promise<void> {
  try {
    const closeBtn = await page.waitForSelector(closeBtnSelector, {timeout: 10_000});
    await handleSelect(closeBtn, hasTouch);
  } catch {
    console.log('No popup found');
  }
}

export async function betOption(selector: string, at: number, page: Page): Promise<ElementHandle> {
  return await page.$$(selector).then((handlers) => handlers[at]!);
}
