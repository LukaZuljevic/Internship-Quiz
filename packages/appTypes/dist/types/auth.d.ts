export type JwtResponseDto = {
    token: string;
};
export type Payload = {
    email: string;
    id: string;
    role: Role;
};
export declare enum Role {
    USER = "User",
    ADMIN = "Admin"
}
