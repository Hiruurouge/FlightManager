export interface IdI {
    mail: string;
    password: string ;
}

export interface UserI {
    uid: string | number;
    name: string;
    firstname?:string;
    tel?: string | number;
    photoURL?: string;
    status: "user" | "admin";
}
