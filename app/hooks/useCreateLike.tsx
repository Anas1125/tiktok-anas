import { database, ID } from "@/libs/AppWriteClient"

const useCreateLike = async (userId: string, name: string) => {
    try {
        await database.createDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID), 
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_LIKE),
            ID.unique(), 
        {
            user_id: userId,
            name: name
        });
    } catch (error) {
        throw error
    }
}

export default useCreateLike