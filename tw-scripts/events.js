var state = {
  scheduler: { delay: null, time: null },
  farmer: { button: null },
  snip: {
    action: null,
    delay: null,
    totalTime: null,
    atackTime: null,
    msAdjust: null
  }
};
function setState() {
  chrome.tabs.executeScript({
    code: `var state = JSON.parse('${JSON.stringify(state)}')`
  });

  chrome.storage.local.set({
    schedulerDelay: document.getElementById("schedulerDelay").value,
    snipDelay: document.getElementById("snipDelay").value,
    snipTotalTime: document.getElementById("snipTotalTime").value,
    snipAtackTime: document.getElementById("snipAtackTime").value,
    snipMsAdjust: document.getElementById("snipMsAdjust").value
  });
}

function initialize() {
  /** Atack Scheduler */
  const currentDate = new Date();
  currentDate.setUTCHours(8, 0, 0, 0);
  document.getElementById(
    "schedulerTime"
  ).value = currentDate.toISOString().substr(0, 16);
  document.getElementById(
    "snipAtackTime"
  ).value = currentDate.toISOString().substr(0, 19);
  chrome.storage.local.get(
    [
      "schedulerDelay",
      "snipDelay",
      "snipAtackTime",
      "snipTotalTime",
      "snipMsAdjust"
    ],
    result => {
      document.getElementById("schedulerDelay").value = result.schedulerDelay;
      document.getElementById("snipDelay").value = result.snipDelay;
      document.getElementById("snipTotalTime").value = result.snipTotalTime;
      document.getElementById("snipAtackTime").value = result.snipAtackTime;
      document.getElementById("snipMsAdjust").value = result.snipMsAdjust;
    }
  );
  /** Snip by canceling */
}

document.addEventListener("DOMContentLoaded", function() {
  initialize();
  /** Farm A */
  document.getElementById("farmA").addEventListener("click", function() {
    state.farmer.button = "A";
    setState();
    chrome.tabs.executeScript({
      file: "farmer.js"
    });
  });
  /** Farm B */
  document.getElementById("farmB").addEventListener("click", function() {
    state.farmer.button = "B";
    setState();
    chrome.tabs.executeScript({
      file: "farmer.js"
    });
  });
  /** Atack Scheduler */
  document.getElementById("schedulerGo").addEventListener("click", function() {
    state.scheduler.delay = document.getElementById("schedulerDelay").value;
    state.scheduler.time = document.getElementById("schedulerTime").value;
    setState();
    chrome.tabs.executeScript({
      file: "scheduler.js"
    });
  });
  /** Snip by canceling - Send */
  document.getElementById("snipSend").addEventListener("click", function() {
    state.snip.action = "send";
    state.snip.delay = document.getElementById("snipDelay").value;
    state.snip.totalTime = document.getElementById("snipTotalTime").value;
    state.snip.atackTime = document.getElementById("snipAtackTime").value;
    state.snip.msAdjust = document.getElementById("snipMsAdjust").value;
    setState();
    chrome.tabs.executeScript({
      file: "snip.js"
    });
  });
  /** Snip by canceling - Return */
  document.getElementById("snipReturn").addEventListener("click", function() {
    state.snip.action = "return";
    state.snip.delay = document.getElementById("snipDelay").value;
    state.snip.totalTime = document.getElementById("snipTotalTime").value;
    state.snip.atackTime = document.getElementById("snipAtackTime").value;
    state.snip.msAdjust = document.getElementById("snipMsAdjust").value;
    setState();
    chrome.tabs.executeScript({
      file: "snip.js"
    });
  });
  /** Snip by canceling - Militia */
  document.getElementById("snipMilitia").addEventListener("click", function() {
    state.snip.action = "militia";
    state.snip.delay = document.getElementById("snipDelay").value;
    state.snip.totalTime = document.getElementById("snipTotalTime").value;
    state.snip.atackTime = document.getElementById("snipAtackTime").value;
    state.snip.msAdjust = document.getElementById("snipMsAdjust").value;
    setState();
    chrome.tabs.executeScript({
      file: "snip.js"
    });
  });
});
