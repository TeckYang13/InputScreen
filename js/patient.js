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

/* ── IC auto-format: YYMMDD-PB-XXXX ── */
document.getElementById('patientIC').addEventListener('input', function () {
  let val = this.value.replace(/\D/g, ''); // digits only
  if (val.length > 6)  val = val.slice(0, 6) + '-' + val.slice(6);
  if (val.length > 9)  val = val.slice(0, 9) + '-' + val.slice(9);
  this.value = val;
});

/* ══════════════════════════════════════
   SUBMIT
══════════════════════════════════════ */
function submitForm() {
  const required = [
    { id: 'patientName',   label: 'Full Name' },
    { id: 'patientIC',     label: 'IC Number' },
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

  // 1. Required check
  required.forEach(f => {
    const el = document.getElementById(f.id);
    if (!el.value.trim()) {
      setError(f.id, `${f.label} is required.`);
      hasError = true;
    } else {
      clearError(f.id);
    }
  });

  // 2. Full Name – letters, spaces, hyphens, slashes only; min 2 chars
  const nameVal = document.getElementById('patientName').value.trim();
  if (nameVal && (nameVal.length < 2 || !/^[a-zA-Z\s\-\/'\.]+$/.test(nameVal))) {
    setError('patientName', 'Name must contain letters only (min 2 characters).');
    hasError = true;
  }

  // 3. IC – format YYMMDD-PB-XXXX + uniqueness
  const icVal = document.getElementById('patientIC').value.replace(/-/g, '');
  if (icVal) {
    if (icVal.length !== 12 || !/^\d{12}$/.test(icVal)) {
      setError('patientIC', 'IC must be 12 digits (format: YYMMDD-PB-XXXX).');
      hasError = true;
    } else {
      const icFormatted = `${icVal.slice(0,6)}-${icVal.slice(6,8)}-${icVal.slice(8)}`;
      const existing    = JSON.parse(localStorage.getItem('patients') || '[]');
      if (existing.some(p => p.ic === icFormatted)) {
        setError('patientIC', 'This IC number is already registered.');
        hasError = true;
      }
    }
  }

  // 4. Phone – Malaysian format: 01X-XXXXXXX / 01X-XXXXXXXX / 0X-XXXXXXXX
  const phoneVal = document.getElementById('patientPhone').value.trim();
  if (phoneVal && !/^(01[0-9]-\d{7,8}|0[2-9]-\d{7,8})$/.test(phoneVal)) {
    setError('patientPhone', 'Enter a valid Malaysian phone (e.g. 012-3456789 or 03-12345678).');
    hasError = true;
  }

  // 5. Email – basic format
  const emailVal = document.getElementById('patientEmail').value.trim();
  if (emailVal && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
    setError('patientEmail', 'Enter a valid email address.');
    hasError = true;
  }

  // 6. Postcode – exactly 5 digits
  const postcodeVal = document.getElementById('postcode').value.trim();
  if (postcodeVal && !/^\d{5}$/.test(postcodeVal)) {
    setError('postcode', 'Postcode must be exactly 5 digits.');
    hasError = true;
  }

  // 7. City – letters only
  const cityVal = document.getElementById('city').value.trim();
  if (cityVal && !/^[a-zA-Z\s\-\.]+$/.test(cityVal)) {
    setError('city', 'City name must contain letters only.');
    hasError = true;
  }

  if (hasError) {
    const firstError = document.querySelector('.has-error');
    if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // Save to localStorage
  const address  = `${document.getElementById('streetAddress').value}, ${document.getElementById('city').value}, ${document.getElementById('postcode').value}, ${document.getElementById('state').value}`;
  const icRaw    = document.getElementById('patientIC').value.replace(/-/g, '');
  const icFormatted = `${icRaw.slice(0,6)}-${icRaw.slice(6,8)}-${icRaw.slice(8)}`;
  const patients = JSON.parse(localStorage.getItem('patients') || '[]');
  patients.push({
    id:      currentPatientID,
    ic:      icFormatted,
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
