import { Request } from "express"
import { decodedata } from "./decodedData"


export interface ExtendedRequest extends Request{
    info?:decodedata
}

