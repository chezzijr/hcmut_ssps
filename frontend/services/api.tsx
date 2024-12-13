import axios, { AxiosHeaders } from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function login(login: string, password: string) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/login`,
      {
        login: login,
        password: password,
      },
      // { withCredentials: true }
    );

    if (response.data.error) {
      throw new Error(response.data.error);
    }
    localStorage.setItem("authorization", response.data.token);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login API error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.error ||
          "Login failed: Unable to connect to the server."
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error occurred.");
    }
  }
}

export const uploadFileAPI = async (
  file: File,
  token: string
): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);
  // formData.append("name", "Pomegranate");

  // const selection = await window.showOpenFilePicker();
  // if (selection.length > 0) {
  //   const file = await selection[0].getFile();
  //   formData.append("file", file);
  // }

  try {
    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: new AxiosHeaders({
        "Content-Type": "multipart/form-data",
        Origin: "http://localhost:5173",
        Authorization: token,
      }),
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.detail || "Có lỗi xảy ra khi tải lên tệp.";
    }
    throw "Unexpected error occurred.";
  }
};
