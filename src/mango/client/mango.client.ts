import {
  Cluster, Config,
  IDS, MangoAccount,
  MangoClient as NativeMangoClient,
  MangoGroup, PerpOrder,
} from '@blockworks-foundation/mango-client';
import { Commitment, PublicKey } from '@solana/web3.js';
import { OpenOrders } from '@project-serum/serum';
import { GroupConfig } from '@blockworks-foundation/mango-client/lib/src/config';
import PerpMarket from '@blockworks-foundation/mango-client/lib/src/PerpMarket';
import SolClient from '@/common/client/common.client';
import { MANGO_PROG_ID, NETWORK, SERUM_PROG_ID } from '@/config/config';
import { pushToStatusLog } from '@/common/common.state';

export default class MangoClient extends SolClient {
  nativeClient: NativeMangoClient;

  group!: MangoGroup;

  groupName: string;

  cluster: Cluster;

  constructor(connnectionUrl: string, committment: Commitment) {
    super(connnectionUrl, committment);
    this.nativeClient = new NativeMangoClient(this.connection, MANGO_PROG_ID);
    if (NETWORK === 'mainnet') {
      this.groupName = 'mainnet.1';
      this.cluster = 'mainnet';
    } else {
      this.groupName = 'devnet.2';
      this.cluster = 'devnet';
    }
    console.log('Initialized Mango client');
  }

  async loadGroup(): Promise<void> {
    const groupPubkey = IDS.groups.find(
      (group) => group.name === this.groupName,
    )?.publicKey;
    if (!groupPubkey) {
      throw new Error('Error finding Mango group');
    }
    const mangoGroup = await this.nativeClient.getMangoGroup(
      new PublicKey(groupPubkey),
    );
    await mangoGroup.loadRootBanks(this.connection);
    await Promise.all(
      mangoGroup.rootBankAccounts.map((rootBank) => rootBank?.loadNodeBanks(this.connection)),
    ); // load each nodeBank for all rootBanks
    this.group = mangoGroup;
  }

  async loadMangoAccountForOwner(
    ownerPubkey: PublicKey,
  ): Promise<MangoAccount> {
    const loadedMangoAccount = (await this.nativeClient.getMangoAccountsForOwner(
      this.group, ownerPubkey, true,
    ))[0];
    return this.nativeClient.getMangoAccount(loadedMangoAccount.publicKey, SERUM_PROG_ID);
  }

  getMangoGroupConfig(): GroupConfig {
    const mangoGroupConfig = Config.ids()
      .getGroup(
        this.cluster,
        this.groupName,
      );
    if (!mangoGroupConfig) {
      throw new Error('Error loading Mango Group Configuration');
    }
    return mangoGroupConfig;
  }

  async loadPerpMarket(marketPubkey: PublicKey): Promise<PerpMarket> {
    const mangoGroupConfig = this.getMangoGroupConfig();
    const perpMarketConfig = mangoGroupConfig.perpMarkets.find(
      (p) => p.publicKey.toBase58() === marketPubkey.toBase58(),
    );
    if (!perpMarketConfig) {
      throw new Error(`Could not find perp market ${marketPubkey.toBase58()}`);
    }
    return this.nativeClient.getPerpMarket(
      perpMarketConfig.publicKey,
      perpMarketConfig.baseDecimals,
      perpMarketConfig.quoteDecimals,
    );
  }

  // --------------------------------------- print spot oo

  async getMangoOrdersForOwner(
    marketPubkey: PublicKey,
    ownerPubkey: PublicKey,
  ): Promise<OpenOrders | undefined> {
    await this.loadGroup();
    const mangoAccount = await this.loadMangoAccountForOwner(ownerPubkey);
    return mangoAccount.spotOpenOrdersAccounts.find(
      (account) => account?.market.toBase58() === marketPubkey.toBase58(),
    ) as unknown as (OpenOrders | undefined);
  }

  async printMangoOrdersForOwner(
    marketPubkey: PublicKey | string,
    ownerPubkey: PublicKey,
  ): Promise<void> {
    const marketPubkeyk = typeof (marketPubkey) === 'string' ? new PublicKey(marketPubkey) : marketPubkey;
    const orders = await this.getMangoOrdersForOwner(marketPubkeyk, ownerPubkey);
    const activeOrders = orders?.orders.filter((o) => !o.isZero())
      .map((o) => `${o.toString()}\n`);
    pushToStatusLog({
      content: `User's outstanding Mango orders are: ${activeOrders}`,
      color: 'white',
    });
  }

  // --------------------------------------- print perp oo

  async getMangoPerpOrderForOwner(
    marketPubkey: PublicKey,
    ownerPubkey: PublicKey,
  ): Promise<PerpOrder[]> {
    await this.loadGroup();
    const perpMarket = await this.loadPerpMarket(marketPubkey);
    const mangoAccount = await this.loadMangoAccountForOwner(ownerPubkey);
    return perpMarket.loadOrdersForAccount(
      this.connection,
      mangoAccount,
    );
  }

  async printMangoPerpOrdersForOwner(
    marketPubkey: PublicKey | string,
    ownerPubkey: PublicKey,
  ): Promise<void> {
    const marketPubkeyk = typeof (marketPubkey) === 'string' ? new PublicKey(marketPubkey) : marketPubkey;
    const orders = await this.getMangoPerpOrderForOwner(marketPubkeyk, ownerPubkey);
    const activeOrders = orders.map((o) => `${o.orderId.toString()}\n`);
    pushToStatusLog({
      content: `User's outstanding Perp Mango orders are: ${activeOrders}`,
      color: 'white',
    });
  }
}
