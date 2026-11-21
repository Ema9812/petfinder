import { atom, useRecoilState } from "recoil";
import { useUser } from "./use-user";
import { updateProfile, updatePassword } from "../lib/api";

type Profile = { name: string; locality: string };

const profileState = atom<Profile>({
  key: "profileState",
  default: { name: "", locality: "" },
});

export function useProfile() {
  const { user } = useUser();
  const [profile, setProfile] = useRecoilState(profileState);

  async function saveProfile(data: Profile) {
    await updateProfile(data, user?.token ?? "");
    setProfile(data);
  }

  async function savePassword(password: string) {
    await updatePassword(password, user?.token ?? "");
  }

  return { profile, saveProfile, savePassword };
}