export interface User {
    id: number,
    username: string,
    password: string | undefined,
    email: string | undefined,
    role: string
}