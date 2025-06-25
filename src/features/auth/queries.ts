import { Account, Client } from "node-appwrite";
import { AUTH_COOKIE } from "./constants";
import { cookies } from "next/headers";
import { createSessionClient } from "@/lib/appwrite";

export const getCurrent = async () => {
    try{
        const { account } = await createSessionClient();

    return await account.get();
    } catch {
        return null;
    }
};
