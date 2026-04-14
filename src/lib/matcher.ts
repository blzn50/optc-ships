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
    case "hp":
      return {
        textMatcher: `boosts hp by 1x`,
        regexMatcher:
          /boosts\s+(?:([\[\]\w\s.,'’-]*(?:and\s+[\[\]\w\s.,'’-]+)?\s+)?)?hp\s+by\s+(?:approximately\s+)?(\d+(?:\.\d+)?)x?/i,
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
    case 'orb chance booster':
      return {
        textMatcher: 'boosts chance of landing on slot',
        regexMatcher: /boosts\s+(?:([\w\s'’,]*(?:and\s+[\w\s'’,]+)?\s+)?)?chances? of (?:(?:crew|them)\s+)?landing on\s+(?:([\[\]\w\s'’,]*(?:and\s+[\w\s'’,]+)?\s+)?)?slot/i
      }
    default:
      return {
        textMatcher: "",
        regexMatcher: /\w/i,
      };
  }
};
