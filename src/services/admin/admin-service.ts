
import {prisma} from "../../applications/database.js";
import  { type createAdminRequest,type adminResponse, toAdminResponse } from "../../models/admin/admin-model.js";
import { adminValidation } from "../../validations/admin/admin-validation.js";
import {HTTPException} from "hono/http-exception";

export class adminService {
    static async createAdmin(request: createAdminRequest) : Promise<adminResponse> {

        // VALIDATE REQUEST DATA
        request = adminValidation.CREATE.parse(request);


         // CHECK DATABASE
        const totalAdminWithSameName = await prisma.admin.count({
            where: {
                name_admin: request.name_admin
            }
        })

        if (totalAdminWithSameName != 0 ) {
            throw new HTTPException(400,{
                message: "Admin with the same name already exists"
            });
    }
        // HASH PASSWORD
            request.password = await Bun.password.hash(request.password, {
                algorithm: "bcrypt",
                cost: 10
            });


         // SAVE TO DATABASE
         const admin = await prisma.admin.create({
            data: request
        })

        // RETURN RESPONSE
        return toAdminResponse(admin, "");
     
        }
  }

   