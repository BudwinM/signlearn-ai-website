# SignLearn AI — Advanced Multimodal Research Platform
> **Research Project Code:** R26-IT-018  
> **Faculty:** Faculty of Computing, Sri Lanka Institute of Information Technology (SLIIT)  
> **Specialization:** Information Technology / Software Engineering

---

## 1. Project Overview & Abstract
**SignLearn AI** is an intelligent, multimodal e-learning research framework designed for Sri Lankan G.C.E. Ordinary Level (O/L) ICT education, specifically tailored to empower deaf and hard-of-hearing students. The platform bridges computer vision facial attention telemetry, knowledge graph question synthesis, emotion-adaptive conversational tutoring, 3D/2D sign language avatar synthesis, and IoT haptic bio-feedback.

---

## 2. Research Group & Individual Contributions

| Student ID | Student Name | Thesis Component & Research Focus |
| :--- | :--- | :--- |
| **IT22211200** | **Tharaka W A K N** | **Subsystem 01:** Real-Time Attention Monitoring & Knowledge Graph Spaced Question Synthesis (MediaPipe Face Mesh, EAR, MAR, PERCLOS, NetworkX, GQSA 60/25/15) |
| **IT22185884** | **Kothalawala L S S** | **Subsystem 02:** Emotion-Aware Adaptive Tutoring Chatbot (EARA) & Knowledge Growth (Affective dialogue policies, revision routing, exam answer engine, offline fallback) |
| **IT22197764** | **Mendis L B L** | **Subsystem 03:** 3D/2D Sign Avatar Lecture Generation & ASL Fingerspelling Studio (Rule-based Text-to-Gloss NLP, WLASL BiLSTM classifier, Sign MNIST) |
| **IT19131948** | **Nawarathna I K K R B** | **Subsystem 04:** Smart Haptic IoT Wristband & Interactive Sign Practice Arena (ESP32-WROOM-32, BLE GATT services, MediaPipe Hands landmark tracking) |

---

## 3. System Architecture & Repository Structure
This repository contains the official academic research presentation website and documentation archive for Project R26-IT-018:

```
├── index.html           # Main academic research platform presentation portal
├── styles.css           # Modular stylesheet (Light/Dark themes, glassmorphism, responsive layout)
├── script.js            # Client logic (Dataflow inspector, search, lightbox, telemetry simulation)
├── assets/              # High-resolution architectural diagrams, UI screenshots, and media
│   ├── screenshot-lesson-overview.png
│   ├── screenshot-lesson-analytics.png
│   ├── screenshot-chatbot-setup.png
│   ├── screenshot-chatbot-chat.png
│   ├── screenshot-sign-avatar.png
│   ├── screenshot-avatar-lecture.png
│   ├── screenshot-wristband-config.png
│   └── ...
├── documents/           # Preserved university research deliverables & presentation slide decks
│   ├── Tharaka_IT22211200_Proposal.pdf
│   ├── Kothalawala_IT22185884_Proposal.pdf
│   ├── Mendis_IT22197764_Proposal.pdf
│   ├── Nawarathna_IT19131948_Proposal.pdf
│   ├── Proposal_Presentation_R26-IT-018.pdf
│   ├── Progress_Presentation_01.pdf
│   ├── Progress_Presentation_02.pdf
│   ├── Final_Presentation_R26-IT-018.pdf
│   ├── R26-IT-018_CommonReport.pdf
│   ├── Tharaka_IT22211200_Final_Report.pdf
│   ├── Kothalawala_IT22185884_Final_Report.pdf
│   ├── Mendis_IT22197764_Final_Report.pdf
│   └── Nawarathna_IT19131948_Final_Report.pdf
└── README.md            # Comprehensive research project documentation
```

---

## 4. Academic Compliance & Evaluation Guidelines
- **Zero External Runtime Dependencies:** The presentation platform is engineered strictly with Vanilla HTML5, CSS3, and ES6+ JavaScript. All fonts, styling, interactive sandboxes, and PDF previews function standalone to ensure reliability during in-person and offline presentation vivas.
- **Contrast & Accessibility:** Fully compliant with accessibility contrast standards across both Dark and Light theme modes.
- **Document Integrity:** All student proposals and milestone presentation slide decks are preserved in the `documents/` directory with interactive in-browser preview and direct download capabilities.

---

## 5. How to Run Locally

### Option 1: Direct Browser Launch
Open `index.html` directly in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).

### Option 2: Local HTTP Server
```bash
# Using Python
python -m http.server 3000

# Using Node.js
npx serve .
```
Navigate to `http://localhost:3000` in your browser.
