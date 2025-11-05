"use strict";
module.exports = (sequelize, DataTypes) => {
  const petugas = sequelize.define("petugas", {
    petugasID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nama: DataTypes.STRING,
    jabatan: DataTypes.STRING
  }, {
    tableName: "petugas",
    timestamps: false
  });

  petugas.associate = models => {
    petugas.hasMany(models.presensi, { foreignKey: "petugasID" });
  };

  return petugas;
};