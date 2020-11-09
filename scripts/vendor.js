const monsterHealthBar = document.getElementById("monster-health");
const playerHealthBar = document.getElementById("player-health");
const bonusLife1 = document.getElementById("bonus-life");

const attackBtn = document.getElementById("attack-btn");
const skillBtn = document.getElementById("skill-btn");
const healBtn = document.getElementById("heal-btn");
const logBtn = document.getElementById("log-btn");

const monsterHealthValue = document.getElementById("currentMonsterHealth");
const playerHealthValue = document.getElementById("currentPlayerHealth");

function outputHealthValue(monster, player) {
  monsterHealthValue.textContent = monster;
  playerHealthValue.textContent = player;
}

function adjustHealthBars(maxlife) {
  monsterHealthBar.max = maxlife;
  monsterHealthBar.value = maxlife;
  playerHealthBar.max = maxlife;
  playerHealthBar.value = maxlife;
}

function dealMonsterDamage(damage) {
  const dealtDamage = Math.random() * damage;
  monsterHealthBar.value = +monsterHealthBar.value - dealtDamage;
  return dealtDamage;
}

function dealPlayerDamage(damage) {
  const dealtDamage = Math.random() * damage;
  playerHealthBar.value = +playerHealthBar.value - dealtDamage;
  return dealtDamage;
}

function increasePlayerHealth(healvalue) {
  playerHealthBar.value = +playerHealthBar.value + healvalue;
}

function resetgame(value) {
  playerHealthBar.value = value;
  monsterHealthBar.value = value;
}

function removeBonusLife() {
  bonusLife1.parentNode.removeChild(bonusLife1);
}

function setPlayerHealth(health) {
  playerHealthBar.value = health;
}
