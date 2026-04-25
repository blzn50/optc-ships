export type FilterCategory = 'ability' | 'special';
export type AbilityFilter =
  | 'beneficial-team-effect'
  | 'reduce-enemy-effect'
  | 'reduce-status-effect'
  | 'boost-damage'
  | 'apply-enemy-effect'
  | 'fixed-damage';
export type StatusDebuff =
  | 'bind'
  | 'despair'
  | 'silence'
  | 'special bind'
  | 'slot bind'
  | 'burn'
  | 'atk down'
  | 'rcv down'
  | 'paralysis'
  | 'decrease chain multiplier growth rate'
  | 'special reverse'
  | 'limit special uses'
  | 'eot heal to damage';
export type BeneficialEffect =
  | 'reduce special charge'
  | 'hp'
  | 'land perfect strikes'
  | 'orb chance booster'
  | 'heal'
  | 'heal eot'
  | 'change orbs'
  | 'lock orbs'
  | 'reduce switch effect'
  | 'threshold damage reduction'
  | 'percent damage reduction'
  | 'hp guard';
export type EnemyEffect =
  | 'enemy percent damage'
  | 'enemy threshold damage'
  | 'def up'
  | 'barrier'
  | 'resilience';
export type EnemyDebuff =
  | 'enemy def down'
  | 'negative resistance'
  | 'delay'
  | 'enemy paralysis';
export type DamageBoost =
  | 'base atk'
  | 'atk'
  | 'slot'
  | 'color affinity'
  | 'final tap atk'
  | 'orb effect multiplier'
  | 'additive chain multiplier'
  | 'chain multiplier growth'
  | 'ignited damage boost'
  | 'def down damage boost'
  | 'poison damage boost'
  | 'percent damage boost'
  | 'delayed damage boost';
export type FixedDamage =
  | 'instant damage'
  | 'end of turn damage'
  | 'percent damage';

export type EffectUnion =
  | StatusDebuff
  | BeneficialEffect
  | EnemyEffect
  | DamageBoost
  | EnemyDebuff
  | FixedDamage;

type AbilityFilterToEffects = {
  'beneficial-team-effect': BeneficialEffect[];
  'boost-damage': DamageBoost[];
  'reduce-status-effect': StatusDebuff[];
  'fixed-damage': FixedDamage[];
};

type SpecialFilterToEffects = {
  'beneficial-team-effect': BeneficialEffect[];
  'boost-damage': DamageBoost[];
  'reduce-enemy-effect': EnemyEffect[];
  'apply-enemy-effect': EnemyDebuff[];
  'reduce-status-effect': StatusDebuff[];
  'fixed-damage': FixedDamage[];
};

export type FilterHierarchy = {
  ability: {
    [K in keyof AbilityFilterToEffects]: AbilityFilterToEffects[K];
  };
  special: {
    [K in keyof SpecialFilterToEffects]: SpecialFilterToEffects[K];
  };
};

export interface FilterState {
  category: FilterCategory | null;
  subcategory: AbilityFilter | null;
  effectType: EffectUnion | null;
  turnCount: string | null;
}
