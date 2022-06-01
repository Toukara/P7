# Groupomania (Openclassrooms Web Developer - Project 7)

- Frameworks : Vue.js , Bulma
- Backend : Node.js , Express.js
- Database : Sequelize (MySQL)

<br>

# Installation

- clone the repository with command `git clone https://github.com/Toukara/p7.git`
- install dependencies with command `npm install`

<br>

# Configuration

Create a `config.json` file in `server/config` with the following content :

```json
{
  "development": {
    "host": "YOUR HOST",
    "port": "YOUR PORT",
    "user": "YOUR USER",
    "password": "YOUR PASSWORD",
    "database": "YOUR DATABASE"
    "dialect": "mysql",
  }
}
```

Go to **https://jwt.io/** take your secret key.
Create a `.env` with the following content :

```env
Secret_Key="YOUR SECRET KEY"
```

<br>

## 📂 Backend

Start the server with command:

```
npm start
```

## 📄 Frontend

Start the frontend with command (in another terminal):

```
npm run serve
```

It will open automatically the frontend in your browser **http://localhost:8080/\***.

If not open the browser to access the website:
**http://localhost:8080/\***

\*(**localhost** is the computer's IP address)

<br>

# API documentation

You can find the API documentation in the following link: **https://documenter.getpostman.com/view/19688786/Uz5DrJ1e**

<br>

## 📃 Users

- **id** (primary key)
- **name**
- **email**
- **password**
- **createdAt** (timestamp)
- **updatedAt** (timestamp)

## 📃 Posts

- **id** (primary key)
- **title**
- **content**
- **attachment** (optional)
- **createdAt** (timestamp)
- **updatedAt** (timestamp)
- **authorId** (foreign key)

## 📃 Comments

- **id** (primary key)
- **content**
- **createdAt** (timestamp)
- **updatedAt** (timestamp)
- **authorId** (foreign key)
- **postId** (foreign key)

<br>

#
