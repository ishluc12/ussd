const db = require('../db');
const menus = require('./utils/menus');

module.exports = (req, res) => {
    const { sessionId, phoneNumber, text } = req.body;
    const inputs = text === "" ? [] : text.split("*");

    const lang = inputs[0];

    // Step 0: Language selection
    if (inputs.length === 0) {
        return res.send(menus.welcome());
    }

    // Step 1: Show main menu
    if (inputs.length === 1) {
        if (lang === "1" || lang === "2") {
            return res.send(menus.mainMenu(lang));
        } else {
            return res.send("END Invalid language choice");
        }
    }

    const choice = inputs[1];

    // Step 2: User picks Send Money
    if (choice === "3") {
        if (inputs.length === 2) {
            return res.send(menus.sendMoney(lang));
        }

        if (inputs.length === 3) {
            const recipientPhone = inputs[2];
            if (!recipientPhone.match(/^\d{9,15}$/)) {
                return res.send("END Invalid recipient phone number");
            }
            return res.send(menus.enterAmount(lang));
        }

        if (inputs.length === 4) {
            const amount = parseFloat(inputs[3]);
            if (isNaN(amount) || amount <= 0) {
                return res.send("END Invalid amount");
            }
            return res.send(menus.confirmSend(lang, inputs[2], inputs[3]));
        }

        if (inputs.length === 5) {
            const confirmation = inputs[4];
            const recipientPhone = inputs[2];
            const amount = parseFloat(inputs[3]);

            if (confirmation === "1") {
                try {
                    const stmt = db.prepare(
                        `INSERT INTO Transactions (sessionID, transactionType, amount) VALUES (?, ?, ?)`
                    );
                    stmt.run(sessionId, `Send to ${recipientPhone}`, amount);

                    return res.send(menus.successSend(lang));
                } catch (err) {
                    console.error(err);
                    return res.send("END Transaction failed. Please try again.");
                }
            } else {
                return res.send(menus.cancelSend(lang));
            }
        }

        return res.send("END Invalid input");
    }

    return res.send("END Invalid choice");
};
