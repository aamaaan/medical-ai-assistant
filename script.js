
const medDB = {
  flu: {
    label: 'Influenza (Flu)',
    icon: '🤧',
    symptoms: ['fever','cough','fatigue','headache','body ache','chills','sore throat','runny nose'],
    treatment: 'Rest, adequate fluid intake, and over-the-counter antipyretics (paracetamol/ibuprofen). Antiviral medications such as oseltamivir (Tamiflu) may be prescribed within 48 hours of symptom onset for high-risk patients.',
    prevention: 'Annual influenza vaccination, frequent hand washing, avoiding close contact with infected individuals, and respiratory hygiene practices.',
    doctor: 'General Physician / Internal Medicine'
  },
  covid: {
    label: 'COVID-19',
    icon: '🦠',
    symptoms: ['fever','cough','fatigue','shortness of breath','loss of taste','loss of smell','body ache','headache','chills','sore throat'],
    treatment: 'Supportive care including rest, hydration, and antipyretics for mild cases. Antiviral agents and hospitalisation with oxygen therapy for moderate to severe presentations.',
    prevention: 'COVID-19 vaccination (primary series and boosters), mask usage in crowded settings, hand hygiene, and adequate ventilation of indoor spaces.',
    doctor: 'General Physician / Pulmonologist / Infectious Disease Specialist'
  },
  diabetes: {
    label: 'Diabetes Mellitus',
    icon: '🩸',
    symptoms: ['excessive thirst','frequent urination','fatigue','blurred vision','slow healing wounds','tingling hands/feet','unexplained weight loss','increased hunger'],
    treatment: 'Lifestyle modifications (diet and exercise), oral hypoglycaemic agents for Type 2, and insulin therapy as required. Regular blood glucose monitoring and HbA1c testing are essential.',
    prevention: 'Maintaining a healthy body weight, regular aerobic exercise, a balanced low-glycaemic diet, and routine blood sugar screening for at-risk individuals.',
    doctor: 'Endocrinologist / Diabetologist'
  },
  hypertension: {
    label: 'Hypertension',
    icon: '💓',
    symptoms: ['headache','dizziness','blurred vision','chest pain','shortness of breath','nausea','nosebleed','fatigue'],
    treatment: 'Antihypertensive medications (ACE inhibitors, beta-blockers, calcium channel blockers, diuretics) alongside lifestyle changes: reduced sodium intake, smoking cessation, and regular exercise.',
    prevention: 'DASH diet adherence, limiting alcohol, regular aerobic activity, stress management, and routine blood pressure monitoring.',
    doctor: 'Cardiologist / General Physician'
  },
  asthma: {
    label: 'Asthma',
    icon: '🫁',
    symptoms: ['shortness of breath','wheezing','cough','chest tightness','fatigue','night cough','breathlessness on exertion'],
    treatment: 'Short-acting bronchodilators (salbutamol) for acute relief; inhaled corticosteroids and long-acting beta-agonists for long-term control. Avoidance of identified triggers.',
    prevention: 'Trigger identification and avoidance (allergens, smoke, exercise in cold air), adherence to controller medications, and regular spirometry follow-up.',
    doctor: 'Pulmonologist / Allergist'
  },
  malaria: {
    label: 'Malaria',
    icon: '🦟',
    symptoms: ['fever','chills','headache','nausea','vomiting','fatigue','sweating','body ache','muscle pain'],
    treatment: 'Artemisinin-based combination therapies (ACTs) for uncomplicated malaria; intravenous artesunate for severe cases. Treatment must be guided by rapid diagnostic test or blood smear results.',
    prevention: 'Insecticide-treated bed nets, indoor residual spraying, chemoprophylaxis for travellers, and prompt diagnosis and treatment of cases.',
    doctor: 'Infectious Disease Specialist / General Physician'
  },
  typhoid: {
    label: 'Typhoid Fever',
    icon: '🌡️',
    symptoms: ['fever','headache','abdominal pain','nausea','fatigue','loss of appetite','constipation','diarrhea','body ache'],
    treatment: 'Antibiotic therapy (fluoroquinolones or cephalosporins depending on local resistance patterns), adequate hydration, and nutritional support.',
    prevention: 'Typhoid vaccination, safe water consumption, proper sanitation, thorough cooking of food, and rigorous hand hygiene.',
    doctor: 'General Physician / Infectious Disease Specialist'
  },
  heartDisease: {
    label: 'Coronary Heart Disease',
    icon: '❤️‍🩹',
    symptoms: ['chest pain','shortness of breath','fatigue','dizziness','heart palpitations','nausea','sweating','left arm pain','jaw pain'],
    treatment: 'Antiplatelet agents, statins, beta-blockers, ACE inhibitors; interventional procedures (angioplasty, stenting, or bypass surgery) where indicated. Cardiac rehabilitation programmes are strongly recommended.',
    prevention: 'Smoking cessation, regular physical activity, heart-healthy diet, blood pressure and cholesterol management, and control of diabetes.',
    doctor: 'Cardiologist'
  },
  migraine: {
    label: 'Migraine',
    icon: '🤕',
    symptoms: ['headache','nausea','vomiting','blurred vision','light sensitivity','sound sensitivity','dizziness','fatigue','aura'],
    treatment: 'Triptans or NSAIDs for acute attacks; preventive pharmacotherapy (topiramate, propranolol, amitriptyline, CGRP antagonists) for frequent episodes. Rest in a dark, quiet room during attacks.',
    prevention: 'Identification and avoidance of personal triggers (certain foods, stress, disrupted sleep, dehydration), maintaining a consistent sleep schedule, and stress management.',
    doctor: 'Neurologist'
  },
  anemia: {
    label: 'Anaemia',
    icon: '🩺',
    symptoms: ['fatigue','shortness of breath','dizziness','pale skin','headache','cold hands/feet','chest pain','heart palpitations','weakness'],
    treatment: 'Iron supplementation for iron-deficiency anaemia; vitamin B12/folate for megaloblastic anaemia; underlying cause management for other forms. Severe cases may require blood transfusion.',
    prevention: 'Iron- and folate-rich diet (leafy vegetables, legumes, fortified cereals, lean meat), regular screening during pregnancy, and management of chronic blood loss.',
    doctor: 'Haematologist / General Physician'
  }
};

/* ── Symptom Master List (18+) ─────────────────────────────── */
const ALL_SYMPTOMS = [
  'fever','cough','fatigue','headache','body ache','chills',
  'sore throat','shortness of breath','nausea','vomiting',
  'dizziness','chest pain','blurred vision','loss of taste',
  'loss of smell','runny nose','abdominal pain','diarrhea',
  'loss of appetite','wheezing','sweating','muscle pain',
  'heart palpitations','pale skin','weakness','excessive thirst',
  'frequent urination','tingling hands/feet'
];

/* ── Application State ─────────────────────────────────────── */
let selectedSymptoms = [];
let conversationHistory = [];   // rolling 10-message buffer
let mapInstance = null;
let currentMode = 'welcome';    // welcome | symptoms | disease | hospital

/* ── DOM References ─────────────────────────────────────────── */
const chatContainer    = document.getElementById('chat-container');
const welcomeScreen    = document.getElementById('welcome-screen');
const symptomPanel     = document.getElementById('symptom-panel');
const diseasePanel     = document.getElementById('disease-panel');
const hospitalPanel    = document.getElementById('hospital-panel');
const chatInput        = document.getElementById('chat-input');
const btnSend          = document.getElementById('btn-send');
const btnMic           = document.getElementById('btn-mic');
const btnDark          = document.getElementById('btn-dark');
const loadingOverlay   = document.getElementById('loading-overlay');
const analyzeBtn       = document.getElementById('btn-analyze');
const selectedCount    = document.getElementById('selected-count');

/* ============================================================
   INITIALISE
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  buildSymptomChips();
  buildDiseaseChips();
  setupEventListeners();
  setupVoiceInput();
});

/* ── Build Symptom Chip UI ───────────────────────────────────── */
function buildSymptomChips() {
  const grid = document.getElementById('symptom-chips-grid');
  grid.innerHTML = '';
  ALL_SYMPTOMS.forEach(sym => {
    const chip = document.createElement('button');
    chip.className = 'sym-chip';
    chip.dataset.sym = sym;
    chip.textContent = sym.charAt(0).toUpperCase() + sym.slice(1);
    chip.addEventListener('click', () => toggleSymptom(chip, sym));
    grid.appendChild(chip);
  });
}

/* ── Build Disease Chip UI ────────────────────────────────────── */
function buildDiseaseChips() {
  const grid = document.getElementById('disease-chips-grid');
  grid.innerHTML = '';
  Object.entries(medDB).forEach(([key, dis]) => {
    const chip = document.createElement('button');
    chip.className = 'dis-chip';
    chip.innerHTML = `${dis.icon} ${dis.label}`;
    chip.addEventListener('click', () => showDiseaseInfo(key));
    grid.appendChild(chip);
  });
}

/* ── Event Listeners ─────────────────────────────────────────── */
function setupEventListeners() {
  document.getElementById('btn-check-symptoms').addEventListener('click', openSymptomMode);
  document.getElementById('btn-search-disease').addEventListener('click', openDiseaseMode);
  document.getElementById('btn-find-hospitals').addEventListener('click', openHospitalMode);
  document.getElementById('btn-reset').addEventListener('click', resetSession);

  btnSend.addEventListener('click', handleChatSend);
  chatInput.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleChatSend(); } });

  analyzeBtn.addEventListener('click', analyzeSymptoms);
  document.getElementById('btn-clear-symptoms').addEventListener('click', clearSymptoms);

  btnDark.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    btnDark.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
  });

  // Hospital filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* ============================================================
   MODE MANAGEMENT
   ============================================================ */
function hideAllPanels() {
  symptomPanel.style.display  = 'none';
  diseasePanel.style.display  = 'none';
  hospitalPanel.style.display = 'none';
}

function hideWelcome() {
  welcomeScreen.style.display = 'none';
}

function openSymptomMode() {
  hideWelcome();
  hideAllPanels();
  symptomPanel.style.display = 'block';
  currentMode = 'symptoms';
  addBotMessage('🩺 Select your symptoms from the chips below, then tap **Analyze**. You can also describe them in the chat for AI analysis.', []);
}

function openDiseaseMode() {
  hideWelcome();
  hideAllPanels();
  diseasePanel.style.display = 'block';
  currentMode = 'disease';
  addBotMessage('📚 Select a condition below to view structured information including symptoms, treatment, prevention guidance, and the appropriate specialist.', []);
}

function openHospitalMode() {
  hideWelcome();
  hideAllPanels();
  hospitalPanel.style.display = 'block';
  currentMode = 'hospital';
  initHospitalFinder();
}

function resetSession() {
  // Clear messages
  chatContainer.innerHTML = '';
  conversationHistory = [];
  selectedSymptoms = [];
  currentMode = 'welcome';

  // Reset chips
  document.querySelectorAll('.sym-chip').forEach(c => c.classList.remove('active'));
  updateAnalyzeBtn();

  // Destroy map
  if (mapInstance) { mapInstance.remove(); mapInstance = null; }

  // Show welcome
  hideAllPanels();
  welcomeScreen.style.display = 'block';
}

/* ============================================================
   SYMPTOM CHIP LOGIC
   ============================================================ */
function toggleSymptom(chip, sym) {
  if (chip.classList.contains('active')) {
    chip.classList.remove('active');
    selectedSymptoms = selectedSymptoms.filter(s => s !== sym);
  } else {
    chip.classList.add('active');
    selectedSymptoms.push(sym);
  }
  updateAnalyzeBtn();
}

function updateAnalyzeBtn() {
  const n = selectedSymptoms.length;
  analyzeBtn.disabled = n === 0;
  selectedCount.textContent = n > 0 ? `${n} selected` : '';
}

function clearSymptoms() {
  selectedSymptoms = [];
  document.querySelectorAll('.sym-chip').forEach(c => c.classList.remove('active'));
  updateAnalyzeBtn();
}

/* ============================================================
   SYMPTOM SCORING ALGORITHM
   Per-user normalisation: score = (matched / totalSelected) × 100
   Prevents diseases with large symptom lists from ranking lower.
   ============================================================ */
function scoreSymptoms(userSymptoms) {
  if (userSymptoms.length === 0) return [];
  const results = Object.entries(medDB).map(([key, dis]) => {
    const matched = userSymptoms.filter(s => dis.symptoms.includes(s)).length;
    const pct     = Math.round((matched / userSymptoms.length) * 100);
    return { key, label: dis.label, icon: dis.icon, pct, matched };
  });
  return results.sort((a, b) => b.pct - a.pct).filter(r => r.pct > 0);
}

/* ============================================================
   ANALYZE — Local Scoring + AI
   ============================================================ */
async function analyzeSymptoms() {
  if (selectedSymptoms.length === 0) return;

  const syms = [...selectedSymptoms];
  hideAllPanels();

  // Show user message
  addUserMessage(`🔍 Analyzing symptoms: ${syms.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')}`);

  // Local scoring
  const scores = scoreSymptoms(syms);

  // Render local result card
  renderScoreCard(scores, syms);

  // AI analysis
  addBotMessage('🤖 Fetching AI-powered analysis…', []);
  const promptText = `The user has selected the following symptoms: ${syms.join(', ')}.

Please provide a structured medical analysis with the following sections:
1. **Most Likely Condition** – top candidate and brief reasoning
2. **Confidence Rating** – High / Medium / Low with explanation
3. **Recommended Specialist** – which type of doctor to consult
4. **Immediate Care Guidance** – what the user should do right now
5. **Warning Signs** – symptoms that require emergency attention

Keep the response empathetic, factual, and medically responsible. End with a clear disclaimer that this is not a clinical diagnosis.`;

  await callClaudeAPI(promptText);
}

/* ── Render local score card ─────────────────────────────────── */
function renderScoreCard(scores, syms) {
  const card = document.createElement('div');
  card.className = 'result-card';

  const topItems = scores.slice(0, 5);

  card.innerHTML = `
    <div class="result-card-header">
      <span class="result-card-icon">📊</span>
      <div>
        <div class="result-card-title">Symptom Match Results</div>
        <div class="result-card-subtitle">Based on ${syms.length} selected symptom${syms.length > 1 ? 's' : ''} · Local knowledge base</div>
      </div>
    </div>
    <div class="condition-list">
      ${topItems.length > 0 ? topItems.map((r, i) => `
        <div class="condition-row">
          <div class="condition-row-label">${r.icon} ${r.label}</div>
          <div class="condition-bar-wrap">
            <div class="condition-bar" style="width:${r.pct}%"></div>
          </div>
          <div class="condition-pct">${r.pct}%</div>
        </div>
      `).join('') : '<p style="color:var(--clr-text-muted);font-size:0.85rem;">No significant matches found for the selected symptoms.</p>'}
    </div>
    ${topItems.length > 0 ? `
    <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.5rem;">
      ${topItems.slice(0,3).map(r => `<span class="badge">${r.icon} ${r.label}</span>`).join('')}
    </div>` : ''}
    <div class="card-disclaimer">⚠️ This result is generated by an automated matching algorithm and does not constitute a clinical diagnosis. Always consult a qualified medical professional for health concerns.</div>
  `;

  const row = document.createElement('div');
  row.className = 'msg-row bot';
  row.innerHTML = `<div class="msg-avatar">🤖</div>`;
  row.appendChild(card);
  chatContainer.appendChild(row);
  scrollToBottom();

  // Animate bars after render
  requestAnimationFrame(() => {
    card.querySelectorAll('.condition-bar').forEach(bar => {
      const w = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => { bar.style.width = w; }, 50);
    });
  });
}

/* ============================================================
   DISEASE INFO DISPLAY
   ============================================================ */
function showDiseaseInfo(key) {
  const dis = medDB[key];
  if (!dis) return;

  hideAllPanels();

  addUserMessage(`📋 Show me information about ${dis.label}`);

  const card = document.createElement('div');
  card.className = 'result-card';
  card.innerHTML = `
    <div class="result-card-header">
      <span class="result-card-icon">${dis.icon}</span>
      <div>
        <div class="result-card-title">${dis.label}</div>
        <div class="result-card-subtitle">Condition Overview</div>
      </div>
      <span class="badge" style="margin-left:auto;">${dis.doctor.split('/')[0].trim()}</span>
    </div>
    <div class="disease-card">
      <div>
        <div class="disease-section-label">🔎 Common Symptoms</div>
        <div class="disease-section-value">${dis.symptoms.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' · ')}</div>
      </div>
      <div>
        <div class="disease-section-label">💊 Treatment</div>
        <div class="disease-section-value">${dis.treatment}</div>
      </div>
      <div>
        <div class="disease-section-label">🛡️ Prevention</div>
        <div class="disease-section-value">${dis.prevention}</div>
      </div>
      <div>
        <div class="disease-section-label">👨‍⚕️ Recommended Specialist</div>
        <div class="disease-section-value">
          ${dis.doctor.split('/').map(d => `<span class="badge green">👤 ${d.trim()}</span>`).join(' ')}
        </div>
      </div>
    </div>
    <div class="card-disclaimer">⚠️ This information is for educational purposes only. Always consult a qualified medical professional for diagnosis and treatment decisions.</div>
  `;

  const row = document.createElement('div');
  row.className = 'msg-row bot';
  row.innerHTML = `<div class="msg-avatar">🤖</div>`;
  row.appendChild(card);
  chatContainer.appendChild(row);
  scrollToBottom();

  // Suggestion chips
  const suggs = ['Check Symptoms', 'Find Hospitals', 'Tell me more'];
  addSuggestionChips(suggs, chip => {
    if (chip === 'Check Symptoms') openSymptomMode();
    else if (chip === 'Find Hospitals') openHospitalMode();
    else handleFreeChat(`Tell me more about ${dis.label} including risk factors and when to seek emergency care.`);
  });
}

/* ============================================================
   HOSPITAL FINDER
   Leaflet.js + OpenStreetMap Overpass API
   Haversine distance formula for accurate sub-5km distances
   ============================================================ */
function initHospitalFinder() {
  addBotMessage('📍 Requesting your location to find nearby hospitals…', []);

  if (!navigator.geolocation) {
    showHospitalsFallback();
    return;
  }

  navigator.geolocation.getCurrentPosition(
    pos => fetchHospitals(pos.coords.latitude, pos.coords.longitude),
    err => {
      addBotMessage('⚠️ Location access was denied. Showing a default map — please enable location for accurate results.', []);
      showHospitalsFallback();
    },
    { timeout: 10000 }
  );
}

/* ── Haversine Formula ───────────────────────────────────────── */
function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 +
            Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * Math.sin(dLon/2)**2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

/* ── Fetch Hospitals via Overpass API ───────────────────────── */
async function fetchHospitals(lat, lon) {
  renderMap(lat, lon);
  addBotMessage(`🗺️ Map centred at your location. Searching for hospitals within 3 km…`, []);

  // Overpass QL query
  const query = `[out:json][timeout:15];
(
  node["amenity"="hospital"](around:3000,${lat},${lon});
  way["amenity"="hospital"](around:3000,${lat},${lon});
  node["amenity"="clinic"](around:3000,${lat},${lon});
);
out center;`;

  try {
    const res  = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body:   'data=' + encodeURIComponent(query)
    });
    const data = await res.json();
    const elements = data.elements || [];
    renderHospitals(elements, lat, lon);
  } catch (err) {
    addBotMessage('⚠️ Unable to reach the hospital data service. Showing preset facilities.', []);
    renderPresetHospitals(lat, lon);
  }
}

/* ── Render Leaflet Map ─────────────────────────────────────── */
function renderMap(lat, lon) {
  if (mapInstance) { mapInstance.remove(); mapInstance = null; }

  mapInstance = L.map('map', { zoomControl: true }).setView([lat, lon], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(mapInstance);

  // User position marker
  const userIcon = L.divIcon({
    html: '<div style="background:#1a73e8;width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(26,115,232,0.6)"></div>',
    className: '', iconAnchor: [7, 7]
  });
  L.marker([lat, lon], { icon: userIcon }).addTo(mapInstance)
   .bindPopup('<b>📍 Your Location</b>').openPopup();
}

/* ── Render Hospital Markers & Cards ─────────────────────────── */
function renderHospitals(elements, userLat, userLon) {
  const list = document.getElementById('hospital-list');
  list.innerHTML = '';

  if (elements.length === 0) {
    renderPresetHospitals(userLat, userLon);
    return;
  }

  const hospIcon = L.divIcon({
    html: '<div style="background:#ea4335;color:white;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;border:2px solid white;box-shadow:0 2px 8px rgba(234,67,53,0.5)">🏥</div>',
    className: '', iconAnchor: [14, 14]
  });

  const hospitals = elements.slice(0, 12).map(el => {
    const lat  = el.lat  || el.center?.lat;
    const lon  = el.lon  || el.center?.lon;
    const name = el.tags?.name || el.tags?.['name:en'] || 'Medical Facility';
    const dist = haversineKm(userLat, userLon, lat, lon);
    const type = el.tags?.amenity === 'clinic' ? 'Clinic' : 'Hospital';
    return { name, lat, lon, dist, type, tags: el.tags || {} };
  }).sort((a, b) => a.dist - b.dist);

  hospitals.forEach((h, i) => {
    // Map marker
    if (mapInstance && h.lat && h.lon) {
      L.marker([h.lat, h.lon], { icon: hospIcon })
       .addTo(mapInstance)
       .bindPopup(`<b>${h.name}</b><br>${h.dist.toFixed(2)} km away`);
    }

    // Hospital card
    const costTier = h.dist < 1 ? '💰 Low Cost' : h.dist < 2 ? '💰💰 Mid Range' : '💰💰💰 Private';
    const navUrl   = `https://www.google.com/maps/dir/?api=1&destination=${h.lat},${h.lon}`;

    const card = document.createElement('div');
    card.className = 'hospital-card';
    card.innerHTML = `
      <div class="hosp-icon">🏥</div>
      <div class="hosp-info">
        <div class="hosp-name">${h.name}</div>
        <div class="hosp-meta">
          <span>📍 ${h.dist.toFixed(2)} km</span>
          <span>${costTier}</span>
          <span>🏷️ ${h.type}</span>
          ${h.tags.phone ? `<span>📞 ${h.tags.phone}</span>` : ''}
        </div>
      </div>
      <a href="${navUrl}" target="_blank" class="hosp-nav">🗺️ Navigate</a>
    `;
    list.appendChild(card);
  });

  addBotMessage(`✅ Found ${hospitals.length} medical facilities within 3 km of your location. Tap **Navigate** for directions.`, [
    'Check Symptoms', 'Search Disease'
  ], chip => {
    if (chip === 'Check Symptoms') openSymptomMode();
    else openDiseaseMode();
  });
}

/* ── Fallback preset hospitals ───────────────────────────────── */
function showHospitalsFallback() {
  // Bhubaneswar, Odisha as default (project's home city)
  const lat = 20.2961, lon = 85.8245;
  renderMap(lat, lon);
  renderPresetHospitals(lat, lon);
}

function renderPresetHospitals(lat, lon) {
  const presets = [
    { name: 'AIIMS Bhubaneswar', dist: 0.8, type: 'Government Hospital', cost: 'Free / Low Cost', lat: lat + 0.007, lon: lon + 0.010 },
    { name: 'Sum Hospital', dist: 1.4, type: 'Private Hospital', cost: 'Mid Range', lat: lat - 0.010, lon: lon + 0.015 },
    { name: 'Apollo Hospitals', dist: 2.1, type: 'Private Hospital', cost: 'High End', lat: lat + 0.018, lon: lon - 0.008 },
    { name: 'Capital Hospital', dist: 1.7, type: 'Government Hospital', cost: 'Free / Low Cost', lat: lat - 0.015, lon: lon - 0.012 },
    { name: 'Care Hospital', dist: 2.5, type: 'Private Hospital', cost: 'Mid Range', lat: lat + 0.022, lon: lon + 0.020 }
  ];

  const hospIcon = L.divIcon({
    html: '<div style="background:#ea4335;color:white;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;border:2px solid white;box-shadow:0 2px 8px rgba(234,67,53,0.5)">🏥</div>',
    className: '', iconAnchor: [14, 14]
  });

  const list = document.getElementById('hospital-list');
  list.innerHTML = '';

  presets.forEach(h => {
    if (mapInstance) {
      L.marker([h.lat, h.lon], { icon: hospIcon })
       .addTo(mapInstance)
       .bindPopup(`<b>${h.name}</b><br>${h.dist} km (approx.)`);
    }

    const navUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name + ' Bhubaneswar')}`;
    const card = document.createElement('div');
    card.className = 'hospital-card';
    card.innerHTML = `
      <div class="hosp-icon">🏥</div>
      <div class="hosp-info">
        <div class="hosp-name">${h.name}</div>
        <div class="hosp-meta">
          <span>📍 ~${h.dist} km</span>
          <span>💰 ${h.cost}</span>
          <span>🏷️ ${h.type}</span>
        </div>
      </div>
      <a href="${navUrl}" target="_blank" class="hosp-nav">🗺️ Navigate</a>
    `;
    list.appendChild(card);
  });
}

/* ============================================================
   CHAT — Free Text + Multi-turn Context Management
   Rolling buffer: last 10 message exchanges
   ============================================================ */
function handleChatSend() {
  const text = chatInput.value.trim();
  if (!text) return;
  chatInput.value = '';
  handleFreeChat(text);
}

async function handleFreeChat(text) {
  hideWelcome();
  hideAllPanels();
  addUserMessage(text);
  await callClaudeAPI(text);
}

/* ── Claude API Call ─────────────────────────────────────────── */
async function callClaudeAPI(userText) {
  // Add to rolling history
  conversationHistory.push({ role: 'user', content: userText });

  // Keep last 10 turns (5 user + 5 assistant pairs)
  while (conversationHistory.length > 10) {
    conversationHistory.shift();
  }

  // Show typing
  const typingRow = addTypingIndicator();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `You are a Medical AI Assistant Chatbot — a knowledgeable, empathetic, and responsible health information resource. You help users understand symptoms, medical conditions, and general health guidance. You always:
- Provide factually accurate, evidence-based medical information
- Maintain a warm, calm, and professionally empathetic tone
- Structure responses clearly with headers or bullet points when helpful
- Recommend appropriate medical specialists when relevant
- **Always end every response with this disclaimer:** "⚠️ This information is for educational purposes only and does not constitute a clinical diagnosis. Always consult a qualified doctor for personal medical advice."
You do NOT provide specific drug dosages, prescriptions, or claims of diagnosing conditions. You encourage professional consultation for all health concerns.`,
        messages: conversationHistory
      })
    });

    typingRow.remove();

    if (!response.ok) {
      throw new Error(`API error ${response.status}`);
    }

    const data    = await response.json();
    const fullText = data.content
      .map(item => item.type === 'text' ? item.text : '')
      .filter(Boolean)
      .join('\n');

    // Add assistant reply to history
    conversationHistory.push({ role: 'assistant', content: fullText });
    while (conversationHistory.length > 10) conversationHistory.shift();

    // Render AI response
    renderAIResponse(fullText);

  } catch (err) {
    typingRow.remove();

    // Graceful offline fallback
    const fallback = localFallback(userText);
    conversationHistory.push({ role: 'assistant', content: fallback });
    renderAIResponse(fallback, true);
  }
}

/* ── Render AI Response ─────────────────────────────────────── */
function renderAIResponse(text, isOffline = false) {
  const card = document.createElement('div');
  card.className = 'ai-analysis';
  card.innerHTML = `
    <div class="ai-analysis-label">${isOffline ? '📴 Offline Mode' : '🤖 AI Analysis'}</div>
    <div class="ai-analysis-text">${formatMarkdown(text)}</div>
  `;

  const row = document.createElement('div');
  row.className = 'msg-row bot';
  row.innerHTML = `<div class="msg-avatar">🤖</div>`;
  row.appendChild(card);
  chatContainer.appendChild(row);
  scrollToBottom();

  // Post-response suggestions
  addSuggestionChips(['Check Symptoms', 'Find Hospitals', 'Tell me more'], chip => {
    if (chip === 'Check Symptoms') openSymptomMode();
    else if (chip === 'Find Hospitals') openHospitalMode();
    else handleFreeChat('Can you give me more detailed information?');
  });
}

/* ── Local Fallback (offline) ───────────────────────────────── */
function localFallback(text) {
  const lower = text.toLowerCase();
  for (const [key, dis] of Object.entries(medDB)) {
    if (lower.includes(dis.label.toLowerCase().split(' ')[0].toLowerCase()) ||
        dis.symptoms.some(s => lower.includes(s))) {
      return `📴 **Offline Mode** — AI service unavailable. Here is information from the local knowledge base:\n\n**${dis.icon} ${dis.label}**\n\n**Treatment:** ${dis.treatment}\n\n**Prevention:** ${dis.prevention}\n\n**Specialist:** ${dis.doctor}\n\n⚠️ This information is for educational purposes only and does not constitute a clinical diagnosis. Always consult a qualified doctor for personal medical advice.`;
    }
  }
  return `📴 **Offline Mode** — The AI service is currently unavailable. Please use the **Check Symptoms**, **Search Disease**, or **Find Hospitals** buttons for offline functionality.\n\n⚠️ This information is for educational purposes only. Always consult a qualified doctor for personal medical advice.`;
}

/* ── Minimal markdown formatter ─────────────────────────────── */
function formatMarkdown(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^### (.+)$/gm, '<h4 style="font-family:var(--font-display);font-size:0.88rem;font-weight:700;margin:0.5rem 0 0.2rem;color:var(--clr-primary)">$1</h4>')
    .replace(/^## (.+)$/gm, '<h3 style="font-family:var(--font-display);font-size:0.95rem;font-weight:700;margin:0.6rem 0 0.25rem;color:var(--clr-primary)">$1</h3>')
    .replace(/^# (.+)$/gm, '<h2 style="font-family:var(--font-display);font-size:1rem;font-weight:800;margin:0.6rem 0 0.25rem;color:var(--clr-primary)">$1</h2>')
    .replace(/^- (.+)$/gm, '<div style="padding-left:1rem;margin:0.15rem 0">• $1</div>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}

/* ============================================================
   CHAT HELPERS
   ============================================================ */
function addUserMessage(text) {
  hideWelcome();
  const row = document.createElement('div');
  row.className = 'msg-row user';
  row.innerHTML = `
    <div class="msg-avatar">👤</div>
    <div class="msg-bubble">${escapeHtml(text)}</div>
  `;
  chatContainer.appendChild(row);
  scrollToBottom();
}

function addBotMessage(text, suggLabels = [], suggCallback = null) {
  hideWelcome();
  const row = document.createElement('div');
  row.className = 'msg-row bot';
  row.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="msg-bubble">${formatMarkdown(text)}</div>
  `;
  chatContainer.appendChild(row);

  if (suggLabels && suggLabels.length > 0) {
    addSuggestionChips(suggLabels, suggCallback, row.querySelector('.msg-bubble'));
  }
  scrollToBottom();
}

function addSuggestionChips(labels, callback, container = null) {
  const wrap = document.createElement('div');
  wrap.className = 'suggestion-chips';
  labels.forEach(label => {
    const chip = document.createElement('button');
    chip.className = 'sugg-chip';
    chip.textContent = label;
    chip.addEventListener('click', () => {
      wrap.remove();
      if (callback) callback(label);
    });
    wrap.appendChild(chip);
  });

  if (container) {
    container.appendChild(wrap);
  } else {
    const lastRow = chatContainer.lastElementChild;
    if (lastRow) lastRow.querySelector('.msg-bubble')?.appendChild(wrap);
  }
  scrollToBottom();
}

function addTypingIndicator() {
  const row = document.createElement('div');
  row.className = 'msg-row bot';
  row.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="msg-bubble">
      <div class="typing-indicator">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
  chatContainer.appendChild(row);
  scrollToBottom();
  return row;
}

function scrollToBottom() {
  requestAnimationFrame(() => {
    chatContainer.scrollIntoView({ behavior: 'smooth', block: 'end' });
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ============================================================
   VOICE INPUT — Web Speech API
   Available in Chrome and Edge; hidden in unsupported browsers
   ============================================================ */
function setupVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    btnMic.classList.add('hidden');
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  let isRecording = false;

  btnMic.addEventListener('click', () => {
    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
      btnMic.classList.add('recording');
      btnMic.textContent = '⏹️';
      isRecording = true;
    }
  });

  recognition.onresult = e => {
    chatInput.value = e.results[0][0].transcript;
  };

  recognition.onend = () => {
    btnMic.classList.remove('recording');
    btnMic.textContent = '🎤';
    isRecording = false;
  };

  recognition.onerror = () => {
    btnMic.classList.remove('recording');
    btnMic.textContent = '🎤';
    isRecording = false;
  };
}
