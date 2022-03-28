import { Fragment, useMemo, useCallback, ChangeEvent } from "react";
import "./styles.css";
import users, { UserType, fruits, pets } from "./data";
import useQueryParams from "./useQueryParams";

export default function App() {
  const { index, params, getOne, commit, getAll } = useQueryParams();

  const usersList = useMemo(
    () =>
      users.filter((user) =>
        Object.keys(index).every((k: any) =>
          index[k].includes(user[k as keyof UserType] as any)
        )
      ),
    [index]
  );

  const onChange = useCallback(
    (key: string, event: any) => {
      const $default: any = "";
      const value = event.target?.value;
      const multiple = event.target?.multiple;

      if (value === $default) {
        params.delete(key);
      } else if (multiple) {
        console.log(getAll(key));
        const paramValues = getAll(key).includes(value)
          ? getAll(key).filter((v) => v !== value)
          : [...getAll(key), value];

        params.delete(key);
        paramValues.forEach((v) => params.append(key, v));
      } else {
        params.set(key, value);
      }
      commit(params);
    },

    [commit, params, index]
  );

  return (
    <div className="App">
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Filter by fruit //Multiple//:
          <select
            multiple
            value={getAll("fruits")}
            onChange={(e) => onChange("fruits", e)}
          >
            {["", ...fruits].map((f) => (
              <option value={f} key={f}>
                {f}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Filter by pets:
          <select value={getOne("pets")} onChange={(e) => onChange("pets", e)}>
            {["", ...pets].map((p) => (
              <option value={p} key={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
      </div>
      <h1>users list</h1>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>User Id</th>
            <th>Fruits</th>
            <th>Pets</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.fruits}</td>
              <td>{u.pets}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
