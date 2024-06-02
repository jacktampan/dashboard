const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const connection = require('../db/connection');

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).fields([
  { name: 'fotoKost', maxCount: 1 },
  { name: 'fotoLuarKamar', maxCount: 1 },
  { name: 'fotoDalamKamar', maxCount: 1 }
]);

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

router.post('/products', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(500).json({ error: err });
    } else {
      console.log('Request body:', req.body);
      console.log('Request files:', req.files);

      // Data parsed from formData
      const {
        namaKost, ukuranKost, jumlahTotalKamar, jumlahKamarTersedia, hargaPerBulan, hargaPer3Bulan, hargaPer6Bulan, hargaPer12Bulan,
        alamat, kota, provinsi, fasilitasKamar, fasilitasBersama, peraturan
      } = req.body;

      // Log parsed data
      console.log('Parsed data:', {
        namaKost, ukuranKost, jumlahTotalKamar, jumlahKamarTersedia, hargaPerBulan, hargaPer3Bulan, hargaPer6Bulan, hargaPer12Bulan,
        alamat, kota, provinsi, fasilitasKamar, fasilitasBersama, peraturan
      });

      const files = req.files;
      const fotoKost = files.fotoKost ? files.fotoKost[0].filename : null;
      const fotoLuarKamar = files.fotoLuarKamar ? files.fotoLuarKamar[0].filename : null;
      const fotoDalamKamar = files.fotoDalamKamar ? files.fotoDalamKamar[0].filename : null;

      // Log processed files
      console.log('Processed files:', { fotoKost, fotoLuarKamar, fotoDalamKamar });

      const query = `INSERT INTO products (
        namaKost, ukuranKost, jumlahTotalKamar, jumlahKamarTersedia, hargaPerBulan, hargaPer3Bulan, hargaPer6Bulan, hargaPer12Bulan, 
        alamat, kota, provinsi, fasilitasKamar, fasilitasBersama, peraturan, fotoKost, fotoLuarKamar, fotoDalamKamar
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      // Log query and data to be inserted
      console.log('SQL Query:', query);
      console.log('Data to be inserted:', [
        namaKost, ukuranKost, jumlahTotalKamar, jumlahKamarTersedia, hargaPerBulan, hargaPer3Bulan, hargaPer6Bulan, hargaPer12Bulan,
        alamat, kota, provinsi, JSON.stringify(fasilitasKamar), JSON.stringify(fasilitasBersama), JSON.stringify(peraturan), 
        fotoKost, fotoLuarKamar, fotoDalamKamar
      ]);

      connection.query(query, [
        namaKost, ukuranKost, jumlahTotalKamar, jumlahKamarTersedia, hargaPerBulan, hargaPer3Bulan, hargaPer6Bulan, hargaPer12Bulan,
        alamat, kota, provinsi, JSON.stringify(fasilitasKamar), JSON.stringify(fasilitasBersama), JSON.stringify(peraturan), 
        fotoKost, fotoLuarKamar, fotoDalamKamar
      ], (err, result) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: err });
        }
        console.log('Database result:', result);
        res.json({ id: result.insertId });
      });
    }
  });
});
router.get('/products', (req, res) => {
  connection.query('SELECT * FROM products', (err, results) => {
    if (err) throw err;

    // Parse JSON fields
    results = results.map(product => {
      return {
        ...product,
        fasilitasKamar: JSON.parse(product.fasilitasKamar || '[]'),
        fasilitasBersama: JSON.parse(product.fasilitasBersama || '[]'),
        peraturan: JSON.parse(product.peraturan || '[]')
      };
    });

    res.json(results);
  });
});

router.put('/products/:id', (req, res) => {
  console.log(`PUT request to /products/${req.params.id}`);
  const { id } = req.params;
  const {
    namaKost, ukuranKost, jumlahTotalKamar, jumlahKamarTersedia, hargaPerBulan, hargaPer3Bulan, hargaPer6Bulan, hargaPer12Bulan,
    alamat, kota, provinsi, fasilitasKamar, fasilitasBersama, peraturan
  } = req.body;

  const query = `UPDATE products SET 
    namaKost = ?, ukuranKost = ?, jumlahTotalKamar = ?, jumlahKamarTersedia = ?, hargaPerBulan = ?, hargaPer3Bulan = ?, hargaPer6Bulan = ?, hargaPer12Bulan = ?,
    alamat = ?, kota = ?, provinsi = ?, fasilitasKamar = ?, fasilitasBersama = ?, peraturan = ?
    WHERE id = ?`;

  const values = [
    namaKost, ukuranKost, jumlahTotalKamar, jumlahKamarTersedia, hargaPerBulan, hargaPer3Bulan, hargaPer6Bulan, hargaPer12Bulan,
    alamat, kota, provinsi, JSON.stringify(fasilitasKamar), JSON.stringify(fasilitasBersama), JSON.stringify(peraturan),
    id
  ];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err });
    }
    res.json({ message: 'Product updated successfully' });
  });
});


router.delete('/products/:id', (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM products WHERE id = ?`;

  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err });
    }
    res.json({ message: 'Product deleted successfully' });
  });
});

module.exports = router;