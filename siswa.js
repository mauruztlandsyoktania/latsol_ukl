"use strict";
module.exports = (sequelize, DataTypes) => {
  const siswa = sequelize.define("siswa", {
    siswaID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nama: DataTypes.STRING,
    kelas: DataTypes.STRING
  }, {
    tableName: "siswa",
    timestamps: false
  });

  siswa.associate = models => {
    siswa.hasMany(models.presensi, { foreignKey: "siswaID" });
  };

  return siswa;
};