import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            receiver
        } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: currentUser?.id,
            },
            include: {
                friends: true, // Inclure la liste des amis de l'utilisateur
            },
        });

        if (!user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

		const areFriends = user.friends.some(friend => friend.id === receiver);

        if (areFriends === false) {
            const newNotif = await prisma.notification.create({
                data: {
                    sender: {
                        connect: {
                            id: currentUser.id
                        }
                    },
                    receiver: {
                        connect: {
                            id: receiver
                        }
                    }
                },
                include: {
                    sender: true,
                    receiver: true
                }
            });
            
            // Update all connections with new conversation
            if (newNotif.receiver.email) {
                pusherServer.trigger(newNotif.receiver.email, 'conversation:new', newNotif);
            }

            return NextResponse.json(newNotif);
        } else {
            return NextResponse.json({status: 201});
        }

    } catch (error: any) {
        console.log(error, 'ERROR_NOTIFS');
        return new NextResponse('Internal Error', { status: 500 });
    }
}