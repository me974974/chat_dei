'use client';

import Image from "next/image";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { 
    FieldValues, 
    SubmitHandler, 
    useForm
} from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";

import Input from "../../components/inputs/input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
  
type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (session?.status === 'authenticated') {
        router.push('/conversations')
        }
    }, [session?.status, router]);

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
        setVariant('REGISTER');
        } else {
        setVariant('LOGIN');
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: {
        errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
        name: '',
        email: '',
        password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
    
        if (variant === 'REGISTER') {
        axios.post('/api/register', data)
        .then(() => signIn('credentials', {
            ...data,
            redirect: false,
        }))
        .then((callback) => {
            if (callback?.error) {
            toast.error("Quelque chose s'est mal passé !");
            }

            if (callback?.ok) {
            router.push('/conversations')
            }
        })
        .catch(() => toast.error("Quelque chose s'est mal passé !"))
        .finally(() => setIsLoading(false))
        }

        if (variant === 'LOGIN') {
        signIn('credentials', {
            ...data,
            redirect: false
        })
        .then((callback) => {
            if (callback?.error) {
            toast.error("Quelque chose s'est mal passé !");
            }

            if (callback?.ok) {
            router.push('/conversations')
            }
        })
        .finally(() => setIsLoading(false))
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);

        signIn(action, { redirect: false })
        .then((callback) => {
            if (callback?.error) {
            toast.error("Quelque chose s'est mal passé !");
            }

            if (callback?.ok) {
            router.push('/conversations')
            }
        })
        .finally(() => setIsLoading(false));
    }

    return (
        <div
            className="
                mt-8
                sm:mx-auto
                sm:w-full
                sm:max-w-md
            "
        >
            <div
                className="
                    bg-white
                    px-4
                    py-8
                    shadow
                    rounded-lg
                    sm:px-10
                "
            >
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === "REGISTER" && (
                        <Input 
                            id="name"
                            label="Pseudo" 
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                        />
                    )}
                    <Input 
                        id="email"
                        label="Adresse Email" 
                        type="email"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <Input 
                        id="password"
                        label="Mot De Passe" 
                        type="password"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type="submit"
                        >
                            {variant === 'LOGIN' ? 'Se connecter' : "S'inscrire"}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div
                            className="
                                absolute
                                inset-0
                                flex
                                items-center
                            "
                        >
                            <div 
                                className="
                                    w-full 
                                    border-t
                                    border-gray-300" 
                            />  
                        </div>
                        <div className="
                            relative 
                            flex 
                            justify-center 
                            text-sm
                            "
                        >
                            <span className="
                                bg-white 
                                px-2 
                                text-gray-500">
                                    Ou Continuez Avec
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction('google')}
                        />
                    </div>
                </div>

                <div className="
                    flex
                    gap-2
                    justify-center
                    text-sm
                    mt-6
                    px-2
                    text-gray-500
                ">
                    <div>
                        {variant === 'LOGIN' ? 'Nouveau sur <ℂ𝕙𝕒𝕥 𝔻𝕖𝕚/> ?' : 'Vous avez déjà un compte ?'}
                    </div>
                    <div
                        onClick={toggleVariant}
                        className="underline cursor-pointer"
                    >
                        {variant === 'LOGIN' ? 'Créer un compte' : 'Se connecter'}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthForm
