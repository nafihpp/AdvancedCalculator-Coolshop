import { Fragment, useEffect, useRef, useState } from "react";
import "./Calculator.css";

export const Calculator = () => {
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);
    const inputRef = useRef();

    //Adding rows
    const addRow = () => {
        setRows((prevRows) => [
            ...prevRows,
            { id: Date.now(), sign: "+", value: 0, disabled: false },
        ]);
    };
    //handle the sign for calculation
    const handleSelect = (event, rowId) => {
        const updatedRows = rows.map((row) =>
            row.id === rowId ? { ...row, sign: event.target.value } : row
        );
        setRows(updatedRows);
    };
    //handle the input value
    const handleValue = (event, rowId) => {
        let input =
            event.target.value === "" ? 0 : parseFloat(event.target.value);
        const updatedRows = rows.map((row) =>
            row.id === rowId ? { ...row, value: input } : row
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
    //calculating total value whenever rows change
    useEffect(() => {
        let newTotal = rows.reduce((accumulator, row) => {
            if (!row.disabled) {
                accumulator +=
                    row.sign === "+"
                        ? parseFloat(row.value)
                        : parseFloat(-row.value);
            }
            return accumulator;
        }, 0);
        setTotal(newTotal);
    }, [rows]);

    //Autofocus on Added input rows
    useEffect(() => {
        if (inputRef[rows.length] !== undefined) {
            inputRef[rows.length].focus();
        }
    }, [rows.length]);

    return (
        <Fragment>
            <div className="calculator-cotaniner">
                <button onClick={addRow} className="add-row-button">
                    Add a row
                </button>
                <ul className="parent-container">
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
                                ref={(ref) => (inputRef[index + 1] = ref)}
                                disabled={row.disabled ? true : false}
                            />
                            <button
                                onClick={() => handleDelete(row.id)}
                                className="delete-button"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => handleDisable(row.id)}
                                className="disable-button"
                                style={{
                                    background: row.disabled
                                        ? "green"
                                        : "#057bff",
                                }}
                            >
                                {row.disabled ? "Enable" : "Disable"}
                            </button>
                        </li>
                    ))}
                </ul>
                {rows.length > 0 && <h2>Total:{total}</h2>}
            </div>
        </Fragment>
    );
};
