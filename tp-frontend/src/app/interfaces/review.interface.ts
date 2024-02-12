export interface Review {
    _id?: any,
    rating: number,
    body: string,
    spoiler_check?: boolean,
    private?: boolean,
    userId: any,
    gameId: any,
    createdAt?: string,
    updatedAt?: string
}