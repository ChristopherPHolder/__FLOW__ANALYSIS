export const APP = {
  SPORTSBOOK: 'sportsbook',
  BWIN: 'bwin',
  BETMGM: 'betmgm',
  BETJACK: 'betjack',
  BETLY: 'betly',
  SISPORTSBOOK: 'sisportsbook',
} as const;

export type App = (typeof APP)[keyof typeof APP];

export const APPS = [
  APP.SPORTSBOOK,
  APP.BWIN,
  APP.BETMGM,
  APP.BETJACK,
  APP.BETLY,
  APP.SISPORTSBOOK
] as const;

export const BASE_URL = {
  [APP.SPORTSBOOK]: 'https://sportsbook.fanduel.com',
  [APP.BWIN]: 'https://sports.bwin.com',
  [APP.BETMGM]: 'https://sports.az.betmgm.com',
  [APP.BETJACK]: 'https://betjack.com',
  [APP.BETLY]: 'https://wv.betly.com',
  [APP.SISPORTSBOOK]: 'https://www.sisportsbook.com'
} as const;

export const HOME_PATH = {
  [APP.SPORTSBOOK]: '',
  [APP.BWIN]: '/en/sports',
  [APP.BETMGM]: '/en/sports',
  [APP.BETJACK]: '/en/sports',
  [APP.BETLY]: '/en/betting/home',
  [APP.SISPORTSBOOK]: ''
} as const;

export const BET_OPTION_SELECTOR = {
  [APP.SPORTSBOOK]: '',
  [APP.BWIN]: 'ms-event-pick',
  [APP.BETMGM]: 'ms-event-pick',
  [APP.BETJACK]: '.jNPisk',
  [APP.BETLY]: '[data-testid="outcome-summary"]',
  [APP.SISPORTSBOOK]: '[data-selection-id]:not([class*="inactive"])',
} as const;
