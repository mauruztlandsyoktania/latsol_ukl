const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/users", require("./routes/user.route"));

const siswaRoute = require("./routes/siswa.route");
const petugasRoute = require("./routes/petugas.route");
const presensiRoute = require("./routes/presensi.route");
const attendanceRoutes = require("./routes/attendance.route");

app.use("/api/attendance", attendanceRoutes);
app.use("/siswa", siswaRoute);
app.use("/petugas", petugasRoute);
app.use("/presensi", presensiRoute);

app.listen(8000, () => console.log("Server running on port 8000"));