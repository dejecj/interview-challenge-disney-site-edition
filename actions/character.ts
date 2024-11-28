"use server"
import "server-only";

import { Character } from "@/types/characters";
import { ApiError, BaseError } from "@/types/errors";
import { Response } from '@/types/actions';
import { ApiResponse as DisneyApiResponse, Pagination as DisneyPagination } from "@/types/disney-api";

export const list = async (params?:{name?:string, page?: string}) => {
    try {
        const options:{
            pageSize: string,
            page?: string,
            name?:string
        } = {
            pageSize: '8'
        };

        if(params?.page) {
            let searchParams = new URLSearchParams(new URL(params.page).search);
            if(searchParams.get("page")) {
                options.page = searchParams.get("page") as string;
            }
            if(searchParams.get("name")){
                options.name = searchParams.get("name") as string;
            }
        }

        if(params?.name) {
            options.name = params.name;
        }

        const response = await fetch(`https://api.disneyapi.dev/character?${new URLSearchParams(options)}`);
        if(!response.ok) {
            throw new Error(response.status.toString());
        }

        const payload = await response.json() as DisneyApiResponse;
        if (Array.isArray(payload.data)) {
            return new Response<Character[], DisneyPagination, BaseError>("character", payload.data, payload.info).toJSON();
        } else {
            return new Response<Character[], DisneyPagination, BaseError>("character", [payload.data], payload.info).toJSON();
        }
    } catch(e) {
        const error = new ApiError<BaseError>(e as Error).toJSON();
        return new Response<Character[], undefined, BaseError>("character", undefined, undefined, error).toJSON();
    }
}

export const get = async (id:string) => {
    try {
        const response = await fetch(`https://api.disneyapi.dev/character/${id}`);
        if(!response.ok) {
            throw new Error(response.status.toString());
        }

        let payload = await response.json() as DisneyApiResponse;
        if(Array.isArray(payload.data)) {
            // API returned an array, this is either because no id was provided which is invalid on this 
            // endpoint or the id provided was not found and the api returned an empty array
            throw new Error('Character not found');
        }

        return new Response<Character, DisneyPagination, BaseError>("character", payload.data as Character).toJSON();
    } catch(e) {
        const error = new ApiError<BaseError>(e as Error).toJSON();
        return new Response<Character, undefined, BaseError>("character", undefined, undefined, error).toJSON();
    }
}