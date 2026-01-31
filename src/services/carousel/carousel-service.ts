import type { PrismaClient } from "../../generated/prisma/client.js";
import { uploadImageService } from "../../upload/upload-service.js";
import { NewsRepository } from "../../repositories/news/news-repository.js";
import { CarouselRepository } from "../../repositories/carousel/newsCarousel-repository.js";
import { HTTPException } from 'hono/http-exception';

export class CarouselNewsService {

  // =====================
  // GET ALL CAROUSELS
  // =====================
  static async getAllCarousel(
    prisma: PrismaClient
  ) {
    return CarouselRepository.getAllCarousel(prisma)
  }

  static async getCarouselById(
    prisma: PrismaClient,
    id: number,
  ) {
    const carousel = await prisma.newsCarousel.findUnique({
      where: { id },
    });

    if (!carousel) {
      throw new HTTPException(404, {
        message: 'Carousel not found',
      });
    }

    return carousel;
  }
  

  // =====================
  // UPLOAD CAROUSEL ONLY
  // =====================
  static async uploadCarouselImages(
    prisma: PrismaClient,
    newsId: number,
    files: File[]
  ) {
    for (const file of files) {
      const upload = await uploadImageService(file);

      await CarouselRepository.addCarouselImage(
        prisma,
        newsId,
        upload.url,
        upload.public_id
      );
    }
  }

}