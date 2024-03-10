export type ShipOverview = {
  id: number;
  name: string;
  colaCount: number;
  superColaCount: number;
  effect: string;
  hasSpecial: boolean;
};

export type ShipDetail = {
  obtain: string;
  cola: number[];
  superCola?: (number | string)[];
  effect: string[];
  note?: string;
  period?: string[];
  special?: string[];
  cd?: (number | string)[];
  specialEffect1?: string;
  specialEffect2?: string;
};
