/* ══════════════════════════════════════
   FLATPICKR – DATE OF BIRTH
══════════════════════════════════════ */
flatpickr('#staffDOB', {
  dateFormat: 'd/m/Y',
  maxDate: 'today',
  allowInput: false,
});

/* ══════════════════════════════════════
   DATE & STAFF ID
══════════════════════════════════════ */
const today = new Date();
const fmt   = d => d.toString().padStart(2, '0');
const dateStr = `${fmt(today.getDate())}/${fmt(today.getMonth() + 1)}/${today.getFullYear()}`;
document.getElementById('displayDate').textContent = dateStr;

function formatStaffID(counter) {
  return `STF-${counter.toString().padStart(5, '0')}`;
}

let currentCounter = 12;
let currentStaffID = formatStaffID(currentCounter);

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
async function submitForm() {
  const required = [
    { id: 'staffName',    label: 'Full Name' },
    { id: 'staffGender',  label: 'Gender' },
    { id: 'staffDOB',     label: 'Date of Birth' },
    { id: 'staffPhone',   label: 'Phone' },
    { id: 'staffEmail',   label: 'Email' },
    { id: 'staffAddress', label: 'Address' },
    { id: 'staffRole',    label: 'Role' },
    { id: 'deptID',       label: 'Department' },
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

  showLoading();
  try {
    const staff = {
      id:      currentStaffID,
      deptID:  document.getElementById('deptID').value,
      name:    document.getElementById('staffName').value.trim(),
      role:    document.getElementById('staffRole').value,
      phone:   document.getElementById('staffPhone').value.trim(),
      email:   document.getElementById('staffEmail').value.trim(),
      dob:     document.getElementById('staffDOB').value,
      address: document.getElementById('staffAddress').value.trim(),
    };

    await dbSaveStaff(staff);
    await dbIncrementCounter('staffCounter');

    document.getElementById('successStaffID').textContent =
      `Staff ID: ${currentStaffID} – ${staff.name} has been registered.`;
    document.getElementById('successBanner').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    currentCounter++;
    currentStaffID = formatStaffID(currentCounter);
    document.getElementById('staffIDDisplay').textContent = currentStaffID;

    clearForm();
  } catch (e) {
    alert('Failed to save staff. Please check your connection and try again.');
    console.error(e);
  } finally {
    hideLoading();
  }
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

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
async function init() {
  showLoading();
  try {
    await seedAll();
    currentCounter = await dbGetCounter('staffCounter');
    currentStaffID = formatStaffID(currentCounter);
    document.getElementById('staffIDDisplay').textContent = currentStaffID;
  } catch (e) {
    console.error('Failed to load data:', e);
  } finally {
    hideLoading();
  }
}

init();
