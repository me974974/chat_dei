import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import NotifList from "./components/NotifList";
import getNotifications from "../actions/getNotifications";

export default async function ConversationsLayout({
    children
}: {
    children: React.ReactNode
}) {
    const notifications = await getNotifications();

    return (
        // ts-expect-error Server Component
        <Sidebar>
            <div className="h-full">
                <NotifList
                    initialItems={notifications}
                />
                {children}
            </div>
        </Sidebar>
    )
};