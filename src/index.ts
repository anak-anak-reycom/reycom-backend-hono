import { Hono } from 'hono'
import { adminController } from './controllers/admin/admin-controller.js'
import { HTTPException } from 'hono/http-exception'
import { ZodError } from 'zod'
import { serve } from '@hono/node-server';

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!');
});
serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});


app.route('/', adminController)
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    c.status(err.status)
    return c.json({
      errors: err.message
    })
  } else if (err instanceof ZodError) {
    c.status(400)
    return c.json({
      errors: err.message
    })
  } else {
    c.status(500)
     return c.json({
      errors: err.message
    })
  }
})

export default app
 