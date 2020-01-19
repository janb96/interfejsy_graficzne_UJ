exports.withdraw = function (amount, moneyArray) {
    const denominations = [500, 200, 100, 50, 20];

    let availableMoneyPerDenomination = moneyArray;
    let toWithdraw = amount;

    let usedMoneyPerDenomination = [0, 0, 0, 0, 0];

    for (let index in denominations) {
        if (toWithdraw >= denominations[index]) {
            let maxAmountOfMoneyWithCurrentDenomination = denominations[index] * availableMoneyPerDenomination[index];

            if (toWithdraw <= maxAmountOfMoneyWithCurrentDenomination) {
                let x = Math.floor(toWithdraw / denominations[index]);

                toWithdraw = toWithdraw - (x * denominations[index]);
                usedMoneyPerDenomination[index] = usedMoneyPerDenomination[index] - x;
            } else {
                toWithdraw = toWithdraw - maxAmountOfMoneyWithCurrentDenomination;
                usedMoneyPerDenomination[index] = availableMoneyPerDenomination[index] * -1
            }
        }
    }

    let result = true;
    if (toWithdraw > 0) {
        result = false;
    }

    return [result, usedMoneyPerDenomination]
};