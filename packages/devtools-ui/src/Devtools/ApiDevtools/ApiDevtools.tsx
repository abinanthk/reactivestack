import { Api } from "@reactivestack/vannila";
import { useApiDevTools } from "../../hooks";

type ApiDevToolsItemProps = {
  item: { key: string; api: Api };
};

const ApiDevToolsItem = ({ item }: ApiDevToolsItemProps) => {
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
        {item.key}
      </div>
      <div
        style={{
          border: "1px solid #444",
          padding: 5,
          margin: 5,
        }}
      >
        <div style={{ border: "1px solid #444", padding: 5 }}>
          {Object.entries(item.api.metaData).map(([key, value]) => {
            return (
              <div>
                <span>{key} : </span>
                <span>{JSON.stringify(value)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const ApiDevTools = () => {
  const list = useApiDevTools();

  return (
    <div>
      <p>--- Api Dev Tools ---</p>
      <div>
        {/* {list.map((item, i) => (
          <div key={i}>
            <ApiDevToolsItem item={item} />
          </div>
        ))} */}
      </div>
    </div>
  );
};
