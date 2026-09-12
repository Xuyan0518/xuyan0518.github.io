/* Photo: add your image as assets/portrait.jpg, or change this path. */
const PROFILE_PHOTO = 'assets/portrait.jpg';
const EMAIL = 'zhouxuyan6@gmail.com';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const cards = [...document.querySelectorAll('[data-glow]')];

// Keep content visible when JavaScript or IntersectionObserver is unavailable.
if ('IntersectionObserver' in window) {
  if (!reduceMotion.matches) document.documentElement.classList.add('js-motion');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(item => revealObserver.observe(item));

  // Cards light up in the central part of the viewport, including on touch screens.
  const glowObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('in-view', entry.isIntersecting));
  }, { rootMargin: '-18% 0px -18% 0px', threshold: 0.06 });
  cards.forEach(card => glowObserver.observe(card));
}

cards.forEach(card => {
  let frame = 0;
  card.addEventListener('pointermove', event => {
    if (!finePointer.matches || reduceMotion.matches) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const box = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - box.left}px`);
      card.style.setProperty('--my', `${event.clientY - box.top}px`);
    });
  });
  card.addEventListener('pointerleave', () => {
    cancelAnimationFrame(frame);
    card.style.removeProperty('--mx');
    card.style.removeProperty('--my');
  });
});

const navLinks = document.getElementById('nav-links');
const menuButton = document.querySelector('.menu-toggle');
function closeMenu() {
  navLinks.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navLinks.classList.contains('is-open')) { closeMenu(); menuButton.focus(); }
});
document.addEventListener('click', event => { if (!event.target.closest('.nav')) closeMenu(); });

const progress = document.querySelector('.scroll-progress');
const sections = [...document.querySelectorAll('main section[id]')];
const sectionLinks = [...navLinks.querySelectorAll('a[href^="#"]')];
let scrollFrame = 0;
function updateScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0})`;
  let active = 'home';
  for (const section of sections) if (section.getBoundingClientRect().top <= window.innerHeight * 0.35) active = section.id;
  sectionLinks.forEach(link => {
    if (link.hash === `#${active}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollFrame = 0;
}
window.addEventListener('scroll', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); }, { passive: true });
window.addEventListener('resize', updateScroll);
updateScroll();
document.getElementById('year').textContent = String(new Date().getFullYear());

// The placeholder is the intentional default. Enable the photo after adding it:
// set PHOTO_ENABLED to true. Avoid a missing-file request until the image exists.
const PHOTO_ENABLED = false;
if (PHOTO_ENABLED) {
  const portrait = document.getElementById('portrait-image');
  portrait.addEventListener('load', () => {
    portrait.hidden = false;
    document.getElementById('portrait-placeholder').hidden = true;
  });
  portrait.src = PROFILE_PHOTO;
}

const projects = {
  'ai-exchange': {
    category: 'FULL-TIME ROLE · SINGTEL · GROUP LEVEL · STRATEGIC PLANNING',
    title: 'Singtel AI Exchange',
    lead: 'The central question was how teams could assess and reuse AI assets developed elsewhere in the Group.',
    content: '<h3>What I worked on</h3><ul><li>Helped define the information needed to assess an asset: ownership, permitted use, support, evidence of effectiveness, and installation requirements.</li><li>Developed an operating model that combined Group-level discovery and standards with local accountability.</li><li>Structured the proposed lifecycle from publication and assurance through adoption, observation, and improvement.</li><li>Helped shape the asset taxonomy and governance approach for agents, prompts, skills, tools, and starter kits.</li></ul><h3>Measurement</h3><p>Considered how adoption and reuse could be measured to assess the value of AI investments.</p>'
  },
  governance: {
    category: 'FULL-TIME ROLE · SINGTEL · GROUP LEVEL · ORGANISATIONAL ENABLEMENT',
    title: 'SRB / ARB Governance',
    lead: 'Solution Review Board and Architecture Review Board processes can be difficult to navigate without a clear explanation of their purpose and expectations.',
    content: '<h3>What I worked on</h3><ul><li>Developed the content strategy for a proposed internal brownbag session, covering early engagement, submissions, and review considerations.</li><li>Turned architecture-governance concepts into practical frameworks and visual explanations for colleagues with different technical backgrounds.</li><li>Worked with senior stakeholders and architecture leaders to check the content and refine what the audience needed to know.</li></ul><h3>The aim</h3><p>Help teams identify risks earlier and understand how review processes support delivery aligned with enterprise standards.</p>'
  },
  edunet: {
    category: 'EDUCATION TECHNOLOGY · TEAM PROJECT',
    title: 'edunet · 桐心成长',
    lead: 'Contributed to a learning-management project spanning a WeChat Mini Program and a web administration app.',
    content: '<h3>The reporting workflow</h3><p>Teachers record learning progress and assessments. These records feed weekly, semester, and yearly reports, with optional AI-assisted drafts that educators can review and edit before publishing to parents.</p><h3>Built for collaboration</h3><p>The application separates teacher and parent access and protects shared records against conflicting edits. Parents can read published reports without changing the underlying learning records.</p><h3>Technology</h3><p>React and TypeScript for the web app; a WeChat Mini Program for teachers and parents; Express, PostgreSQL, and Drizzle for the backend; DeepSeek for optional report drafting.</p>',
    links: [{ label: 'View on GitHub', url: 'https://github.com/Xuyan0518/edunet' }]
  },
  deepfake: {
    category: 'AI AWARENESS · TEAM PROTOTYPE',
    title: 'Deepfake Detective',
    lead: 'Contributed to a gamified prototype that makes deepfake awareness an interactive learning experience.',
    content: '<h3>The experience</h3><p>Users assess image, audio, and video examples, use hints, and receive feedback on their choices. Points and rewards encourage progression through the challenges.</p><h3>Prototype scope</h3><p>This is an awareness-training quiz. Points are stored in the browser, and the leaderboard uses demonstration entries.</p><h3>Technology</h3><p>Next.js, React, TypeScript, and Tailwind CSS.</p>',
    links: [{ label: 'View on GitHub', url: 'https://github.com/Xuyan0518/gamify-deepfake' }]
  },
  soulsound: {
    category: 'AI CHALLENGE · TEAM PROJECT · FRONTEND CONTRIBUTION',
    title: 'SoulSound',
    lead: 'I worked on the interface and preference-selection controls for a team project exploring personalised music discovery.',
    content: '<h3>From preferences to music</h3><p>Users describe their mood and preferences, then explore AI-generated music recommendations with Spotify integration.</p><h3>My contribution</h3><p>Developed frontend interface and selection-control changes to help users express their preferences and navigate the experience.</p><figure class="dialog-project-image"><img src="assets/projects/soulsound-input.png" alt="SoulSound preference form with mood input and a Get Music Recommendations button" loading="lazy"><figcaption>Preference interface from the original project.</figcaption></figure><h3>Technology</h3><p>React, JavaScript, Node.js, Express, the OpenAI API, and the Spotify API.</p>',
    links: [{ label: 'View on GitHub', url: 'https://github.com/Xuyan0518/ai_challenge_2024' }, { label: 'My frontend contribution', url: 'https://github.com/AlainS87/ai_challenge_2024/pull/8' }]
  },
  safety: {
    category: 'RESEARCH INTERNSHIP · NUS · MAR–JUN 2026',
    title: 'Construction Safety Recommendation System',
    lead: 'Built during my NUS research internship, the prototype explored how multimodal models and retrieval could support construction-safety recommendations.',
    content: '<h3>Implementation</h3><p>Combined Qwen VLM with ChromaDB vector retrieval and Neo4j knowledge-graph retrieval. The ingestion pipeline covered more than 1,000 Design for Safety case studies, registers, and regulatory documents.</p><h3>Evaluation</h3><p>Benchmarked Qwen-only, Qwen + BGE, and Qwen + BM25 configurations, with human validation workflows to review the recommendations.</p>'
  }
};
const dialog = document.getElementById('project-dialog');
let lastProjectButton;
document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    if (!project) return;
    lastProjectButton = button;
    document.getElementById('dialog-category').textContent = project.category;
    document.getElementById('dialog-title').textContent = project.title;
    document.getElementById('dialog-lead').textContent = project.lead;
    document.getElementById('dialog-content').innerHTML = project.content;
    const projectLinks = document.getElementById('dialog-links');
    projectLinks.replaceChildren();
    const links = project.links || [{ label: 'View résumé PDF', url: 'assets/Zhou_Xuyan.pdf' }];
    links.forEach(({ label, url }) => {
      const link = document.createElement('a');
      link.className = 'text-link';
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = `${label} ↗`;
      projectLinks.append(link);
    });
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.style.overflow = 'hidden';
  });
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
} });
dialog.addEventListener('close', () => { document.body.style.overflow = ''; lastProjectButton?.focus({ preventScroll: true }); });

let toastTimer;
document.getElementById('copy-email').addEventListener('click', async () => {
  const toast = document.getElementById('toast');
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(EMAIL);
    toast.textContent = 'Email copied.';
  } catch {
    toast.textContent = `Email: ${EMAIL}`;
  }
  clearTimeout(toastTimer);
  toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 4000);
});
