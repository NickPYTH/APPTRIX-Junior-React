export const Alert = ({ text, manyText }) => {
    if (manyText)
        return (
            <div className="alert alert-danger w-100" role="alert">
                {manyText.map((text, id) => (
                    <div key={id + manyText.length}># {text}</div>
                ))}
            </div>
        );
    else
        return (
            <div className="alert alert-danger w-100" role="alert">
                # {text}
            </div>
        );
};
