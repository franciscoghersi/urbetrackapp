import Image from './Image'

export interface ResponseAPI {
    info: Info;
    results: Image[];
}

export interface Info {
    count: number;
    pages: number;
    next: string;
    prev: string;
}
