import { Store } from "@reactivestack/vannila";
import { useStore } from "@reactivestack/react";

import { DevtoolsClient } from "@reactivestack/devtools-client";
import { useEffect, useState } from "react";

const URL = window.location.origin;

export const devtoolsClient = new DevtoolsClient(URL);

type StoreDevToolsItemProps = {
  item: {
    key: string;
    state: any;
  };
};
const StoreDevToolsItem = (props: StoreDevToolsItemProps) => {
  const state = useStore({ showHistory: false }).state;

  const store = useStore(props.item.state);

  useEffect(() => {
    devtoolsClient.on("storeStateChange", (e) => {
      console.log("change : ", e);
      console.log("keys : ", e.key, props.item.key);
      if (e.key !== props.item.key) {
        return;
      }

      const prop: any = e.info.prop;
      store.state[prop] = e.info.value;
    });
  }, []);

  // const history = {} as any;
  // const undos = history.getUndos();
  // const redos = history.getRedos();

  // const handleUndo = () => {
  //   history.undo();
  // };

  // const handleRedo = () => {
  //   history.redo();
  // };

  // const handleClearHistory = () => {
  //   history.clear();
  // };

  // const handlePop = () => {
  //   history.pop();
  // };

  return (
    <div style={{ border: "1px solid #444", padding: 5, margin: 5 }}>
      <div
        style={{
          fontWeight: "bold",
          padding: 5,
          margin: 5,
          backgroundColor: "#333",
          color: "#eee",
        }}
      >
        {props.item.key}
      </div>
      <div
        style={{
          border: "1px solid #444",
          padding: 5,
          margin: 5,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* <div>Current state : {JSON.stringify(store.state)}</div> */}
          <div>
            <div>Current state</div>
            {Object.entries(store.state).map(([key, value]) => {
              return (
                <div key={key}>
                  <span>{key} : </span> <span>{JSON.stringify(value)}</span>
                </div>
              );
            })}
          </div>

          <div>
            <button
              onClick={() => (state.showHistory = !state.showHistory)}
              style={{ backgroundColor: "#d2d2d2", padding: "2px 8px" }}
            >
              show history
            </button>
          </div>
          {/* {state.showHistory && (
            <div>
              <div>
                <button onClick={handleUndo}>undo</button>
                <button onClick={handleRedo}>redo</button>
                <button onClick={handleClearHistory}>clear history</button>
                <button onClick={handlePop}>pop</button>
              </div>

              <div style={{ display: "flex", gap: 20 }}>
                <div style={{ border: "1px solid #444", padding: 5 }}>
                  <p>--- current ---</p>

                  {Object.entries(history.current).map(([key, value]) => {
                    return (
                      <div>
                        <span>{key} : </span>
                        <span>{JSON.stringify(value)}</span>
                      </div>
                    );
                  })}
                </div>

                <div style={{ border: "1px solid #444", padding: 5 }}>
                  <p>--- undos ---</p>

                  {undos.map((undo, index) => {
                    return (
                      <div key={index}>
                        {Object.entries(undo).map(([key, value]) => {
                          return (
                            <div>
                              <span>{key} : </span>
                              <span>{JSON.stringify(value)}</span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                <div style={{ border: "1px solid #444", padding: 5 }}>
                  <p>--- redos ---</p>

                  {redos.map((redo, index) => {
                    return (
                      <div key={index}>
                        {Object.entries(redo).map(([key, value]) => {
                          return (
                            <div>
                              <span>{key} : </span>
                              <span>{JSON.stringify(value)}</span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export const StoreDevtools = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    devtoolsClient.on("storeListChange", (e) => {
      setList(e);
    });
  }, []);

  return (
    <div>
      <p>--- Store Dev Tools ---</p>
      <div>
        {list.map((item) => (
          <div key={item.key}>
            <StoreDevToolsItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
