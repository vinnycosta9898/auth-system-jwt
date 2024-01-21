import { app } from './app'
import { env } from './env'

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`HTTP Running server on PORT ${env.PORT}🔥`)
  })
