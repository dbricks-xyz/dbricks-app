import resolveConfig from 'tailwindcss/resolveConfig.js';
import { Action, IAction, Protocol } from '@dbricks/dbricks-ts';
import tailwindConfig from '../../tailwind.config.js';

const fullConfig = resolveConfig(tailwindConfig);

interface IActiveProtocol {
  name: string,
  color: string,
  actions: IAction[]
}

const activeProtocols: IActiveProtocol[] = ([
  {
    name: Protocol.Serum,
    color: fullConfig.theme.colors.db.serum,
    actions: Object.values(Action.Serum),
  },
  {
    name: Protocol.Mango,
    color: fullConfig.theme.colors.db.mango,
    actions: Object.values(Action.Mango),
  },
  {
    name: Protocol.Saber,
    color: fullConfig.theme.colors.db.saber,
    actions: Object.values(Action.Saber),
  },
  {
    name: Protocol.Solend,
    color: fullConfig.theme.colors.db.solend,
    actions: Object.values(Action.Solend),
  },
  {
    name: Protocol.Raydium,
    color: fullConfig.theme.colors.db.raydium,
    actions: Object.values(Action.Raydium),
  },
  {
    name: Protocol.Wormhole,
    color: fullConfig.theme.colors.db.wormhole,
    actions: Object.values(Action.Wormhole),
  },
  {
    name: Protocol.Sunny,
    color: fullConfig.theme.colors.db.sunny,
    actions: Object.values(Action.Sunny),
  },
  {
    name: Protocol.Orca,
    color: fullConfig.theme.colors.db.orca,
    actions: Object.values(Action.Orca),
  },
  {
    name: Protocol.Solfarm,
    color: fullConfig.theme.colors.db.solfarm,
    actions: Object.values(Action.Solfarm),
  },
  {
    name: Protocol.Parrot,
    color: fullConfig.theme.colors.db.parrot,
    actions: Object.values(Action.Parrot),
  },
  {
    name: Protocol.Marinade,
    color: fullConfig.theme.colors.db.marinade,
    actions: Object.values(Action.Marinade),
  },
  {
    name: Protocol.Mercurial,
    color: fullConfig.theme.colors.db.mercurial,
    actions: Object.values(Action.Mercurial),
  },
]);

export function listProtocols(): IActiveProtocol[] {
  return activeProtocols;
}

export function getProtocol(protocol: string): IActiveProtocol {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return activeProtocols.find((p) => p.name === protocol)!;
}
