export default async function (app) {
  app.get('/hello', async () => ({ hello: 'world' }))
}
