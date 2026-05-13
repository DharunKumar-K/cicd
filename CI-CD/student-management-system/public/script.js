const API = '/api/students';
let allStudents = [];

// Fetch and render all students
async function loadStudents() {
  try {
    const res = await fetch(API);
    allStudents = await res.json();
    renderTable(allStudents);
    document.getElementById('totalCount').textContent = allStudents.length;
  } catch {
    showToast('Failed to load students', 'error');
  }
}

function renderTable(students) {
  const tbody = document.getElementById('studentBody');
  if (!students.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="empty-msg">No students found. Add one above!</td></tr>';
    return;
  }
  tbody.innerHTML = students.map((s, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${s.name}</td>
      <td><strong>${s.rollNumber}</strong></td>
      <td><span class="dept-badge">${s.department}</span></td>
      <td>${s.email}</td>
      <td>
        <button class="btn-edit" onclick="editStudent('${s._id}')">✏️ Edit</button>
        <button class="btn-delete" onclick="deleteStudent('${s._id}')">🗑️ Delete</button>
      </td>
    </tr>
  `).join('');
}

// Search/filter
function filterStudents() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const filtered = allStudents.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.rollNumber.toLowerCase().includes(q) ||
    s.department.toLowerCase().includes(q) ||
    s.email.toLowerCase().includes(q)
  );
  renderTable(filtered);
}

// Form submit — Add or Update
document.getElementById('studentForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('studentId').value;
  const data = {
    name: document.getElementById('name').value.trim(),
    rollNumber: document.getElementById('rollNumber').value.trim(),
    department: document.getElementById('department').value,
    email: document.getElementById('email').value.trim()
  };

  try {
    const res = await fetch(id ? `${API}/${id}` : API, {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error);
    showToast(id ? 'Student updated!' : 'Student added!', 'success');
    resetForm();
    loadStudents();
  } catch (err) {
    showToast(err.message || 'Something went wrong', 'error');
  }
});

// Populate form for editing
function editStudent(id) {
  const s = allStudents.find(s => s._id === id);
  if (!s) return;
  document.getElementById('studentId').value = s._id;
  document.getElementById('name').value = s.name;
  document.getElementById('rollNumber').value = s.rollNumber;
  document.getElementById('department').value = s.department;
  document.getElementById('email').value = s.email;
  document.getElementById('formTitle').textContent = 'Edit Student';
  document.getElementById('submitBtn').textContent = 'Update Student';
  document.getElementById('cancelBtn').style.display = 'inline-block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Delete student
async function deleteStudent(id) {
  if (!confirm('Are you sure you want to delete this student?')) return;
  try {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error);
    showToast('Student deleted!', 'success');
    loadStudents();
  } catch (err) {
    showToast(err.message || 'Delete failed', 'error');
  }
}

// Reset form to Add mode
function resetForm() {
  document.getElementById('studentForm').reset();
  document.getElementById('studentId').value = '';
  document.getElementById('formTitle').textContent = 'Add New Student';
  document.getElementById('submitBtn').textContent = 'Add Student';
  document.getElementById('cancelBtn').style.display = 'none';
}

// Toast notification
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `toast ${type} show`;
  setTimeout(() => toast.className = 'toast', 3000);
}

// Init
loadStudents();
