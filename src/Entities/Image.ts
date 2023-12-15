interface IImage {
    id: number,
    status:string,
    name: string,
    url: string,
    gender: string,
    height: number,
    image: string
}

interface Image extends IImage {}

class Image{
    constructor({id, status, name, url, gender, height, image}: IImage){
        this.id = id;
        this.status = status;
        this.name = name;
        this.url = url;
        this.gender = gender;
        this.height = height;
        this.image = image;
    }
}

export default Image;