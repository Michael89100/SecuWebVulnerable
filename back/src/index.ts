import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import {DbConnect} from './db'

import { cors } from 'hono/cors'
import users from "./routes/User";
import askings from "./routes/Asking";

const app = new Hono()
await DbConnect()


// Use the cors middleware
app.use('/api/*', cors());

const port = 3000
console.log(`Server is running on port ${port}`)

app.route('/api', users)
app.route('/api', askings)

serve({
  fetch: app.fetch,
  port
})
