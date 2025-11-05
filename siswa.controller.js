const { siswa } = require("..");

exports.getAllSiswa = async (req, res) => {
  try {
    const result = await siswa.findAll();
    res.json({ message: "Data semua siswa", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addSiswa = async (req, res) => {
  try {
    const result = await siswa.create(req.body);
    res.json({ message: "Data siswa ditambahkan", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};