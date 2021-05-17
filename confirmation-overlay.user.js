// Code by Evan Baldonado. EvanBaldonado.com. Do not remove this credit without prior permission.

// ==UserScript==
// @name         Website entry confirmation
// @namespace    http://tampermonkey.net/
// @version      0.11
// @author       Evan Baldonado (EvanBaldonado.com)
// @match        *://*.facebook.com/*
// @match        *://*.twitter.com/*
// @match        *://*.reddit.com/*
// @match        *://*.youtube.com/*
// @match        *://*.amazon.com/*
// @grant        none
// ==/UserScript==

// Update the @match lines above to change the websites.

(function() {
    'use strict';

    // CONFIG (feel free to change this)
    var RUN_ONLY_ON_START = true; // true if you only want it to run when you navigate to a website. false if you want it to run every time you click between pages.
    var BACKGROUND_COLOR = "red"; // Set the overlay background color

    // Check if referrer is the same site.
    if (RUN_ONLY_ON_START) {
        if (document.referrer.indexOf(location.protocol + "//" + location.host) === 0) {
            return;
        }
    }

    // Create overlay
    var overlay = document.createElement("div");

    // Style overlay
    overlay.style.height = "100%";
    overlay.style.width = "100%";
    overlay.style.position = "fixed";
    overlay.style.zIndex = "999999999";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.backgroundColor = BACKGROUND_COLOR || "#1E1E1E";
    overlay.style.overflowX = "hidden";
    overlay.style.color = "white";
    overlay.style.textAlign = "center";
    overlay.style.padding = "2em";
    overlay.style.fontSize = "21px";

    // Insert overlay
    document.body.appendChild(overlay);

    // Add html to overlay
    var WEBSITE_DOMAIN = window.location.hostname || "this website";
    var overlayHtml = "<p>Are you sure you wish to use " + WEBSITE_DOMAIN + "?</p> <button id='website-confirmation-enter-button'>Yes.</button>";
    overlay.innerHTML = overlayHtml;

    // Add click handler to button
    document.getElementById("website-confirmation-enter-button").onclick = function () {
        overlay.style.display = "none";
    };

})();
