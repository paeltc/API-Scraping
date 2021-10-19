const axios = require ('axios')
const cheerio= require ('cheerio')
const express = require ('express')

const PORT = process.env.PORT || 6000
const app = express()

axios('https://www.manchestereveningnews.co.uk/sport/football/')
    .then(res => {
        const htmlData = res.data
        const $ = cheerio.load(htmlData)
        const articles = []

        $('.teaser', htmlData).each((index, element) => {
            const title = $(element).children('.headline').text()
            const url = $(element).children('.headline').attr('href')
            articles.push({
                title, 
                url
            })
        })
        console.log(articles)
    }).catch(err => console.error(err))

    app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`))