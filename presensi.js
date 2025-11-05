"use strict";
module.exports = (sequelize, DataTypes) => {
  const presensi = sequelize.define("presensi", {
    presensiID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    siswaID: DataTypes.INTEGER,
    petugasID: DataTypes.INTEGER,
    tanggal: DataTypes.DATEONLY,
    keterangan: DataTypes.STRING
  }, {
    tableName: "presensi",
    timestamps: false
  });

  presensi.associate = models => {
    presensi.belongsTo(models.siswa, { foreignKey: "siswaID" });
    presensi.belongsTo(models.petugas, { foreignKey: "petugasID" });
  };

  return presensi;
};