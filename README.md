## Deskripsi
Teknikal tes untuk Fullstack di Jaghos

## Persiapan
- jalankan backend sesuai intruksi pada repository https://github.com/wildanjisung/rt-be
## Instalasi
```
npm install
```
## Hasil
- Hasil ketika aplikasi berjalan
![Alt text](docs/image.png)

## Feature
- Login dan Register User
- Residence Management untuk mengatur rumah dan siap penghuninya
- Bill Management untuk mengatur tagihan

## Alur Program
### Tambah Penghuni (User)
- masuk ke menu register
- masukkan username dan password
- keterangan: buat 3 akun, untuk logout clear local storage

### Mengatur rumah dan pemiliknya
#### Persiapan - Login
- masuk dengan salah satu akun dengan memasukkan username dan password pada menu login
- akan muncul menu Residence dan klik
#### Tambah Rumah
![Alt text](docs/image1.png)
- buat data hunian, dengan menekan tombol 'NEW RESIDENCE'
- masukkan alamat
- lalu simpan

#### Tambah Penghuni pada Rumah
![Alt text](docs/image2.png)
- klik ikon orang pada row. akan muncul kotak dialog untuk menambahkan penghuni
- pilih penghuni
note: list penhuni sesuai dengan user yang terdaftar pada saat register
- simpan

### Mengatur rumah dan pemiliknya