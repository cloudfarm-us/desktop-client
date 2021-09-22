declare interface Log {
  averageEffectiveHashrate: number;
  effectiveHashrate: number;
  invalidShares: number;
  reportedHashrate: number;
  staleShares: number;
  timestamp: number;
  validShares: number;
}

declare interface Rig {
  rigID: string;
  rigName: string;
  logs: Log[];
}

declare interface UserData {
  electricityCost: number;
  rigs: Record<string, Rig>;
  unpaidShares: number;
  walletAddress: string;
  userEmail: string;
}

declare interface GlobalSettings {
  address: string;
  coin: string;
  masterUnpaidBalance: number;
  masterUnpaidShares: number;
  nextPaymentDate: number;
}
