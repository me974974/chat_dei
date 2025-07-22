'use client';

import clsx from "clsx";
import Link from "next/link";

interface DekstopItemProps {
    label: string;
    icon: any;
    href: string;
    onClik?: () => void;
    active?: boolean;
}

const DekstopItem: React.FC<DekstopItemProps> = ({
    label,
    icon: Icon,
    href,
    onClik,
    active
}) => {
    const handleClick = () => {
        if (onClik) {
            return onClik();
        }
    };

    return (
        <li onClick={handleClick}>
            <Link 
                href={href}
                className={clsx(`
                    group
                    flex
                    gap-x-3
                    rounded-md
                    p-3
                    text-sm
                    leading-6
                    font-semibold
                    text-[#000000]
                    hover:text-black
                    hover:bg-[#ce0000]
                `,
                    active && "bg-[#ce0000]"
                )}
            >
                <Icon className="h-6 w-6 shrink-0" />
                <span className="sr-only">{label}</span>
            </Link>
        </li>
    );
}

export default DekstopItem;
