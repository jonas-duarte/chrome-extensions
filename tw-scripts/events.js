var world = "br99";

var state = {
  worldSpeed: null,
  troopsSpeed: null,
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
    attackTime: null,
    msAdjust: null
  }
};
function setState() {
  state.worldSpeed = document.getElementById("worldSpeed").value;
  state.troopsSpeed = document.getElementById("troopsSpeed").value;
  chrome.tabs.executeScript({
    code: `var state = JSON.parse('${JSON.stringify(state)}')`
  });

  chrome.storage.local.set({
    [world]: {
      worldSpeed: document.getElementById("worldSpeed").value,
      troopsSpeed: document.getElementById("troopsSpeed").value,
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
      snipAttackTime: document.getElementById("snipAttackTime").value,
      snipMsAdjust: document.getElementById("snipMsAdjust").value
    }
  });
}

function initialize() {
  /** Attack Scheduler */
  const currentDate = new Date();
  currentDate.setUTCHours(8, 0, 0, 0);
  document.getElementById(
    "schedulerTime"
  ).value = currentDate.toISOString().substr(0, 19);
  document.getElementById(
    "snipAttackTime"
  ).value = currentDate.toISOString().substr(0, 19);
  chrome.storage.local.get([world], result => {
    document.getElementById("worldSpeed").value = result[world].worldSpeed;
    document.getElementById("troopsSpeed").value = result[world].troopsSpeed;
    document.getElementById("farmLimit").checked = result[world].farmLimit;
    document.getElementById("farmLimitDate").value =
      result[world].farmLimitDate;
    document.getElementById("farmGreenA").checked = result[world].farmGreenA;
    document.getElementById("farmYellowA").checked = result[world].farmYellowA;
    document.getElementById("farmMaxWallA").value = result[world].farmMaxWallA;
    document.getElementById("farmMaxDistanceA").value =
      result[world].farmMaxDistanceA;
    document.getElementById("farmGreenB").checked = result[world].farmGreenB;
    document.getElementById("farmYellowB").checked = result[world].farmYellowB;
    document.getElementById("farmMaxWallB").value = result[world].farmMaxWallB;
    document.getElementById("farmMaxDistanceB").value =
      result[world].farmMaxDistanceB;
    document.getElementById("schedulerDelay").value =
      result[world].schedulerDelay;
    document.getElementById("schedulerTime").value =
      result[world].schedulerTime;
    document.getElementById("schedulerMsAdjust").value =
      result[world].schedulerMsAdjust;
    document.getElementById("snipDelay").value = result[world].snipDelay;
    document.getElementById("snipTotalTime").value =
      result[world].snipTotalTime;
    document.getElementById("snipAttackTime").value =
      result[world].snipAttackTime;
    document.getElementById("snipMsAdjust").value = result[world].snipMsAdjust;
  });
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
  /** Load data from site */
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
    var url = tabs[0].url;
    world = url.match(/https:\/\/(.*)\.tribal.*/i)[1];
  });
  /** Initialize */
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
  /** Attack Scheduler */
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
    state.snip.attackTime = document.getElementById("snipAttackTime").value;
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
    state.snip.attackTime = document.getElementById("snipAttackTime").value;
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
