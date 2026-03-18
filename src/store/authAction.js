import { loginStart, loginSuccess, loginFailure, checkAdminResult } from "./authSlice";

export const getCurrentUser = () => async (dispatch) => {
  try {
    dispatch(loginStart());
  
    

    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/admin/me`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error("Not authenticated");
    }

    const result = await res.json();

    dispatch(loginSuccess(result.data));
  } catch (error) {
    dispatch(loginFailure(null));
  }
};

export const checkAdmin = (email) => async (dispatch) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/admin/check-admin`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

    const result = await res.json();
    dispatch(checkAdminResult(result.data.exists));

  } catch (error) {
    console.log(error)
    dispatch(checkAdminResult(false));

  }
}
