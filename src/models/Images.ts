import { z } from 'zod';
//* Zod allows us to create a schema that defines the format of an object (the images here)
const BasicImageSchema = z.object({
    page: z.number(), //* here I can validate each value
    per_page: z.number(),
    prev_page: z.string().optional(), //? I can concatenate multiple properties too
    next_page: z.string().optional(),
    total_result: z.number(),
    //! the names of the properties must match the one in the API response
})

const PhotoSchema = z.object({
    id: z.number(),
    width: z.number(),
    height: z.number(),
    url: z.string(),
    src: z.object({
        large: z.string()
    }),
    alt: z.string(),
    blurredDataUrl: z.string().optional(),
})

//! if any of the values that are expected isn't received, Zod will throw an error

export const ImagesSchemaWithPhotos = BasicImageSchema.extend({
    photos: z.array(PhotoSchema)
})
//* since the API response is one object, we're combining our schemas into one

export type Photo = z.infer<typeof PhotoSchema>
export type ImagesResults = z.infer<typeof ImagesSchemaWithPhotos>
//* here we're inferring our ts types from the schemas we created