// Renders an architecture diagram from DATA.diagrams[key] as an interactive SVG.
(function () {
  var NS = "http://www.w3.org/2000/svg";

  function svg(tag, attrs, parent) {
    var el = document.createElementNS(NS, tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(el);
    return el;
  }

  // Connect two boxes on the sides that face each other.
  function anchors(a, b) {
    var ax = a.x + a.w / 2, ay = a.y + a.h / 2, bx = b.x + b.w / 2, by = b.y + b.h / 2;
    var dx = bx - ax, dy = by - ay;
    if (Math.abs(dx) * 0.55 > Math.abs(dy)) {
      return dx > 0
        ? [a.x + a.w, ay, b.x, by]
        : [a.x, ay, b.x + b.w, by];
    }
    return dy > 0
      ? [ax, a.y + a.h, bx, b.y]
      : [ax, a.y, bx, b.y + b.h];
  }

  window.renderDiagram = function (key, host) {
    var d = DATA.diagrams[key];
    if (!d) return;
    var byId = {};
    d.nodes.forEach(function (n) { byId[n.id] = n; });

    var root = svg("svg", {
      "class": "diagram", viewBox: "0 0 " + d.w + " " + d.h, role: "group",
      "aria-label": "Architecture diagram. Select a box to read what it does.",
    }, host);

    var defs = svg("defs", {}, root);
    var marker = svg("marker", { id: "arrow-" + key, viewBox: "0 0 10 10", refX: "9", refY: "5", markerWidth: "7", markerHeight: "7", orient: "auto-start-reverse" }, defs);
    var tip = svg("path", { d: "M0 0 L10 5 L0 10 z" }, marker);
    tip.style.fill = "var(--muted)";

    d.edges.forEach(function (e) {
      var p = anchors(byId[e[0]], byId[e[1]]);
      var path = "M" + p[0] + " " + p[1] + " L" + p[2] + " " + p[3];
      svg("path", { "class": "edge", d: path, "marker-end": "url(#arrow-" + key + ")" }, root);
      svg("path", { "class": "flow", d: path }, root);
    });

    var note = document.createElement("p");
    note.className = "diagram-note";
    note.innerHTML = "<b>Hover or tab to a box</b> to see what it does.";

    function select(n, g) {
      root.querySelectorAll(".node.sel").forEach(function (x) { x.classList.remove("sel"); });
      g.classList.add("sel");
      note.textContent = "";
      var b = document.createElement("b");
      b.textContent = n.t + ": ";
      note.appendChild(b);
      note.appendChild(document.createTextNode(n.d));
    }

    d.nodes.forEach(function (n) {
      var g = svg("g", { "class": "node" + (n.band ? " band" : ""), tabindex: "0", role: "button", "aria-label": n.t + ". " + n.d }, root);
      svg("rect", { x: n.x, y: n.y, width: n.w, height: n.h }, g);
      var t = svg("text", { x: n.x + n.w / 2, y: n.y + n.h / 2 }, g);
      t.textContent = n.t;
      g.addEventListener("mouseenter", function () { select(n, g); });
      g.addEventListener("focus", function () { select(n, g); });
      g.addEventListener("click", function () { select(n, g); });
      g.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); select(n, g); }
      });
    });

    host.appendChild(note);
  };
})();
