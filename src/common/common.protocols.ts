import resolveConfig from 'tailwindcss/resolveConfig.js';
import tailwindConfig from '../../tailwind.config.js';

const fullConfig = resolveConfig(tailwindConfig);

interface IAction {
  id: number,
  name: string,
  path: string,
  method: string,
}

interface IProtocol {
  id: number,
  name: string,
  color: string,
  logo: string,
  actions: IAction[]
}

const protocols: IProtocol[] = ([
  {
    id: 0,
    name: 'Serum',
    color: fullConfig.theme.colors.db.serum,
    logo: '@/assets/protocols/serumlogo.svg',
    actions: [
      {
        id: 0,
        name: 'Place order',
        path: '/serum/orders',
        method: 'POST',
      },
      {
        id: 1,
        name: 'Cancel order',
        path: '/serum/orders/cancel',
        method: 'POST',
      },
      {
        id: 2,
        name: 'Initialize market',
        path: '/serum/markets',
        method: 'POST',
      },
      {
        id: 3,
        name: 'Settle market',
        path: '/serum/markets/settle',
        method: 'POST',
      },
    ],
  },
  {
    id: 1,
    name: 'Mango',
    color: fullConfig.theme.colors.db.mango,
    logo: '@/assets/protocols/mangologo.svg',
    actions: [
      {
        id: 0,
        name: 'Deposit',
        path: '/mango/deposit',
        method: 'POST',
      },
      {
        id: 1,
        name: 'Withdraw',
        path: '/mango/withdraw',
        method: 'POST',
      },
      {
        id: 2,
        name: 'Place spot order',
        path: '/mango/spot/place',
        method: 'POST',
      },
      {
        id: 3,
        name: 'Cancel spot order',
        path: '/mango/spot/cancel',
        method: 'POST',
      },
      {
        id: 4,
        name: 'Settle spot market',
        path: '/mango/spot/settle',
        method: 'POST',
      },
      {
        id: 5,
        name: 'Place perp order',
        path: '/mango/perp/place',
        method: 'POST',
      },
      {
        id: 6,
        name: 'Cancel perp order',
        path: '/mango/perp/cancel',
        method: 'POST',
      },
      {
        id: 7,
        name: 'Settle perp market',
        path: '/mango/perp/settle',
        method: 'POST',
      },
    ],
  },
  {
    id: 2,
    name: 'Saber',
    color: fullConfig.theme.colors.db.saber,
    logo: '@/assets/protocols/saberlogo.jpeg',
    actions: [
      {
        id: 0,
        name: 'Initialize market',
        path: '/saber/markets',
        method: 'POST',
      },
    ],
  },
]);

export function listProtocols(): IProtocol[] {
  return protocols;
}

export function getProtocol(protocolId: number): IProtocol {
  return protocols[protocolId];
}

export function getAction(protocolId: number, actionId: number): IAction {
  return protocols[protocolId].actions[actionId];
}
