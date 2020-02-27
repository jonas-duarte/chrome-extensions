function saqueAldeias(villages, button, buttonClicked) {
  if (!villages || villages.length === 0) {
    if (buttonClicked) saqueAldeias($(".row_a , .row_b"), button, false);
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
  if (
    (img.includes("green") && muralha === "?") ||
    muralha == "0" ||
    muralha == "1"
  ) {
    botao.click();
    setTimeout(() => {
      saqueAldeias(villages, button, true);
    }, 200);
  } else {
    saqueAldeias(villages, button, buttonClicked);
  }
}

saqueAldeias($(".row_a , .row_b"), state.farmer.button, false);
