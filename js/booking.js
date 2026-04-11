/* ══════════════════════════════════════
   DATE & BOOKING ID
══════════════════════════════════════ */
const today   = new Date();
const fmt     = d => d.toString().padStart(2, '0');
const dateStr = `${fmt(today.getDate())}/${fmt(today.getMonth() + 1)}/${today.getFullYear()}`;
const datePart = `${today.getFullYear()}${fmt(today.getMonth() + 1)}${fmt(today.getDate())}`;
document.getElementById('displayDate').textContent = dateStr;

function formatBookingID(counter) {
  return `APT-${datePart}-${counter.toString().padStart(3, '0')}`;
}

let currentCounter  = 1;
let currentBookingID = formatBookingID(currentCounter);
let allPatients      = [];

/* ══════════════════════════════════════
   FLATPICKR
══════════════════════════════════════ */
flatpickr('#patientDOB', {
  dateFormat: 'd/m/Y',
  maxDate: 'today',
  allowInput: false,
});

flatpickr('#bookingDate', {
  dateFormat: 'd/m/Y',
  minDate: 'today',
  allowInput: false,
});

/* ══════════════════════════════════════
   PATIENT DROPDOWN & AUTOFILL
══════════════════════════════════════ */
function loadPatientDropdown() {
  const sel = document.getElementById('patientID');
  sel.innerHTML = '<option value="">-- Select Patient --</option>';
  allPatients.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.id} – ${p.name}`;
    sel.appendChild(opt);
  });
}

function fillPatientInfo() {
  const id      = document.getElementById('patientID').value;
  const patient = allPatients.find(p => p.id === id);
  const fields  = ['patientName','patientPhone','patientEmail','patientGender','patientDOB'];
  if (patient) {
    document.getElementById('patientName').value   = patient.name;
    document.getElementById('patientPhone').value  = patient.phone;
    document.getElementById('patientEmail').value  = patient.email;
    document.getElementById('patientGender').value = patient.gender;
    document.getElementById('patientDOB').value    = patient.dob;
  } else {
    fields.forEach(f => { document.getElementById(f).value = ''; });
  }
  clearError('patientID');
}

/* ══════════════════════════════════════
   BOOKING TYPE TOGGLE
══════════════════════════════════════ */
function onTypeChange() {
  const type       = document.querySelector('input[name="bookingType"]:checked')?.value;
  const apptCard   = document.getElementById('typeAppointment');
  const emerCard   = document.getElementById('typeEmergency');
  const walkinCard = document.getElementById('typeWalkin');

  apptCard.classList.toggle('type-selected-blue',  type === 'Appointment');
  emerCard.classList.toggle('type-selected-red',   type === 'Emergency');
  walkinCard.classList.toggle('type-selected-teal', type === 'Walk-In');

  document.getElementById('appointmentCard').classList.toggle('hidden', type !== 'Appointment');
  document.getElementById('emergencyCard').classList.toggle('hidden',   type !== 'Emergency');
  document.getElementById('walkinCard').classList.toggle('hidden',      type !== 'Walk-In');

  if (type !== 'Appointment') {
    document.getElementById('bookingDate').value = '';
    document.getElementById('bookingTime').value = '';
    document.getElementById('apptDept').value    = '';
  }
  if (type !== 'Emergency') document.getElementById('emerDept').value   = '';
  if (type !== 'Walk-In')   document.getElementById('walkinDept').value = '';

  document.getElementById('typeError').innerHTML = '';
}

/* ══════════════════════════════════════
   INLINE VALIDATION
══════════════════════════════════════ */
function setError(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  const field = el.closest('.field');
  if (!field) return;
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
  const bookingType = document.querySelector('input[name="bookingType"]:checked')?.value;

  if (!bookingType) {
    document.getElementById('typeError').innerHTML =
      `<span class="error-msg" style="display:block;margin-top:8px;">
        <i class="fas fa-exclamation-circle"></i> Please select a booking type.
      </span>`;
    return;
  }
  document.getElementById('typeError').innerHTML = '';

  const required = [
    { id: 'patientID',     label: 'Patient ID' },
    { id: 'bookingReason', label: 'Reason / Symptoms' },
  ];
  if (bookingType === 'Appointment') {
    required.push(
      { id: 'bookingDate', label: 'Preferred Date' },
      { id: 'bookingTime', label: 'Preferred Time' },
      { id: 'apptDept',   label: 'Department / Specialty' },
    );
  }
  if (bookingType === 'Emergency') required.push({ id: 'emerDept',   label: 'Type of Emergency' });
  if (bookingType === 'Walk-In')   required.push({ id: 'walkinDept', label: 'Service / Department' });

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

  showLoading();
  try {
    const name      = document.getElementById('patientName').value;
    const patientID = document.getElementById('patientID').value;
    let dateInfo    = '';
    if (bookingType === 'Appointment') {
      dateInfo = ` on ${document.getElementById('bookingDate').value} at ${document.getElementById('bookingTime').value}`;
    } else if (bookingType === 'Emergency') {
      dateInfo = ' – Emergency (Today)';
    } else {
      dateInfo = ' – Walk-In (Today)';
    }

    const booking = {
      id:        currentBookingID,
      patientID: patientID,
      type:      bookingType,
      date:      bookingType === 'Appointment' ? document.getElementById('bookingDate').value : dateStr,
      time:      bookingType === 'Appointment' ? document.getElementById('bookingTime').value : '',
      dept:      bookingType === 'Appointment' ? document.getElementById('apptDept').value
                 : bookingType === 'Emergency' ? document.getElementById('emerDept').value
                 : document.getElementById('walkinDept').value,
      reason:    document.getElementById('bookingReason').value,
    };

    await dbSaveBooking(booking);
    await dbIncrementCounter('bookingCounter');

    document.getElementById('successBookingID').textContent =
      `Booking ID: ${currentBookingID} – ${bookingType} for ${name}${dateInfo}`;
    document.getElementById('successBanner').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    currentCounter++;
    currentBookingID = formatBookingID(currentCounter);
    document.getElementById('bookingIDDisplay').textContent = currentBookingID;

    clearForm();
  } catch (e) {
    alert('Failed to save booking. Please check your connection and try again.');
    console.error(e);
  } finally {
    hideLoading();
  }
}

/* ══════════════════════════════════════
   CLEAR / CANCEL / DISMISS
══════════════════════════════════════ */
function clearForm() {
  document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
  document.querySelectorAll('input:not([type="radio"]), select, textarea').forEach(el => { el.value = ''; });
  document.querySelectorAll('.has-error').forEach(f => f.classList.remove('has-error'));
  document.querySelectorAll('.error-msg').forEach(e => e.textContent = '');
  document.getElementById('typeError').innerHTML = '';
  ['typeAppointment','typeEmergency','typeWalkin'].forEach(id => {
    document.getElementById(id).className = document.getElementById(id).className
      .replace(/type-selected-\w+/g, '').trim();
  });
  ['appointmentCard','emergencyCard','walkinCard'].forEach(id =>
    document.getElementById(id).classList.add('hidden'));
  loadPatientDropdown();
}

function cancelForm() {
  if (confirm('Cancel and discard all entries?')) window.location.href = '../index.html';
}

function dismissBanner() {
  document.getElementById('successBanner').classList.add('hidden');
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
async function init() {
  showLoading();
  try {
    await seedAll();
    allPatients    = await dbGetPatients();
    currentCounter = await dbGetCounter('bookingCounter');
    currentBookingID = formatBookingID(currentCounter);
    document.getElementById('bookingIDDisplay').textContent = currentBookingID;
    loadPatientDropdown();
  } catch (e) {
    console.error('Failed to load data:', e);
  } finally {
    hideLoading();
  }
}

init();
