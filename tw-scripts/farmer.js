function log(message) {
  $("#logScreen").append(
    "<div>" + new Date().toLocaleString() + " - " + message + "</div>"
  );
}

var troops = [
  {
    name: "spear",
    time: 18,
    quantity: [$("[name=spear]")[0].value, $("[name=spear]")[1].value]
  },
  {
    name: "sword",
    time: 22,
    quantity: [$("[name=sword]")[0].value, $("[name=sword]")[1].value]
  },
  {
    name: "axe",
    time: 18,
    quantity: [$("[name=axe]")[0].value, $("[name=axe]")[1].value]
  },
  {
    name: "archer",
    time: 18,
    quantity: [$("[name=archer]")[0].value, $("[name=archer]")[1].value]
  },
  {
    name: "spy",
    time: 9,
    quantity: [$("[name=spy]")[0].value, $("[name=spy]")[1].value]
  },
  {
    name: "light",
    time: 10,
    quantity: [$("[name=light]")[0].value, $("[name=light]")[1].value]
  },
  {
    name: "marcher",
    time: 10,
    quantity: [$("[name=marcher]")[0].value, $("[name=marcher]")[1].value]
  },
  {
    name: "heavy",
    time: 11,
    quantity: [$("[name=heavy]")[0].value, $("[name=heavy]")[1].value]
  },
  {
    name: "knight",
    time: 10,
    quantity: [$("[name=knight]")[0].value, $("[name=knight]")[1].value]
  }
];

var filters =
  state.farmer.button == "B" ? state.farmer.group[1] : state.farmer.group[0];

if (state.farmer.farmLimit) {
  let ms = new Date(state.farmer.farmLimitDate) - new Date();
  let maxDistance = ms > 0 ? ms / 60000 / getTroopTime() / 2 : 0;
  if (maxDistance < filters.maxDistance) {
    filters.maxDistance = maxDistance;
    log("Distancia maxima ajustada para " + filters.maxDistance);
  } else {
    log("Distancia maxima nao modificada");
  }
}

function getTroopTime() {
  let index = state.farmer.button == "B" ? 1 : 0;
  let slowerTime = -1;
  troops.forEach(t => {
    if (t.quantity[index] > 0 && t.time > slowerTime) {
      slowerTime = t.time;
    }
  });
  return (
    slowerTime / parseFloat(state.worldSpeed) / parseFloat(state.troopsSpeed)
  );
}

function saqueAldeias(villages, buttonClicked) {
  if (!villages || villages.length === 0) {
    if (buttonClicked)
      saqueAldeias($(".row_a:visible , .row_b:visible"), false);
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
  const botao = $(
    village.children()[state.farmer.button == "B" ? 9 : 8]
  ).children()[0];
  const distancia = $(village.children()[7]).text();
  if (
    ((filters.green && img.includes("green") && muralha === "?") ||
      (filters.yellow && img.includes("yellow") && muralha === "?") ||
      parseInt(filters.maxWall) >= parseInt(muralha)) &&
    parseInt(filters.maxDistance) >= parseFloat(distancia)
  ) {
    botao.click();
    setTimeout(() => {
      saqueAldeias(villages, true);
    }, 200);
  } else {
    saqueAldeias(villages, buttonClicked);
  }
}

saqueAldeias($(".row_a:visible , .row_b:visible"), false);
