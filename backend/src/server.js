require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const pool = require('./db');

const app = express();
const PORT = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

app.get('/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ ok: true, message: 'API y MySQL conectados' });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error de conexion a MySQL', error: error.message });
  }
});

app.post('/api/register', async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ ok: false, message: 'nombre, email y password son obligatorios' });
  }

  try {
    const cleanNombre = String(nombre).trim();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanRol = String(rol || 'user').trim();

    const [existingRows] = await pool.query('SELECT usuario_id FROM usuario WHERE email = ? LIMIT 1', [cleanEmail]);
    if (existingRows.length > 0) {
      return res.status(409).json({ ok: false, message: 'Ese email ya esta registrado' });
    }

    const hashedPassword = await bcrypt.hash(String(password), 10);

    const [result] = await pool.query(
      `INSERT INTO usuario (nombre, email, contrasena_hash, rol, foto_url, creado_en)
       VALUES (?, ?, ?, ?, NULL, NOW())`,
      [cleanNombre, cleanEmail, hashedPassword, cleanRol]
    );

    return res.status(201).json({
      ok: true,
      message: 'Usuario registrado correctamente',
      data: { usuario_id: result.insertId, nombre: cleanNombre, email: cleanEmail, rol: cleanRol },
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Error al registrar usuario', error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ ok: false, message: 'email y password son obligatorios' });
  }

  try {
    const cleanEmail = String(email).trim().toLowerCase();

    const [rows] = await pool.query(
      'SELECT usuario_id, nombre, email, contrasena_hash, rol FROM usuario WHERE email = ? LIMIT 1',
      [cleanEmail]
    );

    if (rows.length === 0) {
      return res.status(401).json({ ok: false, message: 'Credenciales invalidas' });
    }

    const user = rows[0];
    const isValidPassword = await bcrypt.compare(String(password), user.contrasena_hash || '');

    if (!isValidPassword) {
      return res.status(401).json({ ok: false, message: 'Credenciales invalidas' });
    }

    return res.status(200).json({
      ok: true,
      message: 'Login correcto',
      data: {
        usuario_id: user.usuario_id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Error al iniciar sesion', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
