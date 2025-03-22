import { taskForm } from "../store";

export const TaskForm = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        taskForm.submit();
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 200,
            gap: 5,
          }}
        >
          {/* <taskForm.Subscribe
            // value={["title", "description"]}
            error={["title", "description"]}
            render={({ value, error }) => (
              <div>
                <div>{JSON.stringify(value)}</div>
                <div>{JSON.stringify(error)}</div>
              </div>
            )}
          /> */}

          <span>Title</span>

          <taskForm.Value
            name="title"
            render={(value, handle) => (
              <input value={value} onChange={handle} />
            )}
          />

          <taskForm.Error
            name="title"
            render={(error) => <span>{error}</span>}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 200,
            gap: 5,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <span>Description</span>

          <taskForm.Value
            name="description"
            render={(value, handle) => (
              <input value={value} onChange={handle} />
            )}
          />

          <taskForm.Error
            name="description"
            render={(error) => <span>{error}</span>}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 200,
            gap: 5,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <span>Priority</span>

          <taskForm.Value
            name="priority"
            render={(value, handle) => (
              <select value={value} onChange={handle}>
                <option value={"low"}>Low</option>
                <option value={"medium"}>Medium</option>
                <option value={"high"}>High</option>
              </select>
            )}
          />
          <taskForm.Error
            name="priority"
            render={(error) => <span>{error}</span>}
          />
        </div>

        <button type="submit">Add</button>
      </div>
    </form>
  );
};
