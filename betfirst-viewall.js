// ==UserScript==
// @name     betfirst viewall
// @version  1
// @grant    none
// @namespace    https://betfirst.dhnet.be
// @include https://betfirst.dhnet.be/en/*
// @run-at       document-end
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
            const todayEvents = document.querySelectorAll('[data-collapsed="true"] div div div');
            console.log("dbg: todayEvents: " + todayEvents);
            await ClickAllDelayed(todayEvents, 50);
        }
    }
});