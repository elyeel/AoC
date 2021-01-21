const [hitPoints, damage, armor] = require("fs")
  .readFileSync("./2015/day21/data.txt", "utf-8")
  .trim()
  .split(/\n/)
  .map((x) => {
    const unit = x.split(" ");
    return parseInt(unit[unit.length - 1]);
  });

const boss = {
  hitPoints,
  damage,
  armor,
};
// console.log(boss);
const shop = {
  weapons: {
    Dagger: { cost: 8, damage: 4, armor: 0 },
    Shortsword: { cost: 10, damage: 5, armor: 0 },
    Warhammer: { cost: 25, damage: 6, armor: 0 },
    Longsword: { cost: 40, damage: 7, armor: 0 },
    Greataxe: { cost: 74, damage: 8, armor: 0 },
  },
  armors: {
    Leather: { cost: 13, damage: 0, armor: 1 },
    Chainmail: { cost: 31, damage: 0, armor: 2 },
    Splintmail: { cost: 53, damage: 0, armor: 3 },
    Bandedmail: { cost: 75, damage: 0, armor: 4 },
    Platemail: { cost: 102, damage: 0, armor: 5 },
  },
  rings: {
    Damage1: { cost: 25, damage: 1, armor: 0 },
    Damage2: { cost: 50, damage: 2, armor: 0 },
    Damage3: { cost: 100, damage: 3, armor: 0 },
    Defense1: { cost: 20, damage: 0, armor: 1 },
    Defense2: { cost: 40, damage: 0, armor: 2 },
    Defense3: { cost: 80, damage: 0, armor: 3 },
  },
};

const movesNeeded = (defHP, attDamage, defArmor) => {
  return Math.ceil(defHP / Math.max(attDamage - defArmor, 1));
};
// console.log(movesNeeded(104, 11, 1), movesNeeded(100, 8, 11));

const playRunner = (data) => {
  // rpg play simulation
  let i = 0;
  while (data.boss.hitPoints > 0 && data.player.hitPoints > 0) {
    ++i;
    if (i % 2 != 0) {
      //player turn, odd numbered
      data.boss.hitPoints -= data.player.damage - data.boss.armor;
    } else {
      // boss turn
      data.player.hitPoints -= data.boss.damage - data.player.armor;
    }
  }
  return { data, i };
};
// console.log(playRunner(play));

const part1 = (boss, shop) => {
  // set player to combination of weapon, armor, and ring
  const players = new Map();

  for (const [key, value] of Object.entries(shop.weapons)) {
    players.set(key, value);
    for (const [keyA, valueA] of Object.entries(shop.armors)) {
      const cost = value.cost + valueA.cost;
      const armor = value.armor + valueA.armor;
      const damage = value.damage + valueA.damage;
      players.set(`${key}${keyA}`, { cost, damage, armor });
      for (const [keyR, valueR] of Object.entries(shop.rings)) {
        const costR = cost + valueR.cost;
        const damageR = damage + valueR.damage;
        const armorR = armor + valueR.armor;
        players.set(`${key}${keyA}${keyR}`, {
          cost: costR,
          damage: damageR,
          armor: armorR,
        });
        for (const [keyR2, valueR2] of Object.entries(shop.rings)) {
          if (keyR === keyR2) continue;
          else {
            const costR2 = costR + valueR2.cost;
            const armorR2 = armorR + valueR2.armor;
            const damageR2 = damageR + valueR2.damage;
            players.set(`${key}${keyA}${keyR}${keyR2}`, {
              cost: costR2,
              damage: damageR2,
              armor: armorR2,
            });
          }
        }
      }
    }
    // for options weapon + ring only
    for (const [keyR, valueR] of Object.entries(shop.rings)) {
      const costR = value.cost + valueR.cost;
      const damageR = value.damage + valueR.damage;
      const armorR = value.armor + valueR.armor;
      players.set(`${key}${keyR}`, {
        cost: costR,
        damage: damageR,
        armor: armorR,
      });
      for (const [keyR2, valueR2] of Object.entries(shop.rings)) {
        if (keyR === keyR2) continue;
        else {
          const costR2 = costR + valueR2.cost;
          const armorR2 = armorR + valueR2.armor;
          const damageR2 = damageR + valueR2.damage;
          players.set(`${key}${keyR}${keyR2}`, {
            cost: costR2,
            damage: damageR2,
            armor: armorR2,
          });
        }
      }
    }
  }
  // console.log(players);

  // iteration on players
  const result = [];
  // activate below for not using play simulation approach
  // for (const [key, value] of players.entries()) {
  //   const playerVal = movesNeeded(boss.hitPoints, value.damage, boss.armor);
  //   const bossVal = movesNeeded(100, boss.damage, value.armor);
  //   const winner = bossVal >= playerVal ? key : "boss";
  //   result.push({ [key]: { winner, cost: value.cost } });
  // }
  // console.log(players.size);
  return players;
};

const options = part1(boss, shop);

const simulatePlay = (options, boss) => {
  // rpg play simulation
  let minWin = Infinity,
    maxLose = -Infinity;

  for (const option of options.values()) {
    const player = {
      hitPoints: 100,
      damage: option.damage,
      armor: option.armor,
      cost: option.cost,
    };
    const bossInPlay = { ...boss };
    // console.log(player, bossInPlay);

    let i = 0;
    while (bossInPlay.hitPoints > 0 && player.hitPoints > 0) {
      ++i;
      if (i % 2 != 0) {
        //player turn, odd numbered
        if (bossInPlay.armor >= player.damage) {
          bossInPlay.hitPoints -= 1;
          // console.log("got here");
        } else bossInPlay.hitPoints -= player.damage - bossInPlay.armor;
      } else {
        // boss turn
        if (player.armor >= bossInPlay.damage) {
          // console.log("got here boss");
          player.hitPoints -= 1;
        } else player.hitPoints -= bossInPlay.damage - player.armor;
      }
    }
    // console.log(player, bossInPlay);

    player.hitPoints > 0 ? (minWin = Math.min(minWin, player.cost)) : null;
    if (bossInPlay.hitPoints > 0) maxLose = Math.max(maxLose, player.cost);
  }
  return { minWin, maxLose };
};
console.log(boss);
console.log(simulatePlay(options, boss));

// activate below for no play simulation approach
// let min = 1000,
//   maxLose = 0;
// for (const option of options) {
//   // console.log(Object.entries(win));
//   for (const [key, value] of Object.entries(option)) {
//     if (value.winner !== "boss") {
//       min > value.cost ? (min = value.cost) : min;
//       // console.log(key, value);
//     } else {

//       maxLose < value.cost ? (maxLose = value.cost) : maxLose;
//     }
//   }
// }
// console.log(min, maxLose);
