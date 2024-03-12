import type { ShipOverview } from "@/types/Ship";

export const units: ShipOverview[] = [
  {
    id: 1,
    name: "Dinghy",
    colaCount: 15048,
    superColaCount: 20,
    effect:
      "Boosts crew's chance of landing on own type slot, boosts Captain's RCV by 800, boosts crew's ATK by 1.65x, HP by 1.5x and makes it a much easier to land PERFECT strikes",
    hasSpecial: false,
  },
  {
    id: 2,
    name: "Merry Go",
    colaCount: 15057,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts Captain's HP by 20000, boosts crew's ATK by 1.65x, and makes it a much easier to land PERFECT strikes",
    hasSpecial: false,
  },
  {
    id: 3,
    name: "Navy Ship",
    colaCount: 15234,
    superColaCount: 20,
    effect:
      "Boosts Shooter and Fighter characters' ATK by 500, boosts crew's HP by 1.75x, and boosts Shooter and Fighter characters' ATK by 1.5x",
    hasSpecial: false,
  },
  {
    id: 4,
    name: "Baratie",
    colaCount: 15226,
    superColaCount: 20,
    effect:
      "Boosts Captain's HP by 10,000, boosts crew's ATK by 1.5x, boosts crew's chance of landing on [RCV] slots, makes [RCV] [SEMLA] slots have matching slot effects, boosts ATK by 1.2x when characters have [RCV] [SEMLA] slots, and allows crew to obtain [RCV] [SEMLA] slots with PERFECT taps",
    hasSpecial: false,
  },
  {
    id: 5,
    name: "Coffin Boat",
    colaCount: 15328,
    superColaCount: 20,
    effect:
      "Boosts Slasher characters' ATK by 1.8x and HP by 1.75x but reduces Captain's RCV by 700",
    hasSpecial: false,
  },
  {
    id: 6,
    name: "Miss Love Duck",
    colaCount: 15202,
    superColaCount: 20,
    effect:
      "Boosts Striker characters' ATK by 1.5x, boosts their chance of landing on own type slot, reduces damage taken by 20%, and boosts Striker characters' ATK by 600",
    hasSpecial: false,
  },
  {
    id: 7,
    name: "Going Merry - Flying Model",
    colaCount: 15233,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, heals crew by 5,000 HP at end of turn, and boosts crew's ATK by 1.7x and RCV by 1.2x",
    hasSpecial: false,
  },
  {
    id: 8,
    name: "Moby Dick",
    colaCount: 15380,
    superColaCount: 20,
    effect:
      "Reduces HP to 50% at start of quest, boosts crew's ATK by 1.55x, HP by 1.6x, and if HP is 30% or below at start of attack, boosts ATK by a further 1.2x",
    hasSpecial: false,
  },
  {
    id: 9,
    name: "Big Top",
    colaCount: 15202,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts ATK by 2x for characters with a Cost of 40 or less and boosts their HP by 1.4x",
    hasSpecial: false,
  },
  {
    id: 10,
    name: "Bezan Black",
    colaCount: 15180,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts QCK characters' ATK by 1.8x, HP by 1.5x, and boosts crew's chance of landing on [QCK] slots",
    hasSpecial: false,
  },
  {
    id: 11,
    name: "Aokiji's Bicycle",
    colaCount: 15309,
    superColaCount: 20,
    effect:
      "Boosts Striker characters' ATK by 1.8x, HP by 1.75x, and drastically reduces the chance of landing on [RCV] slots",
    hasSpecial: false,
  },
  {
    id: 12,
    name: "Striker",
    colaCount: 15240,
    superColaCount: 20,
    effect:
      "Reduces Shooter characters' Special charge time by 1 turn at start of quest, boosts Shooter characters' ATK by 1.8x and HP by 1.35x",
    hasSpecial: false,
  },
  {
    id: 13,
    name: "Thousand Sunny",
    colaCount: 15188,
    superColaCount: 20,
    effect:
      "Boosts crew's ATK by 1.65x, HP by 1.3x, and makes it easier to land PERFECT strikes",
    hasSpecial: true,
  },
  {
    id: 14,
    name: "Dreadnaught Sabre",
    colaCount: 15150,
    superColaCount: 20,
    effect:
      "Boosts crew's HP by 1.5x, boosts Driven and Powerhouse characters' ATK by 1.4x, boosts damage dealt to enemies affected by Poison, Venom, or progressive Poison by 1.2x, and deals 20,000 non-type damage to all enemies at end of turn",
    hasSpecial: false,
  },
  {
    id: 15,
    name: "Kuja Pirate Ship",
    colaCount: 15242,
    superColaCount: 20,
    effect:
      "Boosts Free Spirit and Shooter characters' ATK by 1.75x, HP by 1.4x, and makes it a little easier to land PERFECT strikes",
    hasSpecial: true,
  },
  {
    id: 16,
    name: "Ark Maxim",
    colaCount: 15234,
    superColaCount: 20,
    effect:
      "Boosts QCK and PSY characters' ATK by 1.75x, HP by 1.4x, and heals crew by 4,000 HP at end of turn",
    hasSpecial: true,
  },
  {
    id: 17,
    name: "Red Force",
    colaCount: 15244,
    superColaCount: 20,
    effect:
      "Boosts Cerebral and Shooter characters' ATK by 1.75x, HP by 1.4x, and boosts their chance of landing on own type slots",
    hasSpecial: false,
  },
  {
    id: 18,
    name: "Thousand Sunny - 2nd Anniversary Model",
    colaCount: 1000,
    superColaCount: 0,
    effect: "Boosts ATK by 1.2x",
    hasSpecial: false,
  },
  {
    id: 19,
    name: "Sun Pirates Ship",
    colaCount: 15168,
    superColaCount: 20,
    effect:
      "Boosts Fighter characters' ATK by 1.5x, HP by 1.5x, boosts ATK a further 1.2x and HP a further 1.3x if a character's 1st class is Fighter",
    hasSpecial: false,
  },
  {
    id: 20,
    name: "Donquixote Pirates Ship",
    colaCount: 15369,
    superColaCount: 20,
    effect:
      "Boosts Driven characters' ATK by 1.8x, HP by 1.5x, makes it easier for Driven characters to land PERFECT strikes",
    hasSpecial: true,
  },
  {
    id: 21,
    name: "Rocketman",
    colaCount: 15228,
    superColaCount: 20,
    effect:
      "Boosts Powerhouse characters' ATK by 1.85x, cuts crew's HP by 30%, and heals HP at end of turn (more depending on number of Powerhouses in crew; up to 2500 HP)",
    hasSpecial: true,
  },
  {
    id: 22,
    name: "Moby Dick - Paramount War Version",
    colaCount: 0,
    superColaCount: 0,
    effect: "Boosts HP by 1.3x",
    hasSpecial: false,
  },
  {
    id: 23,
    name: "Garp's Battleship",
    colaCount: 15189,
    superColaCount: 20,
    effect: "Boosts STR and PSY characters' ATK by 1.75x and HP by 1.4x",
    hasSpecial: false,
  },
  {
    id: 24,
    name: "Polar Tang",
    colaCount: 15300,
    superColaCount: 20,
    effect:
      "Boosts Free Spirit and Slasher characters' ATK by 1.6x, HP by 1.25x, makes it a little easier to land PERFECT strikes, and boosts Cerebral characters' ATK by a further 1.2x",
    hasSpecial: true,
  },
  {
    id: 25,
    name: "Big Top - Grand Line Feast",
    colaCount: 0,
    superColaCount: 0,
    effect: "Boosts ATK of characters with 20 cost or less by 1.2x",
    hasSpecial: true,
  },
  {
    id: 26,
    name: "Thousand Sunny - Coated Vessel",
    colaCount: 15156,
    superColaCount: 20,
    effect:
      "Boosts crew's ATK by 1.65x, reduces damage taken by 20%, and makes it easier to land PERFECT strikes",
    hasSpecial: true,
  },
  {
    id: 27,
    name: "Kizaru's Arrival Cannonball - Sabaody in Chaos",
    colaCount: 15256,
    superColaCount: 0,
    effect:
      "Boosts Shooter characters' ATK by 1.55x and HP by 1.2x, reduces their CD by 2 at the start of battle",
    hasSpecial: true,
  },
  {
    id: 28,
    name: "Mister Luffy Go",
    colaCount: 15194,
    superColaCount: 20,
    effect:
      "Reduces Striker characters' Special charge time by 1 turn at start of quest, makes it a little easier to land PERFECT strikes, boosts Driven characters' ATK by 1.1x, and if 6 Striker characters are on the crew, boosts crew's ATK by a further 1.75x and HP by 1.2x",
    hasSpecial: true,
  },
  {
    id: 29,
    name: "Thriller Bark",
    colaCount: 15204,
    superColaCount: 20,
    effect:
      "Boosts chances of crew landing on their own type slot, boosts DEX and INT characters' ATK by 1.5x, HP by 1.25x, and boosts Driven and Powerhouse characters' ATK by a further 1.15x",
    hasSpecial: false,
  },
  {
    id: 30,
    name: "Karasumaru",
    colaCount: 0,
    superColaCount: 0,
    effect: "Boosts ATK of Shooters by 1.2x",
    hasSpecial: true,
  },
  {
    id: 32,
    name: "Thousand Sunny - Special Anniversary Model",
    colaCount: 0,
    superColaCount: 0,
    effect: "Boosts ATK by 1.2x",
    hasSpecial: false,
  },
  {
    id: 33,
    name: "Flying Dutchman",
    colaCount: 15119,
    superColaCount: 20,
    effect: "Boosts crew's ATK by 1.65x and Pirate EXP earned by 1.75x",
    hasSpecial: true,
  },
  {
    id: 34,
    name: "Marshall D. Teach's Pirate Ship",
    colaCount: 15244,
    superColaCount: 20,
    effect:
      "Boosts crew's HP by 1.75x, reduces Special charge time by 1 turn at start of quest, and if Fighter, Slasher, Striker, and Shooter characters are on the crew, boosts crew's ATK by 1.75x, and if Driven and Powerhouse characters are on the crew, boosts crew's ATK by 1.1x",
    hasSpecial: false,
  },
  {
    id: 35,
    name: "Revolutionary Army Blackbirds",
    colaCount: 15199,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts crew's HP by 1.4x, and if the crew has STR, DEX and QCK characters, boosts STR, DEX and QCK characters' ATK by 1.7x, and if no PSY or INT characters are on the crew, boosts STR, DEX and QCK characters' ATK by a further 1.1x",
    hasSpecial: false,
  },
  {
    id: 36,
    name: "Zunesha",
    colaCount: 15202,
    superColaCount: 20,
    effect:
      "Boosts Powerhouse and Cerebral characters' ATK by 1.85x, HP by 1.5x, makes their [RCV] [TND] slots have matching slot effects, and makes it much easier to land PERFECT strikes",
    hasSpecial: false,
  },
  {
    id: 37,
    name: "Sexy Foxy",
    colaCount: 15208,
    superColaCount: 20,
    effect:
      "Boosts crew's ATK by 1.5x, boosts damage dealt to delayed enemies by 1.25x, doubles Berries earned, and boosts Pirate EXP earned by 1.3x",
    hasSpecial: false,
  },
  {
    id: 38,
    name: "Laboon",
    colaCount: 0,
    superColaCount: 0,
    effect: "Boosts ATK by 1.2x",
    hasSpecial: false,
  },
  {
    id: 39,
    name: "Thousand Sunny - 4th Anniversary Model",
    colaCount: 0,
    superColaCount: 0,
    effect: "Boosts ATK by 1.2x",
    hasSpecial: false,
  },
  {
    id: 40,
    name: "Nostra Castello",
    colaCount: 15244,
    superColaCount: 0,
    effect:
      "Boosts ATK by 1.55x and HP by 1.3x and makes it a little easier to hit PERFECTs, cuts the current HP of all enemies by 3% at the end of the turn, reduces crew's ATK if you have a Slasher, Free Spirit or Powerhouse characters in your crew",
    hasSpecial: false,
  },
  {
    id: 41,
    name: "Queen Mama Chanter",
    colaCount: 15260,
    superColaCount: 20,
    effect:
      "Boosts crew's chance of landing on own type slot, and boosts crew's HP by 1.5x. If Captain is a Driven or Powerhouse class, boosts STR, DEX, and QCK characters' ATK by 1.7x, if crew lands 3 PERFECT strikes in a row, boosts their ATK by approximately 1.8x, and allows STR, DEX, and QCK characters to obtain [RCV] [SEMLA] slots with PERFECT taps",
    hasSpecial: true,
  },
  {
    id: 42,
    name: "Germa 66 Ship",
    colaCount: 15202,
    superColaCount: 20,
    effect:
      "Boosts crew's chance of landing on [RCV] [TND] slots. If every type is on the crew, reduces Special charge time by 2 turns at start of quest, boosts crew's ATK by 1.7x, HP by 1.5x, boosts ATK a further 1.1x when character has [RCV] [TND] slots, and makes it a little easier to land PERFECT strikes",
    hasSpecial: false,
  },
  {
    id: 43,
    name: "Going Merry - 5th Anniversary Model",
    colaCount: 0,
    superColaCount: 0,
    effect: "Boosts ATK by 1.2x",
    hasSpecial: false,
  },
  {
    id: 44,
    name: "Hoe",
    colaCount: 15256,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts crew's ATK by 1.65x, makes it easier to land PERFECT strikes, boosts Pirate EXP earned by 1.75x, and heals crew by 2,000 HP at end of turn",
    hasSpecial: true,
  },
  {
    id: 45,
    name: "Megalo",
    colaCount: 15232,
    superColaCount: 20,
    effect:
      "Boosts crew's HP by 1.4x, and if Captain is a PSY or INT type, boosts top-row characters' ATK by 1.6x, boosts middle and bottom-row characters' ATK by 1.8x, boosts Captain's RCV by 600, and reduces damage taken by 15%",
    hasSpecial: true,
  },
  {
    id: 46,
    name: "Thousand Sunny - Flying Model",
    colaCount: 0,
    superColaCount: 0,
    effect: "Boosts ATK and EXP gained by 1.2x",
    hasSpecial: false,
  },
  {
    id: 47,
    name: "Piece of Spadille",
    colaCount: 15232,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts Powerhouse, Shooter, Free Spirit and Fighter characters' HP by 1.25x and ATK by 1.6x, and boosts their ATK by approximately 1.8x if HP is 30% or below before attacking",
    hasSpecial: false,
  },
  {
    id: 48,
    name: "Giant Koi",
    colaCount: 15202,
    superColaCount: 20,
    effect:
      "Boosts QCK and INT characters' ATK by 1.7x, HP by 1.35x, makes their [RCV] slots have matching slot effects, boosts their ATK by approximately 1.85x when HP is full at start of attack, and boosts amount of Berries earned by 3x / Special (11 turns): Heals crew by 12,500 HP and boosts the chain multiplier by +1.2 for 1 turn",
    hasSpecial: true,
  },
  {
    id: 49,
    name: "Grudge Dolph",
    colaCount: 15202,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts Slasher, Striker, and Cerebral characters' HP by 1.25x, boosts their ATK by approximately 1.75x when they have [RAINBOW], [WANO] or own type slots (1.6x otherwise) and heals crew by 2,000 HP at end of turn",
    hasSpecial: false,
  },
  {
    id: 50,
    name: "Going Merry - Farewell Edition",
    colaCount: 0,
    superColaCount: 0,
    effect: "Boosts ATK by 1.2x",
    hasSpecial: false,
  },
  {
    id: 51,
    name: "Shark Superb",
    colaCount: 15009,
    superColaCount: 20,
    effect:
      "If Captain is a STR, DEX, or QCK type, boosts crew's ATK by 2x, HP by 1.2x, reduces Special charge time by 1 turn at start of quest, makes it much easier to land PERFECT strikes, but reduces ATK after each turn (to a minimum of 1.75x after 5 turns)",
    hasSpecial: false,
  },
  {
    id: 53,
    name: "Victoria Punk",
    colaCount: 15202,
    superColaCount: 0,
    effect:
      "Boosts crew's HP by 1.2x, slightly boosts crew's chance of landing on [TND] slots, and if Captain is a STR or DEX type, boosts crew's ATK by approximately 1.65x when they have [TND] [BOMB] [SUPERBOMB] [WANO] slots (1.55x otherwise)",
    hasSpecial: true,
  },
  {
    id: 54,
    name: "Liberal Hind",
    colaCount: 15202,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts PSY characters' Special charge time by a further 1 turn, boosts Captain's RCV by 500, boosts crew's HP by 1.2x, and heals crew by 1,000 HP at end of turn. If Captain is a Free Spirit, Slasher, or Cerebral class, boosts crew's ATK by 1.6x. If 6 PSY characters are on the crew, boosts ATK a further 1.2x",
    hasSpecial: true,
  },
  {
    id: 55,
    name: "Nostra Castello (Amphibious)",
    colaCount: 15202,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 2 turns at start of quest, boosts STR, PSY, and INT characters' ATK by 1.65x, HP by 1.4x, boosts their ATK by approximately 1.85x when HP is full or 30% or below at start of attack, and makes it a little easier for them to land PERFECT strikes",
    hasSpecial: false,
  },
  {
    id: 56,
    name: "Oro Jackson",
    colaCount: 15202,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn, boosts Free Spirit and Slasher characters' ATK by 1.7x, HP by 1.3x, makes their [RCV] [TND] slots have matching slot effects, makes it much easier to land PERFECT strikes, boosts QCK and PSY characters' ATK by a further 1.1x, and heals crew by 1,000 HP at end of turn",
    hasSpecial: true,
  },
  {
    id: 59,
    name: "Whale Shark",
    colaCount: 15202,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts crew's ATK by 1.75x, HP by 20,000, makes crew's [TND] [RCV] slots have matching slot effects, makes it easier to land PERFECT strikes, and boosts Pirate EXP earned by 1.5x",
    hasSpecial: false,
  },
  {
    id: 61,
    name: "Shiki's Island Ship",
    colaCount: 15500,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts DEX, INT and QCK characters' ATK by 1.65x and HP by 1.45x, slightly boosts chance of landing on [RCV] slots, and if HP is full or 30% or below at start of attack, boosts DEX, INT and QCK characters' ATK by approximately 1.85x instead",
    hasSpecial: false,
  },
  {
    id: 62,
    name: "White Tiger",
    colaCount: 15500,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts Shooter characters' ATK by 1.9x, HP by 1.25x, makes crew's [PSY] [INT] slots have matching slot effects, and makes it much easier to land PERFECT strikes",
    hasSpecial: false,
  },
  {
    id: 63,
    name: "Catapult",
    colaCount: 15500,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts STR, QCK, and INT characters' ATK by 1.75x, HP by 1.25x, boosts Captain's ATK by a further 1.25x (~2.1875x), makes crew's [PSY] [DEX] slots have matching slot effects, and makes it easier to land PERFECT strikes",
    hasSpecial: false,
  },
  {
    id: 64,
    name: "Gran Tesoro",
    colaCount: 15500,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts crew's ATK by 1.7x, HP by 1.4x, boosts their ATK by approximately 2x when they have [G] or [RAINBOW] slots, boosts amount of Berries earned by 3x, and if every class is on the crew and crew launches a Special to set the chain multiplier, extends it by 1 turn",
    hasSpecial: false,
  },
];
