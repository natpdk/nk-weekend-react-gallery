const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// PUT /gallery/like/:id
router.put('/like/:id', (req, res) => {
  console.log( '/ in Router PUT' );
  console.log('req.params.id: ', req.params.id)
  console.log(req.body)

  const queryText = `UPDATE "gallery" SET "likes"=$1 WHERE "id"=$2;`;

  const likes = req.body.likes
  const id = req.params.id
  const values = [likes, id];

  console.log(likes)
  pool.query( queryText, values ).then( ( results )=>{
    //console.log('Update Successful:', results)
      res.sendStatus( 200 ); // "OK"
  }).catch( ( err )=>{
      // handle any errors
      console.log( err );
      res.sendStatus( 400 );
  })
});

// GET /gallery
router.get('/', (req, res) => {
  const sqlText = `
  SELECT * FROM "gallery" ORDER by "likes";
`
pool.query(sqlText)
  .then((Result) => {
      //console.log(`Result.rows is:`, Result.rows);
      res.send(Result.rows);
  })
  .catch((error) => {
      console.log(`dbError making database query ${sqlText}`, error);
      res.sendStatus(500);
  })
});

// POST ROUTE
router.post( '/', ( req, res )=>{
  console.log( 'in /todo POST:', req.body );
      // assemble query
      const queryText = `INSERT into "gallery" ( "url", "title", "description" ) VALUES ( $1, $2, $3 );`;
      const values = [ req.body.url, req.body.title, req.body.description ];
      // run pool.query
      pool.query( queryText, values ).then( ( results )=>{
          // return results.rows
          res.sendStatus( 200 ); // "CREATED"
      }).catch( ( err )=>{
          // handle any errors
          console.log( err );
          res.sendStatus( 500 );
      })
});

// DELETE Route
router.delete( '/:id', ( req, res )=>{
    
  const id = req.params.id;
  console.log( 'Deleting to do with id:', id );
  const queryText = `DELETE FROM "gallery" WHERE id=$1;`;

      // run pool.query
  pool.query( queryText, [id] )
      .then( ( results )=>{
      res.sendStatus( 200 );
  }).catch( ( err )=>{
          // handle any errors
          console.log( err );
          res.sendStatus( 500 );
      })
});

module.exports = router;
