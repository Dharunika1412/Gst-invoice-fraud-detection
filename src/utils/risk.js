export function riskLevel(score) {
  if (score >= 80) return "High";
  if (score >= 50) return "Medium";
  return "Low";
}

export function formatINR(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export const isSignedIn = () => sessionStorage.getItem("gst-auth") === "1";
export const signIn = () => sessionStorage.setItem("gst-auth", "1");
export const signOut = () => sessionStorage.removeItem("gst-auth");
