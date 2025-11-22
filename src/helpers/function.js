import toast from "react-hot-toast";

export const handleLogout = (router) => {
  let loader = toast.loading("Logging out...");
  localStorage.removeItem("token");
  localStorage.removeItem("accountId");
  localStorage.removeItem("roleId");
  toast.dismiss(loader);
  router("/");
};

export const formatReadableDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const weekday = date.toLocaleString("en-US", { weekday: "long" });
  return `${day} ${month} ${weekday}`;
};

export function randomId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
