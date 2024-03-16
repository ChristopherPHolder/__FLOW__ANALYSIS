import { desktopConfig, defaultConfig } from 'lighthouse';

import { storeInS3, App, APP, APPS, navigateToLiveAndPlaceBet } from "flow-runner";
import * as console from "console";

const ignoreApp = (app: App): boolean => {
    return [APP.SPORTSBOOK].includes(app as any);
}
for (const i of [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]) {
    for (const app of APPS) {
        if (ignoreApp(app)) {
            continue;
        }

        const startMobile = performance.now();
        const mobileReportName = 'soft-navigate-to-live-and-place-bets-' + app + '-mobile-' + i;
        try {
            const mobileReport = await navigateToLiveAndPlaceBet(app, defaultConfig);

            await storeInS3(mobileReport, mobileReportName);
            console.log(`Completed ${mobileReportName}`);
        } catch (e) {
            console.log(`Failed on ${mobileReportName} with Error:${e}`);
        }
        const endMobile = performance.now();
        console.log(`Collect ${app} - mobile took ${endMobile - startMobile} milliseconds`)

        const startDesktop = performance.now();
        const desktopReportName = 'soft-navigate-to-live-and-place-bets-' + app + '-desktop-' + i;
        try {
            const desktopReport = await navigateToLiveAndPlaceBet(app, desktopConfig);
            await storeInS3(desktopReport, desktopReportName);
            console.log(`Completed ${desktopReportName}`);
        } catch (e) {
            console.log(`Failed on ${desktopReportName} with Error:${e}`);
        }
        const endDesktop = performance.now();
        console.log(`Collect ${app} - desktop took ${endDesktop - startDesktop} milliseconds`)

        console.log(`\n --> Completed Extraction for ${app}`);
    }
}

console.log(`\n --> Completed extraction for all apps`);
process.exit(0);
