// // isAuthenticated.jsx
export const isAuthenticated = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && typeof user === 'object' && user.token; // or user.id, user.username, etc.
  } catch (err) {
    console.error(err)
    return false;
  }
};

