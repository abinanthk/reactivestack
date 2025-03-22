import {
  Api,
  Store,
} from "../../../../packages/vannila";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";

type TUserData = {
  name: string;
  age: number;
};

const userData: TUserData = {
  name: "abi",
  age: 22,
};

const getUser = (payload: any) => {
  console.log("fetching ", payload);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(userData);
      // reject({ message: "Something went wrong" });
    }, 1000);
  });
};

const getUserApi = new Api("data1", getUser, {
  pollTime: 2000,
  plugins: {
    // devtools: apiDevToolsPlugin("user-api"),
  },
});

getUserApi.fetch(10);

const apiuserStore = new Store<{
  status: string;
  data: {
    name: string;
    age: number;
  };
  error: {
    message: string;
  };
}>({
  status: "idle",
  data: {
    name: "",
    age: 0,
  },
  error: {
    message: "",
  },
});

getUserApi.subscribe((res) => {
  if (res.status === "completed") {
    return;
  }

  apiuserStore.state.status = res.status;

  if (res.status === "error") {
    apiuserStore.state.error = res.error;
    return;
  }

  apiuserStore.state.data = res.data as any;
});

export const TodoList = () => {
  return (
    <div>
      <TaskForm />
      <TaskList />
    </div>
  );
};
