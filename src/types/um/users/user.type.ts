export type UserType = {
    id: string,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    gender: string,
    dateOfBirth: Date | null,
    status: string,
    roleName: string,
    profilePicture?: string | null,
}