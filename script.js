/* Simple portfolio renderer + theme toggle */

const projects = [
  {
    title: "FinWiz",
    subtitle: "Backend + deployment (team project)",
    description:
      "A project where I focused on backend delivery and operational reliability, including secure handling of user-facing inputs.",
    highlights: [
      "Developed backend and deployment components",
      "Implemented input validation and supported HTTPS/SSL usage",
      "Worked with relational and NoSQL data stores in the stack",
      "Set up CI/CD to support dependable rollout"
    ],
    tech: ["Backend", "AWS", "Databases", "CI/CD", "Security"],
    links: {
      repo: "https://github.com/YOUR_GITHUB_USERNAME/finwiz",
      report: "assets/finwiz-report.pdf"
    }
  },
  {
    title: "Distributed Search Engine",
    subtitle: "Crawler + AWS integration (team project)",
    description:
      "I focused on the crawler and cloud integration, with an emphasis on reliability, testing, and engineering quality practices.",
    highlights: [
      "Developed the crawler component and integrated it with AWS services",
      "Wrote integration tests to validate end-to-end behavior",
      "Participated in code reviews and improved maintainability",
      "Improved robustness and observability through defensive handling and logging"
    ],
    tech: ["Java/Python", "AWS", "Distributed systems", "Testing", "Logging"],
    links: {
      repo: "https://github.com/YOUR_GITHUB_USERNAME/search-engine",
      report: "assets/search-engine-report.pdf"
    }
  },
  {
    title: "Parallel Algorithmic Patterns in Java (Dissertation)",
    subtitle: "Algorithmic skeletons + benchmarking with JMH",
    description:
      "Dissertation project focused on reusable algorithmic skeletons and evidence-based performance evaluation of sequential vs parallel implementations.",
    highlights: [
      "Built reusable algorithmic skeletons to structure parallel patterns",
      "Benchmarked implementations using JMH to evaluate performance and scalability",
      "Validated correctness using unit tests",
      "Compared concurrency approaches (for example fork-join, executors, virtual threads)"
    ],
    tech: ["Java", "JMH", "Concurrency", "Unit testing", "Performance"],
    links: {
      repo: "https://github.com/YOUR_GITHUB_USERNAME/parallel-patterns-java",
      report: ""
    }
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
    links: {
      repo: "https://github.com/YOUR_GITHUB_USERNAME",
      report: ""
    }
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
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
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