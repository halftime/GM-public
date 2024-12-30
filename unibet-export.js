// ==UserScript==
// @name     unibet export betting history
// @version  1
// @grant    none
// @namespace    https://nl.unibetsports.be
// @include https://nl.unibetsports.be/betting/sports/bethistory*
// @run-at       document-end
// @description  Export betting history into betmetricslab.com
// ==/UserScript==

const clickEvent = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window
});

class SportBetHistory {
    constructor(dateElement, matchInfoElement, betTypeElement, OddElement, StakeElement, outcomeElement) {
        this.date = dateElement === null ? "00:00" : dateElement.innerText;
        this.matchInfo = matchInfoElement === null ? "" : matchInfoElement.innerText;
        this.betType = betTypeElement === null ? "" : betTypeElement.innerText;
        this.odd = OddElement === null ? 1 : parseFloat(OddElement.innerText);
        this.stake = StakeElement === null ? 0 : parseFloat(StakeElement.innerText);
        this.outcome = outcomeElement === null ? "" : outcomeElement.innerText;
    }
}

function ExtractBetHistory(betContainerEl) {

}



document.addEventListener('keydown', async function (event) {
    if (event.key === 'F1') {
        if (document.readyState === "complete") {
            const showMoreBtn = document.querySelector('[class="KambiBC-my-bets-summary__show-more-button-label"]');
            if (showMoreBtn !== null) {
                showMoreBtn.dispatchEvent(clickEvent);
            }
        }
    }

    if (event.key === 'F2') {
        if (document.readyState === "complete") {
            const betContainers = document.querySelectorAll('[class="KambiBC-react-collapsable-container__header KambiBC-harmonized-my-bets-summary__collapsible-header"]');
            console.log("dbg: betContainers: " + betContainers);
        }
    }
});

