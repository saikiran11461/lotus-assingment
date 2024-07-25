export interface TodoPayload{
    user:string | null
    title: string,
    description:string,
}


export interface TodoItem {
    _id: string;
    title: string;
    description: string;
    user: {
      _id: string;
      name: string;
    };
  }


export interface EditTodoPayload{
    title:string,
    description:string
}


interface Todo {
    _id: string;
    title: string;
    description: string;
    user: string;
    __v: number;
}

interface AppState {
    message: string;
    Todo: Todo[];
}

export interface RootState {
    appReducer: AppState;
}

export interface RouteParams {
    id?: string; // Adjust based on your actual route parameter
  }