/* ══════════════════════════════════════
   STAFF DATA (localStorage)
══════════════════════════════════════ */
const sampleStaff = [
  { id:'STF-00001', deptID:'DPT-004', name:'Dr. Alan Lau',        role:'Doctor',         phone:'012-2233445', email:'alan.lau@wzy.com',  dob:'12/05/1975', address:'1, Jalan Kiara, KL.' },
  { id:'STF-00002', deptID:'DPT-003', name:'Nurse Sarah Bee',      role:'Nurse',          phone:'017-8899001', email:'sarah.b@wzy.com',   dob:'22/08/1990', address:'45, Lorong Maju, PJ.' },
  { id:'STF-00003', deptID:'DPT-005', name:'Tan Wei Kiat',         role:'Pharmacist',     phone:'011-5544332', email:'wk.tan@wzy.com',    dob:'05/11/1988', address:'12, Jalan SS15, Subang.' },
  { id:'STF-00004', deptID:'DPT-001', name:'Dr. Lim Geok Eng',    role:'Doctor',         phone:'016-6677889', email:'geok.lim@wzy.com',  dob:'30/01/1968', address:'8, Condo Jaya, Cheras.' },
  { id:'STF-00005', deptID:'DPT-002', name:'Dr. Rajesh Kumar',    role:'Doctor',         phone:'014-1122334', email:'rajesh.k@wzy.com',  dob:'14/09/1982', address:'19, Jalan Ipoh, KL.' },
  { id:'STF-00006', deptID:'DPT-006', name:'Linda Chong',          role:'Lab Technician', phone:'013-9988776', email:'l.chong@wzy.com',   dob:'09/03/1995', address:'3, Taman Midah, KL.' },
  { id:'STF-00007', deptID:'DPT-003', name:'Rose Receptionist',    role:'Receptionist',   phone:'018-4455667', email:'rose.r@wzy.com',    dob:'18/12/1998', address:'22, Jalan Gasing, PJ.' },
  { id:'STF-00008', deptID:'DPT-007', name:'Dr. Sofia Ahmad',     role:'Doctor',         phone:'019-3344556', email:'sofia.a@wzy.com',   dob:'02/06/1985', address:'10, Villa 8, Shah Alam.' },
  { id:'STF-00009', deptID:'DPT-004', name:'Ahmad Fauzi',          role:'General Worker', phone:'012-7788990', email:'fauzi.a@wzy.com',   dob:'11/10/1980', address:'5, Kg Baru, KL.' },
  { id:'STF-00010', deptID:'DPT-010', name:'Catherine Teoh',       role:'Administrator',  phone:'017-2233114', email:'cath.t@wzy.com',    dob:'25/04/1978', address:'15, Jalan Bukit, PJ.' },
  { id:'STF-00011', deptID:'DPT-010', name:'LynzXuan',             role:'Administrator',  phone:'019-2122222', email:'lynz.x@wzy.com',    dob:'21/07/1999', address:'6, Jalan Sity, KL.' },
];

function initStaff() {
  if (!localStorage.getItem('staff')) {
    localStorage.setItem('staff', JSON.stringify(sampleStaff));
  }
}

function loadStaffDropdown(selectID, role) {
  const staff = JSON.parse(localStorage.getItem('staff') || '[]');
  const sel   = document.getElementById(selectID);
  const label = selectID === 'doctorID' ? '-- Assign Doctor --' : '-- Select Administrator --';
  sel.innerHTML = `<option value="">${label}</option>`;
  staff.filter(s => s.role === role).forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = `${s.id} – ${s.name}`;
    sel.appendChild(opt);
  });
}

initStaff();

/* ══════════════════════════════════════
   PATIENT DATA (localStorage)
══════════════════════════════════════ */
const samplePatients = [
  { id:'PAT-2025-001', ic:'850515-14-5231', name:'John Tan Ah Kao',        phone:'012-3456789', email:'john.tan@email.com',   gender:'Male',   dob:'15/05/1985', address:'12, Jalan SS2, Petaling Jaya, 47500, Selangor' },
  { id:'PAT-2025-002', ic:'900710-10-6482', name:'Siti Aminah Binti Ali',  phone:'017-6543210', email:'siti@email.com',        gender:'Female', dob:'10/07/1990', address:'5, Jalan Melati, Taman Melati, 53100, Kuala Lumpur' },
  { id:'PAT-2025-003', ic:'780322-07-3341', name:'Robert Low',              phone:'011-9988776', email:'rlow@email.com',        gender:'Male',   dob:'22/03/1978', address:'88, Lorong Bukit, Penang, 10050, Penang' },
  { id:'PAT-2025-004', ic:'000830-14-7823', name:'Priya Kaur',              phone:'014-4433221', email:'priya.k@email.com',     gender:'Female', dob:'30/08/2000', address:'3, Jalan Gasing, PJ, 46000, Selangor' },
  { id:'PAT-2025-005', ic:'651212-10-4412', name:'David Lim Teck Wee',     phone:'018-6655443', email:'davidlim@email.com',    gender:'Male',   dob:'12/12/1965', address:'21, Condo Ria, Subang, 40150, Selangor' },
  { id:'PAT-2025-006', ic:'820105-14-2293', name:'Mike Wong',               phone:'013-1112223', email:'mike.w@email.com',      gender:'Male',   dob:'05/01/1982', address:'10, Kg Baru, Ampang, 68000, Selangor' },
  { id:'PAT-2025-007', ic:'950709-10-8834', name:'Nurul Huda',              phone:'013-4445556', email:'nurul.h@email.com',     gender:'Female', dob:'09/07/1995', address:'10, Kg Baru, Selayang, 68100, Selangor' },
  { id:'PAT-2025-008', ic:'820325-14-5567', name:'Kevin Raj',               phone:'019-7778889', email:'kevin@email.com',       gender:'Male',   dob:'25/03/1982', address:'2, Villa 22, Shah Alam, 40150, Selangor' },
  { id:'PAT-2025-009', ic:'901114-08-3312', name:'Chong Wei Ling',          phone:'012-5554433', email:'wling@email.com',       gender:'Female', dob:'14/11/1990', address:'Green Lane, Ipoh, 31400, Perak' },
  { id:'PAT-2025-010', ic:'750306-14-6601', name:'Sarah Jenkins',           phone:'011-3332211', email:'sarah.j@email.com',     gender:'Female', dob:'06/03/1975', address:'9, Residency, Cyberjaya, 63000, Selangor' },
];

function initPatients() {
  if (!localStorage.getItem('patients')) {
    localStorage.setItem('patients', JSON.stringify(samplePatients));
  }
}

/* ══════════════════════════════════════
   BOOKING DATA (localStorage)
══════════════════════════════════════ */
const sampleBookings = [
  { id:'APT-20250406-001', patientID:'PAT-2025-001', type:'Appointment', date:'07/04/2025', time:'09:00 AM', dept:'DPT-004', reason:'Routine check-up and blood pressure monitoring.' },
  { id:'APT-20250406-002', patientID:'PAT-2025-002', type:'Appointment', date:'07/04/2025', time:'10:00 AM', dept:'DPT-008', reason:'Follow-up on previous gynaecology consultation.' },
  { id:'APT-20250406-003', patientID:'PAT-2025-004', type:'Appointment', date:'08/04/2025', time:'02:30 PM', dept:'DPT-001', reason:'Chest discomfort, requested cardiology review.' },
  { id:'APT-20250406-004', patientID:'PAT-2025-007', type:'Appointment', date:'08/04/2025', time:'11:00 AM', dept:'DPT-009', reason:'Persistent headache and dizziness for 2 weeks.' },
  { id:'APT-20250406-005', patientID:'PAT-2025-003', type:'Emergency',   date:'06/04/2025', time:'',         dept:'DPT-007', reason:'Fell down stairs, suspected fracture on left leg.' },
  { id:'APT-20250406-006', patientID:'PAT-2025-006', type:'Emergency',   date:'06/04/2025', time:'',         dept:'DPT-001', reason:'Severe chest pain and shortness of breath.' },
  { id:'APT-20250406-007', patientID:'PAT-2025-005', type:'Walk-In',     date:'06/04/2025', time:'',         dept:'DPT-004', reason:'High fever for 3 days, requesting consultation.' },
  { id:'APT-20250406-008', patientID:'PAT-2025-008', type:'Walk-In',     date:'06/04/2025', time:'',         dept:'DPT-006', reason:'Needs X-ray for knee pain.' },
  { id:'APT-20250406-009', patientID:'PAT-2025-010', type:'Walk-In',     date:'06/04/2025', time:'',         dept:'DPT-004', reason:'General health screening requested.' },
];

function initBookings() {
  if (!localStorage.getItem('bookings')) {
    localStorage.setItem('bookings', JSON.stringify(sampleBookings));
  }
}

initBookings();

function loadPatientDropdown(filteredList) {
  const patients = filteredList || JSON.parse(localStorage.getItem('patients') || '[]');
  const sel = document.getElementById('patientID');
  sel.innerHTML = '<option value="">-- Select Patient --</option>';
  patients.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.id} – ${p.name}`;
    sel.appendChild(opt);
  });
}

function fillPatientInfo() {
  const id       = document.getElementById('patientID').value;
  const patients = JSON.parse(localStorage.getItem('patients') || '[]');
  const patient  = patients.find(p => p.id === id);
  const fields   = ['patientName','patientPhone','patientEmail','patientGender','patientDOB','patientAddress'];

  if (patient) {
    document.getElementById('patientName').value    = patient.name;
    document.getElementById('patientPhone').value   = patient.phone;
    document.getElementById('patientEmail').value   = patient.email;
    document.getElementById('patientGender').value  = patient.gender;
    document.getElementById('patientDOB').value     = patient.dob;
    document.getElementById('patientAddress').value = patient.address;
    fields.forEach(f => clearError(f));
  } else {
    fields.forEach(f => { document.getElementById(f).value = ''; });
  }
  clearError('patientID');
}

initPatients();

/* ══════════════════════════════════════
   FLATPICKR – DATE FIELDS
══════════════════════════════════════ */
flatpickr('#patientDOB', {
  dateFormat: 'd/m/Y',
  maxDate: 'today',
  allowInput: false,
});

flatpickr('#admissionDate', {
  dateFormat: 'd/m/Y',
  allowInput: false,
});

flatpickr('#dischargeDate', {
  dateFormat: 'd/m/Y',
  allowInput: false,
});

/* ══════════════════════════════════════
   DATE & TREATMENT ID
══════════════════════════════════════ */
const today = new Date();
const fmt = d => d.toString().padStart(2, '0');
const dateStr = `${fmt(today.getDate())}/${fmt(today.getMonth() + 1)}/${today.getFullYear()}`;
document.getElementById('displayDate').textContent = dateStr;

function formatTRTDate() {
  const d = today;
  return `${d.getFullYear()}${fmt(d.getMonth() + 1)}${fmt(d.getDate())}`;
}

function formatTID(counter) {
  return `TRT-${formatTRTDate()}-${counter.toString().padStart(5, '0')}`;
}

// Page load: just read the next available number, do NOT increment
let currentCounter = parseInt(localStorage.getItem('treatmentCounter') || '1');
let currentTreatmentID = formatTID(currentCounter);
document.getElementById('treatmentID').textContent = currentTreatmentID;

loadPatientDropdown();
loadStaffDropdown('doctorID', 'Doctor');
loadStaffDropdown('administratorID', 'Administrator');
loadRoomDropdown();

/* ══════════════════════════════════════
   ROOM & BED DROPDOWNS (Admission)
══════════════════════════════════════ */
const defaultRooms = [
  {
    id:'R101', floor:1, type:'General Ward', dailyRate:100,
    beds:[
      { bedID:'B01', status:'Occupied',    patientID:'PAT-2025-001', admissionDate:'01/04/2026' },
      { bedID:'B02', status:'Available' },
      { bedID:'B03', status:'Available' },
      { bedID:'B04', status:'Occupied',    patientID:'PAT-2025-003', admissionDate:'06/04/2026' },
    ]
  },
  {
    id:'R102', floor:1, type:'General Ward', dailyRate:100,
    beds:[
      { bedID:'B01', status:'Available' },
      { bedID:'B02', status:'Maintenance' },
      { bedID:'B03', status:'Available' },
      { bedID:'B04', status:'Available' },
    ]
  },
  {
    id:'R201', floor:2, type:'Private Room', dailyRate:250,
    beds:[
      { bedID:'B01', status:'Occupied', patientID:'PAT-2025-006', admissionDate:'05/04/2026' },
    ]
  },
  {
    id:'R202', floor:2, type:'Private Room', dailyRate:250,
    beds:[
      { bedID:'B01', status:'Available' },
    ]
  },
  {
    id:'R301', floor:3, type:'ICU', dailyRate:500,
    beds:[
      { bedID:'B01', status:'Occupied',    patientID:'PAT-2025-005', admissionDate:'03/04/2026' },
      { bedID:'B02', status:'Occupied',    patientID:'PAT-2025-008', admissionDate:'07/04/2026' },
      { bedID:'B03', status:'Maintenance' },
      { bedID:'B04', status:'Available' },
      { bedID:'B05', status:'Available' },
      { bedID:'B06', status:'Available' },
    ]
  },
];

function initRoomsData() {
  if (!localStorage.getItem('rooms')) {
    localStorage.setItem('rooms', JSON.stringify(defaultRooms));
  }
}

function getRoomsData() {
  return JSON.parse(localStorage.getItem('rooms') || '[]');
}

initRoomsData();

function loadRoomDropdown() {
  const rooms = getRoomsData();
  const sel   = document.getElementById('roomID');
  sel.innerHTML = '<option value="">-- Select Room --</option>';
  rooms.forEach(r => {
    const availCount = r.beds.filter(b => b.status === 'Available').length;
    if (availCount === 0) return;
    const opt = document.createElement('option');
    opt.value = r.id;
    opt.textContent = `${r.id} – ${r.type} (Floor ${r.floor}) · ${availCount} bed${availCount !== 1 ? 's' : ''} available`;
    sel.appendChild(opt);
  });
}

function loadAvailableBeds() {
  const roomID = document.getElementById('roomID').value;
  const bedSel = document.getElementById('bedID');
  clearError('roomID');

  if (!roomID) {
    bedSel.innerHTML = '<option value="">-- Select Room First --</option>';
    recalcPayment();
    return;
  }

  const room      = getRoomsData().find(r => r.id === roomID);
  const availBeds = room ? room.beds.filter(b => b.status === 'Available') : [];

  if (availBeds.length === 0) {
    bedSel.innerHTML = '<option value="">No available beds in this room</option>';
  } else {
    bedSel.innerHTML = '<option value="">-- Select Bed --</option>' +
      availBeds.map(b => `<option value="${b.bedID}">${b.bedID}</option>`).join('');
  }

  recalcPayment();
}


/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */

const medicines = [
  { id: 'M001', name: 'Paracetamol 500mg',  price: 5  },
  { id: 'M002', name: 'Amoxicillin 250mg',  price: 15 },
  { id: 'M003', name: 'Ibuprofen 400mg',    price: 8  },
  { id: 'M004', name: 'Metformin 500mg',    price: 12 },
  { id: 'M005', name: 'Atorvastatin 20mg',  price: 25 },
  { id: 'M006', name: 'Omeprazole 20mg',    price: 18 },
];

const dosageOptions = [
  { label: '100mg', price: 2  },
  { label: '250mg', price: 5  },
  { label: '500mg', price: 8  },
  { label: '1g',    price: 12 },
  { label: '5ml',   price: 4  },
  { label: '10ml',  price: 7  },
  { label: '15ml',  price: 10 },
];
const freqOptions   = ['Once daily', 'Twice daily', 'Three times daily', 'Every 8 hours', 'Every 6 hours', 'As needed'];



/* ══════════════════════════════════════
   CONSULTATION TYPE – FILTER PATIENTS
══════════════════════════════════════ */
function onConsultTypeChange() {
  const type     = document.getElementById('consultType').value;
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  const patients = JSON.parse(localStorage.getItem('patients') || '[]');

  // Reset patient selection
  document.getElementById('patientID').value = '';
  ['patientName','patientPhone','patientEmail','patientGender','patientDOB','patientAddress']
    .forEach(f => { document.getElementById(f).value = ''; });

  if (!type) {
    loadPatientDropdown(); // show all if nothing selected
    return;
  }

  // Filter patients who have a booking of the selected type
  const bookedIDs = bookings.filter(b => b.type === type).map(b => b.patientID);
  const filtered  = patients.filter(p => bookedIDs.includes(p.id));
  loadPatientDropdown(filtered);

  clearError('consultType');

  // Show the admission toggle row; auto-check for Emergency
  document.getElementById('admToggleRow').classList.remove('hidden');
  const cb = document.getElementById('requiresAdmission');
  cb.checked = (type === 'Emergency');
  toggleAdmission();
}

/* ══════════════════════════════════════
   ADMISSION SECTION TOGGLE
══════════════════════════════════════ */
function toggleAdmission() {
  const checked = document.getElementById('requiresAdmission').checked;
  document.getElementById('admissionSection').classList.toggle('hidden', !checked);
  recalcPayment();
}


/* ══════════════════════════════════════
   PRESCRIPTION ROWS
══════════════════════════════════════ */
let rowCounter = 0;

function buildRowHTML(num) {
  const medOptions  = medicines.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
  const dosOpts     = dosageOptions.map(d => `<option value="${d.label}">${d.label}</option>`).join('');
  const freqOpts    = freqOptions.map(f => `<option>${f}</option>`).join('');
  const todayVal    = `${today.getFullYear()}-${fmt(today.getMonth() + 1)}-${fmt(today.getDate())}`;

  return `
    <td class="row-num">${num}.</td>
    <td>
      <select>
        <option value="">Select medicine</option>
        ${medOptions}
      </select>
    </td>
    <td>
      <select>
        <option value="">-- Dosage --</option>
        ${dosOpts}
      </select>
    </td>
    <td>
      <select>
        <option value="">-- Frequency --</option>
        ${freqOpts}
      </select>
    </td>
    <td><input type="date" value="${todayVal}" /></td>
    <td><input type="date" /></td>
    <td class="no-print">
      <button class="btn-remove-row" onclick="removeRow(this)" title="Remove row">&#10005;</button>
    </td>
  `;
}

function addPrescriptionRow() {
  rowCounter++;
  const tr = document.createElement('tr');
  tr.innerHTML = buildRowHTML(rowCounter);
  document.getElementById('prescriptionBody').appendChild(tr);
  renumberRows();
}

function removeRow(btn) {
  const rows = document.querySelectorAll('#prescriptionBody tr');
  if (rows.length <= 1) return; // keep at least 1 row
  btn.closest('tr').remove();
  renumberRows();
  recalcPayment();
}

function renumberRows() {
  document.querySelectorAll('#prescriptionBody tr').forEach((tr, i) => {
    tr.querySelector('.row-num').textContent = (i + 1) + '.';
  });
}

// Init with 4 rows
for (let i = 0; i < 4; i++) addPrescriptionRow();


/* ══════════════════════════════════════
   PAYMENT AUTO CALCULATION
══════════════════════════════════════ */
const PRICING = {
  consultation: { 'Appointment': 50, 'Walk-In': 80, 'Emergency': 150 },
  treatment:    { 'Medication': 30, 'Surgery': 500, 'Physical Therapy': 80, 'Observation': 50, 'Diagnostic Test': 120, 'Counseling': 60 },
  room: { 'R101': 100, 'R102': 100, 'R201': 250, 'R202': 250, 'R301': 500 },
};

function parseDMY(str) {
  // Accepts dd/mm/yyyy or yyyy-mm-dd
  if (!str) return null;
  if (str.includes('-')) {
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
  const [d, m, y] = str.split('/').map(Number);
  return new Date(y, m - 1, d);
}

function recalcPayment() {
  const consultType  = document.getElementById('consultType').value;
  const treatMethod  = document.getElementById('treatmentMethod').value;
  const roomID       = document.getElementById('roomID').value;
  const admDate      = document.getElementById('admissionDate').value;
  const disDate      = document.getElementById('dischargeDate').value;
  const isAdmission  = !document.getElementById('admissionSection').classList.contains('hidden');

  const items = [];

  // 1. Consultation fee
  if (consultType && PRICING.consultation[consultType] !== undefined) {
    items.push({ label: `Consultation (${consultType})`, amount: PRICING.consultation[consultType] });
  }

  // 2. Treatment method fee
  if (treatMethod && PRICING.treatment[treatMethod] !== undefined) {
    items.push({ label: `Treatment – ${treatMethod}`, amount: PRICING.treatment[treatMethod] });
  }

  // 3. Medicine rows – per medicine + per dosage pricing
  document.querySelectorAll('#prescriptionBody tr').forEach(tr => {
    const medSel    = tr.querySelector('td:nth-child(2) select');
    const dosageSel = tr.querySelector('td:nth-child(3) select');
    if (!medSel || !medSel.value) return;
    const med    = medicines.find(m => m.id === medSel.value);
    const dosage = dosageOptions.find(d => d.label === dosageSel.value);
    if (!med) return;
    const rowTotal = med.price + (dosage ? dosage.price : 0);
    const dosageNote = dosage ? ` · ${dosage.label}` : '';
    items.push({ label: `${med.name}${dosageNote}`, amount: rowTotal });
  });

  // 4. Room / admission fee
  if (isAdmission && roomID && PRICING.room[roomID] !== undefined) {
    let days = 1;
    const d1 = parseDMY(admDate);
    const d2 = parseDMY(disDate);
    if (d1 && d2 && d2 > d1) {
      days = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
    }
    const roomLabel = document.getElementById('roomID').options[document.getElementById('roomID').selectedIndex].text.split('–')[0].trim();
    items.push({ label: `Room ${roomLabel} × ${days} day${days > 1 ? 's' : ''} (RM ${PRICING.room[roomID]}/day)`, amount: days * PRICING.room[roomID] });
  }

  const total = items.reduce((s, i) => s + i.amount, 0);

  // Render breakdown
  const breakdownEl = document.getElementById('costBreakdown');
  const rowsEl      = document.getElementById('breakdownRows');
  const totalEl     = document.getElementById('breakdownTotal');

  if (items.length === 0) {
    breakdownEl.classList.add('hidden');
    document.getElementById('payAmount').value = '';
    return;
  }

  breakdownEl.classList.remove('hidden');
  rowsEl.innerHTML = items.map(i =>
    `<div class="breakdown-row"><span class="row-label">${i.label}</span><span class="row-val">RM ${i.amount.toFixed(2)}</span></div>`
  ).join('');
  totalEl.textContent = `RM ${total.toFixed(2)}`;

  // Auto-fill the amount field
  document.getElementById('payAmount').value = total.toFixed(2);
  clearError('payAmount');
}

// Attach recalc listeners
['consultType','treatmentMethod','roomID','admissionDate','dischargeDate'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('change', recalcPayment);
    el.addEventListener('input',  recalcPayment);
  }
});

// Watch prescription medicine selects (delegated — handles dynamic rows)
document.getElementById('prescriptionBody').addEventListener('change', function(e) {
  if (e.target.tagName === 'SELECT' && e.target.closest('td:nth-child(2)')) recalcPayment();
  // Also recalc when any medicine cell changes (simpler: just recalc on any select change inside tbody)
  recalcPayment();
});


/* ══════════════════════════════════════
   INLINE VALIDATION
══════════════════════════════════════ */
function setError(id, msg) {
  const el    = document.getElementById(id);
  const field = el.closest('.field');
  field.classList.add('has-error');

  let err = field.querySelector('.error-msg');
  if (!err) {
    err = document.createElement('span');
    err.className = 'error-msg';
    field.appendChild(err);
  }
  err.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${msg}`;
}

function clearError(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const field = el.closest('.field');
  if (!field) return;
  field.classList.remove('has-error');
  const err = field.querySelector('.error-msg');
  if (err) err.textContent = '';
}

// Attach clear-on-change listeners to all inputs/selects/textareas
document.querySelectorAll('input, select, textarea').forEach(el => {
  el.addEventListener('input',  () => { if (el.id) clearError(el.id); });
  el.addEventListener('change', () => { if (el.id) clearError(el.id); });
});


/* ══════════════════════════════════════
   SUBMIT
══════════════════════════════════════ */
function submitForm() {
  const isAdmission = !document.getElementById('admissionSection').classList.contains('hidden');

  const requiredFields = [
    { id: 'patientID',       label: 'Patient ID' },
    { id: 'patientName',     label: 'Patient Name' },
    { id: 'patientPhone',    label: 'Phone' },
    { id: 'patientGender',   label: 'Gender' },
    { id: 'patientDOB',      label: 'Date of Birth' },
    { id: 'patientEmail',    label: 'Email' },
    { id: 'doctorID',        label: 'Doctor' },
    { id: 'consultType',     label: 'Consultation Type' },
    { id: 'treatmentMethod', label: 'Treatment Method' },
    { id: 'treatmentStatus', label: 'Treatment Status' },
    { id: 'administratorID', label: 'Administrator ID' },
    { id: 'payMethod',       label: 'Payment Method' },
    { id: 'payAmount',       label: 'Amount' },
    { id: 'payStatus',       label: 'Payment Status' },
  ];

  if (isAdmission) {
    // Only date and reason are required; room/bed are optional preferences
    requiredFields.push(
      { id: 'admissionDate',   label: 'Admission Date' },
      { id: 'admissionReason', label: 'Admission Reason' },
    );
  }

  let hasError = false;

  requiredFields.forEach(f => {
    const el = document.getElementById(f.id);
    if (!el.value.trim()) {
      setError(f.id, `${f.label} is required.`);
      hasError = true;
    } else {
      clearError(f.id);
    }
  });

  if (hasError) {
    const firstError = document.querySelector('.has-error');
    if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // Save pending admission request if applicable
  if (isAdmission) {
    const patID    = document.getElementById('patientID').value;
    const admDate  = document.getElementById('admissionDate').value;
    const reason   = document.getElementById('admissionReason').value;
    const roomPref = document.getElementById('roomID').value || null;
    const bedPref  = document.getElementById('bedID').value  || null;

    const pending  = JSON.parse(localStorage.getItem('pendingAdmissions') || '[]');
    const filtered = pending.filter(p => p.patientID !== patID); // replace if exists
    filtered.push({
      patientID:      patID,
      treatmentID:    currentTreatmentID,
      admissionDate:  admDate,
      admissionReason: reason,
      preferredRoomID: roomPref,
      preferredBedID:  bedPref,
    });
    localStorage.setItem('pendingAdmissions', JSON.stringify(filtered));
  }

  // Show success banner with the submitted ID
  document.getElementById('successTreatmentID').textContent =
    `Treatment ID: ${currentTreatmentID} has been recorded.`;
  const banner = document.getElementById('successBanner');
  banner.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Save current as used, advance to next
  localStorage.setItem('treatmentCounter', currentCounter + 1);
  currentCounter = currentCounter + 1;
  currentTreatmentID = formatTID(currentCounter);
  document.getElementById('treatmentID').textContent = currentTreatmentID;

  clearForm();
}


/* ══════════════════════════════════════
   CLEAR / CANCEL / PRINT
══════════════════════════════════════ */
function clearForm() {
  // Reset all inputs except displayDate and treatmentID
  document.querySelectorAll('input:not(#displayDate), select, textarea').forEach(el => {
    el.value = '';
  });

  // Reset dropdowns
  document.getElementById('consultType').selectedIndex = 0;
  document.getElementById('doctorID').selectedIndex = 0;
  loadPatientDropdown();

  // Hide admission toggle and section
  document.getElementById('admToggleRow').classList.add('hidden');
  document.getElementById('requiresAdmission').checked = false;
  document.getElementById('admissionSection').classList.add('hidden');

  // Reset room/bed dropdowns
  loadRoomDropdown();
  document.getElementById('bedID').innerHTML = '<option value="">-- Select Room First --</option>';

  // Hide cost breakdown
  document.getElementById('costBreakdown').classList.add('hidden');
  document.getElementById('payAmount').value = '';

  // Clear all error states
  document.querySelectorAll('.has-error').forEach(f => f.classList.remove('has-error'));
  document.querySelectorAll('.error-msg').forEach(e => e.textContent = '');

  // Reset prescription rows
  document.getElementById('prescriptionBody').innerHTML = '';
  rowCounter = 0;
  for (let i = 0; i < 4; i++) addPrescriptionRow();
}

function cancelForm() {
  if (confirm('Cancel and discard all entries?')) window.location.href = '../index.html';
}

function dismissBanner() {
  document.getElementById('successBanner').classList.add('hidden');
}

function printReceipt() {
  window.print();
}
