import { atom, useRecoilState } from "recoil";
import { authUser } from "../lib/api";

type User = { email: string; token: string } | null;

const userState = atom<User>({
  key: "userState",
  default: null,
});

export function useUser() {
  const [user, setUser] = useRecoilState(userState);

  async function login(email: string, password: string) {
    const data = await authUser(email, password);
    setUser({ email, token: data.token });
  }

  function logout() {
    setUser(null);
  }

  return { user, login, logout };
}