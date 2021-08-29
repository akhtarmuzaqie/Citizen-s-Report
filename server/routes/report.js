const jwt = require('jsonwebtoken');

module.exports = (app, db) => {

  const userAuth = (request, result, next) => {
    const userKey = "DLpXylJxNfhduC2ekAuLqRxHMIoYhUUoQkjtRFw"
    let token = request.header('token')
    jwt.verify(token, userKey, (err, decoded) => {
      if (err) {
        return result.status(401).json({
          success: false,
          message: 'Unauthorized. Token is Token Is Not Provided Or Invalid'
        })
      } else {
        next()
      }
    })
  }

  const adminAuth = (request, result, next) => {
    const adminKey = "yvv8tkhyKJVsrqrlmFx5PCTKPnEuIQi3bHEFVlHu"
    const token = request.header('token')
    jwt.verify(token, adminKey, (err, decoded) => {
      if (err) {
        result.status(401).json({
          success: false,
          message: 'Unauthorized. Token is Not Provided Or Invalid'
        })
      } else {
        next()
      }
    })
  }

  let sql = ""
  // Testing Endpoint
  app.get('/report', (req, res) => {
    res.send('Report API')
  })

  // Add Report (User)
  app.post('/report', userAuth, (req, res) => {
    const {
      title,
      content,
      status,
      id_user
    } = req.body
    sql = `insert into report (title, content, status, id_user)
    values ("${title}", "${content}", 'Pending', '${id_user}')`
    db.query(sql, (err, res) => {
      if (err)
        throw err
    })
  })

  // Get Report With PENDING Status (Admin)
  app.get('/report/user/pending', adminAuth, (req, res) => {
    sql = `SELECT id_report, username, title, content, response, date_created, status FROM user LEFT JOIN report ON user.id_user = report.id_user WHERE status='Pending' ORDER BY date_created DESC;`
    db.query(sql, (err, data) => {
      if (err) throw err
      else res.send(data)
    })
  })

  // Get Report With IN Progress Status (Admin)
  app.get('/report/user/ongoing', adminAuth, (req, res) => {
    sql = `SELECT id_report, username, title, content, response, date_created, status FROM user LEFT JOIN report ON user.id_user = report.id_user WHERE status='In Progress' ORDER BY date_created DESC;`
    db.query(sql, (err, data) => {
      if (err) throw err
      else res.send(data)
    })
  })

  // Get ALL Report With Finished and Rejected Status (Admin)
  app.get('/report/user/history', adminAuth, (req, res) => {
    sql = `SELECT id_report, username, title, content, response, date_created, status FROM user LEFT JOIN report ON user.id_user = report.id_user WHERE status IN ('Finished', 'Rejected') ORDER BY date_created DESC;`
    db.query(sql, (err, data) => {
      if (err) throw err
      else res.send(data)
    })
  })

  // Get Report By User ID (User)
  app.get('/report/user/:id', userAuth, (req, res) => {
    sql = `select * from report where id_user = ${req.params.id}`
    db.query(sql, (err, data) => {
      if (err) throw err
      else res.send(data)
    })
  })

  // Update Status Of The Report By ID (Admin)
  app.put('/report/user/:id/upStatus', adminAuth, (req, res) => {
    sql = `update report set status = '${req.body.status}', response='${req.body.response}', id_admin=${req.body.id_admin} where id_report = ${req.params.id}`
    db.query(sql, (err, data) => {
      if (err) throw err
      else res.send(data)
    })
  })

  // Delete Report By ID (Admin)
  app.delete('/report/user/:id/del', adminAuth, (req, res) => {
    sql = `delete from report where id_report = ${req.params.id}`
    db.query(sql, (err, data) => {
      if (err) throw err
      else res.send(data)
    })
  })
}
