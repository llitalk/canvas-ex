var history = "";

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: ((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
    y: ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height
  };
}

function selectChanged() {
  var selectValue = document.getElementById("shapes").value;

  document
    .querySelectorAll(".toolbox")
    .forEach(toolbox => toolbox.classList.add("hidden"));
  document.getElementById(selectValue).classList.remove("hidden");
}

function drawSquare(e, width, height, color) {
  if (isNaN(width) || isNaN(height)) {
    document.getElementById("eror").innerText = "please enter numbers only";
  } else {
    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");
    var positions = getMousePos(canvas, e);

    var x = positions.x;
    var y = positions.y;
    ctx.rect(x, y, width, height);
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}

function drawCircle(e, radius, color) {
  if (isNaN(radius)) {
    document.getElementById("eror").innerText = "please enter numbers only";
  } else {
    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();

    var positions = getMousePos(canvas, e);

    console.log({ positions });

    var x = positions.x;
    var y = positions.y;

    // var x = window.event.clientX;
    // var y = window.event.clientY;

    console.log({ y, x });

    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    // ctx.stroke();

    ctx.fillStyle = color;
    ctx.fill();
  }
}

function drawLine(e, color) {
  var canvas = document.getElementById("mycanvas");
  var ctx = canvas.getContext("2d");
  var positions = getMousePos(canvas, e);

  console.log({ positions });

  var x = positions.x;
  var y = positions.y;
  ctx.strokeStyle = color;
  ctx.lineTo(x, y);
  ctx.stroke();
}

function drawIt(e) {
  console.log({ e });

  var selectedValue = document.getElementById("shapes").value;

  //switch for each shape
  switch (selectedValue) {
    case "square": {
      var squareHeight = +document.getElementById("square-height").value;
      var squareWidth = +document.getElementById("square-width").value;
      var squareColor = document.getElementById("square-color").value;

      drawSquare(e, squareWidth, squareHeight, squareColor);
      addHistorySquare(squareHeight, squareWidth, squareColor);
      break;
    }
    case "circle": {
      var radius = +document.getElementById("circle-radius").value;
      var circleColor = document.getElementById("circle-color").value;
      drawCircle(e, radius, circleColor);
      addHistoryLine(circleColor, radius);
      break;
    }
    case "line": {
      var color = document.getElementById("line-color").value;
      drawLine(e, color);
      addHistoryLine(color);
      break;
    }
  }
  var date = new Date();

  if (selectedValue === "line") {
    addHistoryLine(date, color);
    if (window.localStorage.getItem("history") == null) {
      window.localStorage.setItem("history", date + ";" + color);
    } else {
      window.localStorage.setItem(
        "history",
        window.localStorage.getItem("history") + "~" + date + ";" + color
      );
    }
  } else if (selectedValue === "circle") {
    addHistoryCircle(date, radius, color);
    if (window.localStorage.getItem("history") == null) {
      window.localStorage.setItem("history", date + ";" + radius + ";" + color);
    } else {
      window.localStorage.setItem(
        "history",
        window.localStorage.getItem("history") +
          "~" +
          date +
          ";" +
          radius +
          ";" +
          color
      );
    }
  } else if (selectedValue === "square") {
    addHistorySquare(date, height, width, color);
    if (window.localStorage.getItem("history") == null) {
      window.localStorage.setItem(
        "history",
        date + ";" + height + ";" + width + ";" + color
      );
    } else {
      window.localStorage.setItem(
        "history",
        window.localStorage.getItem("history") +
          "~" +
          date +
          ";" +
          height +
          ";" +
          width +
          ";" +
          color
      );
    }
  }
}

function addHistoryLine(date, color) {
  var elem = document.createElement("p");
  elem.innerHTML = date + ";" + color;
  document.getElementById("history").appendChild(elem);
  elem.addEventListener("click", function(e) {
    var parts = e.target.innerHTML.split(";");
    drawLine(parts[2], parseInt(parts[1]));
  });
}
function addHistoryCircle(date, radius, color) {
  var elem = document.createElement("p");
  elem.innerHTML = date + ";" + radius + ";" + color;
  document.getElementById("history").appendChild(elem);
  elem.addEventListener("click", function(e) {
    var parts = e.target.innerHTML.split(";");
    drawCircle(parts[2], parseInt(parts[1]));
  });
}
function addHistorySquare(date, height, width, color) {
  var elem = document.createElement("p");
  elem.innerHTML = date + ";" + height + ";" + width+ ";" + color;
  document.getElementById("history").appendChild(elem);
  elem.addEventListener("click", function(e) {
    var parts = e.target.innerHTML.split(";");
    drawSquare(parts[2], parseInt(parts[1]));
  });
}

function clearCanvas() {
  var c = document.getElementById("mycanvas");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
}
