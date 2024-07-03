#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let condition1 = true
let condition2 = true


interface Player {
    name: string
    health: number
    enemyHealth: number
    kills: number
    weapon: string
}

let player: Player = {
    name: ``,
    health: 100,
    enemyHealth: 100,
    kills: 0,
    weapon: `▄︻デ══━一`
}

async function stratGame() {
    let game = await inquirer.prompt({
        name: "playerName",
        type: "input",
        message: "Input Your Name"
    })
    if (game.playerName == false) {
        console.log(chalk.red(`\nPlease Input Your Name To Enter In The Gam!\n`));
    } else {

        player.name = game.playerName

        console.log(chalk.green(`\n Welcome " ${player.name.charAt(0).toUpperCase() + player.name.slice(1).toLowerCase()}" To The Adventurer Gun Game\n`));
        // console.log(player);

        while (condition1) {

            if (player.health > 0) {
                let action = await inquirer.prompt({
                    name: "start",
                    type: "list",
                    message: "What would you like to do?\n",
                    choices: ["Encounter Enemy", "Exit Game"]
                })



                if (action.start == "Encounter Enemy") {
                    condition2 = true
                    while (condition2) {

                        console.log(chalk.red(`\nEnemies Ahead...\n`));

                        let choose = await inquirer.prompt({
                            name: "one",
                            type: "list",
                            message: "what would you choose?\n",
                            choices: ["Fight", "Run", "Stop Fighting"]
                        })

                        if (choose.one == "Fight") {
                            let enemydamage = Math.floor(Math.random() * 50)
                            player.enemyHealth -= enemydamage
                            console.log(chalk.green(`You dealt ${enemydamage} damaged To The Enemy\n`));


                            if (player.enemyHealth < 0) {
                                player.kills++
                                console.log(chalk.red(`${player.weapon} Enemy Down\n`));
                                // console.log(`Your Remaining Health: ${player.health}\n Your Kills: ${player.kills}\n`)


                            } else {
                                console.log(chalk.green(`Enemy Survived! \n`))
                                console.log(chalk.green(`Enemy Remaining Health: ${player.enemyHealth}\n Keep Fighting\n`))
                            }

                            let playerdamage = Math.floor(Math.random() * 50)
                            player.health -= playerdamage
                            console.log(chalk.red(`You Took ${playerdamage} Damaged From Enemy\n`))

                            if (player.health < 0) {
                                player.health = 0

                                console.log(chalk.red(`\n`,game.playerName, `You are died, Game Over\n`))
                                console.log(chalk.red(`Your Remaining Health: ${player.health}\n Your Kills: ${player.kills}\n`))
                                condition1 = false
                                condition2 = false

                            } else {
                                console.log(chalk.green(`You Survived! Keep Fighting\n`));
                                console.log(chalk.green(`Your Remaining Health: ${player.health}\n Your Kills: ${player.kills}\n`))

                            }

                        }

                        else if (choose.one == "Run") {
                            console.log(chalk.green(`You Safely Run Away From Enemy and Increase Your Health\n`));
                            player.health += 10
                            console.log(chalk.green(`Your Remaining Health: ${player.health}\n Your Kills: ${player.kills}\n`))
                        }

                        else if (choose.one == "Stop Fighting") {
                            console.log(chalk.green(`\nYour Remaining Health: ${player.health} \nYour Kills: ${player.kills}\n`))
                            console.log(chalk.red(`Oh! ${player.name} You Were Near To Win The Game \nFighting Stop.........\nYou Loss The Game Now!\n`));

                            condition2 = false
                        }

                    }

                }

                else if (action.start == "Exit Game") {
                    console.log(`\nThanks You "${player.name.charAt(0).toUpperCase() + player.name.slice(1).toLowerCase()}" For Playing Adventurer Gun Game\n`);

                    console.log(chalk.bold(`\n <--------------------------------------------------> \n`))

                    console.log(chalk.bold(`\n This Adventurer Gun Game Developed By Fazilat Jahan.\n \n`))
                    condition1 = false
                }

            }
        }
    }

}

stratGame()