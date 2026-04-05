/* ── Date display ── */
const today = new Date();
const fmt = d => d.toString().padStart(2, '0');
const dateStr = `${fmt(today.getDate())}/${fmt(today.getMonth() + 1)}/${today.getFullYear()}`;
document.getElementById('displayDate').textContent = dateStr;

/* ── Data ── */
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

/* ── Build prescription rows ── */
const ROWS = 4;
const tbody = document.getElementById('prescriptionBody');

for (let i = 1; i <= ROWS; i++) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${i}.</td>
    <td>
      <select class="med-sel" onchange="checkAddRow()">
        <option value="">Select medicine</option>
        ${medicines.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
      </select>
    </td>
    <td>
      <select>
        <option value="">-- Dosage --</option>
        ${dosageOptions.map(d => `<option>${d}</option>`).join('')}
      </select>
    </td>
    <td>
      <select>
        <option value="">-- Frequency --</option>
        ${freqOptions.map(f => `<option>${f}</option>`).join('')}
      </select>
    </td>
    <td><input type="date" /></td>
    <td><input type="date" /></td>
  `;
  tbody.appendChild(tr);
}

/* ── Validation & Submit ── */
function submitForm() {
  const required = [
    { id: 'patientID',       label: 'Patient ID' },
    { id: 'patientName',     label: 'Patient Name' },
    { id: 'patientPhone',    label: 'Phone' },
    { id: 'patientGender',   label: 'Gender' },
    { id: 'doctorID',        label: 'Doctor' },
    { id: 'consultType',     label: 'Consultation Type' },
    { id: 'treatmentMethod', label: 'Treatment Method' },
    { id: 'treatmentStatus', label: 'Treatment Status' },
    { id: 'payMethod',       label: 'Payment Method' },
    { id: 'payAmount',       label: 'Amount' },
    { id: 'payStatus',       label: 'Payment Status' },
  ];

  for (const f of required) {
    const el = document.getElementById(f.id);
    if (!el.value.trim()) {
      alert(`Please fill in: ${f.label}`);
      el.focus();
      return;
    }
  }

  alert('Treatment record submitted successfully!');
  clearForm();
}

function clearForm() {
  document.querySelectorAll('input, select, textarea').forEach(el => {
    el.value = '';
  });
  document.getElementById('displayDate').textContent = dateStr;
}

function cancelForm() {
  if (confirm('Cancel and discard all entries?')) clearForm();
}

function checkAddRow() { /* placeholder for dynamic row logic */ }
