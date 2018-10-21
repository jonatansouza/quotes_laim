import { Author } from "./author";

export interface Quote {
    content: string;
    id: string;
    authorId: string;
    author: Author;
}
