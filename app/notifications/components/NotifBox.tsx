import Button from "@/app/components/Button";
import { FullNotificationType } from "@/app/types";
import React from 'react';

interface NotificationProps {
    data: FullNotificationType;
    onAcceptClick: () => void;
    onRejectClick: () => void;
    isLoading: boolean;
}

const Notification: React.FC<NotificationProps> = ({
    data,
    onAcceptClick,
    onRejectClick,
    isLoading,
}) => {
  return (
    <div className="bg-[#818181] hover:bg-neutral-400 dark:hover:bg-slate-800 p-4 rounded-lg shadow-md">
        <p className="text-gray-700 dark:text-black">{data.sender.name} vous a envoyé une demande d&apos;ami</p>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <Button
                disabled={isLoading}
                accept
                onClick={onAcceptClick}
            >
                Accepter
            </Button>
            <Button
                disabled={isLoading}
                secondary
                onClick={onRejectClick}
            >
                Refuser
            </Button>
        </div>
    </div>
  );
};

export default Notification;
