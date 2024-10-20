export const API = {
  signUp: `/InternalLogin/sign-up`,
  signIn: `/InternalLogin`,
  tasks: {
    list: `/Todos`,
    toggle: (id: string) => `/Todos/toggle/${id}`,
    add: `/Todos`,
    delete: (id: string) => `/Todos/${id}`,
    edit: (id: string) => `/Todos/${id}`,
  },
};
