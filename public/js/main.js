/* 
Authored with dedication by Julian Samriddhi Jacobs
Co-authored by Manju
Oxford University, 2024
Released under the MIT License
For more information, visit: https://opensource.org/licenses/MIT

With the help of the Quine-McCluskey algorithm, this program allows users to input a logical expression and see the corresponding Venn diagram. 
The Venn diagram is interactive, allowing users to click on regions to fill them in. 
The program also allows users to set the precision of the Venn diagram, which controls the number of decimal places displayed.
*/

function refresh() {
  setPrecision(document.getElementById('precision').value)
  renderVenn()
}

var nEvents = 2
var qmc
function updateN() {
  nEvents = document.getElementById('nEvents').value
  qmc = new QuineMcCluskey("displaySetNotation", nEvents, 0);
  qmc.init();
  resetFillBool()
}

var setCenters = [[[.5 - .15, .5], [.5 + .15, .5]],
[[.5, .38], [.35278, .635], [.64722, .635]],
[[.5, .45106], [.5, .45106], [.344681, .6], [.655319, .6]]]
var majorRad = 0.3829787
var minorRad = 0.2457446
var regionSize = [.325 * 2, .3 * 2, majorRad * 2]

var labels = ["A", "B", "C", "D"]
var regionCenters = [
  [[240, 40], [105, 240], [400, 240], [240, 240]],
  [[35, 35], [240, 85], [93, 347], [161, 222],
  [389, 334], [339, 205], [251, 378], [254, 250]],
  [[25, 25], [145, 109], [322, 96], [238, 119],
  [51, 177], [113, 158], [125, 312], [154, 217],
  [442, 257], [377, 304], [387, 167], [330, 226],
  [246, 396], [299, 354], [196, 356], [242, 297]]]

var labelCoords = [[[82, 114], [413, 114]],
[[245, 40], [67, 414], [427, 414]],
[[115, 87], [375, 87], [63, 357], [412, 372]]]

var foci = [[[[.5 - .15, .5], [.5 - .15, .5]], [[.5 + .15, .5], [.5 + .15, .5]]],
[[[.5, .38], [.5, .38]], [[.35278, .635], [.35278, .635]], [[.64722, .635], [.64722, .635]]],
[[.5, .45106], [.5, .45106], [.344681, .6], [.655319, .6]]]

for (var i = 0; i < 4; i++) {
  foci[2][i][0] = [setCenters[2][i][0] + Math.pow(-1, i) * 0.7524149 * 0.293738, setCenters[2][i][1] + 0.6586895 * 0.293738]
  foci[2][i][1] = [setCenters[2][i][0] - Math.pow(-1, i) * 0.7524149 * 0.293738, setCenters[2][i][1] - 0.6586895 * 0.293738]
}

function drawEvents(c, ctx) {
  if (nEvents == 2) {
    for (var i = 1; i <= nEvents; i++) {
      ctx.beginPath();
      ctx.ellipse(c.width * setCenters[nEvents - 2][i - 1][0], c.height * setCenters[nEvents - 2][i - 1][1], c.width * .325, c.width * .325, 0 * Math.PI, 0, 2 * Math.PI);
      ctx.stroke()
    }
  } else if (nEvents == 3) {
    var circleRadius = c.width * .3
    for (var i = 1; i <= nEvents; i++) {
      ctx.beginPath();
      ctx.ellipse(c.width * setCenters[nEvents - 2][i - 1][0], c.height * setCenters[nEvents - 2][i - 1][1], circleRadius, circleRadius, 0 * Math.PI, 0, 2 * Math.PI);
      ctx.stroke()
    }
  } else if (nEvents == 4) {
    var majorRadius = c.width * 360 / 470 / 2
    var minorRadius = c.width * 231 / 470 / 2
    var angleRads = 41.2 * Math.PI / 180
    for (var i = 1; i <= nEvents; i++) {
      ctx.beginPath();
      ctx.ellipse(c.width * setCenters[nEvents - 2][i - 1][0], c.height * setCenters[nEvents - 2][i - 1][1], majorRadius, minorRadius, Math.PI + Math.pow(-1, i - 1) * angleRads, 0, 2 * Math.PI);
      ctx.stroke()
    }
  }
}

var nFilled = 0
function renderVenn() {
  nFilled = 0
  var c = document.getElementById('venn');
  var ctx = c.getContext('2d');
  var scale = c.width / 490

  ctx.fillStyle = "white";
  ctx.strokeStyle = "black"
  ctx.beginPath();
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fill()
  ctx.rect(0, 0, c.width, c.height);
  ctx.stroke()

  ctx.lineWidth = scale
  drawEvents(c, ctx)
  ctx.fillStyle = "#C0C0C0"
  var i = 0, j = 0, k = 0, l = 0
  for (var checkRegion = 0; checkRegion < regionCenters[nEvents - 2].length; checkRegion++) {
    var regionFill = false
    if (nEvents == 2 && fillBool[i][j]) regionFill = true
    if (nEvents == 3 && fillBool[i][j][k]) regionFill = true
    if (nEvents == 4 && fillBool[i][j][k][l]) regionFill = true
    if (regionFill) {
      ctx.fillFlood(regionCenters[nEvents - 2][checkRegion][0], regionCenters[nEvents - 2][checkRegion][1], 0)
      nFilled++
    }
    i++
    if (i > 1) { j++; i = 0 }
    if (j > 1) { k++; j = 0 }
    if (k > 1) { l++; k = 0 }
  }
  ctx.lineWidth = scale * 2
  drawEvents(c, ctx)
  ctx.lineWidth = scale

  ctx.strokeStyle = "black"
  ctx.font = (24 * scale) + "px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (var i = 0; i < nEvents; i++) {
    ctx.fillStyle = "rgba(255,255,255,.5)"
    ctx.beginPath()
    ctx.arc(labelCoords[nEvents - 2][i][0], labelCoords[nEvents - 2][i][1], 16 * scale, 0, 0)
    ctx.fill()
    ctx.stroke()

    ctx.beginPath()
    ctx.fillStyle = "black"
    ctx.fillText(labels[i], labelCoords[nEvents - 2][i][0], labelCoords[nEvents - 2][i][1])
    ctx.fill()
  }
}

function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  scaleX = canvas.width / rect.width,
    scaleY = canvas.height / rect.height;
  let x = (event.clientX - rect.left) * scaleX;
  let y = (event.clientY - rect.top) * scaleY;

  var c = document.getElementById('venn');
  var ctx = c.getContext('2d');
  checkSets(x, y)
}


var fillBool = []

function resetFillBool() {
  qmc.data.clear()
  fillBool = []
  for (var i = 0; i < 2; i++) {
    if (nEvents == 2) {
      fillBool[i] = [false, false]
    } else {
      fillBool[i] = []
      for (var j = 0; j < 2; j++) {
        if (nEvents == 3) {
          fillBool[i][j] = [false, false]
        } else {
          fillBool[i][j] = []
          for (var k = 0; k < 2; k++) {
            fillBool[i][j][k] = [false, false]
          }
        }
      }
    }
  }
  reviseSetNotation()
}


function checkSets(x, y) {
  var c = document.getElementById('venn');
  var idx = [0, 0, 0, 0]
  for (var fIdx = 0; fIdx < foci[nEvents - 2].length; fIdx++) {
    var d = 0
    for (var i = 0; i < 2; i++) {
      fX = foci[nEvents - 2][fIdx][i][0] * c.width
      fY = foci[nEvents - 2][fIdx][i][1] * c.width
      d += Math.sqrt(Math.pow(x - fX, 2) + Math.pow(y - fY, 2))
    }
    if (d < regionSize[nEvents - 2] * c.width) {
      idx[fIdx] = 1
    }
  }
  var qmcValue = 0
  if (nEvents == 2) {
    fillBool[idx[0]][idx[1]] = !fillBool[idx[0]][idx[1]]
    qmcValue = fillBool[idx[0]][idx[1]] ? 1 : 0
  } else if (nEvents == 3) {
    fillBool[idx[0]][idx[1]][idx[2]] = !fillBool[idx[0]][idx[1]][idx[2]]
    qmcValue = fillBool[idx[0]][idx[1]][idx[2]] ? 1 : 0
  } else if (nEvents == 4) {
    fillBool[idx[0]][idx[1]][idx[2]][idx[3]] = !fillBool[idx[0]][idx[1]][idx[2]][idx[3]]
    qmcValue = fillBool[idx[0]][idx[1]][idx[2]][idx[3]] ? 1 : 0
  }
  var qmcIndex = idx[0] + idx[1] * 2 + idx[2] * 4 + idx[3] * 8
  qmc.data.setFuncData(qmcIndex, qmcValue)
  qmc.data.compute()
  qmc.update()
  renderVenn()
}

function reviseSetNotation() {
  if (nFilled == regionCenters[nEvents - 2].length) {
    document.getElementById('displaySetNotation').innerHTML = "S"
    return;
  }
  var setNotation = ""
  var i = [0, 0, 0, 0]
  for (var part = 0; part < regionCenters[nEvents - 2].length; part++) {
    var regionFill = false
    if (nEvents == 2 && fillBool[i[0]][i[1]]) regionFill = true
    if (nEvents == 3 && fillBool[i[0]][i[1]][i[2]]) regionFill = true
    if (nEvents == 4 && fillBool[i[0]][i[1]][i[2]][i[3]]) regionFill = true
    if (regionFill) {
      if (setNotation != "") setNotation += "+"
      for (var regName = 0; regName < nEvents; regName++) {
        setNotation += labels[regName] + (i[regName] == 1 ? "" : "'")
      }
    }
    i[0]++
    if (i[0] > 1) { i[1]++; i[0] = 0 }
    if (i[1] > 1) { i[2]++; i[1] = 0 }
    if (i[2] > 1) { i[3]++; i[2] = 0 }
  }
  document.getElementById('displaySetNotation').innerHTML = setNotation
}

function simplifyAndDrawExpression() {
  var inputExp = document.getElementById('inputExpression').value
  if (inputExp.search("D") > 0) {
    document.getElementById('nEvents').value = 4
  } else if (inputExp.search("C") > 0) {
    document.getElementById('nEvents').value = 3
  } else {
    document.getElementById('nEvents').value = 2
  }
  updateN()


  var logicalExp = inputExp.slice()
  var replacing = 0
  var replacingLevel = []
  var level = 0
  var substringCharacterCount = 0
  for (var j = logicalExp.length; j >= 0; j--) {
    if (logicalExp[j] == "'") {
      replacing++
      replacingLevel.push(level)
      substringCharacterCount = 0
    } else {
      substringCharacterCount++
    }
    if (logicalExp[j] == ")") level++
    if (logicalExp[j] == "(") level--

    if (substringCharacterCount > 0 && replacing > 0 && level == replacingLevel[replacingLevel.length - 1]) {
      logicalExp = logicalExp.slice(0, j) + "!" + logicalExp.slice(j)
      replacing--
      replacingLevel.pop()
    }

  }
  logicalExp = logicalExp.replaceAll("'", "")
  var logicalExp = logicalExp.replaceAll('u', '||').replaceAll('n', '&&')


  resetFillBool()
  qmc.data.init(nEvents)
  var i = [0, 0, 0, 0]
  for (var part = 0; part < regionCenters[nEvents - 2].length; part++) {
    tempLogicalExp = logicalExp.slice()
    for (var j = 0; j < 4; j++) tempLogicalExp = tempLogicalExp.replaceAll(labels[j], i[j] == 0 ? "false" : "true")
    var regionFill = eval(tempLogicalExp)
    if (regionFill) {
      var qmcIndex = i[0] + i[1] * 2 + i[2] * 4 + i[3] * 8
      if (nEvents == 2) {
        fillBool[i[0]][i[1]] = true
      } else if (nEvents == 3) {
        fillBool[i[0]][i[1]][i[2]] = true
      } else if (nEvents == 4) {
        fillBool[i[0]][i[1]][i[2]][i[3]] = true
      }
      qmc.data.setFuncData(qmcIndex, 1)
    }
    i[0]++
    if (i[0] > 1) { i[1]++; i[0] = 0 }
    if (i[1] > 1) { i[2]++; i[1] = 0 }
    if (i[2] > 1) { i[3]++; i[2] = 0 }
  }
  qmc.data.compute()
  qmc.update()
  renderVenn()
}

var floodfill = (function () {

  //Copyright(c) Max Irwin - 2011, 2015, 2016
  //MIT License

  function floodfill(data, x, y, fillcolor, tolerance, width, height) {

    var length = data.length;
    var Q = [];
    var i = (x + y * width) * 4;
    var e = i, w = i, me, mw, w2 = width * 4;

    var targetcolor = [data[i], data[i + 1], data[i + 2], data[i + 3]];

    if (!pixelCompare(i, targetcolor, fillcolor, data, length, tolerance)) { return false; }
    Q.push(i);
    while (Q.length) {
      i = Q.pop();
      if (pixelCompareAndSet(i, targetcolor, fillcolor, data, length, tolerance)) {
        e = i;
        w = i;
        mw = parseInt(i / w2) * w2; 
        me = mw + w2;
        while (mw < w && mw < (w -= 4) && pixelCompareAndSet(w, targetcolor, fillcolor, data, length, tolerance)); 
        while (me > e && me > (e += 4) && pixelCompareAndSet(e, targetcolor, fillcolor, data, length, tolerance));
        for (var j = w + 4; j < e; j += 4) {
          if (j - w2 >= 0 && pixelCompare(j - w2, targetcolor, fillcolor, data, length, tolerance)) Q.push(j - w2);
          if (j + w2 < length && pixelCompare(j + w2, targetcolor, fillcolor, data, length, tolerance)) Q.push(j + w2);
        }
      }
    }
    return data;
  };

  function pixelCompare(i, targetcolor, fillcolor, data, length, tolerance) {
    if (i < 0 || i >= length) return false;
    if (data[i + 3] === 0 && fillcolor.a > 0) return true;

    if (
      Math.abs(targetcolor[3] - fillcolor.a) <= tolerance &&
      Math.abs(targetcolor[0] - fillcolor.r) <= tolerance &&
      Math.abs(targetcolor[1] - fillcolor.g) <= tolerance &&
      Math.abs(targetcolor[2] - fillcolor.b) <= tolerance
    ) return false; 

    if (
      (targetcolor[3] === data[i + 3]) &&
      (targetcolor[0] === data[i]) &&
      (targetcolor[1] === data[i + 1]) &&
      (targetcolor[2] === data[i + 2])
    ) return true;

    if (
      Math.abs(targetcolor[3] - data[i + 3]) <= (255 - tolerance) &&
      Math.abs(targetcolor[0] - data[i]) <= tolerance &&
      Math.abs(targetcolor[1] - data[i + 1]) <= tolerance &&
      Math.abs(targetcolor[2] - data[i + 2]) <= tolerance
    ) return true; 

    return false; 
  };

  function pixelCompareAndSet(i, targetcolor, fillcolor, data, length, tolerance) {
    if (pixelCompare(i, targetcolor, fillcolor, data, length, tolerance)) {
      data[i] = fillcolor.r;
      data[i + 1] = fillcolor.g;
      data[i + 2] = fillcolor.b;
      data[i + 3] = fillcolor.a;
      return true;
    }
    return false;
  };

  function fillUint8ClampedArray(data, x, y, color, tolerance, width, height) {
    if (!data instanceof Uint8ClampedArray) throw new Error("data must be an instance of Uint8ClampedArray");
    if (isNaN(width) || width < 1) throw new Error("argument 'width' must be a positive integer");
    if (isNaN(height) || height < 1) throw new Error("argument 'height' must be a positive integer");
    if (isNaN(x) || x < 0) throw new Error("argument 'x' must be a positive integer");
    if (isNaN(y) || y < 0) throw new Error("argument 'y' must be a positive integer");
    if (width * height * 4 !== data.length) throw new Error("width and height do not fit Uint8ClampedArray dimensions");

    var xi = Math.floor(x);
    var yi = Math.floor(y);

    if (xi !== x) console.warn("x truncated from", x, "to", xi);
    if (yi !== y) console.warn("y truncated from", y, "to", yi);


    tolerance = (!isNaN(tolerance)) ? Math.min(Math.abs(Math.round(tolerance)), 254) : 0;

    return floodfill(data, xi, yi, color, tolerance, width, height);
  };

  var getComputedColor = function (c) {
    var temp = document.createElement("div");
    var color = { r: 0, g: 0, b: 0, a: 0 };
    temp.style.color = c;
    temp.style.display = "none";
    document.body.appendChild(temp);

    var style = window.getComputedStyle(temp, null).color;
    document.body.removeChild(temp);

    var recol = /([\.\d]+)/g;
    var vals = style.match(recol);
    if (vals && vals.length > 2) {

      color.r = parseInt(vals[0]) || 0;
      color.g = parseInt(vals[1]) || 0;
      color.b = parseInt(vals[2]) || 0;
      color.a = Math.round((parseFloat(vals[3]) || 1.0) * 255);
    }
    return color;
  };

  function fillContext(x, y, tolerance, left, top, right, bottom) {
    var ctx = this;

   
    var color = getComputedColor(this.fillStyle);


    left = (isNaN(left)) ? 0 : left;
    top = (isNaN(top)) ? 0 : top;
    right = (!isNaN(right) && right) ? Math.min(Math.abs(right), ctx.canvas.width) : ctx.canvas.width;
    bottom = (!isNaN(bottom) && bottom) ? Math.min(Math.abs(bottom), ctx.canvas.height) : ctx.canvas.height;

    var image = ctx.getImageData(left, top, right, bottom);

    var data = image.data;
    var width = image.width;
    var height = image.height;

    if (width > 0 && height > 0) {
      fillUint8ClampedArray(data, x, y, color, tolerance, width, height);
      ctx.putImageData(image, left, top);
    }
  };

  if (typeof CanvasRenderingContext2D != 'undefined') {
    CanvasRenderingContext2D.prototype.fillFlood = fillContext;
  };

  return fillUint8ClampedArray;

})();