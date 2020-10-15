import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import taskReducer from "../features/task/taskSlice";

//裏でcombineReducerが働いて、個々のReducerを結合している
export default configureStore({
  reducer: {
    counter: counterReducer,
    task: taskReducer,
  },
});
