export interface IUser {
    username: string | null,
    token: string | null,
    name?: string | null,
    cart?: object,
    orders?: object,
}

export interface IAuth {
    username: string,
    password: string,
}