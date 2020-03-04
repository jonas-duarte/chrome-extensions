function saqueAldeias(villages, button, filters, buttonClicked) {
  if (!villages || villages.length === 0) {
    if (buttonClicked)
      saqueAldeias(
        $(".row_a:visible , .row_b:visible"),
        button,
        filters,
        false
      );
    return;
  }
  villages = $(villages);
  const village = $(villages[0]);
  villages = villages.toArray();
  villages.shift();
  const img = $(village.children()[1])
    .children()
    .attr("src");
  const muralha = $(village.children()[6]).text();
  const botao = $(village.children()[button == "B" ? 9 : 8]).children()[0];
  const distancia = $(village.children()[7]).text();
  if (
    ((filters.green && img.includes("green") && muralha === "?") ||
      (filters.yellow && img.includes("yellow") && muralha === "?") ||
      parseInt(filters.maxWall) >= parseInt(muralha)) &&
    parseInt(filters.maxDistance) >= parseFloat(distancia)
  ) {
    botao.click();
    setTimeout(() => {
      saqueAldeias(villages, button, filters, true);
    }, 200);
  } else {
    saqueAldeias(villages, button, filters, buttonClicked);
  }
}

var filters =
  state.farmer.button == "B" ? state.farmer.group[1] : state.farmer.group[0];

saqueAldeias(
  $(".row_a:visible , .row_b:visible"),
  state.farmer.button,
  filters,
  false
);
