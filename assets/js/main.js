(function () {
  var D = window.DATA;
  var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (id) { return document.getElementById(id); };

  // Small DOM helper: el("div", {class: "x"}, child, "text", ...). Text is always set as text.
  function el(tag, attrs) {
    var n = document.createElement(tag);
    for (var k in (attrs || {})) {
      if (k === "class") n.className = attrs[k]; else n.setAttribute(k, attrs[k]);
    }
    for (var i = 2; i < arguments.length; i++) {
      var c = arguments[i];
      if (c == null) continue;
      n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return n;
  }

  /* ---------- theme ---------- */
  window.toggleTheme = function () {
    var root = document.documentElement;
    var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next === "light" ? "#f6f8fa" : "#0d1117");
    return next;
  };
  $("theme-toggle").addEventListener("click", window.toggleTheme);

  /* ---------- hero ---------- */
  $("hero-lead").textContent = D.summary;
  [["Now", "Support Engineer (L2), Virtuozzo"], ["Studying", "Computer Science, graduating 2027"], ["Building", "Linux · Kubernetes · AWS"]]
    .forEach(function (f) { $("hero-facts").appendChild(el("div", {}, el("dt", {}, f[0]), el("dd", {}, f[1]))); });

  /* ---------- about ---------- */
  D.about.forEach(function (t) { $("about-text").appendChild(el("p", {}, t)); });
  D.principles.forEach(function (p) { $("principles").appendChild(el("li", {}, el("b", {}, p[0]), el("span", {}, p[1]))); });

  /* ---------- experience ---------- */
  D.experience.forEach(function (e) {
    var ul = el("ul");
    e.points.forEach(function (p) { ul.appendChild(el("li", {}, p)); });
    $("timeline").appendChild(el("li", {}, el("span", { class: "when" }, e.when), el("h3", {}, e.title), el("p", { class: "org" }, e.org), ul));
  });

  /* ---------- start here ---------- */
  $("start-intro").textContent = D.startHere.intro;
  D.startHere.steps.forEach(function (st, i) {
    var links = el("div", { class: "start-links" });
    st.read.forEach(function (r) { links.appendChild(el("a", { href: r[1], target: "_blank", rel: "noopener noreferrer" }, r[0] + " ↗")); });
    var li = el("li", { class: "start-step" },
      el("span", { class: "start-num", "aria-hidden": "true" }, String(i + 1)),
      el("div", {}, el("p", { class: "start-why" }, st.why), el("h3", {}, st.title), el("p", {}, st.story), links));
    li.style.setProperty("--brand", st.brand);
    $("start-steps").appendChild(li);
  });

  /* ---------- skills + project filter ---------- */
  var active = null;
  var chipEls = [];

  function renderSkills() {
    var groups = {};
    D.skills.forEach(function (s) { (groups[s.g] = groups[s.g] || []).push(s); });
    Object.keys(groups).forEach(function (g) {
      var wrap = el("div", { class: "chips" });
      groups[g].forEach(function (s) {
        var b = el("button", { class: "chip " + s.l, type: "button", "aria-pressed": "false" }, s.n);
        b.addEventListener("click", function () { setFilter(active === s ? null : s, true); });
        b._skill = s; chipEls.push(b); wrap.appendChild(b);
      });
      $("skill-groups").appendChild(el("div", { class: "skill-group" }, el("h3", {}, g), wrap));
    });
  }

  var cards = {};
  function setFilter(skill, scroll) {
    active = skill;
    chipEls.forEach(function (c) { c.setAttribute("aria-pressed", String(c._skill === skill)); });
    var shown = 0;
    D.projects.forEach(function (p) {
      var on = !skill || p.skills.indexOf(skill.n) !== -1;
      cards[p.id].root.classList.toggle("hidden", !on);
      cards[p.id].tags.forEach(function (t) { t.el.classList.toggle("on", !!skill && t.name === skill.n); });
      if (on) shown++;
    });
    $("filter-bar").hidden = !skill;
    if (skill) $("filter-name").textContent = skill.n;
    var empty = $("no-projects");
    empty.hidden = !(skill && shown === 0);
    if (skill && shown === 0) {
      empty.textContent = skill.l === "work" ? "I use this one in my day job, not in a public project."
        : skill.l === "learning" ? "Still learning this one. A project for it is next."
        : "No project uses this yet.";
    }
    if (scroll) $("projects").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }
  $("filter-clear").addEventListener("click", function () { setFilter(null, false); });

  /* ---------- projects ---------- */
  function renderProjects() {
    D.projects.forEach(function (p) {
      var detail = el("div", { class: "p-detail", id: "detail-" + p.id, role: "region", "aria-label": p.title + " details" });
      var built = false;

      if (p.diagram) {
        detail.appendChild(el("h4", {}, "How it fits together"));
        var host = el("div"); detail.appendChild(host);
        p._host = host;
      }
      if (p.parts) {
        detail.appendChild(el("h4", {}, "What's inside"));
        var grid = el("div", { class: "parts" });
        p.parts.forEach(function (x) { grid.appendChild(el("div", {}, el("b", {}, x[0]), el("span", {}, x[1]))); });
        detail.appendChild(grid);
      }
      if (p.lesson) {
        detail.appendChild(el("h4", {}, "What went wrong, and what I learned"));
        detail.appendChild(el("p", { class: "lesson" }, p.lesson));
      }

      var chev = el("span", { class: "chev", "aria-hidden": "true" }, "▾");
      var toggle = el("button", { class: "p-toggle", type: "button", "aria-expanded": "false", "aria-controls": "detail-" + p.id }, el("span", {}, "How it works"), chev);
      toggle.addEventListener("click", function () {
        var open = toggle.getAttribute("aria-expanded") !== "true";
        toggle.setAttribute("aria-expanded", String(open));
        detail.classList.toggle("open", open);
        if (open && !built && p.diagram) { window.renderDiagram(p.diagram, p._host); built = true; }
      });

      var metrics = el("div", { class: "metrics" });
      p.metrics.forEach(function (m) { metrics.appendChild(el("div", { class: "metric" }, el("b", {}, m[0]), el("span", {}, m[1]))); });

      var tags = [], tagWrap = el("div", { class: "p-skills" });
      p.skills.forEach(function (s) { var t = el("span", { class: "tag" }, s); tags.push({ name: s, el: t }); tagWrap.appendChild(t); });

      var repo = el("a", { class: "p-repo", href: p.repo, target: "_blank", rel: "noopener noreferrer" }, "View on GitHub ↗");
      var root = el("article", { class: "project" },
        el("div", { class: "p-head" }, el("h3", {}, p.title), repo),
        el("p", { class: "p-tag" }, p.tagline),
        el("p", { class: "p-sum" }, p.summary),
        metrics, tagWrap, toggle, detail);
      if (p.brand) root.style.setProperty("--brand", p.brand);
      cards[p.id] = { root: root, tags: tags };
      $("project-list").appendChild(root);
    });
  }

  /* ---------- contact ---------- */
  var ICONS = {
    mail: '<path d="M3 6h18v12H3zM3 7l9 7 9-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    gh: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    in: '<circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  };
  function icon(k) {
    var s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("width", "18"); s.setAttribute("height", "18"); s.setAttribute("aria-hidden", "true");
    s.innerHTML = ICONS[k];   // static strings defined above, no user input
    return s;
  }
  $("looking").textContent = "I'm looking for " + D.looking.charAt(0).toLowerCase() + D.looking.slice(1);
  [["mail", D.email, D.links.email, true], ["gh", "GitHub", D.links.github], ["in", "LinkedIn", D.links.linkedin]].forEach(function (c) {
    var a = el("a", { class: "btn" + (c[3] ? " primary" : ""), href: c[2] }, icon(c[0]), c[1]);
    if (c[2].indexOf("http") === 0) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    $("contact-links").appendChild(a);
  });
  $("year").textContent = new Date().getFullYear();

  renderSkills();
  renderProjects();

  /* ---------- spotlight on cards, scroll progress ---------- */
  if (!reduced) {
    document.addEventListener("pointermove", function (e) {
      var t = e.target.closest && e.target.closest(".project, .skill-group, .principles li, .btn");
      if (!t) return;
      var r = t.getBoundingClientRect();
      t.style.setProperty("--mx", (e.clientX - r.left) + "px");
      t.style.setProperty("--my", (e.clientY - r.top) + "px");
    }, { passive: true });
  }
  var bar = $("progress");
  function onScroll() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, window.scrollY / h) : 0) + ")";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- scroll: reveal + active nav ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    sections.forEach(function (s) { io.observe(s); });
  } else {
    sections.forEach(function (s) { s.classList.add("in"); });
  }

  var links = Array.prototype.slice.call(document.querySelectorAll("#nav-links a"));
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }
})();
