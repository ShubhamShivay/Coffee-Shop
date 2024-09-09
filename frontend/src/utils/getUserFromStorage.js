export const getUserFromStorage = () => {
  const token = JSON.parse(localStorage.getItem("user") || null);
  return token?.token;
};
