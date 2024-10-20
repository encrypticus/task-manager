export const token = {
  set(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  },
  get() {
    return localStorage.getItem('accessToken');
  },
};
