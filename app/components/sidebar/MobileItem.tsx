"use client";

import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
    href: string;
    icon: any;
    active?: boolean;
    onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
    href,
    icon: Icon,
    active,
    onClick
}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    }

    return (
        <Link
            onClick={onClick} 
            href={href}
            className={clsx(`
                group
                flex
                gap-x-3
                leading-6
                font-semibold
                w-full
                justify-center
                p-4
                text-[#000000]
                bg-[#fe0000]
                hover:bg-[#ce0000]
            `,
                active && "bg-[#ce0000]"
            )}
        >
            <Icon className="h-6 w-6"/>
        </Link>
    );
}

export default MobileItem;
