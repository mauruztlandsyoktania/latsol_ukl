const { User } = require("..");
const md5 = require("md5");

// CREATE USER
exports.addUser = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      username: req.body.username,
      password: md5(req.body.password), // MD5 otomatis
      role: req.body.role
    };
    const result = await User.create(data);
    res.json({ status: "success", message: "Pengguna berhasil ditambahkan", data: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ USER
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json({ status: "success", data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password ? md5(req.body.password) : undefined,
      role: req.body.role
    };

    // Hapus field yang undefined supaya tidak overwrite password lama
    Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);

    // Update user
    await User.update(data, { where: { id: req.params.id } });

    // Ambil user terbaru setelah update
    const updatedUser = await User.findByPk(req.params.id);

    res.json({
      status: "success",
      message: "Pengguna berhasil diubah",
      data: {
        id: updatedUser.id,
        name: updatedUser.name,
        username: updatedUser.username,
        role: updatedUser.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};