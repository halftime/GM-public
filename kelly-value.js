// ==UserScript==
// @name     Kelly value
// @version  2
// @grant    none
// @include https://en.surebet.com/valuebets*
// ==/UserScript==

// Kelly Criterion; educate yourself before proceeding
// https://en.wikipedia.org/wiki/Kelly_criterion

class KellyBet {
    constructor(bookie_str, match_str, betdisc_str, probability, odd) {
        this.bookie_str = bookie_str.includes(" ") ? bookie_str.split(" ")[0] : bookie_str;
        this.match_str = match_str;
        this.betdisc_str = betdisc_str;
        this.probability = probability; // in decimal 0.xx
        this.odd = odd;
        this.kellyCalc = this.CalculateKelly();
    }

    ToString() {
        return `${this.bookie_str}\t${this.match_str.padEnd(100)}\t${this.betdisc_str.padEnd(33)}\t P: ${(this.probability * 100).toPrecision(2)} % \todd: ${this.odd.toPrecision(3)}\t kelly stake ${(this.kellyCalc * 100).toPrecision(2)} %`;
    }

    CalculateKelly() {
        this.probability_floored = Math.floor(this.probability * 100) / 100; // rounding down to 1% eg: 0.34X -> 0.33
        return Math.floor((this.probability_floored - (1 - this.probability_floored) / (this.odd - 1)) * 100) / 100;
    }
}

function FindValue() {
    const valueBetElmts = document.querySelectorAll(".valuebet_record");
    let KellyBetList = [];
    valueBetElmts.forEach(element => {
        let td_list = element.querySelectorAll('td');
        if (td_list.length < 9) return;
        const k = new KellyBet(bookie_str = td_list[1].textContent, match_str = td_list[3].textContent, betdisc_str = td_list[4].textContent, probability = parseFloat(td_list[7].textContent) / 100, odd = parseFloat(td_list[5].textContent));
        // 0 is junk
        // 1 is bookie
        // 2 is date
        // 3 is match
        // 4 is bet description text
        // 5 is odd
        // 6 none
        // 7 is probability
        // 8 is overvalue

        KellyBetList.push(k);
    });
    KellyBetList.sort((a, b) => b.kellyCalc - a.kellyCalc);
    KellyBetList.forEach(kk => {
        console.log(kk.ToString());
    });
}

document.addEventListener("DOMContentLoaded", function () { FindValue(); });