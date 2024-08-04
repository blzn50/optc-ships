export type ShipOverview = {
  id: number;
  name: string;
  colaCount: number;
  superColaCount: number;
  effect: string;
  hasSpecial: "no" | "yes" | "afterMRank5";
};

export type ShipBasic = {
  name: string;
  obtain: string;
  note?: string;
  specialEffect1?: string;
  specialEffect2?: string;
};

export type ShipInfo = ShipBasic & {
  cola?: number[];
  superCola?: number[];
  effect: string[];
  period?: string[];
  special?: string[];
  cd?: (number | string)[];
  modification?: ShipModificationEffectTable;
};

export type ShipModificationEffect = {
  phase: number;
  effect: string;
  special?: string;
  cd?: number | string;
};

export type ShipModificationEffectTable = Required<
  Pick<ShipInfo, "effect" | "special" | "cd">
> & {
  phase: number[];
};

export type ShipDetail = Pick<ShipOverview, "effect"> &
  Partial<Pick<ShipOverview, "colaCount" | "superColaCount">> & {
    period?: string;
    special?: string;
    cd?: number | string;
  };
