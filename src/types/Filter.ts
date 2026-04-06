export type FilterCategory = "ability" | "special";
export type AbilityFilter =
  | "beneficial-status-effect"
  | "reduce-enemy-effect"
  | "reduce-status-effect"
  | "boost-damage"
  | "apply-enemy-effect";
export type StatusEffect =
  | "bind"
  | "despair"
  | "silence"
  | "special bind"
  | "atk down"
  | "rcv down"
  | "paralysis"
  | "decrease chain multiplier growth rate"
  | "special reverse"
  | "limit special uses";
export type BeneficialStatusEffect = "reduce special charge";
export type EnemyEffect = "percent-damage" | "threshold-damage" | "def-up";
export type DamageBoost = "atk" | "slot" | "color-affinity";

type AbilityFilterToEffects = {
  "beneficial-status-effect": BeneficialStatusEffect[];
  "reduce-enemy-effect": EnemyEffect[];
  "reduce-status-effect": StatusEffect[];
  "boost-damage": DamageBoost[];
  "apply-enemy-effect": EnemyEffect[];
};

export type FilterHierarchy = {
  ability: {
    [K in keyof AbilityFilterToEffects]: AbilityFilterToEffects[K];
  };
  special: {
    // @TODO: define special filter structure
  };
};

export interface FilterState {
  category: FilterCategory | null;
  subcategory: AbilityFilter | null;
  effectType: string | null;
  turnCount: number | null;
}
