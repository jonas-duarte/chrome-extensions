function distanceBetweenVillages(origem, destino) {
  if (!(origem && destino)) {
    return;
  }
  var ori = origem.split("|");
  var des = destino.split("|");

  var x = ori[0] - des[0];
  var y = ori[1] - des[1];

  var distance = Math.sqrt(x * x + y * y);

  return distance;
}

function runEverySecond() {
  if (
    $ != undefined &&
    $("#show_outgoing_units")
      .find("table")
      .find("th").length <= 3
  ) {
    $("#show_outgoing_units")
      .find("table")
      .find("th")
      .eq(2);

    var myCord = $($(".box-item").get(1))
      .children()
      .text()
      .match(/\(([0-9][0-9][0-9][|][0-9][0-9][0-9])\)/)[1];

    $("#show_outgoing_units")
      .find("table")
      .find("th")
      .eq(2)
      .after("<th>Distância</th>");

    $("#show_outgoing_units")
      .find("table")
      .find("tr")
      .each(function() {
        const td = $(this).find("td");
        let cord = td
          .eq(0)
          .text()
          .match(/\(([0-9][0-9][0-9][|][0-9][0-9][0-9])\)/);
        if (cord) {
          cord = cord[1];
          td.eq(2).after(
            "<td>" + distanceBetweenVillages(myCord, cord) + "</td>"
          );
        }
      });
  }
  setTimeout(runEverySecond, 1000);
}

runEverySecond();
