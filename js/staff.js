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

let currentCounter = parseInt(localStorage.getItem('staffCounter') || '12'); // start after sample data
let currentStaffID = formatStaffID(currentCounter);
document.getElementById('staffIDDisplay').textContent = currentStaffID;

/* ══════════════════════════════════════
   SAMPLE STAFF INIT
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

if (!localStorage.getItem('staff')) {
  localStorage.setItem('staff', JSON.stringify(sampleStaff));
}

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

  // Save to localStorage
  const staff = JSON.parse(localStorage.getItem('staff') || '[]');
  staff.push({
    id:      currentStaffID,
    deptID:  document.getElementById('deptID').value,
    name:    document.getElementById('staffName').value,
    role:    document.getElementById('staffRole').value,
    phone:   document.getElementById('staffPhone').value,
    email:   document.getElementById('staffEmail').value,
    dob:     document.getElementById('staffDOB').value,
    address: document.getElementById('staffAddress').value,
  });
  localStorage.setItem('staff', JSON.stringify(staff));

  // Show success banner
  document.getElementById('successStaffID').textContent =
    `Staff ID: ${currentStaffID} – ${document.getElementById('staffName').value} has been registered.`;
  document.getElementById('successBanner').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Advance counter
  localStorage.setItem('staffCounter', currentCounter + 1);
  currentCounter++;
  currentStaffID = formatStaffID(currentCounter);
  document.getElementById('staffIDDisplay').textContent = currentStaffID;

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
