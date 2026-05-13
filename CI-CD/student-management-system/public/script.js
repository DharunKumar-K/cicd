* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f0f4f8;
  color: #333;
  min-height: 100vh;
}

/* Navbar */
.navbar {
  background: linear-gradient(135deg, #1a73e8, #0d47a1);
  color: white;
  padding: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-brand {
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.nav-sub {
  font-size: 0.85rem;
  opacity: 0.8;
  background: rgba(255,255,255,0.15);
  padding: 4px 12px;
  border-radius: 20px;
}

/* Container */
.container {
  max-width: 1100px;
  margin: 30px auto;
  padding: 0 20px;
}

/* Stats */
.stats-bar {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background: linear-gradient(135deg, #1a73e8, #0d47a1);
  color: white;
  padding: 20px 36px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 12px rgba(26,115,232,0.3);
  min-width: 160px;
}

.stat-number {
  font-size: 2.2rem;
  font-weight: 700;
}

.stat-label {
  font-size: 0.85rem;
  opacity: 0.9;
  margin-top: 4px;
}

/* Card */
.card {
  background: white;
  border-radius: 14px;
  padding: 28px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
}

.card h2 {
  font-size: 1.2rem;
  color: #1a73e8;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e8f0fe;
}

/* Form */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #555;
}

.form-group input,
.form-group select {
  padding: 10px 14px;
  border: 1.5px solid #dde3ec;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: border-color 0.2s;
  outline: none;
  background: #fafbfc;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #1a73e8;
  background: white;
}

.form-actions {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}

/* Buttons */
.btn {
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: linear-gradient(135deg, #1a73e8, #0d47a1);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(26,115,232,0.4);
}

.btn-secondary {
  background: #f1f3f4;
  color: #555;
}

.btn-secondary:hover {
  background: #e2e6ea;
}

/* Table Header */
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.table-header h2 {
  margin-bottom: 0;
  border-bottom: none;
  padding-bottom: 0;
}

#searchInput {
  padding: 9px 16px;
  border: 1.5px solid #dde3ec;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
  width: 240px;
  transition: border-color 0.2s;
}

#searchInput:focus {
  border-color: #1a73e8;
}

/* Table */
.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
}

thead tr {
  background: #e8f0fe;
}

thead th {
  padding: 12px 16px;
  text-align: left;
  font-weight: 700;
  color: #1a73e8;
  white-space: nowrap;
}

tbody tr {
  border-bottom: 1px solid #f0f4f8;
  transition: background 0.15s;
}

tbody tr:hover {
  background: #f8faff;
}

tbody td {
  padding: 12px 16px;
  vertical-align: middle;
}

.empty-msg {
  text-align: center;
  color: #aaa;
  padding: 40px !important;
  font-style: italic;
}

/* Action Buttons */
.btn-edit {
  background: #fff3cd;
  color: #856404;
  border: 1px solid #ffc107;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 600;
  margin-right: 6px;
  transition: all 0.2s;
}

.btn-edit:hover {
  background: #ffc107;
  color: white;
}

.btn-delete {
  background: #fde8e8;
  color: #c0392b;
  border: 1px solid #e74c3c;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-delete:hover {
  background: #e74c3c;
  color: white;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 14px 24px;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  z-index: 999;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.toast.show {
  opacity: 1;
}

.toast.success { background: #27ae60; }
.toast.error   { background: #e74c3c; }

/* Responsive */
@media (max-width: 640px) {
  .form-grid { grid-template-columns: 1fr; }
  .nav-sub { display: none; }
  #searchInput { width: 100%; }
  .table-header { flex-direction: column; align-items: flex-start; }
}
