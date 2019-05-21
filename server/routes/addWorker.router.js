const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();



router.get('/', rejectUnauthenticated, (req, res) => {
    // Send back user object from the session (previously queried from the database)
    res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/addworker', async (req, res) => {
    const client = await pool.connect();
    console.log('in add worker');
    const username = req.body.username;
    const password = encryptLib.encryptPassword(req.body.password);
    const user_role = req.body.user_role;
    let registrationCode = req.body.registrationCode;
    console.log(registrationCode);
    if (registrationCode == 122090) {
        try {
            //    console.log(req.body);
            const username = req.body.username;
            const password = encryptLib.encryptPassword(req.body.password);
            const user_role = req.body.user_role;
            const person_first = req.body.person_first;
            const person_last = req.body.person_last;
            const person_status = req.body.person_status;
            let registrationCode = req.body.registrationCode;
            console.log(registrationCode);

            const usernameQuery = `INSERT INTO "user" (username, password, user_role) VALUES ($1, $2, $3) RETURNING user_id`;
            const personQuery = `INSERT INTO "person" ("person_first", "person_last", "person_status", "user_id") VALUES ($1, $2, $3, $4)`;
            await client.query('BEGIN')
            const userInsertResults = await client.query(usernameQuery, [username, password, user_role]);
            const user_id = userInsertResults.rows[0].user_id;
            console.log(user_id);

            const personInsertResults = await client.query(personQuery, [person_first, person_last, person_status, user_id]);
            await client.query('COMMIT')
            res.sendStatus(201);
        } catch (error) {
            await client.query('ROLLBACK')
            console.log('Error Registering', error);
            res.sendStatus(500);
        } finally {
            client.release()
        }
    }
    else {
        res.sendStatus(500);
    }
});




module.exports = router;