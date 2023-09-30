export interface IUser {
    username: string | null,
    token: string | null,
    firstName?: string | null,
    lastName?: string | null,
    cart?: object,
    orders?: object,
}

export interface IAuth {
    username: string,
    password: string,
}