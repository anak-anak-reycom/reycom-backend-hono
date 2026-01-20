import { Hono } from 'hono';
import { AdminController } from './controllers/admin/admin-controller.js';
import { CareerController } from './controllers/career/career-controller.js';
import { ApplyController } from './controllers/apply/apply-controller.js';
import { HTTPException } from 'hono/http-exception';
import { ZodError } from 'zod';
import { formatZodIssues } from './helpers/errorResponse.js';
import { serve } from '@hono/node-server';
import { CategoryController } from './controllers/category/category-controller.js';
import { NewsController } from './controllers/news/news-controller.js';
import { CarouselController } from './controllers/carousel/carousel-controller.js';
import { cors } from 'hono/cors'


const app = new Hono();


app.use(
  '*',
  cors({
    origin: '*', 
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

// ROOT
app.get('/', (c) => c.text('Hello Hono!'));

// ROUTE
app.route('/', AdminController);
app.route('/', CareerController);
app.route('/', ApplyController);
app.route('/', CategoryController);
app.route('/', NewsController);
app.route('/', CarouselController)

// ERROR HANDLER
app.onError((err, c) => {


  if (err instanceof ZodError) {
    return c.json(
      {
        message: 'Validation error',
        errors: formatZodIssues(err.issues),
      },
      400,
    );
  }

  if (err instanceof HTTPException) {
    return c.json(
      {
        message: err.message,
      },
      err.status,
    );
  }

  console.error(err);
  return c.json(
    {
      message: 'Internal Server Error',
    },
    500,
  );
});

serve({ fetch: app.fetch, port: 3000 });
