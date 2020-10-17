import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiurl = "http://localhost:8000/api/tasks/";
const token = localStorage.localJWT;

// タスクの一覧を取得
export const fetchAsyncGet = createAsyncThunk("task/get", async () => {
  const res = await axios.get(apiurl, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  return res.data;
});

//　タスクの新規作成
export const fetchAsyncCreate = createAsyncThunk("task/post", async (task) => {
  const res = await axios.post(apiurl, task, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });
  return res.data;
});

//　タスクの更新
export const fetchAsyncUpdate = createAsyncThunk("task/put", async (task) => {
  const res = await axios.put(`${apiurl}${task.id}/`, task, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });
  return res.data;
});

//　タスクの削除
export const fetchAsyncDelete = createAsyncThunk("task/delete", async (id) => {
  await axios.delete(`${apiurl}${id}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });
  return id;
});

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [
      {
        id: 0,
        title: "",
        created_at: "",
        updated_at: "",
      },
    ],
    editedTask: {
      id: 0,
      title: "",
      created_at: "",
      updated_at: "",
    },
    selectedTask: {
      id: 0,
      title: "",
      created_at: "",
      updated_at: "",
    },
  },
  reducers: {
    editTask(state, action) {
      state.editedTask = action.payload;
    },
    selectTask(state, action) {
      state.selectedTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return { ...state, tasks: action.payload };
    });
    builder.addCase(fetchAsyncCreate.fulfilled, (state, action) => {
      return { ...state, tasks: [action.payload, ...state.tasks] };
    });
    builder.addCase(fetchAsyncUpdate.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
        selectedTask: action.payload,
      };
    });
    builder.addCase(fetchAsyncDelete.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
        selectedTask: { id: 0, title: "", created_at: "", updated_at: "" },
      };
    });
  },
});

export const { editTask, selectTask } = taskSlice.actions;

export const selectSelectedTask = (state) => state.task.selectedTask;
export const selecteditedTask = (state) => state.task.editedTask;
export const selectTasks = (state) => state.task.Tasks;

export default taskSlice.reducer;
