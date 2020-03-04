var middleClick = new MouseEvent("click", { button: 1, which: 1 });
$("[href*='info_player']")[6].dispatchEvent(middleClick);
$("[href*='info_player']")[44].dispatchEvent(middleClick);

var size = 39;

function openAllProfile(list, size, offset, pos) {
  if (pos == size) {
    return;
  }
  console.log("Abrindo perfil", list[pos + offset]);
  list[pos + offset].dispatchEvent(
    new MouseEvent("click", { button: 1, which: 1 })
  );
  setTimeout(() => {
    openAllProfile(list, size, offset, ++pos);
  }, 50);
}

openAllProfile($("[href*='info_player']"), size, 6, 0);
