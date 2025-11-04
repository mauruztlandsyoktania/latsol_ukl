const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json());

// Simpan data user sementara di memory
let users = [];

// === ROUTE DASAR ===
app.get('/', (req, res) => {
  res.send('Server berjalan dengan sukses 🚀');
});

// === ROUTE POST /api/users ===
// Tambah user secara umum (mirip register)
app.post('/api/users', (req, res) => {
  const { name, username, password, role } = req.body;

  console.log('Data user diterima:', req.body);

  if (!name || !username || !password || !role) {
    return res.status(400).json({ message: 'Semua field harus diisi' });
  }

  users.push({ name, username, password, role });
  res.status(201).json({
    message: 'User berhasil ditambahkan',
    data: { name, username, role },
  });
});

// === ROUTE PUT /api/users/:id ===
// Update data user berdasarkan index (sementara pakai index array sebagai id)
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, username, password, role } = req.body;

  if (!users[id]) {
    return res.status(404).json({ message: 'User tidak ditemukan' });
  }

  // Update data user
  if (name) users[id].name = name;
  if (username) users[id].username = username;
  if (password) users[id].password = password;
  if (role) users[id].role = role;

  res.json({
    message: `User dengan ID ${id} berhasil diperbarui`,
    data: users[id],
  });
});

// === ROUTE AUTH REGISTER ===
app.post('/auth/register', (req, res) => {
  const { name, username, password, role } = req.body;

  if (!name || !username || !password || !role) {
    return res.status(400).json({ message: 'Semua field harus diisi' });
  }

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username sudah digunakan' });
  }

  users.push({ name, username, password, role });
  res.status(201).json({ message: 'Registrasi berhasil', users });
});

// === ROUTE AUTH LOGIN ===
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Username atau password salah' });
  }

  res.json({
    message: 'Login berhasil!',
    user: { name: user.name, username: user.username, role: user.role },
  });
});

// === JALANKAN SERVER ===
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});