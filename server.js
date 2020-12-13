import setupApp from './src/app'
const port = process.env.PORT || 3000

setupApp().then(app => app.listen(port, () => {
  console.log(`app listening on port ${port}`)
}))
.catch(error => {
  console.error(error)
  process.exit(1)
})
