"use server"

import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
import { LinkFormData } from "../components/link-form";



export const createLinkByUser=async (data:LinkFormData)=>{
    const user=await currentUser();
    if(!user) return {
        success:false ,error:"No User Found"
    }
    const link=await db.link.create({
        data:{
            title:data.title,
            url:data.url,
            description:data.description,
            clickCount:0,
            user:{
                connect:{
                    clerkId:user.id
                }
            }
        }
    })

    return{
        success:true,
        message:"Link Created Successfully",
        data:link
    }
}


export const getAllLinkForUser=async()=>{
    const user=await currentUser();
    const links=await db.link.findMany({
        where:{
            user:{
                clerkId:user?.id
            }
        },
        select:{
            title:true,
            description:true,
            id:true,
            url:true,
            createdAt:true,
            clickCount:true
        }
    })
    return{
        success:true,
        message:"Get All Links Successfully",
        data:links
    }
}