"use client";

import axios from "axios";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";
import toast from "react-hot-toast";

interface UserBoxProps {
    data: User
}

const UserBox: React.FC<UserBoxProps> = ({
    data
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleCick = useCallback(() => {
        setIsLoading(true);
        
        // axios.post('/api/notifications', {
        //     receiver: data.id
        // })
        // .then((response) => {
        //     if (!response.data.status) {
        //         toast.success(`Demande d'ami envoyée à : ${data.name}`);
        //     } else {
        //         axios.post('/api/conversations', { 
        //                 userId: data.id
        //             })
        //             .then((data) => {
        //                 router.push(`/conversations/${data.data.id}`);
        //             })
        //     }
        //     setIsLoading(false);
        // })

        axios.post('/api/conversations', { 
            userId: data.id
        })
        .then((data) => {
            router.push(`/conversations/${data.data.id}`);
        })
        .finally(() => setIsLoading(false));
    }, [data]);

    return (
        <>
            {isLoading && (
                <LoadingModal />
            )}
            <div
                onClick={handleCick}
                className="
                    w-full
                    relative
                    flex
                    items-center
                    space-x-3
                    bg-[#818181]
                    hover:bg-neutral-100
                    dark:hover:bg-slate-600
                    rounded-lg
                    transition
                    curosr-pointer
                "
            >
                <Avatar user={data} />
                <div className="min-w-0 flex-1">
                    <div className="focus:outline-none">
                        <div
                            className="
                                flex
                                justify-between
                                items-center
                                mb-1
                            "
                        >
                            <p 
                                className="
                                    text-sm
                                    font-medium
                                    text-gray-900
                                "
                            >
                                {data.name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserBox;
