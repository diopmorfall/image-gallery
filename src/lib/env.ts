import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
    PEXELS_API_KEY: str(),
})

export default env;
//* this allows us to validate our API key: ts needs so even if it's always defined