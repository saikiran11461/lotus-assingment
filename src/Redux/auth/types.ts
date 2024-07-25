export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}


export interface UserResponse {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface  FormData {
    name:string,
    email:string,
    password:string
}

export interface  FormDataLogin {
    
    email:string,
    password:string
}


 
