# JSON Web Token

## Setup App

    Todo:
    1.  npm init
    2.  npm install express body-parser mongoose jsonwebtoken cors --save
        - (--save) menyimpan pada pakage.jsonnya
    3.  install nodemon secara global
        npm install -g nodemon
    4.  server.js
        - Set Up package
        - Set Up Local
    5.  app/config
        - secret key dalam membuat jsonwebtoken
        - konfigurasi database dan nama database
    6.  jalankan server : nodemon server

## Menyiapkan database & test route

    Todo:
    1.  nyalakan dan buat database jwtusers
        - nyalakan mongodb : mongosh
        - create databse dan isinya
            use jwtusers
            switched to db jwtusers

        - create 2 data users
            jwtusers> db.users.insert({email:'ujang@mail.test',password:'test'})
            jwtusers> db.users.insert({email:'dara@mail.test',password:'test'})
        - lihat isi table jwtusers
            jwtusers> db.users.find()

            [
                {
                    _id: ObjectId("641104a399f5291da20c1444"),
                    email: 'ujang@mail.test',
                    password: 'test'
                },
                {
                    _id: ObjectId("641104b199f5291da20c1445"),
                    email: 'dara@mail.test',
                    password: 'test'
                }
            ]

    2.  models/users.js
    3.  server.js
        - Router API
        - prefix /api
    4.  pengujian pada postman:
        endpoint GET http://localhost:3000/api/
            response: ini di route home!
        endpoint GET http://localhost:3000/api/users
            response:
            [
                {
                    "_id": "641104a399f5291da20c1444",
                    "email": "ujang@mail.test",
                    "password": "test"
                },
                {
                    "_id": "641104b199f5291da20c1445",
                    "email": "dara@mail.test",
                    "password": "test"
                }
            ]

## Login generate token

    Todo:
    1.  server.js
        - endpoint login
        - harusnya passwordnya hash
        - membuat token
        - mengirim balik token
        - jika error
    2.  pengujian pada postman
        - endpoint POST http://localhost:3000/api/login
        - body => x-www-form-urlencoded
        - email : isi dengan email terdaftar
        - password : isi dengan password terdaftar
        - response jika email dan password benar:
            {
                "success": true,
                "message": "token berhasil di dapatkan!",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTEwNGEzOTlmNTI5MWRhMjBjMTQ0NCIsImlhdCI6MTY3ODg0MDExOCwiZXhwIjoxNjc4OTI2NTE4fQ.VHIc1BcY5zAiMLhX94g-96RdA0VN9NnhTqVHfNSaR9o"
            }

        - lakukan percobaan jika password salah/email salah
        - response akan menampilkan pesan kesalah.
