// isAuthenticated.jsx
export const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  return !!user; // or add additional validation if needed
};
