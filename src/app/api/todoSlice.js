import BaseApi from "./Api";

export const GetTodo =  async () => {
    const response = await BaseApi.get("users?limit=5")
    console.log(response.data);
    return response.data
}

export const addTodo = async (todo) => {
    return await BaseApi.post("users/",todo)
}

export const updateTodo = async (todo) => {
    return await BaseApi.patch(`users/${todo.id}`,todo)
}

export const deleteTodo = async (id) => {
    return await BaseApi.delete(`users/${id}`,id)
}
