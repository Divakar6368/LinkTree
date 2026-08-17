"use server"
import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
import { getAvailableUsernameSuggestions } from "../utils"
import { ProfileFormData } from "@/modules/links/components/link-form"


export const checkProfileUsernameAvailability = async (username: string) => {
    if (!username) return {
        available: false, suggestions: []
    }

    const user = await db.user.findUnique({
        where: {
            username: username
        }
    })

    if (!user) {
        return { available: true }
    }

    const suggestions = await getAvailableUsernameSuggestions(username, 3, 10);
    return { available: false, suggestions };

}

export const cliamUsername = async (username: string) => {
    const loggedInUser = await currentUser();
    if (!loggedInUser) return {
        success: false, error: "No Authenticatd user found"
    }

    const user = await db.user.update({
        where: {
            clerkId: loggedInUser.id
        },
        data: {
            username: username
        }
    })
    
    if (!user) return { success: false, error: "No authenticated user found" };

    return { success: true };

}

export const getCurrentUsername=async()=>{
    const user=await currentUser();

    const currentUsername=await db.user.findUnique({
        where:{
            clerkId:user?.id
        },
        select:{
            firstName:true,
            lastName:true,
            username:true,
            bio:true,
            socialLinks:true
        } 
    })
    return currentUsername;
}


export const createUserProfile=async(data:ProfileFormData)=>{
    const user=await currentUser();
    if(!user) return { success:false,error:"No user Found"}

    const profile=await db.user.update({
        where:{
            clerkId:user.id
        },
        data:{
            firstName:data.firstName,
            lastName:data.lastName,
            bio:data.bio,
            imageUrl:data.imageUrl,
            username:data.username
        }
    })

    return {
        success:true,
        message:"Profile Updated Successfuly",
        data:profile
    }
}


export const getUserByUsername=async(username:string)=>{
    const currentUser=await db.user.findUnique({
        where:{
            username:username
        },
        include:{
            links:true,
            socialLinks:true
        }
    })
    return currentUser;
}