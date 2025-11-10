import { DateTime } from "next-auth/providers/kakao";


export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    created_at: string;
};
