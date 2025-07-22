import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getAreFriends = async ( friendId: string ): Promise<boolean> =>  {
    
    try {
        const currentUser = await getCurrentUser();

        const user = await prisma.user.findUnique({
            where: {
                id: currentUser?.id,
            },
            include: {
                friends: true, // Inclure la liste des amis de l'utilisateur
            },
        });
        
        // Vérifie si l'utilisateur existe
        if (!user) {
            return false;
        }
        
        // Vérifie si friendId est présent dans la liste friendIds de l'utilisateur
        const areFriends = user.friends.some(friend => friend.id === friendId);
        
        return areFriends;
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la recherche de l\'utilisateur :', error);
        return false; // En cas d'erreur, renvoyer false
    }
}

export default getAreFriends;
