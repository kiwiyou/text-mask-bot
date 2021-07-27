import bot from './handler'

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

const handleRequest = async (r: Request): Promise<Response> => {
  await bot.handleUpdate(await r.json())
  return new Response(null, { status: 200 })
}
