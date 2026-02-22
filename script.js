const PRIVATE_NOTE = "Code and report are private due to course policy. High-level details available on request.";

const projects = [
  {
    title: "FinWiz",
    subtitle: "Backend + deployment (academic team project, team of 4)",
    description:
      "Academic project completed at the University of Pennsylvania. I focused on backend delivery and operational reliability, including secure handling of user inputs.",
    highlights: [
      "Developed backend and deployment components",
      "Implemented input validation and supported HTTPS/SSL usage",
      "Worked with relational and NoSQL data stores in the stack",
      "Set up CI/CD to support dependable rollout"
    ],
    tech: ["Backend", "AWS", "Databases", "CI/CD", "Security"],
    note: PRIVATE_NOTE,
    links: { repo: "", report: "" }
  },
  {
    title: "Distributed Search Engine",
    subtitle: "Crawler + AWS integration (academic team project, team of 4)",
    description:
      "Academic project completed at the University of Pennsylvania. I focused on the crawler and AWS integration, with emphasis on reliability, testing, and observability.",
    highlights: [
      "Developed the crawler component and integrated it with AWS services",
      "Wrote integration tests to validate end-to-end behavior",
      "Participated in code reviews and improved maintainability",
      "Improved robustness and observability through defensive handling and logging"
    ],
    tech: ["Distributed systems", "AWS", "Testing", "Logging", "Code review"],
    note: PRIVATE_NOTE,
    links: { repo: "", report: "" }
  },
  {
    title: "PennOS",
    subtitle: "Educational OS in C (academic project)",
    description:
      "Academic project completed at the University of Pennsylvania. Implemented core OS functionality around processes, scheduling, and file operations.",
    highlights: [
      "Implemented process management system calls (spawn, wait, exit, kill)",
      "Added scheduling controls (priorities, tick-based sleep)",
      "Implemented file operations (open, read, write, lseek, chmod, unlink)",
      "Integrated filesystem concepts including permissions and error handling"
    ],
    tech: ["C", "Operating systems", "Scheduling", "File systems"],
    note: PRIVATE_NOTE,
    links: { repo: "", report: "" }
  },
  {
    title: "RISC-V CPU and Cache",
    subtitle: "SystemVerilog (academic project, team of 2)",
    description:
      "Academic project completed at the University of Pennsylvania. Built RV32I datapath designs and integrated cache behavior for instruction and data access.",
    highlights: [
      "Designed datapath stages and pipeline concepts",
      "Integrated cache behavior via a standard bus style interface",
      "Validated functionality using automated testbenches",
      "Documented design trade-offs and verification results"
    ],
    tech: ["SystemVerilog", "RISC-V", "Pipelining", "Verification"],
    note: PRIVATE_NOTE,
    links: { repo: "", report: "" }
  },
  {
    title: "Parallel Algorithmic Patterns in Java (Dissertation)",
    subtitle: "Algorithmic skeletons + benchmarking with JMH",
    description:
      "Dissertation project focused on reusable algorithmic skeletons and evidence-based performance evaluation of sequential versus parallel implementations.",
    highlights: [
      "Built reusable algorithmic skeletons to structure parallel patterns",
      "Benchmarked implementations using JMH to evaluate performance and scalability",
      "Validated correctness using unit tests",
      "Compared concurrency approaches (fork-join, executors, virtual threads)"
    ],
    tech: ["Java", "JMH", "Concurrency", "Unit testing", "Performance"],
    links: { repo: "", report: "" }
  },
  {
    title: "Hackathons (PennApps and others)",
    subtitle: "Authentication and rapid prototyping",
    description:
      "Hackathon projects where I implemented authentication and applied security thinking under tight delivery constraints.",
    highlights: [
      "Implemented authentication in hackathon prototypes",
      "Applied threat modelling concepts from coursework to design decisions",
      "Delivered working features quickly in a team setting"
    ],
    tech: ["Authentication", "Security", "Teamwork", "Rapid delivery"],
    links: { repo: "https://github.com/jacket1989", report: "" }
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

  projects.forEach((p) => {
    const card = createEl("article", "card");

    const title = createEl("h3", null, p.title);
    card.appendChild(title);

    if (p.subtitle) {
      const sub = createEl("p", "subtitle", p.subtitle);
      card.appendChild(sub);
    }

    const desc = createEl("p", "desc", p.description);
    card.appendChild(desc);

    const ul = document.createElement("ul");
    p.highlights.forEach((h) => {
      const li = document.createElement("li");
      li.textContent = h;
      ul.appendChild(li);
    });
    card.appendChild(ul);

    const tags = createEl("div", "tags");
    p.tech.forEach((t) => {
      tags.appendChild(createEl("span", "tag", t));
    });
    card.appendChild(tags);

    if (p.note) {
      const note = createEl("p", "note", p.note);
      card.appendChild(note);
    }

    const actions = createEl("div", "actions");

    if (p.links?.repo) {
      const repoBtn = createEl("a", "btn", "Repo");
      repoBtn.href = p.links.repo;
      repoBtn.target = "_blank";
      repoBtn.rel = "noreferrer";
      actions.appendChild(repoBtn);
    }

    if (p.links?.report) {
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