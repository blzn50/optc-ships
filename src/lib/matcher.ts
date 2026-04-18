import type { EffectUnion } from "@/types/Filter";

type FilterMatcher = {
  textMatcher: string;
  regexMatcher: RegExp;
};

export const filterMatcher = (
  type: EffectUnion | null,
  turnCount: number | null,
): FilterMatcher => {
  switch (type) {
    case "atk":
      return {
        textMatcher: `boosts atk by 1x`,
        regexMatcher:
          /boosts\s+(?:([\[\]\w\s.,'’-]*(?:and\s+[\[\]\w\s.,'’-]+)?\s+)?)?atk\s+((.+?\s+)?)by\s+(?:approximately\s+)?(\d+(\.\d+)?)x/i,
      };
    case "base atk":
      return {
        textMatcher: `boosts base atk by +1 for 1 turn`,
        regexMatcher:
          /boosts (?:([\[\]\w\s.,'’-]*(?:and\s+[\[\]\w\s.,'’-]+)?\s+)?)?base atk by (\+\d+) for (\d+) turns?/i,
      };
    case "additive chain multiplier":
      return {
        textMatcher: "boosts chain multiplier by +1 for 1 turn",
        regexMatcher:
          /boosts (?:([\[\]\w\s.,'’-]*(?:and\s+[\[\]\w\s.,'’-]+)?\s+)?)?chain multiplier by (\+\d+(\.\d+)?) for (\d+) turns?/i,
      };
    case "chain multiplier growth":
      return {
        textMatcher:
          "boosts chain multiplier growth rate of normal attacks up to +1 for 1 turn",
        regexMatcher:
          /boosts (?:([\[\]\w\s.,'’-]*(?:and\s+[\[\]\w\s.,'’-]+)?\s+)?)?chain multiplier growth rate of normal attacks up to ([+\d.]+)(?:\s*\(([^)]+)\))?\s+for (\d+) turns?/i,
      };
    case "color affinity":
      return {
        textMatcher:
          "boosts the type effects of normal attacks for characters by 1x for 1 turn",
        regexMatcher:
          /boosts the (type effects of normal attacks) for (?:([\[\]\w\s.,'’-]*(?:and\s+[\[\]\w\s.,'’-]+)?\s+)?)?characters by (\d+(\.\d+)?)x for (\d+) turns?/i,
      };
    case "def down damage boost":
      return {
        textMatcher: "boosts damage dealt to def down enemies by 1x for 1 turn",
        regexMatcher:
          /boosts (damage dealt to def down enemies) by (\d+(\.\d+)?)x for (\d+) turns?/i,
      };
    case "final tap atk":
      return {
        textMatcher:
          "boosts the atk of the next final tap performed by a character by 1%",
        regexMatcher:
          /boosts the (atk of the next final tap) performed by a (?:([\[\]\w\s.,'’-]*(?:and\s+[\[\]\w\s.,'’-]+)?\s+)?)?character by (\d+)%/i,
      };
    case "ignited damage boost":
      return {
        textMatcher:
          "boosts damage dealt to ignited enemies by 2.25x for 1 turn",
        regexMatcher:
          /boosts (damage dealt to ignited enemies) by (\d+(\.\d+)?)x for (\d+) turns?/i,
      };
    case "slot":
      return {
        textMatcher: `boosts slot effects by 1x for 1 turn`,
        regexMatcher:
          /(?:doubles|boosts)\s+(?:([\[\]\w\s.,'’-]*(?:and\s+[\[\]\w\s.,'’-]+)?\s+)?)?(?:atk\s+and\s+)?slot\s+effects(?:\s+by\s+(\d+(\.\d+)?)x)?\s+for\s+(\d+(\.\d+)?)\s+turns?/i,
      };
    case "percent damage boost":
      return {
        textMatcher: `boost crew's atk based on the damage reduction status for 1 turn`,
        regexMatcher:
          /boost crew's (atk based on the damage reduction) status for (\d+) turns?/i,
      };
    case "hp":
      return {
        textMatcher: `boosts hp by 1x`,
        regexMatcher:
          /boosts\s+(?:([\[\]\w\s.,'’-]*(?:and\s+[\[\]\w\s.,'’-]+)?\s+)?)?hp\s+by\s+(?:approximately\s+)?(\d+(?:,\.\d+)?)x?/i,
      };
    case "land perfect strikes":
      return {
        textMatcher: "land perfect strikes",
        regexMatcher: /land perfect strikes/i,
      };
    case "reduce special charge":
      return {
        textMatcher: `reduces special charge time by ${turnCount} turn`,
        regexMatcher:
          /reduces\s+(?:([\w\s'’,]*(?:and\s+[\w\s'’,]+)?\s+)?)?special\s+charge\s+time\s+by\s+(\d+)\s+turns?/i,
      };
    case "orb chance booster":
      return {
        textMatcher: "boosts chance of landing on slot",
        regexMatcher:
          /boosts\s+(?:([\w\s'’,]*(?:and\s+[\w\s'’,]+)?\s+)?)?chances? of (?:(?:crew|them)\s+)?landing on\s+(?:([\[\]\w\s'’,]*(?:and\s+[\w\s'’,]+)?\s+)?)?slot/i,
      };
    case "change orbs":
      return {
        textMatcher: "changes slots to",
        regexMatcher:
          /changes\s+(?!.*atk multiplier of.*)(?:([\[\]\w\s'’,\-\s]+(?:and\s+[\[\]\w\s'’,\-\s]+)?\s+)?)?slots\s+(?:to|into)\s*(.*)/i,
      };
    case "orb effect multiplier":
      return {
        textMatcher: "changes atk multiplier of slots to 1x when slots match",
        regexMatcher:
          /changes (?:the )?atk multiplier of (?:([\[\]\w\s.,'’-]*(?:and\s+[\[\]\w\s.,'’-]+)?\s+)?)?slots to (\d+(?:\.\d+)?)x when slots match/i,
      };
    case "lock orbs":
      return {
        textMatcher: "locks slots for 1 turn",
        regexMatcher:
          /locks\s+(?:([\w\s'’,]*(?:and\s+[\w\s'’,]+)?\s+)?)?slots\s+for\s+(\d+)\s+turns?/i,
      };
    case "heal":
      return {
        textMatcher: "heals crew by 1 hp",
        regexMatcher: /heals crew by (?:\d+(?:,\d+)?) hp(?! at end of turn)/i,
      };
    case "heal eot":
      return {
        textMatcher: "heals crew by 1 hp at end of turn",
        regexMatcher:
          /heals (?:crew by (?:\d+(?:,\d+)?|1) )?hp at end of turn/i,
      };
    case "hp guard":
      return {
        textMatcher: "activates hp guard of 1% effect for 1 turn",
        // @TODO - wrap \d+ with () when the matcher case is introduced
        regexMatcher: /activates hp guard of \d+% effect for (\d+) turns?/i,
      };

    case "reduce switch effect":
      return {
        textMatcher: "reduces switch effect by 1",
        regexMatcher:
          /reduces (?:([\w\s'’,]*(?:and\s+[\w\s'’,]+)?\s+)?)?switch effect(?:\s+use)? by (\d+)/i,
      };
    case "percent damage reduction":
      return {
        textMatcher: "reduces damage taken by 1%",
        regexMatcher: /reduces damage taken by \d+%/i,
      };
    case "threshold damage reduction":
      return {
        textMatcher:
          "reduces a portion of each enemy's dealt damage that exceeds 1 for 1 turn",
        // @TODO - wrap \d+(?:,\d+)* with () when the matcher case is introduced
        regexMatcher:
          /reduces a portion of each enemy's dealt damage that exceeds \d+(?:,\d+)* for (\d+) turns?/i,
      };
    case "bind":
    case "despair":
    case "silence":
    case "special bind":
    case "slot bind":
    case "burn":
    case "atk down":
    case "rcv down":
    case "paralysis":
    case "decrease chain multiplier growth rate":
    case "special reverse":
    case "limit special uses":
      return {
        textMatcher: `reduces crew's ${type} duration by ${turnCount} turn`,
        regexMatcher: /reduces crew's ([\w\s\/]+) duration by (\d+) turns?/i,
      };
    case "eot heal to damage":
      return {
        textMatcher: `reduces [eot_heal_to_damage] duration by ${turnCount} turn`,
        regexMatcher:
          /reduces (\[eot_heal_to_damage\]) duration by (\d+) turns?/i,
      };
    default:
      return {
        textMatcher: "",
        regexMatcher: /\w/i,
      };
  }
};
