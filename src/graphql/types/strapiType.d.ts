export interface Attributes {
    id: number;
    attributes: Contents;
}

export interface Contents extends Attributes {
    title: string;
    slug: string;
    image: {
        data: {
            attributes: {
                url: string;
                width: number;
                height: number;
            };
        };
    };
    image_sp: {
        data: {
            attributes: {
                url: string;
                width: number;
                height: number;
            };
        };
    };
    content: string;
    whats_new: string;
}
