export type ShipOverview = {
  id: number;
  name: string;
  colaCount: number;
  superColaCount: number;
  effect: string;
  hasSpecial: boolean;
};

export type ShipBasic = {
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
};

export type ShipDetail = Pick<ShipOverview, "effect"> &
  Partial<Pick<ShipOverview, "colaCount" | "superColaCount">> & {
    period?: string;
    special?: string;
    cd?: number | string;
  };
