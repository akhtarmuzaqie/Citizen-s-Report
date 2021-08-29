const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
module.exports = (app, db) => {
  let sql = ""
  app.get('/user', (req, res) => {
    res.send('User API')
  })

  app.post('/user', async (req, res) => {
    const {
      email,
      password,
      username,
      telp
    } = req.body
    const hash = await bcrypt.hash(password, 10)
    sql = `insert into user (email , username, password, telp)
    values ('${email}', '${username}', '${hash}', '${telp}');`
    verif = `select * from user where email='${email}'`
    db.query(verif, (err, dat) => {
      if (dat.length <= 0) {
        db.query(sql, (err, data) => {
          if (err) {
            throw err
          } else {
            res.send("Working")
          }
        });
      } else {
        res.send("Error!")
      }
    })
  })

  const userKey = "DLpXylJxNfhduC2ekAuLqRxHMIoYhUUoQkjtRFw"

  app.post('/user/auth', async (req, res) => {
    const {
      email,
      password
    } = req.body;
    //const token = Math.random() * (24 + 4232); // Token using Math.random function
    const token = jwt.sign({
      email,
      password
    }, userKey)
    sql = `select * from user where email=?`
    db.query(sql, [email], (err, data) => {
      if (err) {
        throw err
      } else if (data.length > 0) {
        bcrypt.compare(password, data[0].password, (error, validate) => {
          if (validate == true) {
            res.json({
              ...data[0],
              token
            })
          } else {
            res.json({
              message: "Invalid credentials"
            })
          }
        })
      } else {
        res.json({
          message: "Invalid credentials"
        })
      }
    })
  })
}
