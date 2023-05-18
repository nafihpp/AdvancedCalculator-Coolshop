import { useEffect, useRef, useState } from "react";
import "./App.css";
import "./styles/global.css";

function App() {
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);

    //Adding rows
    const addRow = () => {
        setRows([
            ...rows,
            { id: Date.now(), sign: "+", value: 0, disabled: false },
        ]);
    };

    //handle the input value
    const handleValue = (event, rowId) => {
        const updatedRows = rows.map((row) =>
            row.id === rowId ? { ...row, value: event.target.value } : row
        );
        setRows(updatedRows);
    };
    //handle the sign for calculation
    const handleSelect = (event, rowId) => {
        const updatedRows = rows.map((row) =>
            row.id === rowId ? { ...row, sign: event.target.value } : row
        );
        setRows(updatedRows);
    };
    //delete rows
    const handleDelete = (rowId) => {
        const unDeleted = rows.filter((row) => row.id !== rowId);
        setRows(unDeleted);
    };
    //handle Disabled
    const handleDisable = (rowId) => {
        const updatedRows = rows.map((row) =>
            row.id === rowId ? { ...row, disabled: !row.disabled } : row
        );
        setRows(updatedRows);
    };
    //calculating total value
    useEffect(() => {
        let totalValue = 0;
        rows.forEach((element) => {
            if (!element.disabled) {
                totalValue +=
                    element.sign === "+"
                        ? parseInt(element.value)
                        : parseInt(-element.value);
            }
        });
        setTotal(totalValue);
    }, [rows]);

    return (
        <div className="app">
            <button onClick={addRow}>Add a row</button>
            <ul>
                {rows.map((row, index) => (
                    <li key={row.id}>
                        <select onChange={(e) => handleSelect(e, row.id)}>
                            <option value="+">+</option>
                            <option value="-">-</option>
                        </select>
                        <input
                            type="number"
                            placeholder="enter the value"
                            onChange={(e) => handleValue(e, row.id)}
                        />
                        <button onClick={() => handleDelete(row.id)}>
                            Delete
                        </button>
                        <button onClick={() => handleDisable(row.id)}>
                            {row.disabled ? "enable" : "disable"}
                        </button>
                    </li>
                ))}
            </ul>
            <div>Total:{total}</div>
        </div>
    );
}

export default App;
