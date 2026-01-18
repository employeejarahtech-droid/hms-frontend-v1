export async function loginApi(email: string, password: string) {
  // Check for Electron API
  if (window.api) {
    const res = await window.api.login({ email, password });
    if (!res.success) {
      throw new Error(res.error || "Login failed");
    }
    // Return structure expected by useLogin / useAuthStore
    return {
      data: {
        user: res.user,
        token: "dummy-electron-token" // Local apps don't need JWT, but store expects one
      }
    };
  }

  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Login failed");
  }

  return res.json(); // should return { user, accessToken }
}
