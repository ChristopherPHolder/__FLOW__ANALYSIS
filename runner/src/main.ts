import { desktopConfig, defaultConfig } from 'lighthouse';

import { storeInS3, App, APP, APPS, navigateToLiveAndPlaceBet } from "flow-runner";

const ignoreApp = (app: App): boolean => {
    return [APP.SPORTSBOOK].includes(app as any);
}

for (const app of APPS) {
    if (ignoreApp(app)) {
        continue;
    }

    const startMobile = performance.now();
    const mobileReportName = 'soft-navigate-to-live-and-place-bets-' + app + '-mobile';
    try {
        const mobileReport = await navigateToLiveAndPlaceBet(app, defaultConfig);
        await storeInS3(mobileReportName, mobileReport);
        console.log(`Completed ${mobileReportName}`);
    }
    catch (e) {
        console.log(`Failed on ${mobileReportName} with Error:${e}`);
    }
    const endMobile = performance.now();
    console.log(`Collect ${app} - mobile took ${endMobile - startMobile} milliseconds`)

    const startDesktop = performance.now();
    const desktopReportName = 'soft-navigate-to-live-and-place-bets-' + app + '-desktop';
    try {
        const desktopReport = await navigateToLiveAndPlaceBet(app, desktopConfig);
        await storeInS3(desktopReportName, desktopReport);
        console.log(`Completed ${desktopReportName}`);
    }
    catch (e) {
        console.log(`Failed on ${desktopReportName} with Error:${e}`);
    }
    const endDesktop = performance.now();
    console.log(`Collect ${app} - desktop took ${endDesktop - startDesktop} milliseconds`)

    console.log(`\n --> Completed Extraction for ${app}`);
}

console.log(`\n --> Completed extraction for all apps`);
process.exit(0);
