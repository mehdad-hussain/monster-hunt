const ATTACK_VALUE = 10; // global hardcoded value  naming convention
const MONSTER_ATTACK_VALUE = 14;
const SKILL_ATTACK_VALUE = 18;
const HEAL_VALUE = 20;
const LOG_PLAYER_ATTACK = "Normal Attack";
const LOG_PLAYER_SKILL = "Skill Attack";
const LOG_MONSTER_ATTACK = "Monster Attack";
const LOG_PLAYER_HEAL = "Healing";
const LOG_GAME_OVER = "Game Over";

const enteredValue = prompt("Choose your MAX life", "100");
let chosenMaxlife = parseInt(enteredValue);
if (isNaN(chosenMaxlife) || chosenMaxlife <= 0) {
  chosenMaxlife = 100;
}
let currentPlayerHealth = chosenMaxlife;
let currentMonsterHealth = chosenMaxlife;
let hasBonusLife = true;
const battleLog = [];
let lastLoggedEntry;

adjustHealthBars(chosenMaxlife);

function reset() {
  currentMonsterHealth = chosenMaxlife;
  currentPlayerHealth = chosenMaxlife;
  resetgame(chosenMaxlife);
}

function monsterTurn() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  wiretoLog(
    LOG_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    alert("You had used your bonus life!");
    setPlayerHealth(initialPlayerHealth);
  }
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You WON!");
    wiretoLog(
      LOG_GAME_OVER,
      "Player Won",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You LOST!");
    wiretoLog(
      LOG_GAME_OVER,
      "Player Lost",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("DRAW!");
    wiretoLog(LOG_GAME_OVER, "Draw", currentMonsterHealth, currentPlayerHealth);
  }
  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  const maxDamage = mode === 1 ? ATTACK_VALUE : SKILL_ATTACK_VALUE;
  // it's expression but also statement
  const logAttack = mode === 1 ? LOG_PLAYER_ATTACK : LOG_PLAYER_SKILL;
  // if (mode === 1) {
  //   maxDamage = ATTACK_VALUE;
  //   logAttack = LOG_PLAYER_ATTACK; /// if only statement, can't assign dat in data types
  // } else if (mode === 2) {
  //   maxDamage = SKILL_ATTACK_VALUE;
  //   logAttack = LOG_PLAYER_SKILL;
  // }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  wiretoLog(logAttack, damage, currentMonsterHealth, currentPlayerHealth);
  monsterTurn();
}

function attackHandler() {
  // naming as this function is related to eventListener
  attackMonster(1);
}

function skillHandler() {
  attackMonster(2);
}

function healingHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxlife - HEAL_VALUE) {
    alert("You can't heal more than your Max Health!");
    healValue = chosenMaxlife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  wiretoLog(
    LOG_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  monsterTurn();
}

function wiretoLog(ev, val, monHealth, palHealth) {
  const logEntry = {
    event: ev,
    damageValue: val,
    recentMonsterHealth: monHealth,
    recentPlayerHealth: palHealth,
  };
  if (ev === LOG_PLAYER_ATTACK) {
    logEntry.target = "Monster";
  } else if (ev === LOG_PLAYER_SKILL) {
    logEntry.target = "Monster";
  } else if (ev === LOG_MONSTER_ATTACK) {
    logEntry.target = "Player";
  } else if (ev === LOG_PLAYER_HEAL) {
    logEntry.target = "Player";
  }
  battleLog.push(logEntry);
}
function logHandler() {
  // for (let i = 10; i > 0; i--) {
  //   console.log(i);
  // }
  // for (let i = 0; i < battleLog.length; i++) {
  //   console.log(battleLog[i]);//have excess to index of an element.
  // }
  // let i = 0;
  // for (const logEntry of battleLog) {
  //   console.log(`#${i}`); // only have excess to element of that array
  //   for (const key in logEntry) {
  //     console.log(`${key}=>${logEntry[key]}`);
  //   }
  //   i++;
  // }
  let i = 0;
  for (const logEntry of battleLog) {
    // enumerate elements of object
    if ((!lastLoggedEntry && lastLoggedEntry !== 0) || lastLoggedEntry < i) {
      // (!lastLoggedEntry) =>  means it's value is not set/ undefined
      // 0 is a falsy value so !0 => true
      console.log(`#${i}`);
      for (const key in logEntry) {
        // enumerate properties of object
        console.log(`${key} => ${logEntry[key]}`);
        // break;
      }
      lastLoggedEntry = i;
      console.log(lastLoggedEntry);
      break;
      // condition of if statement is false so for 2nd iteration this line didn't executed
    }
    // break;
    console.log("ist");
    i++;
    console.log(i);
  }
}

// outputHealthValue(currentMonsterHealth, currentPlayerHealth);

attackBtn.addEventListener("click", attackHandler);
skillBtn.addEventListener("click", skillHandler);
healBtn.addEventListener("click", healingHandler);
logBtn.addEventListener("click", logHandler);
