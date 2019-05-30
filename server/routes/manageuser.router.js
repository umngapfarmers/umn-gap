const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const encryptLib = require("../modules/encryption");

/**
 * GET route template
 */

router.get("/person", (req, res) => {
  console.log("IN GETTY PERSON");
  const current_harvest_id = req.user.current_harvest_year;
  let sqlQuery = `SELECT * FROM "person" WHERE "current_harvest_id" = $1;`;
  pool
    .query(sqlQuery, [current_harvest_id])
    .then(response => {
      console.log(`response person`, response.rows);
      res.send(response.rows);
    })
    .catch(error => {
      console.log(`ERROR in GET PERSON`, error);
      res.sendStatus(500);
    });
});

router.get("/user", (req, res) => {
  console.log("IN GET USER");
  const current_harvest_id = req.user.current_harvest_year;
  console.log('Current harvest year is:', current_harvest_id)
  //let sqlQuery = `SELECT * FROM "user" WHERE "current_harvest_year" = $1;`
  let sqlQuery = `SELECT "user".username,"user".user_id,"user".user_role,
    "user".user_status,person.person_first,person.person_last FROM "user" JOIN 
    PERSON ON person.user_id = "user".user_id
      WHERE "current_harvest_year"= $1;`;
  pool
    .query(sqlQuery, [current_harvest_id])
    .then(response => {
      console.log(`response user`, response.rows);
      res.send(response.rows);
    })
    .catch(error => {
      console.log(`ERROR in GET PERSON`, error);
      res.sendStatus(500);
    });
});

router.get("/person/edit/", (req, res) => {
  console.log("IN EDIT PERSON ", req.query.person_id);
  pool
    .query(`select * from "person"  WHERE "person_id" = $1;`, [
      req.query.person_id
    ])
    .then(response => {
      selectedPerson = response.rows;
      console.log("in router selected", selectedPerson);

      res.send(selectedPerson);
    })
    .catch(error => {
      console.log("errors with product delete query", error);
      res.sendStatus(500);
    });
});

router.get("/user/edit/", (req, res) => {
  console.log("IN pick for EDIT USER ", req.query.user_id);
  pool
    .query(
      `SELECT "user".username, "user".user_id, "user".user_role,
      "user".user_status, "user".current_harvest_year, "person".person_first, "person".person_last FROM "user" JOIN 
    PERSON ON "person".user_id = "user".user_id
      WHERE "user".user_id = $1;`,
      [req.query.user_id]
    )
    .then(response => {
      selectedUser = response.rows;
      console.log("in router selected User", selectedUser);

      res.send(selectedUser);
    })
    .catch(error => {
      console.log("errors with user Edit pickup query", error);
      res.sendStatus(500);
    });
});

// router.put("/person", (req, res) => {
//   console.log("IN EDIT PERSON ", req.body);
//   pool
//     .query(
//       `UPDATE "person" SET "person_first"=$1, "person_last"=$2, "person_status"=$3 WHERE "person_id" = $4;`,
//       [
//         req.body.person_first,
//         req.body.person_last,
//         req.body.person_status,
//         req.body.person_id
//       ]
//     )
//     .then(response => {
//       selectedPerson = response.rows;
//       console.log("in router selected", selectedPerson);

//       //console.log(`response person`, response.rows);
//       res.send(selectedPerson);
//     })
//     .catch(error => {
//       console.log("errors with edit query", error);
//       res.sendStatus(500);
//     });
// });

// router.put("/user", (req, res) => {
//   console.log("IN EDIT User ", req.body);
//   const password = encryptLib.encryptPassword(req.body.password);
//   pool
//     .query(
//       `UPDATE "user" SET "user_status"=$1, "user_role"=$2,"password"=$3 WHERE "user_id" = $4;`,
//       [req.body.user_status, req.body.user_role, password, req.body.user_id]
//     )
//     .then(response => {
//       selectedUser = response.rows;
//       console.log("in router selected", selectedUser);

//       res.send(selectedUser);
//     })
//     .catch(error => {
//       console.log("errors with edit query", error);
//       res.sendStatus(500);
//     });
// });



router.put('/user/passwordless', async (req, res) => {
  const client = await pool.connect();
        const editUser = req.body;
        console.log('EditUser is:', editUser)

        try {
        
        const usernameQuery=  `UPDATE "user" SET "user_role" = $1 , "current_harvest_year" = $2,  "user_status" = $3 WHERE "user"."user_id" = $4`;
        const personQuery = `UPDATE "person" SET "person_first" = $1,  "person_last" = $2, "person_status" =$3, "current_harvest_id" =$4 WHERE "person"."user_id" = $5`;
        await client.query('BEGIN')
          
    
          const userInsertResults = await client.query(usernameQuery, [editUser.user_role, editUser.current_harvest_year, editUser.user_status, editUser.user_id]);
      
          const personInsertResults =  await client.query(personQuery, [editUser.person_first, editUser.person_last, editUser.user_status, editUser.current_harvest_year,  editUser.user_id]);
          await client.query('COMMIT')
          res.sendStatus(201);
      } catch (error) {
          await client.query('ROLLBACK')
          console.log('Error Registering', error);
          res.sendStatus(500);
      } finally {
          client.release()
    }
});


router.put('/user/password', async (req, res) => {
  const client = await pool.connect();
        const editUser = req.body;
        const password = encryptLib.encryptPassword(req.body.password);
        console.log('EditUser is:', editUser)

        try {
        
        const usernameQuery=  `UPDATE "user" SET "user_role" = $1 , "current_harvest_year" = $2,  "user_status" = $3, "password" = $4 WHERE "user"."user_id" = $5`;
        const personQuery = `UPDATE "person" SET "person_first" = $1,  "person_last" = $2, "person_status" =$3, "current_harvest_id" =$4 WHERE "person"."user_id" = $5`;
        await client.query('BEGIN')
          
    
          const userInsertResults = await client.query(usernameQuery, [editUser.user_role, editUser.current_harvest_year, editUser.user_status, password, editUser.user_id]);
      
          const personInsertResults =  await client.query(personQuery, [editUser.person_first, editUser.person_last, editUser.user_status, editUser.current_harvest_year,  editUser.user_id]);
          await client.query('COMMIT')
          res.sendStatus(201);
      } catch (error) {
          await client.query('ROLLBACK')
          console.log('Error Registering', error);
          res.sendStatus(500);
      } finally {
          client.release()
    }
});


router.put('/person/edit', async (req, res) => {
  const client = await pool.connect();
        const editPerson = req.body;
        console.log('editPerson is:', editUser)

        try {
        
        const usernameQuery=  `UPDATE "user" SET "user_role" = $1 , "current_harvest_year" = $2,  "user_status" = $3, "password" = $4 WHERE "user"."user_id" = $5`;
        const personQuery = `UPDATE "person" SET "person_first" = $1,  "person_last" = $2, "person_status" =$3, "current_harvest_id" =$4 WHERE "person"."user_id" = $5`;
        await client.query('BEGIN')
          
    
          const userInsertResults = await client.query(usernameQuery, [editUser.user_role, editUser.current_harvest_year, editUser.user_status, password, editUser.user_id]);
      
          const personInsertResults =  await client.query(personQuery, [editUser.person_first, editUser.person_last, editUser.user_status, editUser.current_harvest_year,  editUser.user_id]);
          await client.query('COMMIT')
          res.sendStatus(201);
      } catch (error) {
          await client.query('ROLLBACK')
          console.log('Error Registering', error);
          res.sendStatus(500);
      } finally {
          client.release()
    }
});

router.get("/employee", (req, res) => {
  console.log("IN GET EMPLOYEE");
  const current_harvest_id = req.user.current_harvest_year;
  let sqlQuery = `SELECT * FROM "person" WHERE "user_id" is null`;
  pool
    .query(sqlQuery)
    .then(response => {
      console.log(`response person`, response.rows);
      res.send(response.rows);
    })
    .catch(error => {
      console.log(`ERROR in GET PERSON`, error);
      res.sendStatus(500);
    });
});






module.exports = router;