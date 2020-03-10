function detectAttack() {
  const button = $("[value='Etiqueta']");
  if (button.length < 0) return;
  $("[type=checkbox]")
    .prop("checked", true)
    .triggerHandler("click");
  button.click();
}

function runEvery10Seconds() {
  setTimeout(() => {
    detectAttack();
    runEvery10Seconds();
  }, 10000);
}

setTimeout(() => {
  runEvery10Seconds();
}, 1000);
