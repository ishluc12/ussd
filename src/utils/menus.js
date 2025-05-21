module.exports = {
    welcome: () => `CON Welcome
  1. English
  2. Kinyarwanda`,

    mainMenu: (lang) => {
        if (lang === "1") {
            return `CON Main Menu:
  1. Check Balance
  2. Buy Airtime
  3. Send Money
  0. Back`;
        } else {
            return `CON Menu Nyamukuru:
  1. Reba Konti
  2. Gura Amavuta
  3. Ohereza Amafaranga
  0. Subira inyuma`;
        }
    },

    sendMoney: (lang) => {
        return lang === "1"
            ? "CON Enter recipient phone number:"
            : "CON Andika nimero ya telefone y’uwakiriye amafaranga:";
    },

    enterAmount: (lang) => {
        return lang === "1"
            ? "CON Enter amount to send:"
            : "CON Andika amafaranga ushaka kohereza:";
    },

    confirmSend: (lang, phone, amount) => {
        return lang === "1"
            ? `CON Confirm sending ${amount} to ${phone}?
  1. Confirm
  2. Cancel`
            : `CON Wemeze kohereza ${amount} kuri ${phone}?
  1. Emeza
  2. Hagarika`;
    },

    successSend: (lang) => {
        return lang === "1"
            ? "END Money sent successfully!"
            : "END Amafaranga yoherejwe neza!";
    },

    cancelSend: (lang) => {
        return lang === "1"
            ? "END Transaction cancelled."
            : "END Ibyo wasabye byahagaritswe.";
    },
};
