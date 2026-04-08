/* ══════════════════════════════════════
   SAMPLE DATA
══════════════════════════════════════ */
const sampleRooms = [
  {
    id: 'R101', floor: 1, type: 'General Ward', dailyRate: 100,
    beds: [
      { bedID: 'B01', status: 'Occupied',    patientID: 'PAT-2025-001', admissionDate: '01/04/2026' },
      { bedID: 'B02', status: 'Available' },
      { bedID: 'B03', status: 'Available' },
      { bedID: 'B04', status: 'Occupied',    patientID: 'PAT-2025-003', admissionDate: '06/04/2026' },
    ]
  },
  {
    id: 'R102', floor: 1, type: 'General Ward', dailyRate: 100,
    beds: [
      { bedID: 'B01', status: 'Available' },
      { bedID: 'B02', status: 'Maintenance' },
      { bedID: 'B03', status: 'Available' },
      { bedID: 'B04', status: 'Available' },
    ]
  },
  {
    id: 'R201', floor: 2, type: 'Private Room', dailyRate: 250,
    beds: [
      { bedID: 'B01', status: 'Occupied', patientID: 'PAT-2025-006', admissionDate: '05/04/2026' },
    ]
  },
  {
    id: 'R202', floor: 2, type: 'Private Room', dailyRate: 250,
    beds: [
      { bedID: 'B01', status: 'Available' },
    ]
  },
  {
    id: 'R301', floor: 3, type: 'ICU', dailyRate: 500,
    beds: [
      { bedID: 'B01', status: 'Occupied',    patientID: 'PAT-2025-005', admissionDate: '03/04/2026' },
      { bedID: 'B02', status: 'Occupied',    patientID: 'PAT-2025-008', admissionDate: '07/04/2026' },
      { bedID: 'B03', status: 'Maintenance' },
      { bedID: 'B04', status: 'Available' },
      { bedID: 'B05', status: 'Available' },
      { bedID: 'B06', status: 'Available' },
    ]
  },
];

const samplePatients = [
  { id:'PAT-2025-001', name:'John Tan Ah Kao',        gender:'Male',   dob:'15/05/1985', phone:'012-3456789', email:'john.tan@email.com',   address:'12, Jalan SS2, Petaling Jaya' },
  { id:'PAT-2025-002', name:'Siti Aminah Binti Ali',  gender:'Female', dob:'10/07/1990', phone:'017-6543210', email:'siti@email.com',        address:'5, Jalan Melati, KL' },
  { id:'PAT-2025-003', name:'Robert Low',              gender:'Male',   dob:'22/03/1978', phone:'011-9988776', email:'rlow@email.com',        address:'88, Lorong Bukit, Penang' },
  { id:'PAT-2025-004', name:'Priya Kaur',              gender:'Female', dob:'30/08/2000', phone:'014-4433221', email:'priya.k@email.com',     address:'3, Jalan Gasing, PJ' },
  { id:'PAT-2025-005', name:'David Lim Teck Wee',     gender:'Male',   dob:'12/12/1965', phone:'018-6655443', email:'davidlim@email.com',    address:'21, Condo Ria, Subang' },
  { id:'PAT-2025-006', name:'Mike Wong',               gender:'Male',   dob:'05/01/1982', phone:'013-1112223', email:'mike.w@email.com',      address:'10, Kg Baru, Ampang' },
  { id:'PAT-2025-007', name:'Nurul Huda',              gender:'Female', dob:'09/07/1995', phone:'013-4445556', email:'nurul.h@email.com',     address:'10, Kg Baru, Selayang' },
  { id:'PAT-2025-008', name:'Kevin Raj',               gender:'Male',   dob:'25/03/1982', phone:'019-7778889', email:'kevin@email.com',       address:'2, Villa 22, Shah Alam' },
  { id:'PAT-2025-009', name:'Chong Wei Ling',          gender:'Female', dob:'14/11/1990', phone:'012-5554433', email:'wling@email.com',       address:'Green Lane, Ipoh' },
  { id:'PAT-2025-010', name:'Sarah Jenkins',           gender:'Female', dob:'06/03/1975', phone:'011-3332211', email:'sarah.j@email.com',     address:'9, Residency, Cyberjaya' },
];

/* ══════════════════════════════════════
   LOCALSTORAGE HELPERS
══════════════════════════════════════ */
function initRooms() {
  if (!localStorage.getItem('rooms')) {
    localStorage.setItem('rooms', JSON.stringify(sampleRooms));
  }
}

function initPatients() {
  if (!localStorage.getItem('patients')) {
    localStorage.setItem('patients', JSON.stringify(samplePatients));
  }
}

function getRooms()       { return JSON.parse(localStorage.getItem('rooms')    || '[]'); }
function getPatients()    { return JSON.parse(localStorage.getItem('patients') || '[]'); }
function saveRooms(rooms) { localStorage.setItem('rooms', JSON.stringify(rooms)); }

/* ══════════════════════════════════════
   STATS
══════════════════════════════════════ */
function renderStats() {
  const rooms = getRooms();
  let totalBeds = 0, occupied = 0, available = 0, maintenance = 0;
  rooms.forEach(r => r.beds.forEach(b => {
    totalBeds++;
    if      (b.status === 'Occupied')    occupied++;
    else if (b.status === 'Available')   available++;
    else if (b.status === 'Maintenance') maintenance++;
  }));
  document.getElementById('statRooms').textContent       = rooms.length;
  document.getElementById('statBeds').textContent        = totalBeds;
  document.getElementById('statOccupied').textContent    = occupied;
  document.getElementById('statAvailable').textContent   = available;
  document.getElementById('statMaintenance').textContent = maintenance;
}

/* ══════════════════════════════════════
   SEARCH
══════════════════════════════════════ */
function clearSearch() {
  document.getElementById('roomSearch').value = '';
  document.getElementById('searchClearBtn').style.display = 'none';
  renderRoomGrid();
}

document.getElementById('roomSearch').addEventListener('input', function() {
  document.getElementById('searchClearBtn').style.display = this.value ? 'flex' : 'none';
});

/* ══════════════════════════════════════
   FLOOR TABS
══════════════════════════════════════ */
let activeFloor = 0;

function switchFloor(floor, btn) {
  activeFloor = floor;
  document.querySelectorAll('.floor-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderRoomGrid();
}

/* ══════════════════════════════════════
   ROOM GRID
══════════════════════════════════════ */
const typeAccent = {
  'General Ward':   'blue',
  'Private Room':   'teal',
  'ICU':            'red',
  'Paediatric Ward':'amber',
  'Maternity Ward': 'purple',
};

function renderRoomGrid() {
  const rooms  = getRooms();
  const search = (document.getElementById('roomSearch').value || '').toLowerCase();

  const filtered = rooms.filter(r => {
    const matchFloor  = activeFloor === 0 || r.floor === activeFloor;
    const matchSearch = !search || r.id.toLowerCase().includes(search) || r.type.toLowerCase().includes(search);
    return matchFloor && matchSearch;
  });

  const grid = document.getElementById('roomGrid');

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="no-rooms"><i class="fas fa-door-closed"></i><p>No rooms found.</p></div>`;
    return;
  }

  // Group by floor if showing all
  if (activeFloor === 0) {
    const floors = [...new Set(filtered.map(r => r.floor))].sort();
    grid.innerHTML = floors.map(fl => {
      const flRooms = filtered.filter(r => r.floor === fl);
      return `<div class="floor-section">
        <div class="floor-label"><i class="fas fa-building"></i> Floor ${fl}</div>
        <div class="room-row">${flRooms.map(roomCardHTML).join('')}</div>
      </div>`;
    }).join('');
  } else {
    grid.innerHTML = `<div class="room-row">${filtered.map(roomCardHTML).join('')}</div>`;
  }
}

function roomCardHTML(room) {
  const occupied      = room.beds.filter(b => b.status === 'Occupied').length;
  const total         = room.beds.length;
  const pct           = Math.round((occupied / total) * 100);
  const accent        = typeAccent[room.type] || 'blue';

  const bedsHTML = room.beds.map(bed => {
    const cls   = bed.status.toLowerCase().replace(' ', '-');
    const tip   = bed.status === 'Occupied'
      ? `${bed.bedID} – ${bed.patientID}`
      : `${bed.bedID} – ${bed.status}`;
    const icon  = bed.status === 'Occupied' ? 'fa-user' : bed.status === 'Maintenance' ? 'fa-tools' : 'fa-check';
    return `<div class="bed bed-${cls}" title="${tip}" onclick="openBedModal('${room.id}','${bed.bedID}')">
      <span class="bed-id-label">${bed.bedID}</span>
      <i class="fas ${icon}"></i>
    </div>`;
  }).join('');

  return `
    <div class="room-card room-accent-${accent}">
      <div class="room-card-head">
        <div>
          <div class="room-id-badge">${room.id}</div>
          <div class="room-type-label">${room.type} &nbsp;·&nbsp; Floor ${room.floor}</div>
        </div>
        <div style="display:flex;gap:6px;align-items:center;flex-shrink:0;">
          <span class="room-rate-badge">RM ${room.dailyRate}/day</span>
          <button class="icon-btn" title="Edit Room" onclick="openRoomModal('${room.id}', event)"><i class="fas fa-edit"></i></button>
          <button class="icon-btn icon-btn-danger" title="Delete Room" onclick="deleteRoom('${room.id}', event)"><i class="fas fa-trash"></i></button>
        </div>
      </div>
      <div class="bed-grid">${bedsHTML}</div>
      <div class="room-card-foot">
        <div class="occ-bar-wrap"><div class="occ-bar" style="width:${pct}%"></div></div>
        <span class="occ-label">${occupied}/${total} beds occupied</span>
      </div>
    </div>`;
}

/* ══════════════════════════════════════
   BED MODAL
══════════════════════════════════════ */
let activeBed = null;

function openBedModal(roomID, bedID) {
  const rooms    = getRooms();
  const room     = rooms.find(r => r.id === roomID);
  const bed      = room.beds.find(b => b.bedID === bedID);
  activeBed      = { roomID, bedID };

  document.getElementById('modalTitle').textContent = `Room ${roomID} · Bed ${bedID}`;
  document.getElementById('modalSub').textContent   = `${room.type} – Floor ${room.floor} · RM ${room.dailyRate}/day`;

  const bodyEl = document.getElementById('modalBody');
  const footEl = document.getElementById('modalFoot');

  if (bed.status === 'Occupied') {
    const patient  = getPatients().find(p => p.id === bed.patientID);
    const days     = calcDays(bed.admissionDate);
    const cost     = days * room.dailyRate;

    bodyEl.innerHTML = `
      <div class="status-badge badge-occupied"><i class="fas fa-user-injured"></i> Occupied</div>
      <div class="pi-block">
        <div class="pi-row"><span class="pi-label"><i class="fas fa-id-card"></i> Patient ID</span><span class="pi-val">${bed.patientID}</span></div>
        <div class="pi-row"><span class="pi-label"><i class="fas fa-user"></i> Name</span><span class="pi-val">${patient ? patient.name : 'Unknown'}</span></div>
        <div class="pi-row"><span class="pi-label"><i class="fas fa-venus-mars"></i> Gender</span><span class="pi-val">${patient ? patient.gender : '–'}</span></div>
        <div class="pi-row"><span class="pi-label"><i class="fas fa-phone"></i> Phone</span><span class="pi-val">${patient ? patient.phone : '–'}</span></div>
        <div class="pi-row"><span class="pi-label"><i class="fas fa-calendar-plus"></i> Admission</span><span class="pi-val">${bed.admissionDate}</span></div>
        <div class="pi-row"><span class="pi-label"><i class="fas fa-clock"></i> Days Admitted</span><span class="pi-val">${days} day${days !== 1 ? 's' : ''}</span></div>
      </div>
      <div class="accrued-box">
        <span class="accrued-label">Accrued Room Cost</span>
        <span class="accrued-val">RM ${cost.toFixed(2)}</span>
      </div>`;

    footEl.innerHTML = `
      <button class="btn btn-secondary" onclick="setBedStatus('Maintenance')"><i class="fas fa-tools"></i> Set Maintenance</button>
      <button class="btn btn-danger"    onclick="dischargePatient()"><i class="fas fa-sign-out-alt"></i> Discharge Patient</button>`;

  } else if (bed.status === 'Available') {
    const allRooms    = getRooms();
    const occupiedIDs = [];
    allRooms.forEach(r => r.beds.forEach(b => { if (b.status === 'Occupied') occupiedIDs.push(b.patientID); }));

    // Only show patients with a pending admission request
    // If patient specified a preferred room, only show them in that room
    const pending  = JSON.parse(localStorage.getItem('pendingAdmissions') || '[]');
    const eligible = pending.filter(p =>
      !occupiedIDs.includes(p.patientID) &&
      (!p.preferredRoomID || p.preferredRoomID === roomID)
    );
    const eligibleIDs = eligible.map(p => p.patientID);
    const freePats    = getPatients().filter(p => eligibleIDs.includes(p.id));

    if (freePats.length === 0) {
      bodyEl.innerHTML = `
        <div class="status-badge badge-available"><i class="fas fa-check-circle"></i> Available</div>
        <div class="no-pending-msg">
          <i class="fas fa-info-circle"></i>
          No patients with a pending room admission request.<br>
          <small>Patients must request room admission via the Treatment form first.</small>
        </div>`;
      footEl.innerHTML = `
        <button class="btn btn-secondary" onclick="setBedStatus('Maintenance')"><i class="fas fa-tools"></i> Set Maintenance</button>
        <button class="btn btn-secondary" onclick="closeBedModal()">Close</button>`;
    } else {
      const patOpts = freePats.map(p => `<option value="${p.id}">${p.id} – ${p.name}</option>`).join('');

      bodyEl.innerHTML = `
        <div class="status-badge badge-available"><i class="fas fa-check-circle"></i> Available</div>
        <div style="margin-top:16px;">
          <div class="field" style="margin-bottom:8px;">
            <label>Select Patient <span class="req">*</span></label>
            <select id="admitPatSel" onchange="showAdmissionInfo()">
              <option value="">-- Select Patient --</option>
              ${patOpts}
            </select>
            <span id="admitPatErr" class="admit-err hidden"><i class="fas fa-exclamation-circle"></i> Please select a patient.</span>
          </div>
          <div id="admissionInfoBox" class="admission-info-box hidden"></div>
          <div class="field" style="margin-top:10px;">
            <label>Admission Date <span class="req">*</span></label>
            <input type="date" id="admitDateSel" />
          </div>
        </div>`;

      footEl.innerHTML = `
        <button class="btn btn-secondary" onclick="setBedStatus('Maintenance')"><i class="fas fa-tools"></i> Set Maintenance</button>
        <button class="btn btn-primary"   onclick="admitPatient()"><i class="fas fa-user-plus"></i> Admit Patient</button>`;
    }

  } else {
    bodyEl.innerHTML = `
      <div class="status-badge badge-maintenance"><i class="fas fa-tools"></i> Under Maintenance</div>
      <p style="margin-top:16px;color:var(--gray-600);font-size:0.88rem;">This bed is currently unavailable. Set it to Available to admit patients.</p>`;

    footEl.innerHTML = `
      <button class="btn btn-secondary" onclick="closeBedModal()">Close</button>
      <button class="btn btn-primary"   onclick="setBedStatus('Available')"><i class="fas fa-check"></i> Set Available</button>`;
  }

  document.getElementById('bedModal').classList.remove('hidden');
}

function closeBedModal(e) {
  if (e && e.target !== document.getElementById('bedModal')) return;
  document.getElementById('bedModal').classList.add('hidden');
  activeBed = null;
}

function calcDays(dmyStr) {
  const [d, m, y] = dmyStr.split('/').map(Number);
  const adm  = new Date(y, m - 1, d);
  const now  = new Date(); now.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((now - adm) / 86400000));
}

function setBedStatus(status) {
  if (!activeBed) return;
  const rooms = getRooms();
  const bed   = rooms.find(r => r.id === activeBed.roomID).beds.find(b => b.bedID === activeBed.bedID);
  bed.status  = status;
  if (status !== 'Occupied') { delete bed.patientID; delete bed.admissionDate; }
  saveRooms(rooms);
  renderStats();
  renderRoomGrid();
  document.getElementById('bedModal').classList.add('hidden');
  activeBed = null;
  showToast(`Bed status updated to ${status}.`);
}

function showAdmissionInfo() {
  const patID   = document.getElementById('admitPatSel').value;
  const infoBox = document.getElementById('admissionInfoBox');
  if (!patID) { infoBox.classList.add('hidden'); return; }

  const pending = JSON.parse(localStorage.getItem('pendingAdmissions') || '[]');
  const req     = pending.find(p => p.patientID === patID);
  if (!req) { infoBox.classList.add('hidden'); return; }

  // Pre-fill admission date from request
  if (req.admissionDate) {
    const [d, m, y] = req.admissionDate.split('/');
    document.getElementById('admitDateSel').value = `${y}-${m}-${d}`;
  }

  const prefRoom = req.preferredRoomID ? `<span class="info-tag"><i class="fas fa-door-open"></i> Preferred Room: ${req.preferredRoomID}${req.preferredBedID ? ' · ' + req.preferredBedID : ''}</span>` : '';
  infoBox.innerHTML = `
    <div class="adm-info-row"><i class="fas fa-calendar-plus"></i> Requested: ${req.admissionDate || '–'}</div>
    <div class="adm-info-row"><i class="fas fa-comment-medical"></i> Reason: ${req.admissionReason || '–'}</div>
    ${prefRoom ? `<div class="adm-info-row">${prefRoom}</div>` : ''}`;
  infoBox.classList.remove('hidden');
}

function admitPatient() {
  const patSel  = document.getElementById('admitPatSel');
  const dateVal = document.getElementById('admitDateSel').value;

  if (!patSel.value) {
    document.getElementById('admitPatErr').classList.remove('hidden');
    return;
  }
  if (!dateVal) {
    document.getElementById('admitDateSel').style.borderColor = 'var(--red)';
    return;
  }

  const [y, m, d] = dateVal.split('-');
  const admDate   = `${d}/${m}/${y}`;

  const rooms = getRooms();
  const bed   = rooms.find(r => r.id === activeBed.roomID).beds.find(b => b.bedID === activeBed.bedID);
  bed.status        = 'Occupied';
  bed.patientID     = patSel.value;
  bed.admissionDate = admDate;
  saveRooms(rooms);

  // Remove from pendingAdmissions
  const pending = JSON.parse(localStorage.getItem('pendingAdmissions') || '[]');
  localStorage.setItem('pendingAdmissions', JSON.stringify(pending.filter(p => p.patientID !== patSel.value)));

  renderStats();
  renderRoomGrid();
  document.getElementById('bedModal').classList.add('hidden');
  activeBed = null;
  showToast('Patient admitted successfully.');
}

function dischargePatient() {
  if (!confirm('Discharge this patient and free the bed?')) return;
  setBedStatus('Available');
}

/* ══════════════════════════════════════
   ROOM MODAL (ADD / EDIT)
══════════════════════════════════════ */
const ROOM_TYPE_RATES = {
  'General Ward':    100,
  'Private Room':    250,
  'ICU':             500,
  'Paediatric Ward': 150,
  'Maternity Ward':  200,
};

function autoFillRate() {
  const type = document.getElementById('rmType').value;
  document.getElementById('rmRate').value = ROOM_TYPE_RATES[type] ?? '';
}

let editingRoomID = null;

function openRoomModal(roomID, e) {
  if (e) e.stopPropagation();
  editingRoomID = roomID;
  const isEdit  = !!roomID;

  document.getElementById('roomModalTitle').textContent = isEdit ? 'Edit Room' : 'Add New Room';
  document.getElementById('roomFormError').classList.add('hidden');

  const bedsField = document.getElementById('rmBedsField');

  if (isEdit) {
    const room = getRooms().find(r => r.id === roomID);
    document.getElementById('rmID').value    = room.id;
    document.getElementById('rmID').readOnly = true;
    document.getElementById('rmFloor').value = room.floor;
    document.getElementById('rmType').value  = room.type;
    document.getElementById('rmRate').value  = room.dailyRate;
    bedsField.classList.add('hidden');
    document.getElementById('saveRoomBtn').innerHTML = '<i class="fas fa-save"></i> Update Room';
  } else {
    document.getElementById('rmID').value    = '';
    document.getElementById('rmID').readOnly = false;
    document.getElementById('rmFloor').value = '';
    document.getElementById('rmType').value  = '';
    document.getElementById('rmRate').value  = '';
    document.getElementById('rmBeds').value  = '';
    bedsField.classList.remove('hidden');
    document.getElementById('saveRoomBtn').innerHTML = '<i class="fas fa-save"></i> Save Room';
  }

  document.getElementById('roomModal').classList.remove('hidden');
}

function closeRoomModal(e) {
  if (e && e.target !== document.getElementById('roomModal')) return;
  document.getElementById('roomModal').classList.add('hidden');
  editingRoomID = null;
}

function saveRoom() {
  const id      = document.getElementById('rmID').value.trim().toUpperCase();
  const floor   = parseInt(document.getElementById('rmFloor').value);
  const type    = document.getElementById('rmType').value;
  const rate    = parseFloat(document.getElementById('rmRate').value);
  const bedsCnt = parseInt(document.getElementById('rmBeds').value);
  const errEl   = document.getElementById('roomFormError');

  if (!id || !floor || !type || isNaN(rate) || (!editingRoomID && isNaN(bedsCnt))) {
    errEl.innerHTML = '<i class="fas fa-exclamation-circle"></i> All fields are required.';
    errEl.classList.remove('hidden');
    return;
  }
  if (!editingRoomID && (bedsCnt < 1 || bedsCnt > 20)) {
    errEl.innerHTML = '<i class="fas fa-exclamation-circle"></i> Number of beds must be between 1 and 20.';
    errEl.classList.remove('hidden');
    return;
  }

  const rooms = getRooms();

  if (!editingRoomID) {
    if (rooms.find(r => r.id === id)) {
      errEl.innerHTML = `<i class="fas fa-exclamation-circle"></i> Room ID "${id}" already exists.`;
      errEl.classList.remove('hidden');
      return;
    }
    const newBeds = Array.from({ length: bedsCnt }, (_, i) => ({
      bedID: 'B' + String(i + 1).padStart(2, '0'),
      status: 'Available',
    }));
    rooms.push({ id, floor, type, dailyRate: rate, beds: newBeds });
    showToast(`Room ${id} added successfully.`);
  } else {
    const room     = rooms.find(r => r.id === editingRoomID);
    room.floor     = floor;
    room.type      = type;
    room.dailyRate = rate;
    showToast(`Room ${editingRoomID} updated.`);
  }

  saveRooms(rooms);
  renderStats();
  renderRoomGrid();
  document.getElementById('roomModal').classList.add('hidden');
  editingRoomID = null;
}

function deleteRoom(roomID, e) {
  if (e) e.stopPropagation();
  const rooms    = getRooms();
  const room     = rooms.find(r => r.id === roomID);
  const occupied = room.beds.filter(b => b.status === 'Occupied').length;
  if (occupied > 0) {
    showToast(`Cannot delete Room ${roomID} — ${occupied} bed(s) still occupied.`, true);
    return;
  }
  if (!confirm(`Delete Room ${roomID}? This cannot be undone.`)) return;
  saveRooms(rooms.filter(r => r.id !== roomID));
  renderStats();
  renderRoomGrid();
  showToast(`Room ${roomID} deleted.`);
}

/* ══════════════════════════════════════
   TOAST
══════════════════════════════════════ */
function showToast(msg, isError = false) {
  const t       = document.getElementById('toast');
  t.textContent = msg;
  t.className   = `toast ${isError ? 'toast-error' : 'toast-success'}`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.add('hidden'), 3200);
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
const samplePendingAdmissions = [
  {
    patientID:       'PAT-2025-002',
    treatmentID:     'TRT-20260407-00001',
    admissionDate:   '08/04/2026',
    admissionReason: 'Follow-up on gynaecology consultation requiring overnight monitoring.',
    preferredRoomID: 'R201',
    preferredBedID:  null,
  },
  {
    patientID:       'PAT-2025-004',
    treatmentID:     'TRT-20260408-00002',
    admissionDate:   '08/04/2026',
    admissionReason: 'Chest discomfort, requested cardiology observation and monitoring.',
    preferredRoomID: null,
    preferredBedID:  null,
  },
  {
    patientID:       'PAT-2025-007',
    treatmentID:     'TRT-20260408-00003',
    admissionDate:   '08/04/2026',
    admissionReason: 'Persistent headache and dizziness, requires neurological assessment.',
    preferredRoomID: 'R102',
    preferredBedID:  'B03',
  },
  {
    patientID:       'PAT-2025-009',
    treatmentID:     'TRT-20260407-00004',
    admissionDate:   '07/04/2026',
    admissionReason: 'Post-surgery recovery following appendectomy.',
    preferredRoomID: null,
    preferredBedID:  null,
  },
];

function initPendingAdmissions() {
  if (!localStorage.getItem('pendingAdmissions')) {
    localStorage.setItem('pendingAdmissions', JSON.stringify(samplePendingAdmissions));
  }
}

initPendingAdmissions();
initRooms();
initPatients();
renderStats();
renderRoomGrid();
