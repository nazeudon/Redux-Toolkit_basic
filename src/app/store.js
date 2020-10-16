import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import taskReducer from "../features/task/taskSlice";
import fetchReducer from "../features/fetch/fetchSlice";

//裏でcombineReducerが働いて、個々のReducerを結合している
export default configureStore({
  reducer: {
    counter: counterReducer,
    task: taskReducer,
    fetch: fetchReducer,
  },
});
