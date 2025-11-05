const { presensi, siswa, petugas } = require("..");

exports.getAllPresensi = async (req, res) => {
  try {
    const result = await presensi.findAll({
      include: [siswa, petugas]
    });
    res.json({ message: "Data presensi lengkap", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addPresensi = async (req, res) => {
  try {
    const result = await presensi.create(req.body);
    res.json({ message: "Data presensi ditambahkan", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};