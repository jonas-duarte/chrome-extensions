const toggles = [
  { button: "farmCollapse", group: "farmGroup" },
  { button: "schedulerCollapse", group: "schedulerGroup" },
  { button: "snipCollapse", group: "snipGroup" },
  { button: "configCollapse", group: "configGroup" }
];

const toggleCollapse = id => {
  cleanToggles(id);
  chrome.storage.local.set({
    [id]: false
  });
  loadCollapse();
};

const cleanToggles = id => {
  toggles.forEach(({ button }) => {
    if (button !== id) {
      chrome.storage.local.set({
        [button]: true
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
  chrome.storage.local.get(
    toggles.map(t => t.button),
    result => {
      toggles.forEach(({ button, group }) =>
        collapseElement(result[button], group)
      );
    }
  );
};

document.addEventListener("DOMContentLoaded", function() {
  loadCollapse();
  toggles.forEach(({ button }) =>
    document.getElementById(button).addEventListener("click", function() {
      toggleCollapse(button);
    })
  );
});
