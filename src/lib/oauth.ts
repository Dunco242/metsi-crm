"use server";

import { OAuthProvider } from "node-appwrite";

import { createAdminClient } from "@/lib/appwrite";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function signUpwithGoogle() {
    const { account } = await createAdminClient();
    const origin = headers().get("origin");

    const redirectUrl = await account.createOAuth2Token(
        OAuthProvider.Google,
        `${origin}/oauth`,
        `${origin}/sign-up`,
    );

    return redirect(redirectUrl);
}
