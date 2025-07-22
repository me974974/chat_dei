import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getNotifications = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return [];
    }

    try {
        const notifications = await prisma.notification.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                receiverId: currentUser.id
            },
            include: {
                sender: true,
                receiver: true             
            }
        });

        return notifications;
    } catch (error: any) {
        return [];
    }
};

export default getNotifications;
