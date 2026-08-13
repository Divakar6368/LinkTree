"use server"
import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
import { getAvailableUsernameSuggestions } from "../utils"


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
            username:true,
            bio:true,
        } 
    })
    return currentUsername;
}