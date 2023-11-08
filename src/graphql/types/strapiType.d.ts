export interface Attributes {
    attributes: Contetns
}

export interface Contents {
    contents: {
        data: {
            id: number
            attributes: {
                title: string
                slug: string
                image: {
                    data: {
                        attributes: {
                            url: string
                            width: number
                            height: number
                        }
                    }
                }
                image_sp: {
                    data: {
                        attributes: {
                            url: string
                            width: number
                            height: number
                        }
                    }
                }
                content: string
                whats_new: string
            }[];
        }
    }
    openGraphs: {
        data: {
            id:number
            attributes: {
                slug: string
                type: string
                url: string
            }
        }
    }
}
