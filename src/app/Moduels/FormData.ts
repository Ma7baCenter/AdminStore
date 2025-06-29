export interface FormData {
    chatId: string;
    caption: string;
    fileName:string | null;
    file: File | null;
    Name: string ;
    NameLab: string | null ;
    Cost: number | null;}
    export interface statuss {
        Result: boolean;
        Errors: string;
        
        }