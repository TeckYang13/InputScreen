/* ══════════════════════════════════════
   FLATPICKR – DATE OF BIRTH
══════════════════════════════════════ */
flatpickr('#patientDOB', {
  dateFormat: 'd/m/Y',
  maxDate: 'today',
  allowInput: false,
});

/* ══════════════════════════════════════
   DATE & PATIENT ID
══════════════════════════════════════ */
const today = new Date();
const fmt   = d => d.toString().padStart(2, '0');
const dateStr = `${fmt(today.getDate())}/${fmt(today.getMonth() + 1)}/${today.getFullYear()}`;
document.getElementById('displayDate').textContent = dateStr;

function formatPatientID(counter) {
  return `PAT-${today.getFullYear()}-${counter.toString().padStart(3, '0')}`;
}

let currentCounter  = parseInt(localStorage.getItem('patientCounter') || '1');
let currentPatientID = formatPatientID(currentCounter);
document.getElementById('patientIDDisplay').textContent = currentPatientID;

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

document.querySelectorAll('input, select').forEach(el => {
  el.addEventListener('input',  () => { if (el.id) clearError(el.id); });
  el.addEventListener('change', () => { if (el.id) clearError(el.id); });
});

/* ══════════════════════════════════════
   SUBMIT
══════════════════════════════════════ */
function submitForm() {
  const required = [
    { id: 'patientName',   label: 'Full Name' },
    { id: 'patientGender', label: 'Gender' },
    { id: 'patientDOB',    label: 'Date of Birth' },
    { id: 'patientPhone',  label: 'Phone' },
    { id: 'patientEmail',  label: 'Email' },
    { id: 'streetAddress', label: 'Street Address' },
    { id: 'city',          label: 'City' },
    { id: 'state',         label: 'State' },
    { id: 'postcode',      label: 'Postcode' },
  ];

  let hasError = false;
  required.forEach(f => {
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

  // Save to localStorage
  const address  = `${document.getElementById('streetAddress').value}, ${document.getElementById('city').value}, ${document.getElementById('postcode').value}, ${document.getElementById('state').value}`;
  const patients = JSON.parse(localStorage.getItem('patients') || '[]');
  patients.push({
    id:      currentPatientID,
    name:    document.getElementById('patientName').value,
    phone:   document.getElementById('patientPhone').value,
    email:   document.getElementById('patientEmail').value,
    gender:  document.getElementById('patientGender').value,
    dob:     document.getElementById('patientDOB').value,
    address: address,
  });
  localStorage.setItem('patients', JSON.stringify(patients));

  // Show success banner
  document.getElementById('successPatientID').textContent =
    `Patient ID: ${currentPatientID} has been registered.`;
  document.getElementById('successBanner').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Advance counter
  localStorage.setItem('patientCounter', currentCounter + 1);
  currentCounter  = currentCounter + 1;
  currentPatientID = formatPatientID(currentCounter);
  document.getElementById('patientIDDisplay').textContent = currentPatientID;

  clearForm();
}

/* ══════════════════════════════════════
   CLEAR / CANCEL / DISMISS
══════════════════════════════════════ */
function clearForm() {
  document.querySelectorAll('input, select').forEach(el => { el.value = ''; });
  document.querySelectorAll('.has-error').forEach(f => f.classList.remove('has-error'));
  document.querySelectorAll('.error-msg').forEach(e => e.textContent = '');
}

function cancelForm() {
  if (confirm('Cancel and discard all entries?')) window.location.href = '../index.html';
}

function dismissBanner() {
  document.getElementById('successBanner').classList.add('hidden');
}
