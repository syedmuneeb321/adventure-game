#!/usr/bin/env node
import inquirer from "inquirer";
import chalkAnimation from 'chalk-animation';
const sleep = () => new Promise((resolve) => setTimeout((resolve), 2000));
async function welcomeScreen() {
    let title = chalkAnimation.rainbow(`
=======================================================================
>>>>>>>>>>>>>>>>>>>>>>>>>>> ADVENTURE GAME <<<<<<<<<<<<<<<<<<<<<<<<<<<<
=======================================================================
`);
    await sleep();
    title.stop();
}
await welcomeScreen();
const main = async () => {
    //system variable
    let rand = Math.random();
    //Game vaiables
    let enemies = ['Skeleton', 'Zombie', 'Warrior', 'Assassin'];
    let maxEnemyHealth = 75;
    let enemyAttackDamage = 25;
    //player variables
    let health = 100;
    let attackDamage = 50;
    let numHealthpostions = 3;
    let healthPositionHealAmount = 30;
    let healthPostionDropChance = 50; //percentage
    let running = true;
    console.log(`Welcome to the Dungeon!`);
    const Game = async () => {
        while (running) {
            console.log(`----------------------------------------------`);
            let enemyHealth = Math.floor(rand * maxEnemyHealth);
            let enemy = enemies[Math.floor(rand * enemies.length)];
            console.log(`\t# ${enemy} has appeared! #\n`);
            while (enemyHealth > 0) {
                console.log(`\tYour HP:${health}`);
                console.log(`\t ${enemy}'s HP:${enemyHealth}`);
                console.log(`\n\tWhat would you like to?`);
                console.log(`\t1. Attack`);
                console.log(`\t2. Drink health postion`);
                console.log(`\t3. Run`);
                const input = await inquirer.prompt([
                    {
                        type: "number",
                        name: "opt",
                        message: "enter a number:",
                    },
                ]);
                const { opt } = input;
                if (opt === 1) {
                    let damageDealt = Math.floor(rand * attackDamage);
                    let damageTaken = Math.floor(rand * enemyAttackDamage);
                    enemyHealth -= damageDealt;
                    health -= damageTaken;
                    console.log(`\t> you strike the ${enemy} for ${damageDealt} damage.`);
                    console.log(`\t> you recieve ${damageTaken} in retaliation!`);
                    if (health < 1) {
                        console.log(`\t> you have taken too much damage, you are too weak to go on!`);
                        break;
                    }
                    ;
                }
                else if (opt === 2) {
                    if (numHealthpostions > 0) {
                        health += healthPositionHealAmount;
                        numHealthpostions--;
                        console.log(`\t>you drink health potion, healing yourself for ${healthPositionHealAmount}.`);
                        console.log(`\t>you now have ${health} HP.`);
                        console.log(`\t>you have ${numHealthpostions} health potions left\n`);
                    }
                    else {
                        console.log(`\t>you have no health potion left! Defeat enemies for a chance to get one!`);
                    }
                }
                else if (opt === 3) {
                    console.log(`\t\n>You run away from the ${enemy} !`);
                    Game();
                }
                else {
                    console.log(`\tInvalid command!`);
                }
            }
            ;
            if (health < 1) {
                console.log(`you limp out of the dungeon, weak from battle.`);
                break;
            }
            console.log(`------------------------------------------------`);
            console.log(`# ${enemy} was defeated! #`);
            console.log(`# you have ${health} HP left. #`);
            if (Math.floor(rand * 100) < healthPostionDropChance) {
                numHealthpostions++;
                console.log(`# The ${enemy} dropped a health potion! #`);
                console.log(`# you now have ${numHealthpostions} health postion(s). #`);
            }
            ;
            console.log(`-------------------------------------------------------`);
            console.log(`what would you like to do now?`);
            console.log(`1. continue fighting!`);
            console.log(`2. Exit dungeon`);
            const num = await inquirer.prompt([
                {
                    type: "number",
                    name: "value",
                    message: "please enter 1 and 2",
                },
            ]);
            const { value } = num;
            if (value === 1) {
                console.log(`you continue on your adventure!`);
            }
            else if (value === 2) {
                console.log(`you exit the dungeon , successful from your adventures!`);
                break;
            }
            else {
                console.log(`enter a valid command`);
            }
            ;
        }
        ;
        console.log(`
    ##############################
    #    THANK FOR PLAYING !     #
    ##############################
    `);
    };
    await Game();
};
await main();
