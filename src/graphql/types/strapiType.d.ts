export interface Contetns {
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
            }
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
