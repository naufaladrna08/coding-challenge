## Coding Challenge – Frontend Developer

Penjelasan:
- ./server: Tempat expressjs backend
- ./client: Tempat reactjs backend
- ./server/database.sql: File SQL untuk create table
- ./Postman_collection.json: File postman collection untuk testing API 

Setup:

Untuk memulai front-end:

```bash
cd client
npm install
npms start
```

Untuk memuilai back-end:

```bash
cd server
npm install
npms start
```

Front-end routes:
- /: Di route ini, user dapat CRUD rental
- /admin: Di route ini, user dapat CRUD mobil

Back-end routes:
- /cars        [POST]    : Membuat data mobil baru
- /cars        [GET]     : Mengambil semua mobil
- /cars/:id    [GET]     : Mengambil data mobil dengan id mobil
- /cars/:id    [PUT]     : Update data mobil dengan id mobil
- /cars/:id    [DELETE]  : Hapus data mobil dengan id mobil
- /orders      [POST]    : Membuat data pesan baru
- /orders      [GET]     : Mengambil semua pesanan
- /orders/:id  [GET]     : Mengambil pesanan dengan id order
- /orders/:id  [PUT]     : Update data pesanan dengan id pesanan
- /orders/:id  [DELETE]  : Hapus data pesanan dengan id pesanan
- /unordercars [GET]     : Mengambil data mobil yang belum dipesan

Stack yang digunakan:
- PostgreSQL (Database)
- ExpressJS (Back-end)
- ReactJS (Front-end)