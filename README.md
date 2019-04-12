# Better
An app to make you feel Better

## Usage

- Setup Node
  1. Install node
  2. `cd` into project folder and run `npm i`
  3. `cd` into client folder and run `npm i`
  4. run `npm i -G nodemon`
  5. Done. Type `npm run dev` from root folder to launch a dev server and react instance. 
- Setup MongoDB
  1. Install mongoDB by following [these instructions](https://docs.mongodb.com/manual/administration/install-community/)
  2. Run `sudo mongod` to start a mongo server on localhost
- Create `auth.json`
  1. Create a file in the root folder named `auth.json`
  2. Put the following text into the json file and replace the all caps placeholders with the correct information

```
{
  "db": {
    "ipaddr": "DATABASE_IP_HERE",
    "port": DATABASE_PORT_HERE,
    "user": "DATABASE_USERNAME_HERE",
    "pass": "DATABASE_PASSWORD_HERE"
  },
  "jwt_key": "JWT_SECRET_KEY_HERE"
}
```