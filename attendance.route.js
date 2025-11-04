
const { Attendance, User } = require("../models");
const { Op } = require("sequelize");

// Tambah presensi
const addAttendance = async (req, res) => {
  try {
    const result = await Attendance.create(req.body);
    res.json({ status: "success", message: "Presensi berhasil dicatat", data: result });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Riwayat presensi per user
const getHistory = async (req, res) => {
  try {
    const data = await Attendance.findAll({ where: { user_id: req.params.user_id } });
    res.json({ status: "success", data });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Rekap kehadiran bulanan per user
const getMonthlySummary = async (req, res) => {
  try {
    const { user_id } = req.params;
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const monthStart = `${year}-${month}-01`;
    const monthEnd = `${year}-${month}-31`;

    const records = await Attendance.findAll({
      where: {
        user_id,
        date: { [Op.between]: [monthStart, monthEnd] }
      }
    });

    const summary = { hadir: 0, izin: 0, sakit: 0, alpa: 0 };
    records.forEach(r => {
      if (r.status === "hadir") summary.hadir += 1;
      else if (r.status === "izin") summary.izin += 1;
      else if (r.status === "sakit") summary.sakit += 1;
      else summary.alpa += 1;
    });

    res.json({
      status: "success",
      data: {
        user_id: parseInt(user_id),
        month: `${month}-${year}`,
        attendance_summary: summary
      }
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Analisis tingkat kehadiran
const analyzeAttendance = async (req, res) => {
  try {
    const { start_date, end_date, group_by } = req.body;

    if (!start_date || !end_date || !group_by) {
      return res.status(400).json({ status: "error", message: "start_date, end_date, dan group_by wajib diisi" });
    }

    // Ambil semua presensi di periode, join User
    const records = await Attendance.findAll({
      include: [{ model: User, attributes: ["id", "name", "username", "role"] }],
      where: { date: { [Op.between]: [start_date, end_date] } }
    });

    const grouped = {};
    records.forEach(r => {
      const groupValue = r.User ? r.User[group_by] || "Unknown" : "Unknown";

      if (!grouped[groupValue]) grouped[groupValue] = { users: new Set(), hadir: 0, izin: 0, sakit: 0, alpa: 0 };

      grouped[groupValue].users.add(r.user_id);

      if (r.status === "hadir") grouped[groupValue].hadir += 1;
      else if (r.status === "izin") grouped[groupValue].izin += 1;
      else if (r.status === "sakit") grouped[groupValue].sakit += 1;
      else grouped[groupValue].alpa += 1;
    });

    const grouped_analysis = Object.entries(grouped).map(([group, data]) => {
      const total_attendance = data.hadir + data.izin + data.sakit + data.alpa;
      const total_users = data.users.size;

      return {
        group,
        total_users,
        attendance_rate: {
          hadir_percentage: total_attendance ? parseFloat((data.hadir / total_attendance * 100).toFixed(2)) : 0,
          izin_percentage: total_attendance ? parseFloat((data.izin / total_attendance * 100).toFixed(2)) : 0,
          sakit_percentage: total_attendance ? parseFloat((data.sakit / total_attendance * 100).toFixed(2)) : 0,
          alpa_percentage: total_attendance ? parseFloat((data.alpa / total_attendance * 100).toFixed(2)) : 0
        },
        total_attendance: { hadir: data.hadir, izin: data.izin, sakit: data.sakit, alpa: data.alpa }
      };
    });

    res.json({ status: "success", data: { analysis_period: { start_date, end_date }, grouped_analysis } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

module.exports = {
  addAttendance,
  getHistory,
  getMonthlySummary,
  analyzeAttendance
};