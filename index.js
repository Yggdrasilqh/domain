const http = require('http')
const request = require('request')
const mysql = require('mysql2')
const IncreaseChar = require('./IncreaseChar')

const connection = mysql.createConnection({
  host: '188.166.217.69',
  port: 2017,
  user: 'root',
  password: '030568',
  database: 'yggdrasil'
});

const charAdd = (char, num) => {
  return (String.fromCharCode(char.charCodeAt(0) + num))
}

const queueLimit = async (callback, queue) => {
  await callback()
  queue.pop()
}

const sleepRandom = () => {
  const ms = Math.random() * 200
  return new Promise(resolve => setTimeout(resolve, ms))
}

const getResult = (char) => {
  const post_data = {
    search: char
  }
  return new Promise((res, rej) => {
    request.post('https://nc.me/search-domain', {form: post_data}, (err, httpResponse, body) => {
      if (err) console.error(err)
      try {
        res(JSON.parse(body))
      } catch (err) {
        console.log('error when ' + char)
      }
    })
  })

}

const getDomain = async (search) => {
  const result = await getResult(search)
  const {domains} = result
  for (const domain of domains) {
    if (domain.available === true) {
      console.log(domain)
      connection.query(
        'INSERT INTO domains(name, suffix) VALUES(?, ?)',
        [search, domain.domain.split('.')[1]],
        function(err, results) {
          if (err) console.err(err)
          else console.log(`insert: ${results.affectedRows}, insertId: ${results.insertId}`)
        }
      );
    }
  }
}

(async () => {
  const queue = []
  const increase = new IncreaseChar()

  while (true) {
    let result = increase.toString()
    queue.push(1)
    queueLimit(async _ => getDomain(result), queue)

    let lastLength = 0
    while (queue.length > 100) {
      if (lastLength !== queue.length) {
        lastLength = queue.length
      }
      await sleepRandom()
    }
    increase.add(1)
  }

})()
