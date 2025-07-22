import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
import toast from "react-hot-toast";

export async function POST(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            friendId
        } = body;

        if (!currentUser?.id) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

		if (!friendId) {
			return new NextResponse('Invalid id', { status: 400 });
		}

		// const user = await prisma.user.findUnique({
        //     where: {
        //         id: currentUser?.id,
        //     },
        //     include: {
        //         friends: true, // Inclure la liste des amis de l'utilisateur
        //     },
        // });

		// if (!user) {
        //     return new NextResponse('Unauthorized', { status: 401 });
        // }

		// const areFriends = user.friends.some(friend => friend.id === friendId);

		// if (areFriends === false) {
        
		const updatedUser = await prisma.user.update({
				where: { 
					id: currentUser.id
				},
				data: {
					friends: {
						connect: {
							id: friendId
							}
						},
					friendOf : {
						connect: {
							id: friendId
						}
					}
				}
		});
				
		const updatedFriend = await prisma.user.update({
				where: { 
					id: friendId
				},
				data: {
					friendOf: {
						connect: {
							id: currentUser.id
						}
					},
					friends: {
						connect: {
							id: currentUser.id
						}
					}
				}
		});

		return (NextResponse.json(updatedUser), NextResponse.json(updatedFriend));
		// } else {
			// return NextResponse.json({status: 201});
		// }

    } catch (error: any) {
        console.log(error, 'ERROR_FRIENDS');
        return new NextResponse('Internal Error', { status: 500 });
    }
}