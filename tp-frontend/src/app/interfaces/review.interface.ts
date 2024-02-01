export interface Review {
    _id?: any,
    id?: string,
    rating: number,
    body?: string,
    spoiler_check?: boolean,
    private?: boolean,
    userId?: any,
    gameId?: any
}