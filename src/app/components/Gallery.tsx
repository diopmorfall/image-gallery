import type { ImagesResults } from "@/models/Images";
import { fetchImages } from "@/lib/fetchImages";
import ImgContainer from './ImgContainer';
import addBlurredDataUrls from "@/lib/getBase64";
import getPreviousNextPages from "@/lib/getPrevNextpages";
import Footer from "./Footer";

type Props = {
    topic?: string | undefined,
    page?: string | undefined,
}

export default async function Gallery({ topic = 'curated', page }: Props){
    let url
    if(topic === 'curated' && page){ //? browsing beyond the home page
        url = `https://api.pexels.com/v1/curated?page=${page}`
    } else if(topic === 'curated'){ //? rhome page
        url = "https://api.pexels.com/v1/curated?"
    } else if(!page){ //? first page of the search results
        url = `https://api.pexels.com/v1/search?query=${topic}`
    } else { //? beyond the first page of the search result
        url = `https://api.pexels.com/v1/search?query=${topic}&page=${page}`
    }

 
    const images: ImagesResults | undefined = await fetchImages(url);
    if(!images || images.per_page === 0) return 
        <h2 className="m-4 text-2xl font-bold">No images found</h2>

    const photosWithBlur = await addBlurredDataUrls(images)

    const { prevPage, nextPage } = getPreviousNextPages(images)
    
    const footerProps = { topic, page, prevPage, nextPage, }

    return(
        <>
            <section className="px-1 my-3 grid grid-cols-gallery auto-rows-[10px]">
                {photosWithBlur.map(photo => (
                    <ImgContainer key={photo.id} photo={photo} />
                    ))}
            </section>
            <Footer {...footerProps} />
        </>
    )
}