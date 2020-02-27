switch (state.snip.action) {
  case "send":
    var msToSend =
      new Date(state.snip.atackTime) -
      new Date() -
      parseInt(state.snip.totalTime) * 1000 +
      parseInt(state.snip.msAdjust) -
      parseInt(state.snip.delay);
    setTimeout(() => {
      $(".troop_confirm_go").click();
    }, msToSend);
    console.log("Ataque será enviado daqui " + msToSend + " ms");
    break;
  case "return":
    var msToReturn =
      new Date(state.snip.atackTime) -
      new Date() -
      (parseInt(state.snip.totalTime) / 2) * 1000 -
      parseInt(state.snip.delay);
    setTimeout(() => {
      $("a[href*='cancel']")[0].click();
    }, msToReturn);
    console.log("Retornando ataque em " + msToReturn + " ms");
    break;
  case "militia":
    var msToCallMilitia =
      new Date(state.snip.atackTime) -
      new Date() +
      parseInt(state.snip.msAdjust) -
      parseInt(state.snip.delay);
    if (msToCallMilitia < 0) break;
    $(".evt-confirm")[0].click();
    setTimeout(() => {
      $(".evt-confirm-btn")[0].click();
    }, msToCallMilitia);
    console.log("Retornando ataque em " + msToCallMilitia + " ms");
    break;
}
