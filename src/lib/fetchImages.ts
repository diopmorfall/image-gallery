import { ImagesResults, ImagesSchemaWithPhotos } from "@/models/Images";
import env from "./env";

export async function fetchImages(url: string): Promise<ImagesResults | undefined>{
    //? types of data that could be returned
    try{
        const res = await fetch(url, {
            headers: {
                Authorization: env.PEXELS_API_KEY,
            }
        })

        if(!res.ok) throw new Error("Fetch images error \n")

        const imagesResults: ImagesResults = await res.json();
        //console.log(imagesResults);

        //* Data parsing with Zod schemes; if not successful, it'll throw an error
        const parsedData = ImagesSchemaWithPhotos.parse(imagesResults);
        if(parsedData.total_results === 0) return undefined
        //? total_result is already suggested thanks to the schema
        return parsedData;
    } catch(e){
        if(e instanceof Error) console.log(e.stack);
    }
}