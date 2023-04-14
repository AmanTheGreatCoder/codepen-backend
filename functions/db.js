const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://amanlivetocode:zNlN73hMQPaptuBz@cluster0.nzqubwq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function CreateUser(email, password) {
    console.log("email and password recieved in create user", email, password)
    try {
        await client.connect()
        const db = client.db('codepen-db');
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ email, password });
        if (user) {
            console.log('User found:', user);
            return 200;
        } else {
            const newUser = {
                email,
                password,
            };
            const result = await usersCollection.insertOne(newUser);
            console.log('User created:', result);
            return 201;
        }
    }
    catch (err) {
        console.log("Error ", err)
        return 502;
    } finally {
        await client.close();
        console.log("Connection Closed")
    }
}

async function GetUser(email, password) {
    console.log("email and password recieved in create user", email, password)
    try {
        await client.connect()
        const db = client.db('codepen-db');
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ email, password });
        if (user) {
            console.log('User found:', user);
            return 200;
        } else {
            return 500;
        }
    }
    catch (err) {
        console.log("Error ", err)
        return 502;
    } finally {
        await client.close();
    }
}

module.exports = { CreateUser, GetUser };