function log(message) {
  $("#logScreen").append(
    "<div>" + new Date().toLocaleString() + " - " + message + "</div>"
  );
}

switch (state.snip.action) {
  case "send":
    var msToSend =
      new Date(state.snip.atackTime) -
      new Date() -
      parseInt(state.snip.totalTime) * 1000 +
      parseInt(state.snip.msAdjust) -
      parseInt(state.snip.delay);
    if (msToSend < 0) {
      log("O ataque está atrasado e não será enviado");
      break;
    }
    setTimeout(() => {
      $(".troop_confirm_go").click();
    }, msToSend);
    log("Ataque será enviado daqui " + msToSend + " ms");
    break;
  case "return":
    var msToReturn =
      new Date(state.snip.atackTime) -
      new Date() -
      (parseInt(state.snip.totalTime) / 2) * 1000;
    if (msToSend < 0) {
      log("O retorno está atrasado e não será enviado");
      break;
    }
    setTimeout(() => {
      $("a[href*='cancel']")[0].click();
    }, msToReturn);
    log("Retornando ataque em " + msToReturn + " ms");
    break;
}
