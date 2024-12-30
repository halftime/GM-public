// ==UserScript==
// @name     sportmarket-viewall
// @version  3
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

            const eventBoxes = document.querySelectorAll('div.styles_timeGroupHeader__9wBTz span span.styles_header__PmmkP');

            if (eventBoxes.length != 3) {
                console.log("dbg: error box elements.length <> 3: " + eventBoxes);
                return;
            }

            const liveToExpand = eventBoxes[0];
            const todayToExpand = eventBoxes[1];
            const earlyToExpand = eventBoxes[2];

            let liveExpandedBox = document.querySelector('div.styles_listContainer__k_igi.styles_in-running__H2KZf');
            let todayExpandedBox = document.querySelector('div.styles_listContainer__k_igi.styles_today__zcl7T');
            let earlyExpandedBox = document.querySelector('div.styles_listContainer__k_igi.styles_early__lbebL');

            if (liveExpandedBox == null) { liveToExpand.dispatchEvent(clickEvent); }
            if (todayExpandedBox == null) { todayToExpand.dispatchEvent(clickEvent); }
            if (earlyExpandedBox == null) { earlyToExpand.dispatchEvent(clickEvent); }

            await sleep(3000);

            liveExpandedBox = document.querySelector('div.styles_listContainer__k_igi.styles_in-running__H2KZf');
            todayExpandedBox = document.querySelector('div.styles_listContainer__k_igi.styles_today__zcl7T');
            earlyExpandedBox = document.querySelector('div.styles_listContainer__k_igi.styles_early__lbebL');

            const toExpBoxes = [liveExpandedBox, todayExpandedBox, earlyExpandedBox];

            for (let i = 0; i < toExpBoxes.length; i++) {
                const box = toExpBoxes[i];
                if (box == null) {
                    console.log("dbg: error box is null: " + i);
                    return; // continue;
                }
                const BoxEvents = box.querySelectorAll('li.styles_competitionItem__sRPO1:not(.styles_watched__oGXCB)');
                await ClickAllDelayed(BoxEvents, 100);
            }
        }
    }
});
