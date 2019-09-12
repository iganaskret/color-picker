"use strict";

const root = document.documentElement;
const colorInput = document.querySelector("#picker");
const hex = document.querySelector("#hex");
const rgb = document.querySelector("#rgb");
const hsl = document.querySelector("#hsl");
const colorOne = document.querySelector(".color1");
const colorTwo = document.querySelector(".color2");
const colorThree = document.querySelector(".color3");
const colorFour = document.querySelector(".color4");
const hexOne = document.querySelector("#hex1");
const rgbOne = document.querySelector("#rgb1");
const hslOne = document.querySelector("#hsl1");

//converting functions
function HEXToRGB(HEXcolor) {
  HEXcolor = HEXcolor.replace("#", "");
  let r = parseInt(HEXcolor.substring(0, 2), 16);
  let g = parseInt(HEXcolor.substring(2, 4), 16);
  let b = parseInt(HEXcolor.substring(4, 6), 16);

  let result = "(" + r + "," + g + "," + b + ")";
  return result;
}

function RGBToHSL(RGBcolor) {
  RGBcolor = RGBcolor.slice(1, -1);
  let r = RGBcolor.split(",")[0];
  let g = RGBcolor.split(",")[1];
  let b = RGBcolor.split(",")[2];
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  h = Math.round(h);
  s = Math.round(s);
  l = Math.round(l);

  let result = `${h} ${s}% ${l}%`;
  return result;
}

function splitRGB(RGBcolor) {
  RGBcolor = RGBcolor.slice(1, -1);
  let r = RGBcolor.split(",")[0];
  let g = RGBcolor.split(",")[1];
  let b = RGBcolor.split(",")[2];
  r = RGBToHex(r);
  g = RGBToHex(g);
  b = RGBToHex(b);

  return `#${r}${g}${b}`;
}

function RGBToHex(RGBletter) {
  let hex = Number(RGBletter).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
}

//harmony functions
function analog(HSLcolor) {
  HSLcolor = HSLcolor.slice();
  let h = HSLcolor.split(" ")[0];
  let s = HSLcolor.substring(HSLcolor.indexOf(" ") + 1, HSLcolor.indexOf("%"));
  let l = HSLcolor.substring(
    HSLcolor.lastIndexOf(" ") + 1,
    HSLcolor.lastIndexOf("%")
  );
  h = parseInt(h, 10);
  h = h + 20;
  colorTwo.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl2").textContent = `${h} ${s}% ${l}%`;
  h = h + 10;
  colorOne.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  hslOne.textContent = `${h} ${s}% ${l}%`;
  h = h - 50;
  colorThree.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl3").textContent = `${h} ${s}% ${l}%`;
  h = h - 10;
  colorFour.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl4").textContent = `${h} ${s}% ${l}%`;
  return `${h}, ${s}%, ${l}%`;
}

function monochrom(HSLcolor) {
  HSLcolor = HSLcolor.slice();
  let h = HSLcolor.split(" ")[0];
  let s = HSLcolor.substring(HSLcolor.indexOf(" ") + 1, HSLcolor.indexOf("%"));
  let l = HSLcolor.substring(
    HSLcolor.lastIndexOf(" ") + 1,
    HSLcolor.lastIndexOf("%")
  );
  l = parseInt(l, 10);

  l = l + 10;
  if (l > 100) {
    l = 100;
  }
  colorTwo.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl2").textContent = `${h} ${s}% ${l}%`;
  l = l + 10;
  if (l > 100) {
    l = 100;
  }
  colorOne.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  hslOne.textContent = `${h} ${s}% ${l}%`;
  l = l - 30;
  if (l < 0) {
    l = 0;
  }
  colorThree.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl3").textContent = `${h} ${s}% ${l}%`;
  l = l - 10;
  if (l < 0) {
    l = 0;
  }
  colorFour.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl4").textContent = `${h} ${s}% ${l}%`;
  return `${h}, ${s}%, ${l}%`;
}

function triad(HSLcolor) {
  HSLcolor = HSLcolor.slice();
  let h = HSLcolor.split(" ")[0];
  let s = HSLcolor.substring(HSLcolor.indexOf(" ") + 1, HSLcolor.indexOf("%"));
  let l = HSLcolor.substring(
    HSLcolor.lastIndexOf(" ") + 1,
    HSLcolor.lastIndexOf("%")
  );
  l = parseInt(l, 10);
  h = parseInt(h, 10);

  h = h - 120;
  colorOne.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  hslOne.textContent = `${h} ${s}% ${l}%`;
  l = l - 15;
  if (l < 0) {
    l = 0;
  }
  colorTwo.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl2").textContent = `${h} ${s}% ${l}%`;

  h = h + 240;
  colorFour.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl4").textContent = `${h} ${s}% ${l}%`;
  l = l + 30;
  if (l > 100) {
    l = 100;
  }
  colorThree.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl3").textContent = `${h} ${s}% ${l}%`;

  return `${h}, ${s}%, ${l}%`;
}

function complement(HSLcolor) {
  HSLcolor = HSLcolor.slice();
  let h = HSLcolor.split(" ")[0];
  let s = HSLcolor.substring(HSLcolor.indexOf(" ") + 1, HSLcolor.indexOf("%"));
  let l = HSLcolor.substring(
    HSLcolor.lastIndexOf(" ") + 1,
    HSLcolor.lastIndexOf("%")
  );
  l = parseInt(l, 10);
  h = parseInt(h, 10);

  l = l - 15;
  if (l < 0) {
    l = 0;
  }
  colorOne.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  hslOne.textContent = `${h} ${s}% ${l}%`;
  l = l - 15;
  colorTwo.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl2").textContent = `${h} ${s}% ${l}%`;
  l = l + 30;
  if (l > 100) {
    l = 100;
  }
  h = h + 180;
  colorThree.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl3").textContent = `${h} ${s}% ${l}%`;
  l = l + 15;
  if (l > 100) {
    l = 100;
  }
  colorFour.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl4").textContent = `${h} ${s}% ${l}%`;

  return `${h}, ${s}%, ${l}%`;
}

function compound(HSLcolor) {
  HSLcolor = HSLcolor.slice();
  let h = HSLcolor.split(" ")[0];
  let s = HSLcolor.substring(HSLcolor.indexOf(" ") + 1, HSLcolor.indexOf("%"));
  let l = HSLcolor.substring(
    HSLcolor.lastIndexOf(" ") + 1,
    HSLcolor.lastIndexOf("%")
  );
  l = parseInt(l, 10);
  h = parseInt(h, 10);

  h = h + 20;
  colorTwo.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl2").textContent = `${h} ${s}% ${l}%`;
  h = h + 10;
  colorOne.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  hslOne.textContent = `${h} ${s}% ${l}%`;

  h = h + 150;
  colorThree.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl3").textContent = `${h} ${s}% ${l}%`;
  l = l + 15;
  if (l > 100) {
    l = 100;
  }
  colorFour.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl4").textContent = `${h} ${s}% ${l}%`;

  return `${h}, ${s}%, ${l}%`;
}

function shades(HSLcolor) {
  HSLcolor = HSLcolor.slice();
  let h = HSLcolor.split(" ")[0];
  let s = HSLcolor.substring(HSLcolor.indexOf(" ") + 1, HSLcolor.indexOf("%"));
  let l = HSLcolor.substring(
    HSLcolor.lastIndexOf(" ") + 1,
    HSLcolor.lastIndexOf("%")
  );
  console.log(s);
  s = parseInt(s, 10);

  s = s + 20;
  if (s > 100) {
    s = 100;
  }
  colorTwo.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl2").textContent = `${h} ${s}% ${l}%`;
  s = s + 20;
  if (s > 100) {
    s = 100;
  }
  colorOne.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  hslOne.textContent = `${h} ${s}% ${l}%`;
  s = s - 60;
  if (s < 0) {
    s = 0;
  }
  colorThree.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl3").textContent = `${h} ${s}% ${l}%`;
  s = s - 20;
  if (s < 0) {
    s = 0;
  }
  colorFour.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  document.querySelector("#hsl4").textContent = `${h} ${s}% ${l}%`;
  return `${h}, ${s}%, ${l}%`;
}

//read value and display
function changeValue() {
  root.style.setProperty("--color", colorInput.value);
  hex.textContent = colorInput.value;
  rgb.textContent = HEXToRGB(hex.textContent);
  hsl.textContent = RGBToHSL(rgb.textContent);

  showHarmony();
  for (let i = 0; i <= 4; i++) {
    displayHarmonies(i);
  }
}

function showHarmony() {
  const value = theme[theme.selectedIndex].value;
  if (value == "analog") {
    analog(hsl.textContent);
  } else if (value == "monochrom") {
    monochrom(hsl.textContent);
  } else if (value == "triad") {
    triad(hsl.textContent);
  } else if (value == "complement") {
    complement(hsl.textContent);
  } else if (value == "compound") {
    compound(hsl.textContent);
  } else {
    shades(hsl.textContent);
  }
}

function displayHarmonies (i) {
  document.querySelector("#rgb" + i);.textContent = document.querySelector(".color" + 1).style.backgroundColor.substring(3);
  document.querySelector("#hex" + i).textContent = splitRGB(document.querySelector("#rgb" + i).textContent);
}
window.addEventListener("DOMContentLoaded", event => {
  colorInput.addEventListener("change", changeValue);
  theme.addEventListener("change", showHarmony);
});
