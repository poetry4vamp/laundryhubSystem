# Nandy Laundry Hub Management System
This is the project for IT Project Management. 

### To run the project open the terminal and type,
``` npm install ```
This command will install all the dependancies in the project.

### To run the MongoDB database, type, 
``` npx prisma init ```

### Modify the database provider @ schema.prisma,
```provider = "mongodb"```
PS. sa baba nito, diyan din gagawa ng reservation schema para sa db natin, like this 

     generator client {
       provider = "prisma-client-js"
     }

     datasource db {
       provider = "mongodb"
       url      = env("DATABASE_URL")
     }

      model reservation { 

       id String @id @default(auto()) @map("_id") @db.ObjectId 
       name String?
       services String?
       size String?
       products String?
       quantity String?
       price Float?
       delivery String?
       subtotal Float?
       deliveryfee Float? 
       
       } 

### Modify the database_url @ .env file, type the url of your database from your MongoDB account, type the password of your database in the password field, remove the <>, in my case it's,
```mongodb+srv://oseoleah:<password>@cluster0.534kjgp.mongodb.net/nandy```

### Go back to the terminal and type,
```prisma db push```

### Then type,
```prisma generate client```

### To start the application, type
```npm start```

### Open your browser then type
```localhost:3000```

     admin credentials:

          email: admin@gmail.com

          password: admin123

### See the website by clicking the home button, after you login. Basically, dapat admin dashboard ang lalabas after you login, pero to access the site itself na rin, naglagay na ako ng route for the website (home.ejs) na na-access na when you click the home button sa admin dashboard (see the route code sa router.js)

### additional, if need ng update sa db type nyo lang to
```npx prisma db push```
