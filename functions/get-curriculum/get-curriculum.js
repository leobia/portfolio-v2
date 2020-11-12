require('dotenv').config()
const { AIRTABLE_ID, AIRTABLE_API_KEY } = process.env
const Airtable = require('airtable')
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: AIRTABLE_API_KEY
})

const base = Airtable.base(AIRTABLE_ID)

const table = base('files')

exports.handler = async event => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
      headers: { Allow: 'GET' }
    }
  }

  const records = await table
    .select({
      filterByFormula: `name = "curriculum"`
    })
    .firstPage()

  let record = null
  let statusCode = 404
  if (records && records.length) {
    const curriculumId = records[0].id
    record = await table.find(curriculumId)

    if (record) {
      statusCode = 200
    }
  }

  return {
    statusCode: statusCode,
    body: JSON.stringify(record)
  }
}
