const toggles = ["farmCollapse", "schedulerCollapse", "snipCollapse"];

const toggleCollapse = id => {
  cleanToggles(id);
  chrome.storage.local.set({
    [id]: false
  });
  loadCollapse();
};

const cleanToggles = id => {
  toggles.forEach(t => {
    if (t !== id) {
      chrome.storage.local.set({
        [t]: true
      });
    }
  });
};

const collapseElement = (collapsed, elementId) => {
  const element = document.getElementById(elementId);
  if (collapsed) {
    element.setAttribute("style", "display:none;");
  } else {
    element.setAttribute("style", "display:inline-block;");
  }
};

const loadCollapse = () => {
  const elements = ["farmGroup", "schedulerGroup", "snipGroup"];
  chrome.storage.local.get(toggles, result => {
    toggles.forEach((t, index) => collapseElement(result[t], elements[index]));
  });
};

document.addEventListener("DOMContentLoaded", function() {
  loadCollapse();
  document.getElementById("farmCollapse").addEventListener("click", function() {
    toggleCollapse("farmCollapse");
  });
  document
    .getElementById("schedulerCollapse")
    .addEventListener("click", function() {
      toggleCollapse("schedulerCollapse");
    });
  document.getElementById("snipCollapse").addEventListener("click", function() {
    toggleCollapse("snipCollapse");
  });
});
