import { auth } from "../firebase";

export const getAuthHeader = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const token = await user.getIdToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export default getAuthHeader;