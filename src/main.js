const readline = require('readline');

// Initialize the readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Promisified question function for easier async/await usage
const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

// Gifts and setup
let numberUsed = 1;

let products = ["Teddy Bear, Cost: 10 tickets",
    "Big Red Ball, Cost: 5 tickets",
    "Huge Bear, Cost: 50 tickets",
    "Candy, Cost: 8 tickets",
    "Stuffed Tiger, Cost: 15 tickets",
    "Stuffed Dragon, Cost: 30 tickets",
    "Skateboard, Cost: 100 tickets",
    "Toy Car, Cost: 25 tickets",
    "Basketball, Cost: 20 tickets",
    "Scary Mask, Cost: 75 tickets"];

const gifts = [
    { name: "Teddy Bear", cost: 10 }, { name: "Big Red Ball", cost: 5 },
    { name: "Huge Bear", cost: 50 }, { name: "Candy", cost: 8 },
    { name: "Stuffed Tiger", cost: 15 }, { name: "Stuffed Dragon", cost: 30 },
    { name: "Skateboard", cost: 100 }, { name: "Toy Car", cost: 25 },
    { name: "Basketball", cost: 20 }, { name: "Scary Mask", cost: 75 }
];

let soldItems = Array(gifts.length).fill(false);
let tickets = 0;
let numberOfGiftsBought = 0;

// Helper Functions
function newPrinting(soldItems) {
    for (let i = 0; i < gifts.length; i++) {
        if (!soldItems[i]) {
            console.log(`${i + 1}- ${gifts[i].name}, Cost: ${gifts[i].cost} tickets`);
        }
    }
    console.log("\n");
}

function checkTicketAmount(number, tickets) {
    return tickets >= number;
}

function remainingTickets(cost, tickets) {
    return tickets - cost;
}

function isItANumber(input) {
    if (isNaN(input)) {
        console.log("Please enter a valid number!");
        return false;
    }
    return true;
}

function isItInTheRange(action) {
    if (action < 0 || action > 1000) {
        console.log("Please enter a valid number between 0 and 1000.");
        return false;
    }
    return true;
}

function isItAGift(action) {
    if (action > gifts.length || action < 1) {
        console.log("There is no gift with that number!");
        return false;
    }
    return true;
}

// Main Program Logic
async function main() {
    console.log("WELCOME TO THE CARNIVAL GIFT SHOP!\n" +
        "Hello friend! Thank you for visiting the carnival!\n" +
        "Here's the list of gifts:\n");
    newPrinting(soldItems);

    let action;
    do {
        console.log("\nWhat do you want to do?\n" +
            "1-Buy a gift 2-Add tickets 3-Check tickets 4-Show gifts 5-Exit the shop");

        action = parseInt(await askQuestion("> "));

        switch (action) {
            case 1:
                if (numberOfGiftsBought === gifts.length) {
                    console.log("Wow! There are no gifts to buy.");
                } else {
                    console.log("Enter the number of the gift you want to get:");
                    let giftNumber = parseInt(await askQuestion("> "));

                    if (isItANumber(giftNumber) && isItAGift(giftNumber)) {
                        const giftIndex = giftNumber - 1;
                        if (soldItems[giftIndex]) {
                            console.log("There is no gift with that number!");
                        } else if (checkTicketAmount(gifts[giftIndex].cost, tickets)) {
                            tickets = remainingTickets(gifts[giftIndex].cost, tickets);
                            soldItems[giftIndex] = true;
                            console.log(`Here you go, one ${gifts[giftIndex].name}!`);
                            console.log(`Total tickets: ${tickets}\n`);
                            numberOfGiftsBought++;
                        } else {
                            console.log("You don't have enough tickets to buy this gift.");
                        }
                    }
                }
                break;

            case 2:
                console.log("Enter the ticket amount: ");
                let ticketsToAdd = parseInt(await askQuestion("> "));
                if (isItANumber(ticketsToAdd) && isItInTheRange(ticketsToAdd)) {
                    tickets += ticketsToAdd;
                    console.log(`Total tickets: ${tickets}\n`);
                }
                break;

            case 3:
                console.log(`Total tickets: ${tickets}\n`);
                break;

            case 4:
                console.log("Here's the list of gifts:\n");
                newPrinting(soldItems);
                break;

            case 5:
                console.log("Have a nice day!");
                break;

            default:
                console.log("Please enter a valid number!");
        }
    } while (action !== 5);

    rl.close();
}

// Run the program
main();
