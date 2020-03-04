function timeToMs(time) {
  const t = time.split(":");
  const h = parseInt(t[0]);
  const m = parseInt(t[1]);
  const s = parseInt(t[2]);
  return ((h * 60 + m) * 60 + s) * 1000;
}

var time = $(
  $("td")
    .filter(function() {
      return $(this).text() == "Duração:";
    })
    .closest("tr")
    .children()[1]
).text();

var ms =
  new Date(state.scheduler.time) -
  new Date() -
  timeToMs(time) -
  parseInt(state.scheduler.delay) +
  parseInt(state.scheduler.msAdjust);

if (ms >= 0) {
  setTimeout(() => {
    $(".troop_confirm_go").click();
  }, ms);

  console.log("Ataque agendado para daqui " + ms + " ms");
} else {
  console.log("Não foi possivel agendar o ataque, falta tempo!!");
}
