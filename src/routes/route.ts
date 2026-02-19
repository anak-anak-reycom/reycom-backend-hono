import { Hono } from 'hono';

import { AdminController } from '../controllers/admin/admin-controller.js';
import { CareerController } from '../controllers/career/career-controller.js';
import { ApplyController } from '../controllers/apply/apply-controller.js';
import { CategoryController } from '../controllers/category/category-controller.js';
import { NewsController } from '../controllers/news/news-controller.js';
import { CarouselController } from '../controllers/carousel/carousel-controller.js';
import { VideoController } from '../controllers/videos/video-controller.js';
import { CompanyController } from '../controllers/company/company-controller.js';
import { CountryController } from '../controllers/country/country-controller.js';
import { BranchController } from '../controllers/branchCompany/branch-controller.js';

export class Routes {
  public app: Hono;

  constructor() {
    this.app = new Hono();
    this.registerRoutes();
  }

  private registerRoutes() {
    this.app.route('/', AdminController);
    this.app.route('/', CareerController);
    this.app.route('/', ApplyController);
    this.app.route('/', CategoryController);
    this.app.route('/', NewsController);
    this.app.route('/', CarouselController);
    this.app.route('/', VideoController);
    this.app.route('/', CompanyController);
    this.app.route('/', CountryController);
    this.app.route('/', BranchController);
  }
}
