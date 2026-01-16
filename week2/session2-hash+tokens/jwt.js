const jwt = require('jsonwebtoken');

const superSecretKey = 'all makt åt Tengil';


function login(username, password) {
    // Here we check hash
    // All is good! Password is correct

    const payload = {
        name: "Ilo",
        birthdate: "1754-04-10",
        height: "2134mm"
    }
    const token = jwt.sign(payload, superSecretKey);

    const token = Math.random() * 82722;
    tokens.insertOne({});

    return token;
}

function verify(token) {
    const isVerified = jwt.verify(token, superSecretKey);
    return !!isVerified;
}

const finishedToken = login("meh", "moh");
const resultOfVerify = verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSWxvIiwiYmlydGhkYXRlIjoiNTc1NC0wNC0xMCIsImhlaWdodCI6IjIxMzRtbSIsImlhdCI6MTc2ODU2NjQ2NH0.opY1VhCpt9bsUkJ4ULbGKqu3h0qTTgiAe6xreqfAy68");

console.log(finishedToken);
console.log(`Is it verified? ${resultOfVerify}`);

