const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();
const moment = require('moment');



router.get('/', async (req, res) => {
    const client = await pool.connect();

    try{
        console.log('in check email');
        const userEmail = req.query.email;
        checkEmailQuery = `SELECT "username", "email" FROM "user" WHERE "user"."email" LIKE $1;`;
        postTokenQuery = `UPDATE "user" SET "password_recovery_token" = $1, "password_recovery_time" = $2 WHERE "email" = $3;`;

        await client.query('BEGIN')
            const checkEmailResult = await client.query(checkEmailQuery, [userEmail])
            console.log('checkEmailResult is:', checkEmailResult.rows[0]);

            if(checkEmailResult.rows[0]){
                const token = crypto.randomBytes(20).toString('hex');
                console.log('Token is:', token);
                const currentTime = moment().format()
                console.log('Current Time is:', currentTime);
                const postTokenResult = await client.query(postTokenQuery, [token, currentTime, userEmail]);
                const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: `${process.env.EMAIL_ADDRESS}`,
                            pass: `${process.env.EMAIL_PASSWORD}`,
                        }
                    })
    
                    const emailRecovery = checkEmailResult.rows[0].email;
                    const username=  checkEmailResult.rows[0].username;
                    const mailOptions = {
                        from: `gapfarmerrecovery@gmail.com`,
                        to: `${emailRecovery}`,
                        subject: `GAP Farmers Password Recovery`,
                        text: 
                            `You are receiving this email because you or someone else has requested to change the password for the account, ${username}, on the GAP Farmers application.\n\n ` +
                            `Please click on the following link to complete this process:\n\n` +
                            `localhost:3000/#/resetpassword/?token=${token}&time=${currentTime}\n\n` +
                            `If you did not request a change of password, please ignore this email and your password will remain unchanged.\n`,
                    }
                    console.log('Email sent');
    
                    transporter.sendMail(mailOptions, function (err, response){
                        if (err) {
                            console.error('There was an error', err);
                        }
                        else{
                            console.log('Response is', response);
                            res.send(200);
                        }
                    })
                    await client.query('COMMIT')
                    res.sendStatus(200);

            }
            else{
                console.log('Email does not exist');
                res.sendStatus(500);
            }
            
    }
    catch(error){
        await client.query('ROLLBACK')
        console.log('ERROR', error);
        res.sendStatus(500);
    }
    finally {
        client.release()
    }
})

// router.get('/', (req,res) => {
//     console.log('IN CHECK EMAIL')
//     const userEmail = req.query.email;
//     console.log(req.query.email);
//     let sqlQuery = `SELECT "username", "email" FROM "user" WHERE "user"."email" LIKE $1;`
//     pool.query(sqlQuery, [userEmail])
//         .then((response) => {
//             if(response.rows[0]){
//                 console.log('It found the email');
//                 const token = crypto.randomBytes(20).toString('hex');
//                 console.log('Token is:', token);

//                 const transporter = nodemailer.createTransport({
//                     service: 'gmail',
//                     auth: {
//                         user: `${process.env.EMAIL_ADDRESS}`,
//                         pass: `${process.env.EMAIL_PASSWORD}`,
//                     }
//                 })

//                 const emailRecovery = response.rows[0].email;
//                 const username=  response.rows[0].username;
//                 const mailOptions = {
//                     from: `gapfarmerrecovery@gmail.com`,
//                     to: `${emailRecovery}`,
//                     subject: `GAP Farmers Password Recovery`,
//                     text: 
//                         `You are receiving this email because you or someone else has requested to change the password for the account, ${username}, on the GAP Farmers application.\n\n ` +
//                         `Please click on the following link to complete this process:\n\n` +
//                         `localhost:3000/forgotpassword/${token}\n\n` +
//                         `If you did not request a change of password, please ignore this email and your password will remain unchanged.\n`,
//                 }
//                 console.log('Email sent');

//                 transporter.sendMail(mailOptions, function (err, response){
//                     if (err) {
//                         console.error('There was an error', err);
//                     }
//                     else{
//                         console.log('Response is', response);
//                         res.send(200);
//                     }
//                 })

//             }
//             else{
//                 console.log('Did not find email')
//             } 
//         })
//         .catch((error) => {
//             console.log(`ERROR in GET RECORD COMPOST PILE`, error);
//             res.sendStatus(500);
//         })
// })

module.exports = router;
