/* ══════════════════════════════════════
   CACHED DATA
══════════════════════════════════════ */
let allStaff    = [];
let allPatients = [];
let allBookings = [];
let allRooms    = [];

/* ══════════════════════════════════════
   STAFF DROPDOWN
══════════════════════════════════════ */
function loadStaffDropdown(selectID, role) {
  const sel   = document.getElementById(selectID);
  const label = selectID === 'doctorID' ? '-- Assign Doctor --' : '-- Select Administrator --';
  sel.innerHTML = `<option value="">${label}</option>`;
  allStaff.filter(s => s.role === role).forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = `${s.id} – ${s.name}`;
    sel.appendChild(opt);
  });
}

/* ══════════════════════════════════════
   PATIENT DROPDOWN & AUTOFILL
══════════════════════════════════════ */
function loadPatientDropdown(filteredList) {
  const patients = filteredList || allPatients;
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
  const id      = document.getElementById('patientID').value;
  const patient = allPatients.find(p => p.id === id);
  const fields  = ['patientName','patientPhone','patientEmail','patientGender','patientDOB','patientAddress'];

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

/* ══════════════════════════════════════
   FLATPICKR – DATE FIELDS
══════════════════════════════════════ */
flatpickr('#patientDOB', {
  dateFormat: 'd/m/Y',
  maxDate: 'today',
  allowInput: false,
});

const admissionPicker = flatpickr('#admissionDate', {
  dateFormat: 'd/m/Y',
  minDate: 'today',
  allowInput: false,
  onChange(selectedDates) {
    if (selectedDates[0]) {
      dischargePicker.set('minDate', selectedDates[0]);
      const dis = dischargePicker.selectedDates[0];
      if (dis && dis < selectedDates[0]) dischargePicker.clear();
    }
  },
});

const dischargePicker = flatpickr('#dischargeDate', {
  dateFormat: 'd/m/Y',
  minDate: 'today',
  allowInput: false,
});

/* ══════════════════════════════════════
   DATE & TREATMENT ID
══════════════════════════════════════ */
const today = new Date();
const fmt = d => d.toString().padStart(2, '0');
const dateStr = `${fmt(today.getDate())}/${fmt(today.getMonth() + 1)}/${today.getFullYear()}`;
document.getElementById('displayDate').textContent = dateStr;
document.getElementById('payDate').value = dateStr;

function formatTRTDate() {
  const d = today;
  return `${d.getFullYear()}${fmt(d.getMonth() + 1)}${fmt(d.getDate())}`;
}

function formatTID(counter) {
  return `TRT-${formatTRTDate()}-${counter.toString().padStart(5, '0')}`;
}

let currentCounter     = 1;
let currentTreatmentID = formatTID(currentCounter);

/* ══════════════════════════════════════
   ROOM & BED DROPDOWNS (Admission)
══════════════════════════════════════ */
function loadRoomDropdown() {
  const sel = document.getElementById('roomID');
  sel.innerHTML = '<option value="">-- Select Room --</option>';
  allRooms.forEach(r => {
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

  const room      = allRooms.find(r => r.id === roomID);
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
const freqOptions = ['Once daily', 'Twice daily', 'Three times daily', 'Every 8 hours', 'Every 6 hours', 'As needed'];

/* ══════════════════════════════════════
   CONSULTATION TYPE – FILTER PATIENTS
══════════════════════════════════════ */
function onConsultTypeChange() {
  const type = document.getElementById('consultType').value;

  // Reset patient selection
  document.getElementById('patientID').value = '';
  ['patientName','patientPhone','patientEmail','patientGender','patientDOB','patientAddress']
    .forEach(f => { document.getElementById(f).value = ''; });

  if (!type) {
    loadPatientDropdown();
    return;
  }

  const bookedIDs = allBookings.filter(b => b.type === type).map(b => b.patientID);
  const filtered  = allPatients.filter(p => bookedIDs.includes(p.id));
  loadPatientDropdown(filtered);

  clearError('consultType');

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
  const medOptions = medicines.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
  const dosOpts    = dosageOptions.map(d => `<option value="${d.label}">${d.label}</option>`).join('');
  const freqOpts   = freqOptions.map(f => `<option>${f}</option>`).join('');
  const todayVal   = `${today.getFullYear()}-${fmt(today.getMonth() + 1)}-${fmt(today.getDate())}`;

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
    <td><input type="date" value="${todayVal}" min="${todayVal}" onchange="syncEndDateMin(this)" /></td>
    <td><input type="date" min="${todayVal}" onchange="validateEndDate(this)" /></td>
    <td class="no-print">
      <button class="btn-remove-row" onclick="removeRow(this)" title="Remove row">&#10005;</button>
    </td>
  `;
}

function syncEndDateMin(startInput) {
  const tr       = startInput.closest('tr');
  const endInput = tr.querySelectorAll('input[type="date"]')[1];
  endInput.min   = startInput.value;
  if (endInput.value && endInput.value < startInput.value) endInput.value = '';
}

function validateEndDate(endInput) {
  const tr         = endInput.closest('tr');
  const startInput = tr.querySelectorAll('input[type="date"]')[0];
  if (endInput.value && startInput.value && endInput.value < startInput.value) {
    endInput.value = '';
  }
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
  if (rows.length <= 1) return;
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
};

function parseDMY(str) {
  if (!str) return null;
  if (str.includes('-')) {
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
  const [d, m, y] = str.split('/').map(Number);
  return new Date(y, m - 1, d);
}

function recalcPayment() {
  const consultType = document.getElementById('consultType').value;
  const treatMethod = document.getElementById('treatmentMethod').value;
  const roomID      = document.getElementById('roomID').value;
  const admDate     = document.getElementById('admissionDate').value;
  const disDate     = document.getElementById('dischargeDate').value;
  const isAdmission = !document.getElementById('admissionSection').classList.contains('hidden');

  const items = [];

  if (consultType && PRICING.consultation[consultType] !== undefined) {
    items.push({ label: `Consultation (${consultType})`, amount: PRICING.consultation[consultType] });
  }

  if (treatMethod && PRICING.treatment[treatMethod] !== undefined) {
    items.push({ label: `Treatment – ${treatMethod}`, amount: PRICING.treatment[treatMethod] });
  }

  document.querySelectorAll('#prescriptionBody tr').forEach(tr => {
    const medSel    = tr.querySelector('td:nth-child(2) select');
    const dosageSel = tr.querySelector('td:nth-child(3) select');
    if (!medSel || !medSel.value) return;
    const med    = medicines.find(m => m.id === medSel.value);
    const dosage = dosageOptions.find(d => d.label === dosageSel.value);
    if (!med) return;
    const rowTotal    = med.price + (dosage ? dosage.price : 0);
    const dosageNote  = dosage ? ` · ${dosage.label}` : '';
    items.push({ label: `${med.name}${dosageNote}`, amount: rowTotal });
  });

  if (isAdmission && roomID) {
    const room = allRooms.find(r => r.id === roomID);
    const rate = room ? room.dailyRate : 0;
    if (rate > 0) {
      let days = 1;
      const d1 = parseDMY(admDate);
      const d2 = parseDMY(disDate);
      if (d1 && d2 && d2 > d1) {
        days = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
      }
      const roomLabel = document.getElementById('roomID').options[document.getElementById('roomID').selectedIndex].text.split('–')[0].trim();
      items.push({ label: `Room ${roomLabel} × ${days} day${days > 1 ? 's' : ''} (RM ${rate}/day)`, amount: days * rate });
    }
  }

  const total = items.reduce((s, i) => s + i.amount, 0);

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

document.getElementById('prescriptionBody').addEventListener('change', function() {
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

document.querySelectorAll('input, select, textarea').forEach(el => {
  el.addEventListener('input',  () => { if (el.id) clearError(el.id); });
  el.addEventListener('change', () => { if (el.id) clearError(el.id); });
});

/* ══════════════════════════════════════
   SUBMIT
══════════════════════════════════════ */
async function submitForm() {
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

  showLoading();
  try {
    const treatment = {
      id:              currentTreatmentID,
      patientID:       document.getElementById('patientID').value,
      doctorID:        document.getElementById('doctorID').value,
      administratorID: document.getElementById('administratorID').value,
      consultType:     document.getElementById('consultType').value,
      treatmentMethod: document.getElementById('treatmentMethod').value,
      treatmentStatus: document.getElementById('treatmentStatus').value,
      payMethod:       document.getElementById('payMethod').value,
      payAmount:       document.getElementById('payAmount').value,
      payStatus:       document.getElementById('payStatus').value,
      payDate:         document.getElementById('payDate').value,
      date:            dateStr,
    };

    await dbSaveTreatment(treatment);
    await dbIncrementCounter('treatmentCounter');

    if (isAdmission) {
      const patID    = document.getElementById('patientID').value;
      const admDate  = document.getElementById('admissionDate').value;
      const disDate  = document.getElementById('dischargeDate').value;
      const reason   = document.getElementById('admissionReason').value;
      const roomPref = document.getElementById('roomID').value  || null;
      const bedPref  = document.getElementById('bedID').value   || null;

      await dbSavePendingAdmission({
        patientID:       patID,
        treatmentID:     currentTreatmentID,
        admissionDate:   admDate,
        dischargeDate:   disDate || null,
        admissionReason: reason,
        preferredRoomID: roomPref,
        preferredBedID:  bedPref,
      });
    }

    document.getElementById('successTreatmentID').textContent =
      `Treatment ID: ${currentTreatmentID} has been recorded.`;
    document.getElementById('successBanner').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    currentCounter++;
    currentTreatmentID = formatTID(currentCounter);
    document.getElementById('treatmentID').textContent = currentTreatmentID;

    clearForm();
  } catch (e) {
    alert('Failed to save treatment. Please check your connection and try again.');
    console.error(e);
  } finally {
    hideLoading();
  }
}

/* ══════════════════════════════════════
   CLEAR / CANCEL / PRINT
══════════════════════════════════════ */
function clearForm() {
  document.querySelectorAll('input:not(#displayDate), select, textarea').forEach(el => {
    el.value = '';
  });

  document.getElementById('consultType').selectedIndex = 0;
  document.getElementById('doctorID').selectedIndex = 0;
  loadPatientDropdown();

  document.getElementById('admToggleRow').classList.add('hidden');
  document.getElementById('requiresAdmission').checked = false;
  document.getElementById('admissionSection').classList.add('hidden');

  loadRoomDropdown();
  document.getElementById('bedID').innerHTML = '<option value="">-- Select Room First --</option>';

  document.getElementById('costBreakdown').classList.add('hidden');
  document.getElementById('payAmount').value = '';
  document.getElementById('payDate').value   = dateStr;

  document.querySelectorAll('.has-error').forEach(f => f.classList.remove('has-error'));
  document.querySelectorAll('.error-msg').forEach(e => e.textContent = '');

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

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
async function init() {
  showLoading();
  try {
    await seedAll();
    [allStaff, allPatients, allBookings, allRooms] = await Promise.all([
      dbGetStaff(),
      dbGetPatients(),
      dbGetBookings(),
      dbGetRooms(),
    ]);
    currentCounter     = await dbGetCounter('treatmentCounter');
    currentTreatmentID = formatTID(currentCounter);
    document.getElementById('treatmentID').textContent = currentTreatmentID;
    loadPatientDropdown();
    loadStaffDropdown('doctorID', 'Doctor');
    loadStaffDropdown('administratorID', 'Administrator');
    loadRoomDropdown();
  } catch (e) {
    console.error('Failed to load data:', e);
  } finally {
    hideLoading();
  }
}

init();
