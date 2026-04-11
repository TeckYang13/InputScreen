/* ══════════════════════════════════════
   SAMPLE DATA
══════════════════════════════════════ */
const SAMPLE_PATIENTS = [
  { id:'PAT-2025-001', ic:'850515-14-5231', name:'John Tan Ah Kao',       phone:'012-3456789', email:'john.tan@email.com',  gender:'Male',   dob:'15/05/1985', address:'12, Jalan SS2, Petaling Jaya, 47500, Selangor' },
  { id:'PAT-2025-002', ic:'900710-10-6482', name:'Siti Aminah Binti Ali', phone:'017-6543210', email:'siti@email.com',       gender:'Female', dob:'10/07/1990', address:'5, Jalan Melati, Taman Melati, 53100, Kuala Lumpur' },
  { id:'PAT-2025-003', ic:'780322-07-3341', name:'Robert Low',            phone:'011-9988776', email:'rlow@email.com',       gender:'Male',   dob:'22/03/1978', address:'88, Lorong Bukit, Penang, 10050, Penang' },
  { id:'PAT-2025-004', ic:'000830-14-7823', name:'Priya Kaur',            phone:'014-4433221', email:'priya.k@email.com',    gender:'Female', dob:'30/08/2000', address:'3, Jalan Gasing, PJ, 46000, Selangor' },
  { id:'PAT-2025-005', ic:'651212-10-4412', name:'David Lim Teck Wee',   phone:'018-6655443', email:'davidlim@email.com',   gender:'Male',   dob:'12/12/1965', address:'21, Condo Ria, Subang, 40150, Selangor' },
  { id:'PAT-2025-006', ic:'820105-14-2293', name:'Mike Wong',             phone:'013-1112223', email:'mike.w@email.com',     gender:'Male',   dob:'05/01/1982', address:'10, Kg Baru, Ampang, 68000, Selangor' },
  { id:'PAT-2025-007', ic:'950709-10-8834', name:'Nurul Huda',            phone:'013-4445556', email:'nurul.h@email.com',    gender:'Female', dob:'09/07/1995', address:'10, Kg Baru, Selayang, 68100, Selangor' },
  { id:'PAT-2025-008', ic:'820325-14-5567', name:'Kevin Raj',             phone:'019-7778889', email:'kevin@email.com',      gender:'Male',   dob:'25/03/1982', address:'2, Villa 22, Shah Alam, 40150, Selangor' },
  { id:'PAT-2025-009', ic:'901114-08-3312', name:'Chong Wei Ling',        phone:'012-5554433', email:'wling@email.com',      gender:'Female', dob:'14/11/1990', address:'Green Lane, Ipoh, 31400, Perak' },
  { id:'PAT-2025-010', ic:'750306-14-6601', name:'Sarah Jenkins',         phone:'011-3332211', email:'sarah.j@email.com',    gender:'Female', dob:'06/03/1975', address:'9, Residency, Cyberjaya, 63000, Selangor' },
  { id:'PAT-2025-011', ic:'880214-10-3312', name:'Lim Boon Keat',          phone:'012-8876543', email:'boonkeat@email.com',    gender:'Male',   dob:'14/02/1988', address:'33, Jalan Duta, KL, 50480, Kuala Lumpur' },
  { id:'PAT-2025-012', ic:'930605-14-7721', name:'Farah Nadia Binti Zain', phone:'017-3345678', email:'farah.nadia@email.com', gender:'Female', dob:'05/06/1993', address:'12, Taman Bukit Indah, 68000, Ampang' },
  { id:'PAT-2025-013', ic:'710820-07-5543', name:'Tan Ah Seng',            phone:'011-2233445', email:'ahseng.tan@email.com',  gender:'Male',   dob:'20/08/1971', address:'88, Jalan Penang, 10000, Penang' },
  { id:'PAT-2025-014', ic:'010315-14-6632', name:'Nur Aisyah Bt Rashid',   phone:'014-9988001', email:'aisyah.r@email.com',    gender:'Female', dob:'15/03/2001', address:'5, Pandan Jaya, 55100, Kuala Lumpur' },
  { id:'PAT-2025-015', ic:'760928-10-2281', name:'Raymond Goh',            phone:'018-7766554', email:'raymond.g@email.com',   gender:'Male',   dob:'28/09/1976', address:'20, Jalan Kerinchi, 59200, Kuala Lumpur' },
  { id:'PAT-2025-016', ic:'850430-14-4453', name:'Kavitha Devi',           phone:'013-5544332', email:'kavitha.d@email.com',   gender:'Female', dob:'30/04/1985', address:'7, Jalan Utama, 10450, Penang' },
  { id:'PAT-2025-017', ic:'920112-07-8812', name:'Wong Chee Keong',        phone:'019-6655443', email:'cheekeong@email.com',   gender:'Male',   dob:'12/01/1992', address:'15, Lorong Perak, 10050, Penang' },
  { id:'PAT-2025-018', ic:'871225-10-3341', name:'Zainab Bt Hamid',        phone:'012-4433221', email:'zainab.h@email.com',    gender:'Female', dob:'25/12/1987', address:'3, Jalan Gombak, 53000, Kuala Lumpur' },
  { id:'PAT-2025-019', ic:'990707-14-5512', name:'Arjun Krishnan',         phone:'017-8899112', email:'arjun.k@email.com',     gender:'Male',   dob:'07/07/1999', address:'9, Jalan Cheras, 56000, Kuala Lumpur' },
  { id:'PAT-2025-020', ic:'680318-08-7743', name:'Lee Siew Fong',          phone:'011-6677889', email:'siewfong@email.com',    gender:'Female', dob:'18/03/1968', address:'45, Jalan Ipoh, 51200, Kuala Lumpur' },
];

const SAMPLE_STAFF = [
  { id:'STF-00001', deptID:'DPT-004', name:'Dr. Alan Lau',      role:'Doctor',         phone:'012-2233445', email:'alan.lau@wzy.com',  dob:'12/05/1975', address:'1, Jalan Kiara, KL.' },
  { id:'STF-00002', deptID:'DPT-003', name:'Nurse Sarah Bee',   role:'Nurse',          phone:'017-8899001', email:'sarah.b@wzy.com',   dob:'22/08/1990', address:'45, Lorong Maju, PJ.' },
  { id:'STF-00003', deptID:'DPT-005', name:'Tan Wei Kiat',      role:'Pharmacist',     phone:'011-5544332', email:'wk.tan@wzy.com',    dob:'05/11/1988', address:'12, Jalan SS15, Subang.' },
  { id:'STF-00004', deptID:'DPT-001', name:'Dr. Lim Geok Eng', role:'Doctor',         phone:'016-6677889', email:'geok.lim@wzy.com',  dob:'30/01/1968', address:'8, Condo Jaya, Cheras.' },
  { id:'STF-00005', deptID:'DPT-002', name:'Dr. Rajesh Kumar', role:'Doctor',         phone:'014-1122334', email:'rajesh.k@wzy.com',  dob:'14/09/1982', address:'19, Jalan Ipoh, KL.' },
  { id:'STF-00006', deptID:'DPT-006', name:'Linda Chong',       role:'Lab Technician', phone:'013-9988776', email:'l.chong@wzy.com',   dob:'09/03/1995', address:'3, Taman Midah, KL.' },
  { id:'STF-00007', deptID:'DPT-003', name:'Rose Receptionist', role:'Receptionist',   phone:'018-4455667', email:'rose.r@wzy.com',    dob:'18/12/1998', address:'22, Jalan Gasing, PJ.' },
  { id:'STF-00008', deptID:'DPT-007', name:'Dr. Sofia Ahmad',  role:'Doctor',         phone:'019-3344556', email:'sofia.a@wzy.com',   dob:'02/06/1985', address:'10, Villa 8, Shah Alam.' },
  { id:'STF-00009', deptID:'DPT-004', name:'Ahmad Fauzi',       role:'General Worker', phone:'012-7788990', email:'fauzi.a@wzy.com',   dob:'11/10/1980', address:'5, Kg Baru, KL.' },
  { id:'STF-00010', deptID:'DPT-010', name:'Catherine Teoh',    role:'Administrator',  phone:'017-2233114', email:'cath.t@wzy.com',    dob:'25/04/1978', address:'15, Jalan Bukit, PJ.' },
  { id:'STF-00011', deptID:'DPT-010', name:'LynzXuan',          role:'Administrator',  phone:'019-2122222', email:'lynz.x@wzy.com',    dob:'21/07/1999', address:'6, Jalan Sity, KL.' },
];

const SAMPLE_BOOKINGS = [
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

const SAMPLE_ROOMS = [
  {
    id:'R101', floor:1, type:'General Ward', dailyRate:100,
    beds:[
      { bedID:'B01', status:'Occupied', patientID:'PAT-2025-001', admissionDate:'01/04/2026' },
      { bedID:'B02', status:'Available' },
      { bedID:'B03', status:'Available' },
      { bedID:'B04', status:'Occupied', patientID:'PAT-2025-003', admissionDate:'06/04/2026' },
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

const SAMPLE_PENDING_ADMISSIONS = [
  { patientID:'PAT-2025-007', treatmentID:'TRT-20260408-00001', admissionDate:'11/04/2026', dischargeDate:null,         admissionReason:'Persistent headache and dizziness, requires neurological assessment.',        preferredRoomID:'R102', preferredBedID:'B03' },
  { patientID:'PAT-2025-011', treatmentID:'TRT-20260411-00002', admissionDate:'12/04/2026', dischargeDate:'16/04/2026', admissionReason:'Knee replacement surgery recovery, requires general ward monitoring.',           preferredRoomID:'R101', preferredBedID:null },
  { patientID:'PAT-2025-012', treatmentID:'TRT-20260411-00003', admissionDate:'12/04/2026', dischargeDate:'14/04/2026', admissionReason:'Post-caesarean recovery, requires private room for mother and newborn.',        preferredRoomID:'R202', preferredBedID:null },
  { patientID:'PAT-2025-013', treatmentID:'TRT-20260411-00004', admissionDate:'13/04/2026', dischargeDate:'20/04/2026', admissionReason:'Liver cirrhosis monitoring, specialist observation required.',                  preferredRoomID:null,   preferredBedID:null },
  { patientID:'PAT-2025-014', treatmentID:'TRT-20260411-00005', admissionDate:'13/04/2026', dischargeDate:'15/04/2026', admissionReason:'Severe allergic reaction, requires close monitoring and IV antihistamines.',    preferredRoomID:null,   preferredBedID:null },
  { patientID:'PAT-2025-015', treatmentID:'TRT-20260412-00006', admissionDate:'14/04/2026', dischargeDate:'21/04/2026', admissionReason:'Coronary artery bypass recovery, ICU monitoring required post-surgery.',        preferredRoomID:'R301', preferredBedID:null },
  { patientID:'PAT-2025-016', treatmentID:'TRT-20260412-00007', admissionDate:'14/04/2026', dischargeDate:null,         admissionReason:'Type 1 diabetes complication, blood sugar stabilisation and IV drip required.', preferredRoomID:'R103', preferredBedID:null },
  { patientID:'PAT-2025-017', treatmentID:'TRT-20260412-00008', admissionDate:'15/04/2026', dischargeDate:'18/04/2026', admissionReason:'Appendectomy post-op recovery, wound monitoring and pain management.',           preferredRoomID:null,   preferredBedID:null },
  { patientID:'PAT-2025-018', treatmentID:'TRT-20260413-00009', admissionDate:'15/04/2026', dischargeDate:'19/04/2026', admissionReason:'Pneumonia treatment, requires oxygen support and IV antibiotics.',               preferredRoomID:'R103', preferredBedID:'B02' },
  { patientID:'PAT-2025-019', treatmentID:'TRT-20260413-00010', admissionDate:'16/04/2026', dischargeDate:null,         admissionReason:'Traumatic brain injury observation, ICU monitoring essential.',                  preferredRoomID:'R302', preferredBedID:null },
  { patientID:'PAT-2025-020', treatmentID:'TRT-20260413-00011', admissionDate:'16/04/2026', dischargeDate:'22/04/2026', admissionReason:'Hip fracture surgery recovery, physiotherapy and bed rest required.',            preferredRoomID:null,   preferredBedID:null },
];

const SAMPLE_COUNTERS = {
  patientCounter:   21,
  staffCounter:     12,
  bookingCounter:   20,
  treatmentCounter: 12,
};

/* ══════════════════════════════════════
   LOADING OVERLAY
══════════════════════════════════════ */
function showLoading() {
  let el = document.getElementById('dbLoadingOverlay');
  if (!el) {
    el = document.createElement('div');
    el.id = 'dbLoadingOverlay';
    el.innerHTML = `<div class="db-spinner"><i class="fas fa-circle-notch fa-spin"></i><span>Loading…</span></div>`;
    document.body.appendChild(el);
  }
  el.classList.remove('hidden');
}
function hideLoading() {
  const el = document.getElementById('dbLoadingOverlay');
  if (el) el.classList.add('hidden');
}

/* ══════════════════════════════════════
   HELPERS
══════════════════════════════════════ */
// Realtime Database stores arrays as objects; convert back to array safely
function toArray(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return Object.values(val);
}

// Each room's beds may come back as object — normalise
function normaliseRoom(r) {
  return { ...r, beds: toArray(r.beds) };
}

/* ══════════════════════════════════════
   SEED — runs once if node is empty
══════════════════════════════════════ */
async function seedIfEmpty(path, docs, idField) {
  const snap = await db.ref(path).limitToFirst(1).once('value');
  if (snap.exists()) return;
  const updates = {};
  docs.forEach(d => { updates[`${path}/${d[idField]}`] = d; });
  await db.ref().update(updates);
}

async function seedCountersIfEmpty() {
  const snap = await db.ref('counters/main').once('value');
  if (!snap.exists()) await db.ref('counters/main').set(SAMPLE_COUNTERS);
}

async function seedAll() {
  await Promise.all([
    seedIfEmpty('patients',          SAMPLE_PATIENTS,           'id'),
    seedIfEmpty('staff',             SAMPLE_STAFF,              'id'),
    seedIfEmpty('bookings',          SAMPLE_BOOKINGS,           'id'),
    seedIfEmpty('rooms',             SAMPLE_ROOMS,              'id'),
    seedIfEmpty('pendingAdmissions', SAMPLE_PENDING_ADMISSIONS, 'patientID'),
    seedCountersIfEmpty(),
  ]);
}

/* ══════════════════════════════════════
   PATIENTS
══════════════════════════════════════ */
async function dbGetPatients() {
  const snap = await db.ref('patients').once('value');
  return snap.exists() ? toArray(snap.val()) : [];
}

async function dbSavePatient(patient) {
  await db.ref('patients/' + patient.id).set(patient);
}

/* ══════════════════════════════════════
   STAFF
══════════════════════════════════════ */
async function dbGetStaff() {
  const snap = await db.ref('staff').once('value');
  return snap.exists() ? toArray(snap.val()) : [];
}

async function dbSaveStaff(staff) {
  await db.ref('staff/' + staff.id).set(staff);
}

/* ══════════════════════════════════════
   BOOKINGS
══════════════════════════════════════ */
async function dbGetBookings() {
  const snap = await db.ref('bookings').once('value');
  return snap.exists() ? toArray(snap.val()) : [];
}

async function dbSaveBooking(booking) {
  await db.ref('bookings/' + booking.id).set(booking);
}

/* ══════════════════════════════════════
   ROOMS
══════════════════════════════════════ */
async function dbGetRooms() {
  const snap = await db.ref('rooms').once('value');
  if (!snap.exists()) return [];
  return toArray(snap.val()).map(normaliseRoom);
}

async function dbSaveRoom(room) {
  await db.ref('rooms/' + room.id).set(room);
}

async function dbDeleteRoom(roomID) {
  await db.ref('rooms/' + roomID).remove();
}

/* ══════════════════════════════════════
   PENDING ADMISSIONS
══════════════════════════════════════ */
async function dbGetPendingAdmissions() {
  const snap = await db.ref('pendingAdmissions').once('value');
  return snap.exists() ? toArray(snap.val()) : [];
}

async function dbSavePendingAdmission(req) {
  await db.ref('pendingAdmissions/' + req.patientID).set(req);
}

async function dbDeletePendingAdmission(patientID) {
  await db.ref('pendingAdmissions/' + patientID).remove();
}

/* ══════════════════════════════════════
   TREATMENTS
══════════════════════════════════════ */
async function dbGetTreatments() {
  const snap = await db.ref('treatments').once('value');
  return snap.exists() ? toArray(snap.val()) : [];
}

async function dbSaveTreatment(treatment) {
  await db.ref('treatments/' + treatment.id).set(treatment);
}

/* ══════════════════════════════════════
   COUNTERS (atomic increment)
══════════════════════════════════════ */
async function dbGetCounter(name) {
  const snap = await db.ref('counters/main/' + name).once('value');
  return snap.exists() ? snap.val() : 1;
}

async function dbIncrementCounter(name) {
  await db.ref('counters/main').update({
    [name]: firebase.database.ServerValue.increment(1)
  });
}
