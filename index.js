const express = require('express')
const cheerio = require("cheerio")
const axios = require("axios")

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).send("welcome to scraper")
})

app.get("/scrapper",  async(req, res) => {
    try {
        const result = await cryptoScrapper()

        console.log(result)
        return res.status(201).json(result)
    } catch (error) {
        console.error(error)
    }

})

async function cryptoScrapper() {
    const url = "https://es.wikipedia.org/wiki/Wikipedia:Portada"
    const result = []

    await axios(url).then((response) => {
        const html_data = response.data
        const $ = cheerio.load(html_data)
        

        $("#Arquitectura_de_Barcelona", html_data).each(function() {
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            result.push({title, url})
        })
    })

    return result
}

app.listen(3000, () => {
    console.log(`Server started at 3000`)
})

