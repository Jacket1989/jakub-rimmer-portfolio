const PRIVATE_NOTE = "Code and report are private due to course policy. High-level details available on request.";

const projects = [
  {
    title: "Peer-to-Peer Search Engine",
    subtitle: "Distributed crawling + indexing on AWS (team of 4)",
    description:
      "Designed and deployed a scalable web search engine supporting crawling, indexing, and ranking end to end.",
    highlights: [
      "Deployed on AWS (EC2, S3) in Java using a Flame RDD framework",
      "Implemented indexing and ranking with TF-IDF and PageRank",
      "Improved throughput with error logging and an in-memory URL cache, reaching 2 to 3 docs per second on 200,000+ pages"
    ],
    tech: ["Java", "AWS", "Distributed systems", "Performance"],
    note: PRIVATE_NOTE,
    links: { repo: "", report: "" }
  },
  {
    title: "FinWiz",
    subtitle: "Backend + deployment (team of 4)",
    description:
      "Full stack financial analytics app delivering dashboards and a portfolio simulator.",
    highlights: [
      "Implemented backend and deployment workflow",
      "Used PostgreSQL for core data with MongoDB caching",
      "Shipped on AWS with CI/CD (GitHub Actions), SSL, and technical documentation"
    ],
    tech: ["Node.js", "PostgreSQL", "MongoDB", "AWS", "CI/CD"],
    note: PRIVATE_NOTE,
    links: { repo: "", report: "" }
  },
  {
    title: "PennOS (UNIX-like OS Simulator)",
    subtitle: "Operating systems project in C",
    description:
      "Educational OS project focused on core systems concepts and UNIX-style behavior.",
    highlights: [
      "Engineered a UNIX-style OS in C with a shell, file system support, and process and job control, including signals and I/O redirection"
    ],
    tech: ["C", "Operating systems", "File systems"],
    note: PRIVATE_NOTE,
    links: { repo: "", report: "" }
  },
  {
    title: "Parallel Algorithmic Patterns in Java (Dissertation)",
    subtitle: "Reusable skeletons + benchmarking",
    description:
      "Dissertation focused on reusable algorithmic skeletons and evidence-based performance evaluation of sequential versus parallel implementations.",
    highlights: [
      "Implemented reusable parallel skeletons for reductions, divide-and-conquer, and branch-and-bound",
      "Benchmarked scalability and performance against sequential baselines"
    ],
    tech: ["Java", "Concurrency", "Benchmarking"],
    links: { repo: "", report: "" }
  }
];

function createEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  projects.forEach((p) => {
    const card = createEl("article", "card");

    card.appendChild(createEl("h3", null, p.title));

    if (p.subtitle) card.appendChild(createEl("p", "subtitle", p.subtitle));
    if (p.description) card.appendChild(createEl("p", "desc", p.description));

    const ul = document.createElement("ul");
    (p.highlights || []).forEach((h) => {
      const li = document.createElement("li");
      li.textContent = h;
      ul.appendChild(li);
    });
    card.appendChild(ul);

    const tags = createEl("div", "tags");
    (p.tech || []).forEach((t) => tags.appendChild(createEl("span", "tag", t)));
    card.appendChild(tags);

    if (p.note) card.appendChild(createEl("p", "note", p.note));

    const actions = createEl("div", "actions");

    if (p.links && p.links.repo) {
      const repoBtn = createEl("a", "btn", "Repo");
      repoBtn.href = p.links.repo;
      repoBtn.target = "_blank";
      repoBtn.rel = "noreferrer";
      actions.appendChild(repoBtn);
    }

    if (p.links && p.links.report) {
      const reportBtn = createEl("a", "btn btn-ghost", "Report");
      reportBtn.href = p.links.report;
      reportBtn.target = "_blank";
      reportBtn.rel = "noreferrer";
      actions.appendChild(reportBtn);
    }

    if (actions.children.length > 0) card.appendChild(actions);

    grid.appendChild(card);
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    setTheme(saved);
    return;
  }
  const prefersLight =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  setTheme(prefersLight ? "light" : "dark");
}

function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  });
}

function initYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initThemeToggle();
  initYear();
  renderProjects();
});