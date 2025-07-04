"use client"
import { FcGoogle } from "react-icons/fc";

import { DottedSeparator } from "@/components/dotted-separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signUpwithGoogle } from "@/lib/oauth";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { registerSchema } from "../schemas";
import { useRegister } from "../api/use-register";

export const SignUpCard = () => {
    const { mutate, isPending } = useRegister();

    const form = useForm<z.infer<typeof registerSchema>>({
            resolver: zodResolver(registerSchema),
            defaultValues: {
                name:"",
                email: "",
                password: "",
            }
        });

        const onSubmit = (values: z.infer<typeof registerSchema>) => {
                mutate({ json: values});
        }

    return (
        <Card className="w-full h-full md:w-[486px] border-none shadow-none">
            <CardHeader className="flext items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">
                    Sign Up!
                </CardTitle>
                <CardDescription>
                    By Signing up, you agree to our {" "}
                    <Link href="/company">
                        <span className="text-blue-700">Company Policy</span>
                    </Link>{" "}
                    and{" "}
                    <Link href="/terms">
                        <span className="text-blue-700">Terms of Contract</span>
                    </Link>
                </CardDescription>
            </CardHeader>
           <div className="px-7">
            <DottedSeparator />
           </div>
           <CardContent className="p-7">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Enter your name"

                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="Enter email address"

                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="Enter your password"

                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    <Button disabled={isPending} size="lg" className="w-full">
                        Register
                    </Button>
                </form>
            </Form>
           </CardContent>
           <div className="px-7">
            <DottedSeparator />
           </div>
           <CardContent className="p-7 flex flex-col gap-y-4">
            <Button
                onClick={() => signUpwithGoogle()}
                disabled={isPending}
                variant="secondary"
                size="lg"
                className="w-full"
                >
                <FcGoogle className="mr-2 size-5" />
                Sign up with Google
            </Button>
           </CardContent>
           <div className="px-7">
                           <DottedSeparator />
                       </div>
                       <CardContent className="p-7 flex items-center justify-center">
                           <p>
                               Already have an account?
                               <Link href="/sign-in">
                                   <span className="text-blue-700">&nbsp;Sign In</span>
                               </Link>
                           </p>
                       </CardContent>
        </Card>
    );
};
