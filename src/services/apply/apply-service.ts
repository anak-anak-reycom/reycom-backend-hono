import { HTTPException } from 'hono/http-exception';
import type { PrismaClient } from '../../generated/prisma/client.js';

import {
  type CreateApplyRequest,
  type ApiResponse,
  type ApplyData,
  toApplyResponse,
  toApplyListResponse,
} from '../../models/apply/apply-model.js';

import { applyValidation } from '../../validations/apply/apply-validation.js';

export class ApplyService {

    static async createApply(
        prisma: PrismaClient,
        request: CreateApplyRequest,
    ): Promise<ApiResponse<ApplyData>> {

        const validatedRequest = applyValidation.CREATE.parse(request);

        const apply = await prisma.applys.create({
            data: validatedRequest,
        });

        return toApplyResponse(apply, 'Apply created successfully');
    }

    static async getAllApply(
        prisma: PrismaClient,
    ): Promise<ApiResponse<ApplyData[]>> {

        const applys = await prisma.applys.findMany();

        return toApplyListResponse(
            applys,
            'Get all applys successfully'
        );
    }
}
