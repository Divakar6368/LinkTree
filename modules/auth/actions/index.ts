"use server"
import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"


export const onBoardUser = async () => {
    try {
        const user = await currentUser();
        if (!user) {
            return {
                success: false, error: "No Authenticated User Found"
            }
        }

        const { id, firstName, lastName, imageUrl, emailAddresses } = user
        const newUser = await db.user.upsert({
            where: {
                clerkId: id
            },
            update: {
                firstName: firstName || null,
                lastName: lastName || null,
                imageUrl: imageUrl || null,
                email: emailAddresses[0]?.emailAddress || "",
            },
            create: {
                clerkId: id,
                firstName: firstName || null,
                lastName: lastName || null,
                imageUrl: imageUrl || null,
                email: emailAddresses[0]?.emailAddress || "",
            }
        })

        return {
            success: true,
            user: newUser,
            message: "User onboarded successfully"
        };

    } catch (error) {
        console.error("❌ Error onboarding user:", error);
        return {
            success: false,
            error: "Failed to onboard user"
        };
    }
}