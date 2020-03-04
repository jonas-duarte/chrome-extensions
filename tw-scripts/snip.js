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
      (parseInt(state.snip.totalTime) / 2) * 1000;
    setTimeout(() => {
      $("a[href*='cancel']")[0].click();
    }, msToReturn);
    console.log("Retornando ataque em " + msToReturn + " ms");
    break;
}
