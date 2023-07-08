# Nandy Laundry Hub Management System
This is the project for IT Project Management. 

### To run the project open the terminal and type,
``` npm install ```
This command will install all the dependancies in the project.

### To run the MongoDB database, type, 
``` npx prisma init ```

### Modify the database provider @ schema.prisma,
```provider = "mongodb"```

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
       datetime DateTime?
       
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

### Everytime you change or modify the schema.prisma make sure to run these on the terminal,
```npx prisma generate``` 

### Then,
```npx prisma db push``` 

