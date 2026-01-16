const bcrypt = require('bcrypt');

function register(username, password) {
    const generatedSalt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, generatedSalt);

    users.insertOne({
        username: username,
        hash: hashedPassword
    });
}

function login(username, password) {
    const foundUser = users.findOne({ username: username });

    // Option 1 (not good option)
    // const salt = foundUser.hash.slice(0, 29);
    // const newHash = bcrypt.hashSync(password, salt);
    // const isCorrect = newHash === foundUser.hash;

    // Option 2 (good option)
    const isCorrect = bcrypt.compareSync(password, foundUser.hash);

    return isCorrect;
}

// const salt = "$2b$10$/UgySFuQ0fEMVC8xnNPSVe";
// const hashedHello = bcrypt.hashSync(
//     'i',
//     salt);

// console.log(`Salt: ${salt}`);

// console.log(`Hash: ${hashedHello}`);

// const oldHash = "$2b$10$/UgySFuQ0fEMVC8xnNPSVe28lOTBz6fCnkRCBBJwckfFsJQ8cTIOm";

// console.log(`Is it the same? ${oldHash == hashedHello}`);

