import server from 'fastify'
const fastify = server()

fastify.get('/', async () => {
  return { hello: 'world' }
})

fastify.listen(8000)
