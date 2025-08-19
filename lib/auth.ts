
import Cookies from "js-cookie";
export function saveToken(token: string) {
  Cookies.set("token", token, { expires: 1, path: "/" });
}

export function getToken(): string | null {
  return Cookies.get("token") || null;
}


export function logout() {
  Cookies.remove("token", { path: "/" }); 
}
