import sqlite3 from 'sqlite3';
sqlite3.verbose()

class DataBase {
    constructor() {
        this.db = new sqlite3.Database('./data/quest.db',(err) => {
            if (err) {
                console.log('Could not connect to database', err)
            } else {
                console.log('Connected to database')
            }
        });

        this.createTables();
    }

    createTables() {
        let qry;
        qry = `CREATE TABLE IF NOT EXISTS USERS (id_user INTEGER PRIMARY KEY, username	TEXT, karma INTEGER, last_step TEXT)`;
        this.db.run(qry, [], (err) => {
            if (err) return console.error(err.message);
        });

        this.db.run(qry, [], (err) => {
            if (err) return console.error(err.message);
        });
    }

    addUser(id_user, username, callback) {
        this.userExists(id_user, (exists) => {
            let is_user_new = false;
            if (!exists) {
                const qry = `INSERT INTO USERS(id_user,username,karma,last_step) VALUES(${id_user},"${username}",0,"intro")`;
                this.db.run(qry, [], (err) => {
                    callback(true, err);
                });
            }
            callback(is_user_new)
        });
    }

    getUserById(id_user, callback) {
        const qry = `SELECT * FROM USERS WHERE id_user=${id_user};`;
        this.db.all(qry, [], (err, results) => {
            if (err) return console.error(err.message);
            callback(results);
        });
    }

    getUserByUsername(username, callback) {
        const qry = `SELECT * FROM USERS WHERE username=${username};`;
        this.db.all(qry, [], (err, results) => {
            if (err) return console.error(err.message);
            callback(results);
        });
    }

    userExists(id_user, callback) {
        const qry = `SELECT * FROM USERS WHERE id_user=${id_user};`;
        this.db.all(qry, [], (err, results) => {
            if (err) return console.error(err.message);
            if (results.length) {
                callback(true);
            } else {
                callback(false)
            }
        });
    }

    updateKarma(id_user, karma) {
        let qry;
        qry = `UPDATE USERS SET karma = karma+${karma} WHERE id_user='${id_user}';`;
        this.db.run(qry, [], (err) => {
            if (err) return console.error(err.message);
        });
    }

    userHasWallet(id_user, callback) {
        const qry = `SELECT wallet FROM USERS WHERE id_user=${id_user};`;
        this.db.all(qry, [], (err, results) => {
            if (err) return console.error(err.message);

            const wallet = results[0]['wallet'];

            if (wallet !== null) {
                callback(true, wallet);
            } else {
                callback(false);
            }
        });
    }

    setUserWallet(id_user, wallet) {
        const qry = `UPDATE USERS SET wallet='${wallet}' WHERE id_user=${id_user};`;
        this.db.run(qry, [], (err) => {
            if (err) return console.error(err.message);
        });
    }

}

export const db = new DataBase()