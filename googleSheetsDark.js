// ==UserScript==
// @name     Googlesheets Dark
// @version  0.2
// @grant    none
// @description  Simple dark theme for Google Sheets
// @namespace    https://docs.google.com
// @include https://docs.google.com/spreadsheets/d/*
// @run-at       document-start
// ==/UserScript==

const style = document.createElement('style');
style.textContent = "[class$='grid-table-container'] { background-color: rgba(0, 0, 0, 0.33); }";
style.textContent += "[class^='docs-']:not([class^='docs-icon']) { background-color: rgba(0, 0, 0, 0.33); }";

document.head.appendChild(style);

console.log('Google Sheets Dark Theme loaded');
