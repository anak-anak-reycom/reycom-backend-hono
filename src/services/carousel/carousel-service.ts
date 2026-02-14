import type { Prisma, PrismaClient } from "../../generated/prisma/client.js";
import { uploadImageService } from "../../upload/upload-service.js";
import { NewsRepository } from "../../repositories/news/news-repository.js";
import { CarouselRepository } from "../../repositories/carousel/newsCarousel-repository.js";
import { HTTPException } from 'hono/http-exception';
import type { ApiResponse } from "../../models/admin/admin-model.js";
import { toAllCarouselResponse, type CarouselData } from "../../models/carousel/carousel-model.js";

export class CarouselNewsService {

  // =====================
  // GET ALL CAROUSELS
  // =====================
  static async getAllCarousel(
    prisma: PrismaClient
  ): Promise<ApiResponse<CarouselData[]>>{
    
    const carousel = await CarouselRepository.getAllCarousel(prisma)

    const page = 1;
    const limit = carousel.length
    const total = carousel.length

    return toAllCarouselResponse(carousel, "Get all carousel successfully", page, limit, total)
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

  static async updateCarouselById(
    prisma: PrismaClient,
    id: number,
    data: Prisma.NewsCarouselUpdateInput
  ) {
    return CarouselRepository.updateCarouselById(prisma, id, data)

}

static async deleteCarouselById(
    prisma: PrismaClient,
    id: number
) {
    return prisma.newsCarousel.delete({
        where: { id },
    });
}

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