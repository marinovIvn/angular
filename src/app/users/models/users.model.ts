export interface AllUsers {

    filter(arg0: (user: { id: any; }) => any): AllUsers;
    id: number,
    username: string,
    password: string | undefined,
    email: string | undefined,
    role: string
}