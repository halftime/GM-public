// ==UserScript==
// @name     sportmarket-viewall
// @version  1
// @grant    none
// @namespace    https://pro.sportmarket.com
// @include https://pro.sportmarket.com/trade/*
// @include https://pro.sportmarket.com/trade
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

window.addEventListener("load", async function (event) {
    if (document.readyState === "complete") {
        console.log("dbg: DOM loaded and parsed");
        await sleep(30000);
        console.log("dbg: 30s sleep passed");

        const todayToExpand = document.querySelector('div.MarketSide__MarketCompetitionSideContainer-sc-gkcapd-4.gNMqC.today:not([class$="expanded"])').querySelector("div");
        const earlyToExpand = document.querySelector('div.MarketSide__MarketCompetitionSideContainer-sc-gkcapd-4.gNMqC.early:not([class$="expanded"])').querySelector("div");

        console.log("dbg: todayToExpand: " + todayToExpand);
        console.log("dbg: earlyToExpand: " + earlyToExpand);

        if (todayToExpand !== null) {
            todayToExpand.dispatchEvent(clickEvent);
        }

        await sleep(2000);
        const todayEvents = document.querySelectorAll('.MarketSide__Competitions-sc-gkcapd-3 [class$="today  not-suggested normal"]');
        console.log("dbg: todayEvents: " + todayEvents);
        await ClickAllDelayed(todayEvents, 300);

        await sleep(2000);
        if (earlyToExpand !== null) {
            earlyToExpand.dispatchEvent(clickEvent);
        }

        await sleep(2000);
        const earlyEvents = document.querySelectorAll('.MarketSide__Competitions-sc-gkcapd-3 [class$="early  not-suggested normal"]');
        console.log("dbg: earlyEvents: " + earlyEvents);
        await ClickAllDelayed(earlyEvents, 300);
    }
});