import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiurl = "http://localhost:8000";
const token = localStorage.localJWT;

//　非同期関数はsliceの外に作るお約束
// ログイン処理
export const fetchAsyncLogin = createAsyncThunk("login/post", async (auth) => {
  const res = await axios.post(`${apiurl}/authen/jwt/create`, auth, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
});

// 新規登録処理
export const fetchAsyncRegister = createAsyncThunk(
  "login/register",
  async (auth) => {
    const res = await axios.post(`${apiurl}/api/register/`, auth, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

//　ユーザー情報取得処理
export const fetchAsyncProf = createAsyncThunk("login/get", async () => {
  const res = await axios.get(`${apiurl}/api/myself`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  return res.data;
});

const loginSlice = createSlice({
  name: "login",
  initialState: {
    authen: {
      username: "",
      password: "",
    },
    isLoginView: true,
    profile: {
      id: 0,
      username: "",
    },
  },
  reducers: {
    editUsername(state, action) {
      state.authen.username = action.payload;
    },
    editPassword(state, action) {
      state.authen.password = action.payload;
    },
    toggleMode(state) {
      state.isLoginView = !state.isLoginView;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem("localJWT", action.payload.access);
      // ログインに成功すると自動で/tasksにページ遷移する
      action.payload.access && (window.location.href = "/tasks");
    });
    builder.addCase(fetchAsyncProf.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export const { editUsername, editPassword, toggleMode } = loginSlice.actions;
export const selectAuthen = (state) => state.login.authen;
export const selectIsLoginView = (state) => state.login.isLoginView;
export const selectProfile = (state) => state.login.profile;

export default loginSlice.reducer;
