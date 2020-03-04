var state = {
  scheduler: { delay: null, time: null, msAdjust: null },
  farmer: {
    farmLimit: null,
    farmLimitDate: null,
    group: [
      { green: null, yellow: null, maxWall: null, maxDistance: null },
      { green: null, yellow: null, maxWall: null, maxDistance: null }
    ],
    button: null
  },
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
    farmLimit: document.getElementById("farmLimit").checked,
    farmLimitDate: document.getElementById("farmLimitDate").value,
    farmGreenA: document.getElementById("farmGreenA").checked,
    farmYellowA: document.getElementById("farmYellowA").checked,
    farmMaxWallA: document.getElementById("farmMaxWallA").value,
    farmMaxDistanceA: document.getElementById("farmMaxDistanceA").value,
    farmGreenB: document.getElementById("farmGreenB").checked,
    farmYellowB: document.getElementById("farmYellowB").checked,
    farmMaxWallB: document.getElementById("farmMaxWallB").value,
    farmMaxDistanceB: document.getElementById("farmMaxDistanceB").value,
    schedulerDelay: document.getElementById("schedulerDelay").value,
    schedulerTime: document.getElementById("schedulerTime").value,
    schedulerMsAdjust: document.getElementById("schedulerMsAdjust").value,
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
  ).value = currentDate.toISOString().substr(0, 19);
  document.getElementById(
    "snipAtackTime"
  ).value = currentDate.toISOString().substr(0, 19);
  chrome.storage.local.get(
    [
      "farmLimit",
      "farmLimitDate",
      "farmGreenA",
      "farmYellowA",
      "farmMaxWallA",
      "farmMaxDistanceA",
      "farmGreenB",
      "farmYellowB",
      "farmMaxWallB",
      "farmMaxDistanceB",
      "schedulerDelay",
      "schedulerTime",
      "schedulerMsAdjust",
      "snipDelay",
      "snipAtackTime",
      "snipTotalTime",
      "snipMsAdjust"
    ],
    result => {
      document.getElementById("farmLimit").checked = result.farmLimit;
      document.getElementById("farmLimitDate").value = result.farmLimitDate;
      document.getElementById("farmGreenA").checked = result.farmGreenA;
      document.getElementById("farmYellowA").checked = result.farmYellowA;
      document.getElementById("farmMaxWallA").value = result.farmMaxWallA;
      document.getElementById("farmMaxDistanceA").value =
        result.farmMaxDistanceA;
      document.getElementById("farmGreenB").checked = result.farmGreenB;
      document.getElementById("farmYellowB").checked = result.farmYellowB;
      document.getElementById("farmMaxWallB").value = result.farmMaxWallB;
      document.getElementById("farmMaxDistanceB").value =
        result.farmMaxDistanceB;
      document.getElementById("schedulerDelay").value = result.schedulerDelay;
      document.getElementById("schedulerTime").value = result.schedulerTime;
      document.getElementById("schedulerMsAdjust").value =
        result.schedulerMsAdjust;
      document.getElementById("snipDelay").value = result.snipDelay;
      document.getElementById("snipTotalTime").value = result.snipTotalTime;
      document.getElementById("snipAtackTime").value = result.snipAtackTime;
      document.getElementById("snipMsAdjust").value = result.snipMsAdjust;
    }
  );
  /** Snip by canceling */
}

function farmSetState(button) {
  state.farmer.button = button;
  state.farmer.farmLimit = document.getElementById("farmLimit").checked;
  state.farmer.farmLimitDate = document.getElementById("farmLimitDate").value;
  state.farmer.group[0].green = document.getElementById("farmGreenA").checked;
  state.farmer.group[0].yellow = document.getElementById("farmYellowA").checked;
  state.farmer.group[0].maxWall = document.getElementById("farmMaxWallA").value;
  state.farmer.group[0].maxDistance = document.getElementById(
    "farmMaxDistanceA"
  ).value;
  state.farmer.group[1].green = document.getElementById("farmGreenB").checked;
  state.farmer.group[1].yellow = document.getElementById("farmYellowB").checked;
  state.farmer.group[1].maxWall = document.getElementById("farmMaxWallB").value;
  state.farmer.group[1].maxDistance = document.getElementById(
    "farmMaxDistanceB"
  ).value;
  setState();
}

document.addEventListener("DOMContentLoaded", function() {
  initialize();
  /** Log screen */
  chrome.tabs.executeScript({
    file: "logScreen.js"
  });
  /** Farm A */
  document.getElementById("farmA").addEventListener("click", function() {
    farmSetState("A");
    chrome.tabs.executeScript({
      file: "farmer.js"
    });
  });
  /** Farm B */
  document.getElementById("farmB").addEventListener("click", function() {
    farmSetState("B");
    chrome.tabs.executeScript({
      file: "farmer.js"
    });
  });
  /** Farm by Filter 
  document.getElementById("farmByFilter").addEventListener("click", function() {
    farmSetState("byFilter");
    chrome.tabs.executeScript({
      file: "farmer.js"
    });
  });
  /** Atack Scheduler */
  document.getElementById("schedulerGo").addEventListener("click", function() {
    state.scheduler.delay = document.getElementById("schedulerDelay").value;
    state.scheduler.time = document.getElementById("schedulerTime").value;
    state.scheduler.msAdjust = document.getElementById(
      "schedulerMsAdjust"
    ).value;
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
  /** Save button */
  document.getElementById("saveButton").addEventListener("click", function() {
    setState();
    alert("Configuracoes salvas!!!");
  });
});
