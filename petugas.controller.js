const { petugas } = require("../models");

exports.getAllPetugas = async (req, res) => {
  try {
    const result = await petugas.findAll();
    res.json({ message: "Data semua petugas", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addPetugas = async (req, res) => {
  try {
    const result = await petugas.create(req.body);
    res.json({ message: "Data petugas ditambahkan", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};