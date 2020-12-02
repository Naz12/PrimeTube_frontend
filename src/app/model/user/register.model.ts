import { CurrentUser } from "./currentUser.model";

export interface Register extends CurrentUser{
   
    password? : string,
    confirmPassword? :string

}


export interface Login{
    email? : string,
    password? : string,
    rememberMe? : true
}