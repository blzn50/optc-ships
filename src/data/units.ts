import type { ShipOverview } from "@/types/Ship";

import { details } from "./details";
import { convertToPSTTimestamp, getPSTTimestamp } from "@/lib/utils";

export const units: ShipOverview[] = [
  {
    id: 1,
    name: "Dinghy",
    colaCount: 15048,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 2 turns at start of quest, boosts crew's chance of landing on own type slot, boosts Captain's RCV by 800, boosts crew's ATK by 1.65x, HP by 1.5x, and makes it much easier to land PERFECT strikes",
    hasSpecial: "afterMRank5",
  },
  {
    id: 2,
    name: "Merry Go",
    colaCount: 15057,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts Captain's HP by 20000, boosts crew's ATK by 1.65x, reduces crew's Bind/Despair duration by 1 turn, and makes it much easier to land PERFECT strikes",
    hasSpecial: "afterMRank5",
  },
  {
    id: 3,
    name: "Navy Ship",
    colaCount: 15234,
    superColaCount: 20,
    effect:
      "Boosts Shooter and Fighter characters' ATK by 500, reduces crew's Paralysis duration by 1 turn, boosts crew's HP by 1.75x, boosts chance of landing on own type slot, and boosts Shooter and Fighter characters' ATK by 1.5x",
    hasSpecial: "afterMRank5",
  },
  {
    id: 4,
    name: "Baratie",
    colaCount: 15226,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts Captain's HP by 10,000, boosts crew's ATK by 1.5x, boosts crew's chance of landing on [RCV] slots, changes [TND] slots into [SEMLA] slots, makes [RCV] [SEMLA] slots have matching slot effects, boosts ATK by 1.2x when characters have [RCV] [SEMLA] slots, and allows crew to obtain [RCV] [SEMLA] slots with PERFECT taps",
    hasSpecial: "afterMRank5",
  },
  {
    id: 5,
    name: "Coffin Boat",
    colaCount: 15328,
    superColaCount: 20,
    effect:
      "Reduces Slasher characters' Special charge time by 1 turn at start of quest, boosts their ATK by 1.8x, HP by 1.75x, but reduces Captain's RCV by 700, and reduces crew's Bind duration by 1 turn",
    hasSpecial: "afterMRank5",
  },
  {
    id: 6,
    name: "Miss Love Duck",
    colaCount: 15202,
    superColaCount: 20,
    effect:
      "Reduces Striker characters' Special charge time by 1 turn at start of quest, boosts their ATK by 1.5x, HP by 1.3x, boosts their chance of landing on own type slot, reduces damage taken by 20%, and boosts Striker characters' ATK by 600",
    hasSpecial: "no",
  },
  {
    id: 7,
    name: "Going Merry - Flying Model",
    colaCount: 15233,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, heals crew by 5,000 HP at end of turn, reduces crew's Despair duration by 2 turns, and boosts crew's ATK by 1.7x and RCV by 1.2x",
    hasSpecial: "afterMRank5",
  },
  {
    id: 8,
    name: "Moby Dick",
    colaCount: 15380,
    superColaCount: 20,
    effect:
      "Reduces crew's Special charge time by 1 turn at start of quest, reduces HP to 50%, boosts ATK by 1.55x, HP by 1.6x, if HP is 50% or below before attacking, reduces damage taken by 20%, and if HP is 30% or below before attacking, boosts ATK by a further 1.2x",
    hasSpecial: "afterMRank5",
  },
  {
    id: 9,
    name: "Big Top",
    colaCount: 15202,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts ATK by 2.2x for characters with a Cost of 40 or less, boosts their HP by 1.4x, and boosts ATK by 1.6x for characters with a Cost of 41 or more",
    hasSpecial: "no",
  },
  {
    id: 10,
    name: "Bezan Black",
    colaCount: 15180,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts QCK characters' ATK by 1.8x, HP by 1.5x, makes crew's [STR] [DEX] slots have matching slot effects, reduces Despair duration by 1 turn, and boosts crew's chance of landing on [QCK] slots",
    hasSpecial: "afterMRank5",
  },
  {
    id: 11,
    name: "Aokiji's Bicycle",
    colaCount: 15309,
    superColaCount: 20,
    effect:
      "Reduces Striker characters' Special charge time by 1 turn at start of quest, boosts their ATK by 1.8x, HP by 1.75x, reduces crew's Bind duration by 1 turn, and drastically reduces the chance of landing on [RCV] slots",
    hasSpecial: "afterMRank5",
  },
  {
    id: 12,
    name: "Striker",
    colaCount: 15240,
    superColaCount: 20,
    effect:
      "Reduces Shooter characters' Special charge time by 2 turns at start of quest, boosts Shooter characters' ATK by 1.8x, HP by 1.35x, and boosts damage dealt to Ignited enemies by 1.05x",
    hasSpecial: "afterMRank5",
  },
  {
    id: 13,
    name: "Thousand Sunny",
    colaCount: 15188,
    superColaCount: 20,
    effect:
      "Boosts crew's ATK by 1.65x, HP by 1.3x, reduces crew's ATK Down/Bind duration by 1 turn, and makes it easier to land PERFECT strikes",
    hasSpecial: "yes",
  },
  {
    id: 14,
    name: "Dreadnaught Sabre",
    colaCount: 15150,
    superColaCount: 20,
    effect:
      "Reduces crew's Paralysis duration by 1 turn, boosts crew's HP by 1.5x, boosts Driven and Powerhouse characters' ATK by 200, boosts Driven and Powerhouse characters' ATK by 1.4x, boosts damage dealt to enemies affected by Poison, Venom, or progressive Poison by 1.2x, and deals 20,000 non-type damage to all enemies at end of turn",
    hasSpecial: "no",
  },
  {
    id: 15,
    name: "Kuja Pirate Ship",
    colaCount: 15242,
    superColaCount: 20,
    effect:
      "Reduces Free Spirit and Shooter characters' Special charge time by 1 turn at start of quest, boosts Free Spirit and Shooter characters' ATK by 1.75x, HP by 1.4x, makes it a little easier to land PERFECT strikes, and reduces crew's decrease chain multiplier growth rate duration by 2 turns",
    hasSpecial: "yes",
  },
  {
    id: 16,
    name: "Ark Maxim",
    colaCount: 15234,
    superColaCount: 20,
    effect:
      "Reduces QCK and PSY characters' Special charge time by 1 turn at start of quest, boosts QCK and PSY characters' ATK by 1.75x, HP by 1.4x, reduces crew's Paralysis duration by 1 turn, and heals crew by 4,000 HP at end of turn",
    hasSpecial: "yes",
  },
  {
    id: 17,
    name: "Red Force",
    colaCount: 15244,
    superColaCount: 20,
    effect:
      "Boosts Cerebral and Shooter characters' ATK by 1.75x, HP by 1.4x, boosts chances of them landing on their own type slot, reduces crew's ATK Down duration by 1 turn, and makes it a little easier for crew to land PERFECT strikes",
    hasSpecial: "afterMRank5",
  },
  {
    id: 18,
    name: "Thousand Sunny - 2nd Anniversary Model",
    colaCount: 1000,
    superColaCount: 0,
    effect: "Boosts ATK by 1.2x",
    hasSpecial: "no",
  },
  {
    id: 19,
    name: "Sun Pirates Ship",
    colaCount: 15168,
    superColaCount: 20,
    effect:
      "Reduces Fighter characters' Special charge time by 1 turn at start of quest, boosts Fighter characters' ATK by 1.5x, HP by 1.5x, boosts ATK a further 1.2x and HP a further 1.3x if a character's 1st class is Fighter, and makes it easier to land PERFECT strikes",
    hasSpecial: "afterMRank5",
  },
  {
    id: 20,
    name: "Donquixote Pirates Ship",
    colaCount: 15369,
    superColaCount: 20,
    effect:
      "Reduces Driven characters' Special charge time by 1 turn at start of quest, boosts their ATK by 1.8x, HP by 1.5x, and makes it easier for Driven characters to land PERFECT strikes",
    hasSpecial: "yes",
  },
  {
    id: 21,
    name: "Rocketman",
    colaCount: 15228,
    superColaCount: 20,
    effect:
      "Reduces Powerhouse characters' Special charge time by 1 turn at start of quest, boosts their ATK by 1.85x, cuts crew's HP by 30%, reduces crew's Paralysis duration by 1 turn, and heals HP at end of turn (more depending on number of Powerhouses in crew; up to 2500 HP)",
    hasSpecial: "yes",
  },
  {
    id: 22,
    name: "Moby Dick - Paramount War Version",
    colaCount: 0,
    superColaCount: 0,
    effect: "Boosts HP by 1.3x",
    hasSpecial: "no",
  },
  {
    id: 23,
    name: "Garp's Battleship",
    colaCount: 15189,
    superColaCount: 20,
    effect:
      "Boosts STR and PSY characters' ATK by 1.75x, HP by 1.4x, and if crew uses a Special to launch additive chain multiplier boost (except multiplicative boost) or to set the chain multiplier, extends the duration of that effect by 1 turn",
    hasSpecial: "afterMRank5",
  },
  {
    id: 24,
    name: "Polar Tang",
    colaCount: 15300,
    superColaCount: 20,
    effect:
      "Reduces Free Spirit and Slasher characters' Special charge time by 1 turn at start of quest, boosts their ATK by 1.6x, HP by 1.25x, makes it a little easier to land PERFECT strikes, boosts Cerebral characters' ATK by a further 1.2x, and reduces crew's Paralysis duration by 1 turn",
    hasSpecial: "yes",
  },
  {
    id: 25,
    name: "Big Top - Grand Line Feast",
    colaCount: 0,
    superColaCount: 0,
    effect: "Boosts ATK of characters with 20 cost or less by 1.2x",
    hasSpecial: "yes",
  },
  {
    id: 26,
    name: "Thousand Sunny - Coated Vessel",
    colaCount: 15156,
    superColaCount: 20,
    effect:
      "Boosts crew's ATK by 1.65x, reduces damage taken by 20%, reduces crew's Bind duration by 2 turns, and makes it easier to land PERFECT strikes",
    hasSpecial: "yes",
  },
  {
    id: 27,
    name: "Kizaru's Arrival Cannonball - Sabaody in Chaos",
    colaCount: 15256,
    superColaCount: 20,
    effect:
      "Boosts Shooter characters' ATK by 1.75x, HP by 1.2x, reduces their Special charge time by 2 turns at start of quest, boosts Slasher characters' ATK by 1.1x, reduces Slasher characters' Special charge time by 1 turn at start of quest, and makes it easier to land PERFECT strikes",
    hasSpecial: "yes",
  },
  {
    id: 28,
    name: "Mister Luffy Go",
    colaCount: 15194,
    superColaCount: 20,
    effect:
      "Reduces Striker characters' Special charge time by 1 turn at start of quest, makes it a little easier to land PERFECT strikes, reduces damage taken by 10%, boosts Driven characters' ATK by 1.1x, and if 6 Striker characters are on the crew, boosts crew's ATK by a further 1.75x and HP by 1.6x",
    hasSpecial: "yes",
  },
  {
    id: 29,
    name: "Thriller Bark",
    colaCount: 15204,
    superColaCount: 20,
    effect:
      "Reduces DEX and INT characters' Special charge time by 1 turn at start of quest, boosts chances of crew landing on their own type slot, boosts DEX and INT characters' ATK by 1.5x, HP by 1.25x, boosts Driven and Powerhouse characters' ATK by a further 1.15x, and if crew applies slot effect boosts with a Special, extends the duration of crew's slot effect boosts by 1 turn",
    hasSpecial: "afterMRank5",
  },
  {
    id: 30,
    name: "Karasumaru",
    colaCount: 0,
    superColaCount: 0,
    effect: "Boosts ATK of Shooters by 1.2x",
    hasSpecial: "yes",
  },
  {
    id: 32,
    name: "Thousand Sunny - Special Anniversary Model",
    colaCount: 0,
    superColaCount: 0,
    effect: "Boosts ATK by 1.2x",
    hasSpecial: "no",
  },
  {
    id: 33,
    name: "Flying Dutchman",
    colaCount: 15119,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts crew's ATK by 1.65x, HP by 1.2x, and Pirate EXP earned by 1.75x",
    hasSpecial: "yes",
  },
  {
    id: 34,
    name: "Marshall D. Teach's Pirate Ship",
    colaCount: 15244,
    superColaCount: 20,
    effect:
      "Reduces crew's Bind duration by 1 turn, boosts crew's HP by 1.75x, reduces Special charge time by 2 turns at start of quest, and if Fighter, Slasher, Striker, and Shooter characters are on the crew, boosts crew's ATK by 1.75x, and if Driven and Powerhouse characters are on the crew, boosts crew's ATK by 1.1x",
    hasSpecial: "no",
  },
  {
    id: 35,
    name: "Revolutionary Army Blackbirds",
    colaCount: 15199,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, reduces STR, DEX and QCK characters' Special charge time by a further 1 turn, boosts crew's HP by 1.4x, reduces damage taken by 10%, and if the crew has STR, DEX and QCK characters, boosts STR, DEX and QCK characters' ATK by 1.7x, and if no PSY or INT characters are on the crew, boosts STR, DEX and QCK characters' ATK by a further 1.1x",
    hasSpecial: "afterMRank5",
  },
  {
    id: 36,
    name: "Zunesha",
    colaCount: 15202,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts Powerhouse and Cerebral characters' ATK by 1.85x, HP by 1.5x, makes their [RCV] [TND] slots have matching slot effects, reduces crew's Special Bind duration by 1 turn, and makes it much easier to land PERFECT strikes",
    hasSpecial: "afterMRank5",
  },
  {
    id: 37,
    name: "Sexy Foxy",
    colaCount: 15208,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts crew's ATK by 1.5x, boosts damage dealt to delayed enemies by 1.25x, doubles Berries earned, boosts Pirate EXP earned by 1.3x, and makes it easier to land PERFECT strikes",
    hasSpecial: "afterMRank5",
  },
  {
    id: 38,
    name: "Laboon",
    colaCount: 0,
    superColaCount: 0,
    effect: "Boosts ATK by 1.2x",
    hasSpecial: "no",
  },
  {
    id: 39,
    name: "Thousand Sunny - 4th Anniversary Model",
    colaCount: 0,
    superColaCount: 0,
    effect: "Boosts ATK by 1.2x",
    hasSpecial: "no",
  },
  {
    id: 40,
    name: "Nostra Castello",
    colaCount: 15244,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts crew's ATK by 1.6x, HP by 1.3x, boosts Driven and Shooter characters' ATK by a further 1.2x, reduces crew's ATK Down duration by 1 turn, makes it easier to land PERFECT strikes, reduces all enemies' HP by 5% at end of turn, but slightly reduces ATK depending on number of Slasher, Free Spirit, or Powerhouse classes on the crew",
    hasSpecial: "no",
  },
  {
    id: 41,
    name: "Queen Mama Chanter",
    colaCount: 15260,
    superColaCount: 20,
    effect:
      "Reduces STR, DEX, and QCK characters' Special charge time by 1 turn at start of quest, boosts crew's chance of landing on own type slot, boosts HP by 1.5x, and makes crew's [RCV] slots into [SEMLA] slots. If Captain is a Driven or Powerhouse class, boosts STR, DEX, and QCK characters' ATK by 1.7x, if crew lands 3 PERFECT strikes in a row, boosts their ATK by approximately 1.8x, and allows STR, DEX, and QCK characters to obtain [RCV] [SEMLA] slots with PERFECT taps",
    hasSpecial: "yes",
  },
  {
    id: 42,
    name: "Germa 66 Ship",
    colaCount: 15202,
    superColaCount: 20,
    effect:
      "Boosts crew's chance of landing on [RCV] [TND] slots and reduces crew's Special Reverse by 1 turn. If every type is on the crew, reduces Special charge time by 2 turns at start of quest, boosts crew's ATK by 1.8x, HP by 1.5x, boosts ATK a further 1.1x when character has [RCV] [TND] slots, and makes it a little easier to land PERFECT strikes",
    hasSpecial: "no",
  },
  {
    id: 43,
    name: "Going Merry - 5th Anniversary Model",
    colaCount: 0,
    superColaCount: 0,
    effect: "Boosts ATK by 1.2x",
    hasSpecial: "no",
  },
  {
    id: 44,
    name: "Hoe",
    colaCount: 15256,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 2 turns at start of quest, boosts crew's ATK by 1.65x, makes it easier to land PERFECT strikes, doubles Pirate EXP earned, and heals crew by 2,000 HP at end of turn",
    hasSpecial: "yes",
  },
  {
    id: 45,
    name: "Megalo",
    colaCount: 15232,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, reduces the duration of healing effect converted to damage effect by 1 turn, boosts crew's HP by 1.4x, and if Captain is a PSY or INT type, boosts top-row characters' ATK by 1.7x, boosts middle and bottom-row characters' ATK by 1.8x, boosts Captain's RCV by 600, and reduces damage taken by 15%",
    hasSpecial: "yes",
  },
  {
    id: 46,
    name: "Thousand Sunny - Flying Model",
    colaCount: 0,
    superColaCount: 0,
    effect: "Boosts ATK and EXP gained by 1.2x",
    hasSpecial: "no",
  },
  {
    id: 47,
    name: "Piece of Spadille",
    colaCount: 15232,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 2 turns at start of quest, reduces crew's Despair duration by 1 turn, boosts Powerhouse, Shooter, Free Spirit and Fighter characters' HP by 1.25x and ATK by 1.6x, and boosts their ATK by approximately 1.8x if HP is 30% or below before attacking",
    hasSpecial: "afterMRank5",
  },
  {
    id: 48,
    name: "Giant Koi",
    colaCount: 15202,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts QCK and INT characters' ATK by 1.7x, HP by 1.35x, makes their [RCV] slots have matching slot effects, boosts their ATK by approximately 1.85x when HP is full at start of attack, heals crew by 2,000 HP at end of turn, and boosts amount of Berries earned by 3x",
    hasSpecial: "yes",
  },
  {
    id: 49,
    name: "Grudge Dolph",
    colaCount: 15202,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts crew's chance of landing on own type slot, reduces crew's Special Bind duration by 1 turn, boosts Slasher, Striker, and Cerebral characters' HP by 1.25x, boosts their ATK by approximately 1.75x when they have [RAINBOW], [WANO] or own type slots (1.6x otherwise) and heals crew by 2,000 HP at end of turn",
    hasSpecial: "no",
  },
  {
    id: 50,
    name: "Going Merry - Farewell Edition",
    colaCount: 0,
    superColaCount: 0,
    effect: "Boosts ATK by 1.2x",
    hasSpecial: "no",
  },
  {
    id: 51,
    name: "Shark Superb",
    colaCount: 15009,
    superColaCount: 20,
    effect:
      "If Captain is a STR, DEX, or QCK type, boosts crew's ATK by 2x, HP by 1.2x, reduces Special charge time by 2 turns at start of quest, makes [QCK] [DEX] slots have matching slot effects, makes it much easier to land PERFECT strikes, but reduces ATK after each turn (to a minimum of 1.75x after 5 turns)",
    hasSpecial: "no",
  },
  {
    id: 52,
    name: "Thousand Sunny - 6th Anniversary Model",
    colaCount: 0,
    superColaCount: 0,
    effect: "Boosts crew's ATK by 1.2x",
    hasSpecial: "no",
  },
  {
    id: 53,
    name: "Victoria Punk",
    colaCount: 15202,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts crew's HP by 1.35x, slightly boosts crew's chance of landing on [TND] slots, reduces crew's Despair duration by 1 turn, makes [BOMB] [SUPERBOMB] slots have matching slot effects, boosts crew's ATK by 1.7x, and boosts crew's ATK by approximately 2x when they have [BOMB] [SUPERBOMB] slots",
    hasSpecial: "yes",
  },
  {
    id: 54,
    name: "Liberal Hind",
    colaCount: 15202,
    superColaCount: 20,
    effect:
      "Reduces crew's Bind duration by 1 turn, reduces Special charge time by 1 turn at start of quest, boosts PSY characters' Special charge time by a further 1 turn, boosts Captain's RCV by 500, boosts crew's HP by 1.4x, and heals crew by 1,000 HP at end of turn. If Captain is a Free Spirit, Slasher, or Cerebral class, boosts crew's ATK by 1.6x. If 6 PSY characters are on the crew, boosts ATK a further 1.2x",
    hasSpecial: "yes",
  },
  {
    id: 55,
    name: "Nostra Castello (Amphibious)",
    colaCount: 15202,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 2 turns at start of quest, boosts STR, PSY, and INT characters' ATK by 1.65x, HP by 1.4x, reduces damage taken by 10%, boosts their ATK by approximately 1.85x when HP is full or 30% or below at start of attack, heals crew by 2,000 HP at end of turn, and makes it a little easier for them to land PERFECT strikes",
    hasSpecial: "no",
  },
  {
    id: 56,
    name: "Oro Jackson",
    colaCount: 15202,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn, boosts Free Spirit and Slasher characters' ATK by 150, boosts their ATK by 1.7x, HP by 1.3x, makes their [RCV] [TND] slots have matching slot effects, makes it much easier to land PERFECT strikes, boosts QCK and PSY characters' ATK by a further 1.1x, and heals crew by 1,000 HP at end of turn",
    hasSpecial: "yes",
  },
  {
    id: 57,
    name: "Thousand Sunny - 7th Anniversary Model",
    colaCount: 0,
    superColaCount: 0,
    effect: "Boosts crew's ATK by 1.2x",
    hasSpecial: "no",
  },
  {
    id: 58,
    name: "Thousand Sunny - 8th Anniversary Model",
    colaCount: 0,
    superColaCount: 0,
    effect: "Boosts crew's ATK by 1.5x and makes their [TND] slots have matching slot effects",
    hasSpecial: "no",
  },
  {
    id: 59,
    name: "Whale Shark",
    colaCount: 15202,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 2 turns at start of quest, boosts crew's ATK by 1.75x, HP by 20,000, reduces crew's Paralysis duration by 1 turn, makes crew's [TND] [RCV] slots have matching slot effects, makes it easier to land PERFECT strikes, and boosts Pirate EXP earned by 1.5x",
    hasSpecial: "no",
  },
  {
    id: 60,
    name: "Thousand Sunny - 9th Anniversary Model",
    colaCount: 0,
    superColaCount: 0,
    effect: "Boosts crew's ATK by 1.5x and makes it a little easier to land PERFECT strikes",
    hasSpecial: "no",
  },
  {
    id: 61,
    name: "Shiki's Island Ship",
    colaCount: 15500,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 2 turns at start of quest, boosts DEX, INT, and QCK characters' ATK by 1.65x, HP by 1.45x, slightly boosts chance of landing on [RCV] slots, reduces crew's Despair duration by 1 turn, and if HP is full or 30% or below at start of attack, boosts DEX, INT, and QCK characters' ATK by approximately 1.85x",
    hasSpecial: "no",
  },
  {
    id: 62,
    name: "White Tiger",
    colaCount: 15500,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, reduces Shooter characters' Special charge time by a further 1 turn, boosts Shooter characters' ATK by 1.9x, HP by 1.25x, reduces crew's Paralysis duration by 1 turn, makes crew's [PSY] [INT] slots have matching slot effects, and makes it much easier to land PERFECT strikes",
    hasSpecial: "no",
  },
  {
    id: 63,
    name: "Catapult",
    colaCount: 15500,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 2 turns at start of quest, boosts Fighter characters' ATK by 200, boosts STR, QCK, and INT characters' ATK by 1.75x, HP by 1.25x, boosts Captain's ATK by a further 1.25x, makes crew's [PSY] [DEX] slots have matching slot effects, and makes it easier to land PERFECT strikes",
    hasSpecial: "no",
  },
  {
    id: 64,
    name: "Gran Tesoro",
    colaCount: 15500,
    superColaCount: 20,
    effect:
      "Reduces Special charge time by 1 turn at start of quest, boosts crew's ATK by 1.7x, HP by 1.4x, boosts their ATK by approximately 2x when they have [G] or [RAINBOW] slots, reduces crew's Bind/ATK Down duration by 1 turn, boosts amount of Berries earned by 3x, and if every class is on the crew and crew launches a Special to set the chain multiplier, extends the duration of the effect by 1 turn",
    hasSpecial: "no",
  },
  /**
   * p1: 2024-04-27T19:00 -> 2024-05-11T23:59:59
   * p2: 2024-05-12T00:00 -> 2024-05-12T11:59:59
   * p3: 2024-05-12T12:00 -> 2024-05-11T23:59:59
   * p4: 2024-05-13T00:00 -> 2024-06-29T18:59:59
   */
  {
    id: 65,
    name: "Thousand Sunny - 10th Anniversary Special Model",
    colaCount: 0,
    superColaCount: 0,
    effect:
      details[65].effect[
        convertToPSTTimestamp() <= getPSTTimestamp("2024-05-11T23:59:59")
          ? 0
          : convertToPSTTimestamp() <= getPSTTimestamp("2024-05-12T11:59:59")
            ? 1
            : convertToPSTTimestamp() <= getPSTTimestamp("2024-05-11T23:59:59")
              ? 2
              : convertToPSTTimestamp() <=
                  getPSTTimestamp("2024-06-29T18:59:59")
                ? 3
                : 4
      ],
    hasSpecial:
      convertToPSTTimestamp() >= getPSTTimestamp("2024-05-12T00:00") &&
      convertToPSTTimestamp() <= getPSTTimestamp("2024-06-29T18:59:59")
        ? "yes"
        : "no",
  },
];
