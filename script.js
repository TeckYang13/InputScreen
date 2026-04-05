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


/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */

const medicines = [
  { id: 'M001', name: 'Paracetamol 500mg' },
  { id: 'M002', name: 'Amoxicillin 250mg' },
  { id: 'M003', name: 'Ibuprofen 400mg' },
  { id: 'M004', name: 'Metformin 500mg' },
  { id: 'M005', name: 'Atorvastatin 20mg' },
  { id: 'M006', name: 'Omeprazole 20mg' },
];

const dosageOptions = ['100mg', '250mg', '500mg', '1g', '5ml', '10ml', '15ml'];
const freqOptions   = ['Once daily', 'Twice daily', 'Three times daily', 'Every 8 hours', 'Every 6 hours', 'As needed'];



/* ══════════════════════════════════════
   ADMISSION SECTION TOGGLE
══════════════════════════════════════ */
function toggleAdmission() {
  const type    = document.getElementById('consultType').value;
  const section = document.getElementById('admissionSection');
  const showTypes = ['Emergency', 'Inpatient'];

  if (showTypes.includes(type)) {
    section.classList.remove('hidden');
  } else {
    section.classList.add('hidden');
  }
  clearError('consultType');
}


/* ══════════════════════════════════════
   PRESCRIPTION ROWS
══════════════════════════════════════ */
let rowCounter = 0;

function buildRowHTML(num) {
  const medOptions  = medicines.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
  const dosOpts     = dosageOptions.map(d => `<option>${d}</option>`).join('');
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
}

function renumberRows() {
  document.querySelectorAll('#prescriptionBody tr').forEach((tr, i) => {
    tr.querySelector('.row-num').textContent = (i + 1) + '.';
  });
}

// Init with 4 rows
for (let i = 0; i < 4; i++) addPrescriptionRow();


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
    requiredFields.push(
      { id: 'roomID',          label: 'Room' },
      { id: 'bedID',           label: 'Bed ID' },
      { id: 'admissionStatus', label: 'Admission Status' },
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

  // Reset doctor dropdown
  document.getElementById('doctorID').selectedIndex = 0;

  // Hide admission section
  document.getElementById('admissionSection').classList.add('hidden');

  // Clear all error states
  document.querySelectorAll('.has-error').forEach(f => f.classList.remove('has-error'));
  document.querySelectorAll('.error-msg').forEach(e => e.textContent = '');

  // Reset prescription rows
  document.getElementById('prescriptionBody').innerHTML = '';
  rowCounter = 0;
  for (let i = 0; i < 4; i++) addPrescriptionRow();
}

function cancelForm() {
  if (confirm('Cancel and discard all entries?')) clearForm();
}

function dismissBanner() {
  document.getElementById('successBanner').classList.add('hidden');
}

function printReceipt() {
  window.print();
}
