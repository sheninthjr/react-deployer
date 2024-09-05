export function getUserDetails(): {
  username: string | null;
  userId: string | null;
} {
  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('userId');
  return {
    username,
    userId,
  };
}

export function setUserDetails(userName: string, userId: string) {
  const name = localStorage.setItem('username', userName);
  const id = localStorage.setItem('userId', userId);
}
