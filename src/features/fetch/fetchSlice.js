import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiurl = "https://jsonplaceholder.typicode.com/users";

export const fetchAsyncGet = createAsyncThunk("fetch/get", async () => {
  const res = await axios.get(apiurl);
  return res.data;
});

const fetchSlice = createSlice({
  name: "fetch",
  initialState: { users: [] },
  reducers: {},
  extraReducers: (builder) => {
    //createAsyncThunkの実行結果の場合わけ
    //処理が成功した場合
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return { ...state, users: action.payload };
    });
  },
});

export const selectUsers = (state) => state.fetch.users;
export default fetchSlice.reducer;
