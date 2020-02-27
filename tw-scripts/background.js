// const saqueAldeias = (villages, buttonClicked) => {
//   if (!villages || villages.length === 0) {
//     if (buttonClicked) saqueAldeias($(".row_a , .row_b"), false);
//     return;
//   }
//   villages = $(villages);
//   const village = $(villages[0]);
//   villages = villages.toArray();
//   villages.shift();
//   const img = $(village.children()[1])
//     .children()
//     .attr("src");
//   const muralha = $(village.children()[6]).text();
//   const botao = $(village.children()[8]).children()[0];
//   if (
//     (img.includes("green") && muralha === "?") ||
//     muralha == "0" ||
//     muralha == "1"
//   ) {
//     botao.click();
//     setTimeout(() => {
//       saqueAldeias(villages, true);
//     }, 200);
//   } else {
//     saqueAldeias(villages, buttonClicked);
//   }
// };

//saqueAldeias($(".row_a , .row_b"));

// setTimeout(() => {
//   location.reload();
// }, 5000);

// new Date("2020-02-26 11:40:38");

// function computeMs(date) {
//   const currentDate = new Date();
//   return date - currentDate;
// }

// setTimeout(() => {
//   $(".troop_confirm_go").click();
// }, computeMs(new Date("2020-02-26 11:40:38")));
