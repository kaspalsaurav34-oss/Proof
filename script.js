const categories = ["All", "Creative", "Technology", "Business", "Community"];

const missions = [
  {
    id: 1,
    title: "Community Media Storytelling Sprint",
    category: "Creative",
    difficulty: "Intermediate",
    time: "4-6 hrs",
    skills: ["Storytelling", "Video", "Campaigning"],
    description:
      "Create a short, story-led media piece highlighting a local issue and a practical solution.",
    instructions: [
      "Identify a real community challenge or opportunity.",
      "Share a clear narrative arc with at least three scenes or beats.",
      "Use footage, stills, or a spoken voiceover to explain the impact.",
      "Format your final submission as a short video or storyboard deck."
    ],
    impact: "Creative storytelling with public value"
  },
  {
    id: 2,
    title: "Prototype a Civic Tech Dashboard",
    category: "Technology",
    difficulty: "Advanced",
    time: "6-8 hrs",
    skills: ["UX", "Wireframes", "Data", "Product thinking"],
    description:
      "Design a simple dashboard concept that helps a community understand local service access or resource use.",
    instructions: [
      "Choose a public service or civic challenge.",
      "Sketch the key dashboard sections and data points.",
      "Explain how the interface helps users make decisions faster.",
      "Submit a mockup or clickable prototype, not just a text response."
    ],
    impact: "Prototype for public-facing digital tools"
  },
  {
    id: 3,
    title: "Launch a Mini Social Enterprise Plan",
    category: "Business",
    difficulty: "Intermediate",
    time: "5 hrs",
    skills: ["Strategy", "Research", "Pitching"],
    description:
      "Develop a small business concept that solves a clear problem for a youth audience or local community.",
    instructions: [
      "Define a niche audience and the problem they face.",
      "Outline the product or service, pricing, and distribution model.",
      "Explain the first three steps to validate demand.",
      "Present the idea in a one-page business concept or pitch deck."
    ],
    impact: "Business thinking grounded in customer value"
  },
  {
    id: 4,
    title: "Design a Local Volunteer Network",
    category: "Community",
    difficulty: "Beginner",
    time: "3-5 hrs",
    skills: ["Planning", "Research", "Communication"],
    description:
      "Map a volunteer opportunity in your school, neighborhood, or online network and propose a structure that helps people help each other.",
    instructions: [
      "Identify the issue or community need.",
      "Define one or two pathways for people to contribute.",
      "Describe how the network would recruit, onboard, and coordinate support.",
      "Provide a simple service plan or flyer."
    ],
    impact: "Actionable community organizing"
  },
  {
    id: 5,
    title: "Build a Portfolio Case Study",
    category: "Creative",
    difficulty: "Beginner",
    time: "3 hrs",
    skills: ["Writing", "Design", "Reflection"],
    description:
      "Turn an existing project or class assignment into a concise professional case study with process and outcome.",
    instructions: [
      "Choose one project you created or contributed to.",
      "Summarize the goal, constraints, process, and result.",
      "Explain what you learned and what you would do next.",
      "Present the story as a polished one-page portfolio case study."
    ],
    impact: "Career-facing storytelling and reflection"
  },
  {
    id: 6,
    title: "Create a Basic AI Workflow Demo",
    category: "Technology",
    difficulty: "Advanced",
    time: "5-7 hrs",
    skills: ["Prompting", "Automation", "Problem solving"],
    description:
      "Design a small, useful workflow that uses AI to help with a real task such as summarising, generating ideas, or triaging information.",
    instructions: [
      "Choose a practical everyday task with a clear pain point.",
      "Document the workflow step by step.",
      "Show the prompts, process, and output quality.",
      "Explain the limitations and what human review still matters."
    ],
    impact: "Applied AI thinking with human oversight"
  }
];

const joinedMissionIds = [1, 2, 4];

const submissions = [
  {
    id: 1,
    missionId: 1,
    title: "Community storytelling concept board",
    status: "Under Review",
    date: "Nov 10",
    evidence: "Storyboard + short pitch deck",
    description: "Made a concept board for a youth-led media campaign around cleaner public spaces."
  },
  {
    id: 2,
    missionId: 2,
    title: "Civic dashboard UX flow",
    status: "Submitted",
    date: "Nov 08",
    evidence: "Figma board",
    description: "Designed a dashboard concept for local service access and transparent updates."
  },
  {
    id: 3,
    missionId: 4,
    title: "Volunteer network plan",
    status: "Needs Improvement",
    date: "Nov 05",
    evidence: "Service map + roadmap",
    description: "Mapped a volunteer organizing system for a neighborhood support network."
  }
];

const portfolioItems = [
  {
    title: "Youth media campaign concept",
    category: "Creative",
    skills: ["Storytelling", "Branding"],
    detail: "Built a campaign story for improving community spaces and engagement.",
    badge: "Verified demo"
  },
  {
    title: "Civic service dashboard",
    category: "Technology",
    skills: ["UX", "Product design"],
    detail: "Created dashboard mockups for transparent local service discovery.",
    badge: "Case study"
  },
  {
    title: "Volunteer network plan",
    category: "Community",
    skills: ["Research", "Planning"],
    detail: "Designed a simple framework for neighborhood support coordination.",
    badge: "Prototype"
  }
];

const state = {
  selectedCategory: "All",
  searchTerm: "",
  publicPortfolio: true,
  portfolioLink: "https://proof-demo.example/portfolio/harper-rivera"
};

const missionGrid = document.getElementById("missionGrid");
const missionSearch = document.getElementById("missionSearch");
const missionSelect = document.getElementById("missionSelect");
const categoryFilters = document.getElementById("categoryFilters");
const joinedMissionList = document.getElementById("joinedMissionList");
const submissionList = document.getElementById("submissionList");
const formMessage = document.getElementById("formMessage");
const portfolioGrid = document.getElementById("portfolioGrid");
const portfolioLink = document.getElementById("portfolioLink");
const privacyToggle = document.getElementById("privacyToggle");
const missionModal = document.getElementById("missionModal");
const modalContent = document.getElementById("modalContent");
const toast = document.getElementById("toast");

function renderCategoryFilters() {
  categoryFilters.innerHTML = categories
    .map(
      (category) => `
        <button
          class="category-chip ${state.selectedCategory === category ? "active" : ""}"
          type="button"
          data-category="${category}"
        >
          ${category}
        </button>
      `
    )
    .join("");

  document.querySelectorAll(".category-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      state.selectedCategory = chip.dataset.category;
      renderCategoryFilters();
      renderMissionCards();
    });
  });
}

function showLoadingSkeleton(count = 3) {
  missionGrid.innerHTML = Array.from({ length: count }, () => `
    <div class="mission-card">
      <div class="loading-box">
        <div class="loading-line" style="width: 40%;"></div>
        <div class="loading-line" style="width: 70%; height: 22px;"></div>
        <div class="loading-line" style="width: 100%;"></div>
        <div class="loading-line" style="width: 80%;"></div>
        <div class="loading-line" style="width: 90%;"></div>
      </div>
    </div>
  `).join("");
}

function getFilteredMissions() {
  return missions.filter((mission) => {
    const categoryMatch =
      state.selectedCategory === "All" || mission.category === state.selectedCategory;
    const searchMatch =
      !state.searchTerm ||
      [mission.title, mission.category, mission.description, mission.skills.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(state.searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });
}

function renderMissionCards() {
  const filtered = getFilteredMissions();

  if (!filtered.length) {
    missionGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        No missions match your search. Try another category or keyword.
      </div>
    `;
    return;
  }

  missionGrid.innerHTML = filtered
    .map(
      (mission) => `
        <article class="mission-card" aria-label="${mission.title}">
          <div class="card-top">
            <span class="pill">${mission.category}</span>
            <span class="rating-tag">${mission.difficulty}</span>
          </div>

          <div class="mission-meta">
            <span>${mission.time}</span>
            <span>•</span>
            <span>Skills: ${mission.skills.slice(0, 2).join(", ")}</span>
          </div>

          <h3>${mission.title}</h3>
          <p>${mission.description}</p>

          <ul class="skill-list">
            ${mission.skills.map((skill) => `<li>${skill}</li>`).join("")}
          </ul>

          <div class="card-actions">
            <span class="deadline-tag">${mission.impact}</span>
            <button class="small-button" data-open-mission="${mission.id}" type="button">View brief</button>
          </div>
        </article>
      `
    )
    .join("");

  missionGrid.querySelectorAll("[data-open-mission]").forEach((button) => {
    button.addEventListener("click", () => {
      openMissionModal(Number(button.dataset.openMission));
    });
  });
}

function openMissionModal(id) {
  const mission = missions.find((item) => item.id === id);
  if (!mission) return;

  modalContent.innerHTML = `
    <div class="modal-content">
      <span class="eyebrow">${mission.category}</span>
      <h3 id="modalTitle">${mission.title}</h3>
      <div class="modal-meta">
        <span>${mission.difficulty}</span>
        <span>•</span>
        <span>${mission.time}</span>
      </div>
      <p class="modal-copy">${mission.description}</p>
      <ul class="modal-list">
        ${mission.instructions.map((step) => `<li>${step}</li>`).join("")}
      </ul>
    </div>
  `;

  missionModal.classList.add("open");
  missionModal.setAttribute("aria-hidden", "false");
}

function closeMissionModal() {
  missionModal.classList.remove("open");
  missionModal.setAttribute("aria-hidden", "true");
}

function renderMissionSelect() {
  missionSelect.innerHTML = `
    <option value="">Select a mission</option>
    ${missions
      .map((mission) => `<option value="${mission.id}">${mission.title}</option>`)
      .join("")}
  `;
}

function showMessage(text, type = "success") {
  formMessage.textContent = text;
  formMessage.classList.remove("success", "error");
  formMessage.classList.add(type);
}

function setupForm() {
  const submissionForm = document.getElementById("submissionForm");

  submissionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const missionId = Number(missionSelect.value);
    const title = document.getElementById("submissionTitle").value.trim();
    const description = document.getElementById("submissionDescription").value.trim();
    const link = document.getElementById("submissionLink").value.trim();
    const status = document.getElementById("submissionStatus").value;
    const upload = document.getElementById("evidenceUpload").files[0];

    if (!missionId || !title || !description) {
      showMessage("Please select a mission, add a project title, and describe your work.", "error");
      return;
    }

    const newSubmission = {
      id: Date.now(),
      missionId,
      title,
      status,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      evidence: upload ? upload.name : link || "No file uploaded",
      description
    };

    submissions.unshift(newSubmission);
    submissionForm.reset();
    renderDashboard();
    showMessage(
      status === "Verified"
        ? "Demo status saved. This prototype never auto-verifies work without human review."
        : "Submission saved successfully. Your work is now in the PROOF review flow.",
      "success"
    );
  });
}

function renderDashboard() {
  const joinedMissions = missions.filter((mission) => joinedMissionIds.includes(mission.id));

  joinedMissionList.innerHTML = joinedMissions
    .map(
      (mission) => `
        <li>
          <span class="mission-name">${mission.title}</span>
          <span class="pill">${mission.category}</span>
        </li>
      `
    )
    .join("");

  submissionList.innerHTML = submissions
    .map(
      (submission) => {
        const statusClass = submission.status.toLowerCase().replace(/\s+/g, "-");
        const statusLabel = submission.status === "Needs Improvement" ? "Needs Improvement" : submission.status;

        return `
          <article class="submission-item">
            <div class="submission-item-top">
              <span class="submission-title">${submission.title}</span>
              <span class="status-badge ${statusClass}">${statusLabel}</span>
            </div>
            <div class="submission-meta">
              <span>${submission.date}</span>
              <span>•</span>
              <span>${submission.evidence}</span>
            </div>
            <p>${submission.description}</p>
            <div class="action-row">
              <button class="small-button advance-status" data-submission-id="${submission.id}" type="button">Update status</button>
            </div>
          </article>
        `;
      }
    )
    .join("");

  document.querySelectorAll(".advance-status").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.submissionId);
      const target = submissions.find((item) => item.id === id);
      if (!target) return;

      const flow = ["Draft", "Submitted", "Under Review", "Needs Improvement", "Submitted"];
      const currentIndex = flow.indexOf(target.status);
      target.status = flow[(currentIndex + 1) % flow.length];
      renderDashboard();
      showToast("Submission status updated in the demo workflow.");
    });
  });

  document.getElementById("joinedMissionCount").textContent = joinedMissions.length;
  document.getElementById("submittedWorkCount").textContent = submissions.length;
  document.getElementById("reviewCount").textContent = submissions.filter((item) => item.status === "Under Review").length;
  document.getElementById("verifiedCount").textContent = submissions.filter((item) => item.status === "Verified").length;
}

function renderPortfolio() {
  portfolioLink.textContent = state.portfolioLink;
  privacyToggle.checked = state.publicPortfolio;

  if (!state.publicPortfolio) {
    portfolioGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        Your portfolio is private. Turn on public sharing to display it.
      </div>
    `;
    return;
  }

  portfolioGrid.innerHTML = portfolioItems
    .map(
      (item) => `
        <article class="portfolio-card">
          <div class="portfolio-visual"><span>${item.title.charAt(0)}</span></div>
          <div class="portfolio-card-body">
            <h3>${item.title}</h3>
            <p>${item.detail}</p>
            <div class="portfolio-details">
              <span>${item.badge}</span>
              ${item.skills.map((skill) => `<span>${skill}</span>`).join("")}
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function copyPortfolioLink() {
  navigator.clipboard
    .writeText(state.portfolioLink)
    .then(() => showToast("Public portfolio link copied."))
    .catch(() => showToast("Copy failed. Please copy manually from the link below."));
}

function bindPortfolioControls() {
  privacyToggle.addEventListener("change", () => {
    state.publicPortfolio = privacyToggle.checked;
    renderPortfolio();
    showToast(state.publicPortfolio ? "Portfolio set to public." : "Portfolio set to private.");
  });

  document.getElementById("copyPortfolioLink").addEventListener("click", copyPortfolioLink);
}

function initSearch() {
  missionSearch.addEventListener("input", (event) => {
    state.searchTerm = event.target.value;
    renderMissionCards();
  });
}

function setupModalEvents() {
  document.querySelectorAll("[data-close='modal']").forEach((element) => {
    element.addEventListener("click", closeMissionModal);
  });

  missionModal.addEventListener("click", (event) => {
    if (event.target === missionModal || event.target.matches("[data-close='modal']")) {
      closeMissionModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && missionModal.classList.contains("open")) {
      closeMissionModal();
    }
  });
}

function initSubmissionOptions() {
  renderMissionSelect();
  renderCategoryFilters();
  renderMissionCards();
  renderDashboard();
  renderPortfolio();
}

function init() {
  initSubmissionOptions();
  initSearch();
  setupForm();
  bindPortfolioControls();
  setupModalEvents();
  showMessage("Demo data is active. No real user or verification data is being used.", "success");
}

init();
