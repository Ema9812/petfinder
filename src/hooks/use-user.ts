import { atom, useRecoilState } from "recoil";
import { authUser, registerUser } from "../lib/api";

type User = { email: string; token: string } | null;

const userState = atom<User>({
  key: "userState",
  default: null,
  effects: [
    ({ setSelf, onSet }) => {
      try {
        const saved = localStorage.getItem("user");
        if (saved) setSelf(JSON.parse(saved));
      } catch {
        // si localStorage falla, la app sigue funcionando sin guardar la sesión
      }

      onSet((newValue) => {
        try {
          if (newValue) localStorage.setItem("user", JSON.stringify(newValue));
          else localStorage.removeItem("user");
        } catch {
          // idem
        }
      });
    },
  ],
});

const pendingEmailState = atom<string>({
  key: "pendingEmailState",
  default: "",
});

export function useUser() {
  const [user, setUser] = useRecoilState(userState);
  const [pendingEmail, setPendingEmail] = useRecoilState(pendingEmailState);

  async function login(email: string, password: string) {
    const data = await authUser(email, password);
    setUser({ email, token: data.token });
    setPendingEmail("");
  }

  async function register(email: string, password: string) {
    await registerUser(email, password);
    await login(email, password);
  }

  function logout() {
    setUser(null);
  }

  return { user, pendingEmail, setPendingEmail, login, register, logout };
}