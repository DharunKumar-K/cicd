const API = '/api/students';
let allStudents = [];

const sampleStudents = [
  { _id: 's1', name: 'Aisha Khan', rollNumber: 'CS2025001', department: 'Computer Science', email: 'aisha@campus.edu', createdAt: Date.now()-86400000 },
  { _id: 's2', name: 'Ravi Patel', rollNumber: 'EE2025002', department: 'Electrical', email: 'ravi@campus.edu', createdAt: Date.now()-43200000 },
  { _id: 's3', name: 'Mina Roy', rollNumber: 'IT2025003', department: 'Information Technology', email: 'mina@campus.edu', createdAt: Date.now()-7200000 }
];

async function fetchStudentsFromApi() {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    return null;
  }
}

async function loadStudents() {
  const apiData = await fetchStudentsFromApi();
  allStudents = apiData || sampleStudents.slice();
  renderAll();
}

function renderAll() {
  renderStats();
  renderDeptFilter();
  renderTable(allStudents);
}

function renderStats() {
  document.getElementById('totalCount').textContent = allStudents.length;
  const depts = [...new Set(allStudents.map(s => s.department || '—'))];
  document.getElementById('deptCount').textContent = depts.length;
  const recent = allStudents.slice().sort((a,b)=> (b.createdAt||0)-(a.createdAt||0)).slice(0,3).length;
  document.getElementById('recentCount').textContent = recent;
}

function renderDeptFilter(){
  const select = document.getElementById('deptFilter');
  const depts = [...new Set(allStudents.map(s=>s.department).filter(Boolean))];
  select.innerHTML = '<option value="">All departments</option>' + depts.map(d=>`<option value="${d}">${d}</option>`).join('');
}

function renderTable(students){
  const tbody = document.getElementById('studentBody');
  if(!students || students.length===0){
    tbody.innerHTML = '<tr><td colspan="6" class="empty">No students found</td></tr>';
    return;
  }
  tbody.innerHTML = students.map((s,i)=>`<tr>
    <td>${i+1}</td>
    <td>${escapeHtml(s.name)}</td>
    <td>${escapeHtml(s.rollNumber||'—')}</td>
    <td>${escapeHtml(s.department||'—')}</td>
    <td>${escapeHtml(s.email||'—')}</td>
    <td>
      <button class="btn small" onclick="editStudent('${s._id}')">Edit</button>
      <button class="btn small" onclick="deleteStudent('${s._id}')">Delete</button>
    </td>
  </tr>`).join('');
}

function escapeHtml(s){ if(!s) return ''; return String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'":"'"}[c]||c)); }

// Search + filter
document.getElementById('globalSearch').addEventListener('input', (e)=>{
  applyFilters();
});
document.getElementById('deptFilter').addEventListener('change', ()=>applyFilters());

function applyFilters(){
  const q = document.getElementById('globalSearch').value.trim().toLowerCase();
  const dept = document.getElementById('deptFilter').value;
  const filtered = allStudents.filter(s=>{
    if(dept && s.department!==dept) return false;
    if(!q) return true;
    return [s.name,s.rollNumber,s.department,s.email].map(v=>String(v||'').toLowerCase()).some(v=>v.includes(q));
  });
  renderTable(filtered);
}

// New student quick-add (local fallback to API if available)
document.getElementById('newStudentBtn').addEventListener('click', async ()=>{
  // open form focus for quick add
  document.getElementById('name').focus();
});

// Form submit - Add or Update student (tries API, falls back to local)
document.getElementById('studentForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const id = document.getElementById('studentId').value;
  const payload = {
    name: document.getElementById('name').value.trim(),
    rollNumber: document.getElementById('rollNumber').value.trim(),
    department: document.getElementById('department').value,
    email: document.getElementById('email').value.trim()
  };
  if(!payload.name) return showToast('Name is required','error');
  try{
    const res = await fetch(id ? `${API}/${id}` : API, {
      method: id ? 'PUT' : 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    if(!res.ok) throw new Error('API error');
    showToast(id ? 'Student updated' : 'Student created','success');
    await loadStudents();
    resetForm();
    return;
  }catch(err){
    // fallback local behavior
    if(id){
      const idx = allStudents.findIndex(s=>s._id===id);
      if(idx>-1){ allStudents[idx] = {...allStudents[idx], ...payload}; showToast('Updated (local)','success'); }
    } else {
      const nid = 'local_' + Math.random().toString(36).slice(2,9);
      allStudents.unshift({ _id: nid, ...payload, createdAt: Date.now() });
      showToast('Added (local)','success');
    }
    renderAll();
    resetForm();
  }
});

// Cancel button behavior
document.getElementById('cancelBtn').addEventListener('click', resetForm);

// Populate form for editing
function editStudent(id){
  const s = allStudents.find(x=>x._id===id);
  if(!s) return showToast('Student not found','error');
  document.getElementById('studentId').value = s._id;
  document.getElementById('name').value = s.name || '';
  document.getElementById('rollNumber').value = s.rollNumber || '';
  document.getElementById('department').value = s.department || '';
  document.getElementById('email').value = s.email || '';
  document.getElementById('formTitle').textContent = 'Edit Student';
  document.getElementById('submitBtn').textContent = 'Update Student';
  document.getElementById('cancelBtn').style.display = 'inline-block';
  window.scrollTo({top:0,behavior:'smooth'});
}

// Delete student
async function deleteStudent(id){
  if(!confirm('Delete this student?')) return;
  try{
    const res = await fetch(`${API}/${id}`, { method:'DELETE' });
    if(!res.ok) throw new Error('API error');
    showToast('Deleted','success');
    await loadStudents();
    return;
  }catch(e){
    // fallback local remove
    allStudents = allStudents.filter(s=>s._id!==id);
    showToast('Deleted (local)','success');
    renderAll();
  }
}

function resetForm(){
  document.getElementById('studentForm').reset();
  document.getElementById('studentId').value = '';
  document.getElementById('formTitle').textContent = 'Add New Student';
  document.getElementById('submitBtn').textContent = 'Add Student';
  document.getElementById('cancelBtn').style.display = 'none';
}

function showToast(msg, type='success'){
  const t = document.getElementById('toast');
  t.textContent = msg; t.className = 'toast show';
  setTimeout(()=> t.className='toast', 3000);
}

// init
loadStudents();
