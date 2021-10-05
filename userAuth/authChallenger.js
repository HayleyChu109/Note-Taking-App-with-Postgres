const knexConfig = require("../knexfile").development
const knex = require("knex")(knexConfig);

const authChallenger = async (username, password, callback) => {
console.log('starting query')
 try {  await  knex('users')
        .then((users) => {
            console.log(users)
            console.log('query started')

            for (let user of users) {
                if (user.username === username && user.password === password) {
                    return callback(null, true);
                } else {
                    return callback(null, false);
                }
            }
        });
    }catch(err){
        throw new Error (err)
    }
}

module.exports = authChallenger;