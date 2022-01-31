import { useState } from "react";

export const TextInput = ({ label, changeFun }) => {
    const [text, setText] = useState("");
    const textChangeHandler = (value) => {
        setText(value);
        changeFun(value);
    };
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input
                type="text"
                className="form-control"
                value={text}
                onChange={(e) => textChangeHandler(e.target.value)}
            />
        </div>
    );
};
