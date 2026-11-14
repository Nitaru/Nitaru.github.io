// A small, safe terminal: every output line is built with textContent, never innerHTML.
(function () {
  var body = document.getElementById("term-body");
  var form = document.getElementById("term-form");
  var input = document.getElementById("term-input");
  var chips = document.getElementById("term-chips");
  var term = document.getElementById("terminal");
  if (!body || !form || !input) return;

  var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var history = [], hIndex = 0;

  // A line is a string, or an array of segments: "text" or { t: "text", c: "acc|dim|good|warn|blue", href: "..." }
  function addLine(parts) {
    var p = document.createElement("p");
    p.className = "term-line";
    (Array.isArray(parts) ? parts : [parts]).forEach(function (seg) {
      if (typeof seg === "string") { p.appendChild(document.createTextNode(seg)); return; }
      var el = document.createElement(seg.href ? "a" : "span");
      if (seg.c) el.className = "c-" + seg.c;
      if (seg.href) { el.href = seg.href; if (/^https?:/.test(seg.href)) { el.target = "_blank"; el.rel = "noopener noreferrer"; } }
      el.textContent = seg.t;
      p.appendChild(el);
    });
    body.appendChild(p);
  }
  function print(lines) { lines.forEach(addLine); body.scrollTop = body.scrollHeight; }
  function gap() { addLine(""); }

  var LV = { work: "good", built: "blue", learning: "warn" };

  var commands = {
    help: { d: "list commands", run: function () {
      print([[{ t: "Commands", c: "acc" }]]);
      Object.keys(commands).forEach(function (k) {
        if (commands[k].hidden) return;
        print([["  ", { t: (k + "           ").slice(0, 12), c: "good" }, { t: commands[k].d, c: "dim" }]]);
      });
      print([[{ t: "Tip: Tab completes, ↑ ↓ browse history.", c: "dim" }]]);
    } },
    whoami: { d: "who am I", run: function () {
      print([[{ t: DATA.name, c: "acc" }], [DATA.role], [{ t: DATA.place, c: "dim" }], [""], [DATA.summary]]);
    } },
    about: { d: "a longer answer", run: function () {
      DATA.about.forEach(function (para) { print([para, ""]); });
    } },
    experience: { d: "work and education", run: function () {
      DATA.experience.forEach(function (e) {
        print([[{ t: e.when, c: "warn" }], [{ t: e.title, c: "acc" }, " · " + e.org]]);
        e.points.forEach(function (p) { print([[{ t: "  - ", c: "dim" }, p]]); });
        gap();
      });
    } },
    skills: { d: "what I know, by how I used it", run: function () {
      print([[{ t: "work", c: "good" }, " = day job   ", { t: "built", c: "blue" }, " = projects   ", { t: "learning", c: "warn" }, " = in progress"], [""]]);
      var groups = {};
      DATA.skills.forEach(function (s) { (groups[s.g] = groups[s.g] || []).push(s); });
      Object.keys(groups).forEach(function (g) {
        var segs = [{ t: g + ": ", c: "acc" }];
        groups[g].forEach(function (s, i) { if (i) segs.push(", "); segs.push({ t: s.n, c: LV[s.l] }); });
        print([segs]);
      });
    } },
    projects: { d: "what I've built", run: function () {
      DATA.projects.forEach(function (p) {
        print([[{ t: p.id.padEnd(11), c: "good" }, p.title, { t: "  " + p.tagline, c: "dim" }]]);
      });
      gap();
      print([[{ t: "Try: project kubernetes   (or: open kubernetes)", c: "dim" }]]);
    } },
    project: { d: "project <name>: details", run: function (args) {
      var p = findProject(args[0]);
      if (!p) { print([[{ t: "usage: project <" + DATA.projects.map(function (x) { return x.id; }).join("|") + ">", c: "warn" }]]); return; }
      print([[{ t: p.title, c: "acc" }], [p.summary], [""]]);
      p.metrics.forEach(function (m) { print([[{ t: "  " + m[0].padEnd(9), c: "good" }, { t: m[1], c: "dim" }]]); });
      gap();
      print([[{ t: "stack: ", c: "dim" }, p.skills.join(", ")], [{ t: "repo:  ", c: "dim" }, { t: p.repo, href: p.repo }]]);
    } },
    open: { d: "open <github|linkedin|email|project>", run: function (args) {
      var what = (args[0] || "").toLowerCase();
      var url = DATA.links[what];
      var p = findProject(what);
      if (p) url = p.repo;
      if (!url) { print([[{ t: "usage: open <github|linkedin|email|" + DATA.projects.map(function (x) { return x.id; }).join("|") + ">", c: "warn" }]]); return; }
      print([[{ t: "opening " + url, c: "dim" }]]);
      if (url.indexOf("mailto:") === 0) window.location.href = url; else window.open(url, "_blank", "noopener");
    } },
    contact: { d: "how to reach me", run: function () {
      print([[{ t: "email    ", c: "dim" }, { t: DATA.email, href: DATA.links.email }],
             [{ t: "linkedin ", c: "dim" }, { t: "nika-tolordava", href: DATA.links.linkedin }],
             [{ t: "github   ", c: "dim" }, { t: "Nitaru", href: DATA.links.github }], [""],
             [{ t: "Looking for: ", c: "dim" }, DATA.looking]]);
    } },
    theme: { d: "switch light / dark", run: function () {
      var now = window.toggleTheme ? window.toggleTheme() : "dark";
      print([[{ t: "theme: " + now, c: "dim" }]]);
    } },
    clear: { d: "clear the screen", run: function () { body.textContent = ""; } },
    sudo: { hidden: true, run: function () { print([[{ t: "nika is not in the sudoers file. This incident will be reported.", c: "warn" }]]); } },
    rm: { hidden: true, run: function () { print([[{ t: "rm: it is dangerous to operate recursively on '/'. Nice try.", c: "warn" }]]); } },
    exit: { hidden: true, run: function () {
      print([[{ t: "There is no exit, only #contact.", c: "dim" }]]);
      var c = document.getElementById("contact"); if (c) c.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    } },
    ls: { hidden: true, run: function () { print([["about  experience  skills  projects  contact"]]); } },
  };

  function findProject(q) {
    q = (q || "").toLowerCase();
    return DATA.projects.filter(function (p) { return p.id === q || p.title.toLowerCase().indexOf(q) === 0 && q.length > 1; })[0];
  }

  function run(line) {
    var raw = line.trim();
    addLine([{ t: "$ ", c: "acc" }, raw]);
    if (!raw) return;
    history.push(raw); hIndex = history.length;
    var words = raw.split(/\s+/), name = words[0].toLowerCase();
    if (commands[name]) commands[name].run(words.slice(1));
    else print([[{ t: "command not found: " + name, c: "warn" }, { t: "   (try help)", c: "dim" }]]);
    body.scrollTop = body.scrollHeight;
  }

  form.addEventListener("submit", function (e) { e.preventDefault(); var v = input.value; input.value = ""; run(v); });

  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp") { e.preventDefault(); if (hIndex > 0) input.value = history[--hIndex]; }
    else if (e.key === "ArrowDown") { e.preventDefault(); input.value = hIndex < history.length - 1 ? history[++hIndex] : (hIndex = history.length, ""); }
    else if (e.key === "l" && e.ctrlKey) { e.preventDefault(); commands.clear.run(); }
    else if (e.key === "Tab") {
      e.preventDefault();
      var v = input.value, parts = v.split(/\s+/);
      var pool = parts.length < 2 ? Object.keys(commands).filter(function (k) { return !commands[k].hidden; })
        : (parts[0] === "open" ? Object.keys(DATA.links).concat(DATA.projects.map(function (p) { return p.id; }))
          : parts[0] === "project" ? DATA.projects.map(function (p) { return p.id; }) : []);
      var last = parts[parts.length - 1].toLowerCase();
      var hit = pool.filter(function (k) { return k.indexOf(last) === 0; });
      if (hit.length === 1) { parts[parts.length - 1] = hit[0]; input.value = parts.join(" ") + " "; }
    }
  });

  term.addEventListener("click", function (e) {
    if (!window.getSelection || String(window.getSelection()) === "") input.focus({ preventScroll: true });
  });

  ["whoami", "projects", "skills", "experience", "contact", "help"].forEach(function (c) {
    var b = document.createElement("button");
    b.type = "button"; b.textContent = c;
    b.addEventListener("click", function () { run(c); input.focus({ preventScroll: true }); });
    chips.appendChild(b);
  });

  // Greeting: type "whoami" then show the answer. No typing animation for reduced motion.
  function intro() {
    var cmd = "whoami", i = 0;
    if (reduced) { run(cmd); print([[{ t: "Type help, or tap a command below.", c: "dim" }]]); return; }
    var line = document.createElement("p"); line.className = "term-line";
    var pre = document.createElement("span"); pre.className = "c-acc"; pre.textContent = "$ ";
    var typed = document.createTextNode("");
    line.appendChild(pre); line.appendChild(typed); body.appendChild(line);
    (function tick() {
      if (i < cmd.length) { typed.nodeValue += cmd[i++]; setTimeout(tick, 90); return; }
      body.removeChild(line);
      run(cmd);
      print([[""], [{ t: "Type help, or tap a command below.", c: "dim" }]]);
    })();
  }
  setTimeout(intro, 350);
})();
