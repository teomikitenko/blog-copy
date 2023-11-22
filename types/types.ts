export type U = {
    id: string|number,
    created_at: string,
    name: string,
    email: string,
    image: string|null,
    password: string|number,
    total_likes: number
  };
  export type P = {
    id: number;
    created_at: string;
    created_by: string;
    text: string | number;
    like:number
  };