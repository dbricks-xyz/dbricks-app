import resolveConfig from 'tailwindcss/resolveConfig.js';
import { Action, IAction, Protocol } from '@dbricks/dbricks-ts';
import tailwindConfig from '../../tailwind.config.js';

const fullConfig = resolveConfig(tailwindConfig);

interface IActiveProtocol {
  name: string,
  color: string,
  logo: string,
  actions: IAction[]
}

const activeProtocols: IActiveProtocol[] = ([
  {
    name: Protocol.Serum,
    color: fullConfig.theme.colors.db.serum,
    logo: '@/assets/activeProtocols/serumlogo.svg',
    actions: Object.values(Action.Serum), // todo do I even need this?
  },
  {
    name: Protocol.Mango,
    color: fullConfig.theme.colors.db.mango,
    logo: '@/assets/activeProtocols/mangologo.svg',
    actions: Object.values(Action.Mango),
  },
  {
    name: Protocol.Saber,
    color: fullConfig.theme.colors.db.saber,
    logo: '@/assets/activeProtocols/saberlogo.jpeg',
    actions: Object.values(Action.Saber),
  },
]);

export function listProtocols(): IActiveProtocol[] {
  return activeProtocols;
}

export function getProtocol(protocol: string): IActiveProtocol {
  return activeProtocols.find((p) => p.name === protocol)!;
}

// export function getAction(protocolId: number, actionId: number): IAction {
//   return activeProtocols[protocolId].actions[actionId];
// }
