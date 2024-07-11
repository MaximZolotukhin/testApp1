const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(express.static('public'))
app.use(cors({ origin: 'http://localhost:5173' }))
// app.use(cors({ origin: true }))

const APIkey = 'c1b5073d-dae7-4c4f-8255-94b1de2b4096'
let leadsData = undefined
const PORT = 3001
const subdomian = 'scorpionevil'
const access_token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImZmNjI4NmRkNzFlZDJjZjc1MzNmMGY4YzhkNjdlZTkwMGY0NmUzZmEyOGZmMmVjYWFhNWI2ODFiN2YzNmNjNjQ1ODkzNjgwYzhhZmNjZmYyIn0.eyJhdWQiOiJjMWI1MDczZC1kYWU3LTRjNGYtODI1NS05NGIxZGUyYjQwOTYiLCJqdGkiOiJmZjYyODZkZDcxZWQyY2Y3NTMzZjBmOGM4ZDY3ZWU5MDBmNDZlM2ZhMjhmZjJlY2FhYTViNjgxYjdmMzZjYzY0NTg5MzY4MGM4YWZjY2ZmMiIsImlhdCI6MTcyMDM1ODkxMywibmJmIjoxNzIwMzU4OTEzLCJleHAiOjE3MjA4Mjg4MDAsInN1YiI6IjExMjQzMzI2IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxODM2MTk4LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiMjJlZjc1OTQtNzRhNS00YjY5LWI1ZjktMDMzMTExYzkxMmFiIn0.J65xIAo7XywjDdKFLUb65VEM30sfFbVTesVBju7Cb-aLrZdJ3dZt8xo05rnEU-kdif920oET2ohGoeo7zPRRglYuNfhnn3teyDvuBhLYinOBZKnB2hqmeo4n6eNoHVd8hnKtG-ooISDtV5Lq_8OV147YqtmuMyq6Qrkg2tdRcdvf_JOQGCVAF__DDmdWFk6RhnN4zws4sTlcE6uGIxVtLlBh6bkuwBj57VHghURLUMiDBtWFYQAcuJtQRnLhI4RQsOM4S93c2J6FFgcZ9mf4OT4IavgyIjFMH05oSp_AhL5UKvziLqgmEdOwjunmpARulWetieGemVXf88qgZHguAA'
const headers = {
  Authorization: `Bearer ${access_token}`,
}
//Перенести сюда все данные для API запроса чтобы не нарушать принцип DRY

app.get('/', (req, res) => {
  // res.send('Hello World!')
  res.sendFile(__dirname + '/templates/index.html')
})

app.get('/api/:query', async (req, res) => {
  let queryString = req.params.query
  const adderssAPI = `https://${subdomian}.amocrm.ru/api/v4/${queryString}`
  // Необходимо скрыть в отдельный скрипт и передвать только данные в целях безопасности

  try {
    const responseApi = await axios.get(adderssAPI, { headers })
    if (responseApi.data._embedded) {
      res.json(responseApi.data._embedded) // Отправляем данные в формате JSON
    } else {
      console.error('Данные в `_embedded` отсутствуют')
      res.status(404).send('Данные не найдены')
    }
  } catch (error) {
    console.error(error)
    if (error.response) {
      // Если сервер ответил с ошибкой
      console.error(error.response.data)
      res.status(error.response.status).send(error.response.data)
    } else {
      // Если ошибка произошла при запросе
      console.error('Ошибка запроса:', error.message)
      res.status(500).send('Ошибка запроса')
    }
  }
})

//Если успею прееделать на if

app.get('/apiPipelines', async (req, res) => {
  const adderssAPI = `https://${subdomian}.amocrm.ru/api/v4/leads/pipelines`
  // Необходимо скрыть в отдельный скрипт и передвать только данные в целях безопасности

  try {
    const pipelines = await axios.get(adderssAPI, { headers })
    if (pipelines.data) {
      res.json(pipelines.data._embedded) // Отправляем данные в формате JSON
    } else {
      console.error('Данные в `_embedded` отсутствуют')
      res.status(404).send('Данные не найдены')
    }
  } catch (error) {
    console.error(error)
    if (error.response) {
      // Если сервер ответил с ошибкой
      console.error(error.response.data)
      res.status(error.response.status).send(error.response.data)
    } else {
      // Если ошибка произошла при запросе
      console.error('Ошибка запроса:', error.message)
      res.status(500).send('Ошибка запроса')
    }
  }
})

app.get('/apiUsers', async (req, res) => {
  const adderssAPI = `https://${subdomian}.amocrm.ru/api/v4/users`
  // Необходимо скрыть в отдельный скрипт и передвать только данные в целях безопасности

  try {
    const users = await axios.get(adderssAPI, { headers })
    if (users.data) {
      res.json(users.data._embedded) // Отправляем данные в формате JSON
    } else {
      console.error('Данные в `_embedded` отсутствуют')
      res.status(404).send('Данные не найдены')
    }
  } catch (error) {
    console.error(error)
    if (error.response) {
      // Если сервер ответил с ошибкой
      console.error(error.response.data)
      res.status(error.response.status).send(error.response.data)
    } else {
      // Если ошибка произошла при запросе
      console.error('Ошибка запроса:', error.message)
      res.status(500).send('Ошибка запроса')
    }
  }
})

app.listen(PORT, () => {
  console.log(`Server startet, adders: http://localhost:${PORT}`)
})

module.exports = { leadsData }
