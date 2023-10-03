const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const movies = require('./public/jsons/movies.json').results
const BASE_IMG_URL = 'https://movie-list.alphacamp.io/posters/'

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs') 
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/movies')
})

app.get('/movies', (req, res) => {
  const keyword = req.query.search?.trim()
  const matchedMovies = keyword ? movies.filter((mv) => 
    Object.values(mv).some((property) => {
      if(typeof property === 'string'){
        return property.toLowerCase().includes(keyword.toLowerCase())
      }
      return false
    })
  ) :movies
  res.render('index', {movies: matchedMovies, BASE_IMG_URL, keyword})
})

app.get('/movie/:id', (req, res) => {
  const id = req.params.id
  const movie = movies.find((mv) => mv.id.toString() === id )
  res.render('detail',{movie, BASE_IMG_URL})
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})