import { logProfileVist } from "@/modules/analytics/actions";
import { getUserByUsername } from "@/modules/profile/actions";
import TreeBioProfile from "@/modules/profile/components/treebio-profile";
import { redirect } from "next/navigation";

import React from "react"

const profilePage= async({params}:{params:Promise<{username:string}>})=>{
    const {username}=await params;
    const profileData=await getUserByUsername(username);

    if(profileData?.username !==username){
         return redirect('/');
    }

    logProfileVist(profileData.id).catch((error)=>{
        console.error("Failed to log profile visit:",error);
    })
    return(
        <TreeBioProfile
         // @ts-ignore
            profileData={profileData}
        />
    )
}
export default profilePage;