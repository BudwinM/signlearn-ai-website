/**
 * SignLearn AI — Academic Research Platform Client Script
 * Research Project Code: R26-IT-018
 * SLIIT Faculty of Computing — 4th Year Comprehensive Research Project
 *
 * Project Authors:
 *  - Tharaka W A K N       (IT22211200) — Subsystem 01: Attention Telemetry & Knowledge Graph Question Generation
 *  - Kothalawala L S S     (IT22185884) — Subsystem 02: Emotion-Aware Adaptive Chatbot (EARA) & Knowledge Growth
 *  - Mendis L B L          (IT22197764) — Subsystem 03: 3D/2D Sign Avatar Lecture Generator & ASL Fingerspelling Studio
 *  - Nawarathna I K K R B  (IT19131948) — Subsystem 04: Smart Haptic IoT Wristband & Interactive Sign Practice Arena
 *
 * Main Functional Modules:
 *  01. Theme Management (Light / Dark Mode persistence via localStorage)
 *  02. Reading Progress Indicator & Scrollspy Navigation
 *  03. Interactive Card Spotlight Cursor Tracking
 *  04. Subsystem Architecture & Dataflow Inspector
 *  05. Component Showcase & Screenshot Lightbox Viewer
 *  06. Research Contribution Specifications Modal
 *  07. Document Repository Search & Filter System
 *  08. Email Quick-Copy & Feedback Toast Notification System
 *  09. Research Inquiry Form Submission Handler
 *  10. Command Palette Keyboard Navigation (Ctrl+K / Cmd+K)
 *  11. Responsive Mobile Navigation Drawer
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 01. THEME MANAGEMENT (LIGHT / DARK MODE)
  // =========================================================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeText = document.getElementById('themeText');
  const htmlEl = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'light') {
      htmlEl.setAttribute('data-theme', 'light');
      if (themeText) themeText.textContent = 'Dark';
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
        themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
      }
    } else {
      htmlEl.removeAttribute('data-theme');
      if (themeText) themeText.textContent = 'Light';
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
        themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
      }
    }
    try {
      localStorage.setItem('signlearn-theme', theme);
    } catch (e) {}
  }

  // Initialize theme from storage
  const initialTheme = localStorage.getItem('signlearn-theme') || 'dark';
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isCurrentlyLight = htmlEl.getAttribute('data-theme') === 'light';
      const targetTheme = isCurrentlyLight ? 'dark' : 'light';
      applyTheme(targetTheme);
    });
  }

  // =========================================================================
  // 02. READING PROGRESS INDICATOR & HIGH-PERFORMANCE SCROLLSPY
  // =========================================================================
  const progressBar = document.getElementById('readingProgress');
  const floatingTopBtn = document.getElementById('floatingTopBtn');
  const navLinks = document.querySelectorAll('.nav-link');
  const trackedSections = document.querySelectorAll('section[id]');

  let cachedOffsets = [];
  function updateSectionOffsets() {
    cachedOffsets = Array.from(trackedSections).map(section => ({
      id: section.getAttribute('id'),
      top: section.offsetTop - 140,
      height: section.offsetHeight
    }));
  }
  updateSectionOffsets();
  window.addEventListener('resize', updateSectionOffsets, { passive: true });

  let isScrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!isScrollTicking) {
      window.requestAnimationFrame(() => {
        const totalScroll = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;

        if (progressBar) {
          progressBar.style.width = `${scrollPercent}%`;
        }

        if (floatingTopBtn) {
          if (totalScroll > 400) {
            floatingTopBtn.classList.add('visible');
          } else {
            floatingTopBtn.classList.remove('visible');
          }
        }

        // Cached Scrollspy (zero layout thrashing for 60-120fps)
        let currentId = '';
        for (let i = 0; i < cachedOffsets.length; i++) {
          const item = cachedOffsets[i];
          if (totalScroll >= item.top && totalScroll < item.top + item.height) {
            currentId = item.id;
            break;
          }
        }

        if (currentId) {
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }

        isScrollTicking = false;
      });
      isScrollTicking = true;
    }
  }, { passive: true });

  // =========================================================================
  // 03. INTERACTIVE CARD SPOTLIGHT CURSOR TRACKING (RAF THROTTLED)
  // =========================================================================
  const glassCards = document.querySelectorAll('.glass-card');
  glassCards.forEach(card => {
    let isMoving = false;
    card.addEventListener('pointermove', (e) => {
      if (!isMoving) {
        window.requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          card.style.setProperty('--mouse-x', `${x}%`);
          card.style.setProperty('--mouse-y', `${y}%`);
          isMoving = false;
        });
        isMoving = true;
      }
    }, { passive: true });
  });

  // =========================================================================
  // 04. SUBSYSTEM ARCHITECTURE & DATAFLOW INSPECTOR
  // =========================================================================
  const flowNodes = document.querySelectorAll('.flow-node');
  const flowData = {
    'node-telemetry': {
      id: 'SUBSYSTEM 01 · VISION PIPELINE',
      stack: 'STACK: MEDIAPIPE FACE MESH + OPENCV + SCIKIT-LEARN',
      title: 'Attention Monitoring & Facial Landmark Telemetry',
      desc: 'Processes real-time video frames to compute Eye Aspect Ratio (EAR), Mouth Aspect Ratio (MAR for yawn/fatigue), PERCLOS (Percentage of Eye Closure), and gaze coordinates. When student engagement dips during lesson explanation intervals, timestamped interval logs are transferred to the knowledge graph queue.',
      specs: [
        'Face Mesh: 468 Landmarks',
        'Latency: < 35ms / Frame',
        'Model: MediaPipe Iris & Face',
        'Threshold: Dynamic Calibration'
      ],
      code: `{\n  "subsystem": "attention_telemetry",\n  "ear_score": 0.324,\n  "mar_score": 0.118,\n  "perclos_percentage": 12.4,\n  "attention_state": "ENGAGED",\n  "disengagement_intervals": [\n    { "timestamp_sec": 420.5, "concept": "CPU_Pipelining", "duration": 8.2 }\n  ]\n}`
    },
    'node-kg': {
      id: 'SUBSYSTEM 02 · KNOWLEDGE GRAPH',
      stack: 'STACK: NETWORKX + FASTAPI + GQSA ENGINE',
      title: 'Curriculum Knowledge Graph & Spaced Question Synthesis',
      desc: 'Maintains an ontology of 15 core Sri Lankan G.C.E. O/L ICT concepts. Operates the General Question Selection Algorithm (GQSA) using a 60% missed intervals, 25% spaced repetition, and 15% mastery reinforcement ratio to target knowledge gaps without student burnout.',
      specs: [
        'Syllabus Nodes: 15 Concepts',
        'Graph Relations: Precedes, Extends, Depends',
        'Algorithm: GQSA 60/25/15',
        'Memory Curve: Ebbinghaus Interval'
      ],
      code: `{\n  "subsystem": "knowledge_graph",\n  "query_concept": "CPU_Pipelining",\n  "prerequisite_links": ["Clock_Cycle", "ALU_Operations"],\n  "gqsa_distribution": { "missed_topic": 0.60, "spaced_recall": 0.25, "mastery_test": 0.15 },\n  "selected_question_id": "Q_ARCH_042"\n}`
    },
    'node-chatbot': {
      id: 'SUBSYSTEM 03 · ADAPTIVE TUTOR',
      stack: 'STACK: FASTAPI + CONVERSATIONAL AI + MONGODB',
      title: 'Emotion-Aware Adaptive Chatbot (EARA)',
      desc: 'Tailors pedagogical tone, explanation verbosity, and micro-assessments based on affective feedback and telemetry states. Supplies interactive flashcards, short revision notes, mock examinations, and incorporates an offline fallback knowledge base for low-connectivity environments.',
      specs: [
        'Model: Adaptive Intent Engine',
        'Modality: Text + Gloss Anchors',
        'Features: Flashcards & Mock Exams',
        'Fallback: Offline Local JSON Graph'
      ],
      code: `{\n  "subsystem": "eara_chatbot",\n  "student_affect": "CONFUSED_OR_FATIGUED",\n  "adaptation_policy": "SIMPLIFY_ANALOGY",\n  "generated_micro_card": {\n    "concept": "Pipelining",\n    "analogy": "Assembly line in a factory",\n    "quick_check": "What happens if one stage stalls?"\n  }\n}`
    },
    'node-avatar': {
      id: 'SUBSYSTEM 04 · SIGN SYNTHESIS',
      stack: 'STACK: TENSORFLOW / KERAS + WLASL BILSTM + SIGN MNIST',
      title: 'Sign Avatar Lecture Generator & Sign Recognition',
      desc: 'Translates curriculum explanations into visual sign language sequences using a rule-based text-to-gloss NLP compiler. Connects with a WLASL BiLSTM sign recognition pipeline and Sign MNIST alphabet finger-spelling classifier for interactive vocabulary acquisition.',
      specs: [
        'NLP: Rule-Based Text-to-Gloss',
        'Architecture: BiLSTM Recurrent Net',
        'Dataset: WLASL + Sign MNIST',
        'Output: 3D Gloss Keyframe Stream'
      ],
      code: `{\n  "subsystem": "sign_avatar",\n  "input_text": "The computer stores data in primary memory",\n  "parsed_gloss": ["COMPUTER", "PRIMARY-MEMORY", "DATA", "STORE"],\n  "bilstm_confidence": 0.948,\n  "render_fps": 30\n}`
    },
    'node-haptic': {
      id: 'SUBSYSTEM 05 · IOT WEARABLE',
      stack: 'STACK: ESP32 + BLUETOOTH LOW ENERGY + C++ ARDUINO CORE',
      title: 'Smart ESP32 Haptic Wristband & Practice Arena',
      desc: 'Embedded BLE wearable providing silent tactile reminders. Triggers customizable vibration pulses and OLED screen cues to notify deaf learners when their attention wavers or when a spaced recall question is ready, eliminating visual interruption during video learning.',
      specs: [
        'Hardware: ESP32-WROOM-32',
        'Wireless: BLE GATT Service',
        'Display: 0.96 inch I2C OLED (128x64)',
        'Actuator: Precision ERM Vibration Motor'
      ],
      code: `{\n  "subsystem": "esp32_wristband",\n  "ble_packet": "0xFA 0x02 0xC8 0x00",\n  "vibration_pattern": "DOUBLE_PULSE_ALERT",\n  "oled_text": "FOCUS ALERT: EAR < 0.28",\n  "response_latency_ms": 118\n}`
    }
  };

  flowNodes.forEach(node => {
    node.addEventListener('click', () => {
      flowNodes.forEach(n => {
        n.classList.remove('active');
        n.setAttribute('aria-selected', 'false');
      });
      node.classList.add('active');
      node.setAttribute('aria-selected', 'true');

      const key = node.dataset.flow;
      const data = flowData[key];
      if (data) {
        document.getElementById('detailId').textContent = data.id;
        document.getElementById('detailStack').textContent = data.stack;
        document.getElementById('detailTitle').textContent = data.title;
        document.getElementById('detailDesc').textContent = data.desc;

        const specsContainer = document.getElementById('detailSpecs');
        specsContainer.innerHTML = '';
        data.specs.forEach(s => {
          const span = document.createElement('span');
          span.className = 'spec-pill';
          span.textContent = s;
          specsContainer.appendChild(span);
        });

        const codeEl = document.getElementById('detailCode');
        if (codeEl) {
          codeEl.textContent = data.code;
        }
      }
    });
  });

  // =========================================================================
  // 05. COMPONENT SHOWCASE & SCREENSHOT LIGHTBOX VIEWER
  // =========================================================================
  const compTabs = document.querySelectorAll('.comp-tab');
  const compPanels = document.querySelectorAll('.comp-panel');

  compTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      compTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      compPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const targetId = tab.dataset.tab.replace('comp-', 'panel-');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // SCREENSHOT GALLERY DATA
  const screenshotGallery = [
    {
      img: 'assets/screenshot-lesson-overview.png',
      title: 'Interactive Lesson Player & Concept Synchronization',
      component: 'Component 01 — Attention & Lesson Engine',
      desc: 'Real-time video module playback with active concept tracking ("Introduction to ICT"), student attention webcam monitor, and live lesson synchronization state.'
    },
    {
      img: 'assets/screenshot-lesson-analytics.png',
      title: 'Attention Analytics, Smart Gestures & Timeline Heatmap',
      component: 'Component 01 — Attention & Lesson Engine',
      desc: 'Real-time gaze/PERCLOS telemetry, session distraction heatmap (Green=focused, Orange=distracted, Amber=drowsy), smart hand gesture controls (Palm, Peace, Fist), concept graph cards, and popup checkpoints.'
    },
    {
      img: 'assets/screenshot-chatbot-setup.png',
      title: 'Chatbot Setup & 5 Weak-Spot Revision Routing',
      component: 'Component 02 — Emotion-Aware Adaptive Chatbot',
      desc: 'Automatic ingestion of 5 weak spots detected by the computer vision attention engine, Dual Learning vs. Exam modes, and curriculum topic setup.'
    },
    {
      img: 'assets/screenshot-chatbot-chat.png',
      title: 'Conversational Tutoring & Structured Exam Answer Engine',
      component: 'Component 02 — Emotion-Aware Adaptive Chatbot',
      desc: 'Conversational tutoring tailoring network concepts (LAN, MAN, WAN) with real-world analogies, formatted 5-mark O/L exam blocks, and multi-style explanation pills (Standard, ELI10, Analogy, Exam).'
    },
    {
      img: 'assets/screenshot-sign-avatar.png',
      title: 'Stream 1: 3D Articulated ASL Fingerspelling Studio',
      component: 'Component 03 — IT22197764 (Mendis L B L)',
      desc: 'Automated ICT keyword extraction (RAM, CPU, ALU), interactive 26-letter ASL manual alphabet matrix, anatomical sign posture guide for Letter "R", and 3D articulated skeleton hand avatar with video export.'
    },
    {
      img: 'assets/screenshot-avatar-lecture.png',
      title: 'Stream 2: 2D Canvas Avatar & Keyword Lecture Sequence Player',
      component: 'Component 03 — IT22197764 (Mendis L B L)',
      desc: 'Automated keyword-based sign sequence generation from lesson notes (10 keywords, 3 fallbacks), dual-stream 2D synthetic pose avatar with articulated color-coded hand rigs, Sinhala/English gloss sync, and multi-speed replay.'
    },
    {
      img: 'assets/screenshot-wristband-config.png',
      title: 'Smart Haptic Wristband Configuration, Alert Mapping & Telemetry',
      component: 'Component 04 — IT19131948 (Nawarathna I K K R B)',
      desc: 'Real-time ESP32 hardware configuration interface, 3D wristband emulator with OLED visual preview ("FOCUS BACK"), 9 tactile vibration event profiles, PWM intensity/duration calibration, and telemetry event history.'
    }
  ];

  let currentLightboxIdx = 0;
  const lightboxModal = document.getElementById('screenshotLightbox');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxBadge = document.getElementById('lightboxComponentBadge');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxDirectLink = document.getElementById('lightboxDirectLink');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');

  function openLightbox(index) {
    if (!lightboxModal) return;
    currentLightboxIdx = (index + screenshotGallery.length) % screenshotGallery.length;
    const item = screenshotGallery[currentLightboxIdx];

    if (lightboxImg) {
      lightboxImg.src = item.img;
      lightboxImg.alt = item.title;
      lightboxImg.classList.remove('zoomed');
    }
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxDesc) lightboxDesc.textContent = item.desc;
    if (lightboxBadge) lightboxBadge.textContent = item.component;
    if (lightboxCounter) lightboxCounter.textContent = `${currentLightboxIdx + 1} of ${screenshotGallery.length}`;
    if (lightboxDirectLink) {
      lightboxDirectLink.href = item.img;
      lightboxDirectLink.setAttribute('download', item.img.split('/').pop());
    }

    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function nextLightbox() {
    openLightbox(currentLightboxIdx + 1);
  }

  function prevLightbox() {
    openLightbox(currentLightboxIdx - 1);
  }

  // Bind Screenshot Triggers
  document.querySelectorAll('.ss-zoom-btn, .screenshot-img-container').forEach(el => {
    el.addEventListener('click', () => {
      const imgSrc = el.dataset.img || el.dataset.zoomTrigger;
      const foundIdx = screenshotGallery.findIndex(item => item.img === imgSrc);
      if (foundIdx !== -1) {
        openLightbox(foundIdx);
      } else {
        openLightbox(0);
      }
    });
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevLightbox);

  // Toggle Zoom on Image Click
  if (lightboxImg) {
    lightboxImg.addEventListener('click', () => {
      lightboxImg.classList.toggle('zoomed');
    });
  }

  // Keyboard navigation for Lightbox
  window.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowRight') nextLightbox();
    else if (e.key === 'ArrowLeft') prevLightbox();
  });

  // =========================================================================
  // 06. RESEARCH CONTRIBUTION SPECIFICATIONS MODAL
  // =========================================================================
  const specModalBackdrop = document.getElementById('specModalBackdrop');
  const specModalClose = document.getElementById('specModalClose');
  const specModalBody = document.getElementById('specModalBody');
  const specModalBadge = document.getElementById('specModalBadge');
  const specModalId = document.getElementById('specModalId');
  const specTriggers = document.querySelectorAll('.spec-modal-trigger');

  const contributorSpecs = {
    'modal-tharaka': {
      badge: 'CONTRIBUTION 01 · THESIS CHAPTER 03',
      id: 'IT22211200 · Tharaka W A K N',
      html: `
        <h3 style="color:#fff;font-size:1.35rem;margin-bottom:12px;">Attention Monitoring & Knowledge Graph Question Generation</h3>
        <p style="margin-bottom:16px;"><strong>Research Core:</strong> Computer vision telemetry mapping student gaze, blink duration, and facial geometry into an automated pedagogical feedback loop for the Sri Lankan G.C.E. O/L ICT curriculum.</p>
        
        <h4 style="color:#38bdf8;font-size:1rem;margin:18px 0 8px;">1. Mathematical Telemetry Formulation</h4>
        <div style="background:#030608;padding:14px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);margin-bottom:14px;font-family:'JetBrains Mono',monospace;font-size:0.8rem;color:#a5f3fc;">
          EAR = (||p2 - p6|| + ||p3 - p5||) / (2 * ||p1 - p4||)<br>
          MAR = (||m2 - m8|| + ||m3 - m7|| + ||m4 - m6||) / (3 * ||m1 - m5||)<br>
          PERCLOS = (Total Eye Closure Frames / Total Sample Window) * 100
        </div>

        <h4 style="color:#38bdf8;font-size:1rem;margin:18px 0 8px;">2. General Question Selection Algorithm (GQSA)</h4>
        <p>Questions are synthesized from the O/L ICT Knowledge Graph with an automated triple-tier ratio:</p>
        <ul style="padding-left:20px;margin-bottom:16px;display:grid;gap:6px;">
          <li><strong>60% Missed Topic Recovery:</strong> Queries concepts covered during video timestamps where EAR/PERCLOS fell below calibrated focus thresholds.</li>
          <li><strong>25% Spaced Repetition:</strong> Utilizes Ebbinghaus retention curves to reinforce earlier learned units.</li>
          <li><strong>15% Curricular Mastery:</strong> Validates foundational prerequisite understanding across the 15 seed concepts.</li>
        </ul>
        <p><strong>Primary Proposal Deliverable:</strong> Preserved in university archives under <a href="documents/Tharaka_IT22211200_Proposal.pdf" download style="color:#34d399;text-decoration:underline;">Tharaka_IT22211200_Proposal.pdf</a>.</p>
      `
    },
    'modal-kothalawala': {
      badge: 'CONTRIBUTION 02 · THESIS CHAPTER 04',
      id: 'IT22185884 · Kothalawala L S S',
      html: `
        <h3 style="color:#fff;font-size:1.35rem;margin-bottom:12px;">Emotion-Aware Adaptive Chatbot (EARA) & Knowledge Growth</h3>
        <p style="margin-bottom:16px;"><strong>Research Core:</strong> An intelligent conversational tutoring agent capable of modifying lesson explanations, scaffolding, and difficulty based on affective and cognitive learning state signals.</p>

        <h4 style="color:#38bdf8;font-size:1rem;margin:18px 0 8px;">1. Affective Dialogue Policy</h4>
        <p>When student telemetry signals confusion or cognitive overload, the agent switches from formal academic prose to intuitive real-world metaphors, generating customized bite-sized revision cards and interactive flashcards.</p>

        <h4 style="color:#38bdf8;font-size:1rem;margin:18px 0 8px;">2. Pedagogical Modules & Offline Fallback</h4>
        <ul style="padding-left:20px;margin-bottom:16px;display:grid;gap:6px;">
          <li><strong>Teacher Analytics Dashboard:</strong> Aggregates topic-level comprehension trends for educators.</li>
          <li><strong>Adaptive Mock Exam Engine:</strong> Generates O/L ICT exam-standard questions dynamically tuned to individual mastery gaps.</li>
          <li><strong>Zero-Connectivity Local Fallback:</strong> Local JSON knowledge base enabling continuous interactive revision even when internet connection drops.</li>
        </ul>
        <p><strong>Primary Proposal Deliverable:</strong> Preserved in university archives under <a href="documents/Kothalawala_IT22185884_Proposal.pdf" download style="color:#34d399;text-decoration:underline;">Kothalawala_IT22185884_Proposal.pdf</a>.</p>
      `
    },
    'modal-mendis': {
      badge: 'CONTRIBUTION 03 · THESIS CHAPTER 05',
      id: 'IT22197764 · Mendis L B L',
      html: `
        <h3 style="color:#fff;font-size:1.35rem;margin-bottom:12px;">A Dual-Stream 3D/2D Sign Avatar Lecture Generator and Interactive ASL Fingerspelling Studio for Deaf O/L ICT Learners</h3>
        <p style="margin-bottom:16px;"><strong>Research Core:</strong> Multimodal text-to-sign translation engine converting technical O/L ICT concepts into accessible visual sign language demonstrations.</p>

        <h4 style="color:#38bdf8;font-size:1rem;margin:18px 0 8px;">1. Text-to-Gloss Parsing Engine</h4>
        <p>A rule-based Natural Language Processing pipeline tokenizes English ICT educational text, removes grammatical filler particles, extracts subject-verb-object technical anchors, and restructures phrases into canonical Sign Gloss syntax.</p>

        <h4 style="color:#38bdf8;font-size:1rem;margin:18px 0 8px;">2. Deep Learning Classification Models</h4>
        <ul style="padding-left:20px;margin-bottom:16px;display:grid;gap:6px;">
          <li><strong>WLASL BiLSTM Classifier:</strong> Bidirectional Long Short-Term Memory recurrent neural network recognizing dynamic multi-frame sign gestures.</li>
          <li><strong>Sign MNIST Finger-spelling Classifier:</strong> Fallback 26-class letter classification model for technical jargon terms lacking established sign gloss vocabulary.</li>
        </ul>
        <p><strong>Primary Proposal Deliverable:</strong> Preserved in university archives under <a href="documents/Mendis_IT22197764_Proposal.pdf" download style="color:#34d399;text-decoration:underline;">Mendis_IT22197764_Proposal.pdf</a>.</p>
      `
    },
    'modal-nawarathna': {
      badge: 'CONTRIBUTION 04 · THESIS CHAPTER 06',
      id: 'IT19131948 · Nawarathna I K K R B',
      html: `
        <h3 style="color:#fff;font-size:1.35rem;margin-bottom:12px;">Smart Haptic Wristband & Sign Language Practice Arena</h3>
        <p style="margin-bottom:16px;"><strong>Research Core:</strong> Custom assistive IoT wearable hardware combined with a browser-based interactive sign practice arena for deaf and hard-of-hearing learners.</p>

        <h4 style="color:#38bdf8;font-size:1rem;margin:18px 0 8px;">1. ESP32 Hardware & BLE Architecture</h4>
        <p>An ESP32-WROOM-32 microcontroller controls an Eccentric Rotating Mass (ERM) vibration motor and a 0.96-inch monochrome I2C OLED screen. Receives silent focus prompts and question triggers via custom Bluetooth Low Energy (BLE) GATT services.</p>

        <h4 style="color:#38bdf8;font-size:1rem;margin:18px 0 8px;">2. Camera Practice Arena & Landmark Tracking</h4>
        <ul style="padding-left:20px;margin-bottom:16px;display:grid;gap:6px;">
          <li><strong>MediaPipe Hands Landmark Analysis:</strong> Tracks 21 3D hand coordinates in the browser to evaluate learner signing accuracy during self-study.</li>
          <li><strong>Certificate & Milestone Rewards:</strong> Issues verified milestone certificates when practice modules are completed.</li>
        </ul>
        <p><strong>Primary Proposal Deliverable:</strong> Preserved in university archives under <a href="documents/Nawarathna_IT19131948_Proposal.pdf" download style="color:#34d399;text-decoration:underline;">Nawarathna_IT19131948_Proposal.pdf</a>.</p>
      `
    }
  };

  specTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalKey = btn.dataset.modal;
      const data = contributorSpecs[modalKey];
      if (data && specModalBackdrop) {
        specModalBadge.textContent = data.badge;
        specModalId.textContent = data.id;
        specModalBody.innerHTML = data.html;
        specModalBackdrop.classList.add('open');
        specModalBackdrop.setAttribute('aria-hidden', 'false');
      }
    });
  });

  if (specModalClose) {
    specModalClose.addEventListener('click', () => {
      specModalBackdrop.classList.remove('open');
      specModalBackdrop.setAttribute('aria-hidden', 'true');
    });
  }

  // =========================================================================
  // 07. DOCUMENT REPOSITORY SEARCH & FILTER SYSTEM
  // =========================================================================
  const repoSearch = document.getElementById('repoSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const filterPills = document.querySelectorAll('.filter-pill');
  const resourceCards = document.querySelectorAll('.resource-card');
  const docModalBackdrop = document.getElementById('docModalBackdrop');
  const docModalClose = document.getElementById('docModalClose');
  const docModalTitle = document.getElementById('docModalTitle');
  const docModalIframe = document.getElementById('docModalIframe');
  const docModalDownload = document.getElementById('docModalDownload');
  const previewBtns = document.querySelectorAll('.res-preview-btn');

  function filterResources() {
    const query = repoSearch ? repoSearch.value.trim().toLowerCase() : '';
    const activeFilter = document.querySelector('.filter-pill.active')?.dataset.filter || 'all';

    if (clearSearchBtn) {
      clearSearchBtn.style.display = query ? 'block' : 'none';
    }

    resourceCards.forEach(card => {
      const category = card.dataset.category;
      const text = card.textContent.toLowerCase();
      const matchesCategory = (activeFilter === 'all') || (category === activeFilter);
      const matchesSearch = !query || text.includes(query);

      if (matchesCategory && matchesSearch) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  if (repoSearch) {
    repoSearch.addEventListener('input', filterResources);
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      repoSearch.value = '';
      filterResources();
      repoSearch.focus();
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      filterResources();
    });
  });

  // PDF Preview Modal
  previewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pdfPath = btn.dataset.preview;
      const title = btn.dataset.title;
      if (docModalBackdrop && docModalIframe && docModalTitle) {
        docModalTitle.textContent = title || 'Document Preview';
        docModalIframe.src = pdfPath;
        if (docModalDownload) {
          docModalDownload.href = pdfPath;
          docModalDownload.setAttribute('download', '');
        }
        docModalBackdrop.classList.add('open');
        docModalBackdrop.setAttribute('aria-hidden', 'false');
      }
    });
  });

  if (docModalClose) {
    docModalClose.addEventListener('click', () => {
      docModalBackdrop.classList.remove('open');
      docModalBackdrop.setAttribute('aria-hidden', 'true');
      if (docModalIframe) docModalIframe.src = '';
    });
  }

  // Close modals on clicking outside or ESC key
  window.addEventListener('click', (e) => {
    if (e.target === specModalBackdrop) {
      specModalBackdrop.classList.remove('open');
      specModalBackdrop.setAttribute('aria-hidden', 'true');
    }
    if (e.target === docModalBackdrop) {
      docModalBackdrop.classList.remove('open');
      docModalBackdrop.setAttribute('aria-hidden', 'true');
      if (docModalIframe) docModalIframe.src = '';
    }
  });

  // =========================================================================
  // 08. EMAIL QUICK-COPY & FEEDBACK TOAST NOTIFICATION SYSTEM
  // =========================================================================
  const toastHub = document.getElementById('toastHub');

  function showToast(message) {
    if (!toastHub) return;
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${message}</span>
    `;
    toastHub.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  const copyBtns = document.querySelectorAll('.copy-email-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const textToCopy = btn.dataset.copy;
      if (navigator.clipboard && textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          btn.textContent = 'Copied!';
          showToast(`Copied ${textToCopy} to clipboard!`);
          setTimeout(() => btn.textContent = 'Copy', 2000);
        }).catch(() => {
          showToast(`Address: ${textToCopy}`);
        });
      }
    });
  });

  // =========================================================================
  // 09. RESEARCH INQUIRY FORM SUBMISSION HANDLER
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName')?.value || '';
      const email = document.getElementById('senderEmail')?.value || '';
      const subsystem = document.getElementById('inquirySubsystem')?.value || 'General';
      const message = document.getElementById('inquiryMessage')?.value || '';

      const recipients = 'it22211200@my.sliit.lk,it22185884@my.sliit.lk,it22197764@my.sliit.lk,it19131948@my.sliit.lk';
      const subject = `SignLearn AI Inquiry (R26-IT-018): ${subsystem}`;
      const body = `Full Name: ${name}\nEmail: ${email}\nSubsystem: ${subsystem}\n\nInquiry Details:\n${message}\n\n---\nSent via SignLearn AI Research Portal (SLIIT Project R26-IT-018)`;

      showToast('Opening default email application with pre-configured recipients...');
      setTimeout(() => {
        window.location.href = `mailto:${recipients}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }, 400);
    });
  }

  // =========================================================================
  // 10. COMMAND PALETTE KEYBOARD NAVIGATION (CTRL+K / CMD+K)
  // =========================================================================
  const cmdPaletteBtn = document.getElementById('cmdPaletteBtn');
  const cmdModalBackdrop = document.getElementById('cmdModalBackdrop');
  const cmdCloseBtn = document.getElementById('cmdCloseBtn');
  const cmdSearchField = document.getElementById('cmdSearchField');
  const cmdResultsList = document.getElementById('cmdResultsList');

  function openCmdPalette() {
    if (cmdModalBackdrop) {
      cmdModalBackdrop.classList.add('open');
      cmdModalBackdrop.setAttribute('aria-hidden', 'false');
      if (cmdSearchField) {
        cmdSearchField.value = '';
        cmdSearchField.focus();
      }
    }
  }

  function closeCmdPalette() {
    if (cmdModalBackdrop) {
      cmdModalBackdrop.classList.remove('open');
      cmdModalBackdrop.setAttribute('aria-hidden', 'true');
    }
  }

  if (cmdPaletteBtn) {
    cmdPaletteBtn.addEventListener('click', openCmdPalette);
  }

  if (cmdCloseBtn) {
    cmdCloseBtn.addEventListener('click', closeCmdPalette);
  }

  window.addEventListener('keydown', (e) => {
    // Open on Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdModalBackdrop?.classList.contains('open')) {
        closeCmdPalette();
      } else {
        openCmdPalette();
      }
    }
    // Close on Escape
    if (e.key === 'Escape') {
      closeCmdPalette();
      if (docModalBackdrop?.classList.contains('open')) {
        docModalBackdrop.classList.remove('open');
      }
      if (specModalBackdrop?.classList.contains('open')) {
        specModalBackdrop.classList.remove('open');
      }
    }
  });

  if (cmdModalBackdrop) {
    cmdModalBackdrop.addEventListener('click', (e) => {
      if (e.target === cmdModalBackdrop) closeCmdPalette();
    });
  }

  // Filter Command Items
  if (cmdSearchField && cmdResultsList) {
    cmdSearchField.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const items = cmdResultsList.querySelectorAll('.cmd-item');
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = (!q || text.includes(q)) ? 'flex' : 'none';
      });
    });
  }

  // Close Command Palette when navigating
  if (cmdResultsList) {
    cmdResultsList.querySelectorAll('.cmd-item').forEach(item => {
      item.addEventListener('click', () => {
        closeCmdPalette();
      });
    });
  }

  // =========================================================================
  // 11. RESPONSIVE MOBILE NAVIGATION DRAWER
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
});