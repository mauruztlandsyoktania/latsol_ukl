# latsol_ukl

Aplikasi Presensi Online
📌 Deskripsi Singkat

Aplikasi ini merupakan sebuah RESTful API yang dirancang untuk sistem Presensi Online berbasis NestJS (framework Node.js).
Tujuan utamanya adalah membantu pengguna — baik siswa maupun karyawan — dalam mengelola aktivitas kehadiran secara efisien.

Melalui API ini, pengguna dapat:

melakukan autentikasi menggunakan token JWT,

mencatat waktu check-in dan check-out,

serta mengatur data akun pengguna.

Proyek ini dibuat sebagai bagian dari latihan pengembangan dan penilaian kesiapan UKL.

🧩 Fitur Utama

Manajemen Data Pengguna

Menambahkan, memperbarui, menghapus, serta menampilkan informasi pengguna.

Setiap akun memiliki atribut utama: id, nama, email, dan password.

Sistem Autentikasi (JWT)

Pengguna dapat login menggunakan kombinasi email dan password.

Setelah login berhasil, sistem memberikan token untuk mengakses fitur presensi.

Fitur Presensi Harian

Memungkinkan pengguna melakukan check-in dan check-out secara online.

Data kehadiran otomatis tersimpan dengan waktu dan tanggal yang akurat.

Keamanan Akses

Setiap endpoint yang berkaitan dengan presensi dilindungi oleh Bearer Token untuk menjaga keamanan data.
