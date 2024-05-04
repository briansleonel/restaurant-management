import axios from "axios";
import config from "./config";

/**
 * Establezco la instancia de axios para poder hacer consultas HTTP
 */
export const __instanceAxios = axios.create({
    baseURL: config.URL_API,
});
