// ==UserScript==
// @name     sportmarket-viewall
// @version  1
// @grant    none
// @namespace    https://pro.sportmarket.com
// @include https://pro.sportmarket.com/alpha/trade*
// @run-at       document-end
// @description sportmarket alpha, darkmode on
// ==/UserScript==

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const clickEvent = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window
});

const inputEvent = new Event("input", {
    bubbles: true,
    cancelable: true
});

async function ClickAllDelayed(elementsArray, delayMs = 200) {
    for (let i = 0; i < elementsArray.length; i++) {
        elementsArray[i].dispatchEvent(clickEvent);
        console.log("clicked: " + elementsArray[i].innerText);
        await sleep(delayMs);
    }
}

document.addEventListener('keydown', async function (event) {
    if (event.key === 'F1') {
        if (document.readyState === "complete") {
            console.log("dbg: DOM loaded and parsed");

            const elements = document.querySelectorAll('div.styles_timeGroupHeader__9wBTz span span.styles_header__PmmkP');

            if (elements.length != 3) {
                console.log("dbg: elements.length != 3, exiting...");
                console.log("dbg: elements: " + elements);
                return;
            }

            // elements[0] is "In running" / live
            const todayToExpand = elements[1];
            const earlyToExpand = elements[2];

            const todayExpandedBox = document.querySelector('div.styles_listContainer__k_igi.styles_today__zcl7T');
            const earlyExpandedBox = document.querySelector('div.styles_listContainer__k_igi.styles_early__lbebL');

            console.log("dbg: todayToExpand: " + todayToExpand);
            console.log("dbg: earlyToExpand: " + earlyToExpand);

            if (todayExpandedBox == null) {
                todayToExpand.dispatchEvent(clickEvent);
            }

            await sleep(2000);

            const todayEvents = document.querySelectorAll('div.styles_listContainer__k_igi.styles_today__zcl7T ul.styles_competitionList__sLeBy li.styles_competitionItem__sRPO1:not(.styles_watched__oGXCB)');

            console.log("dbg: todayEvents: " + todayEvents);
            await ClickAllDelayed(todayEvents, 100);

            await sleep(2000);

            if (earlyExpandedBox == null) {
                earlyToExpand.dispatchEvent(clickEvent);
            }

            await sleep(2000);
            const earlyEvents = document.querySelectorAll('div.styles_listContainer__k_igi.styles_early__lbebL ul.styles_competitionList__sLeBy li.styles_competitionItem__sRPO1:not(.styles_watched__oGXCB)');
            console.log("dbg: earlyEvents: " + earlyEvents);
            await ClickAllDelayed(earlyEvents, 100);
        }
    }
});
