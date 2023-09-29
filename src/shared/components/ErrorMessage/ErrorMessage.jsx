import "./ErrorMessage.css"

const ErrorMessage = ({message, error, ...props}) => {
    return (
        <div
            className="error-message"
            style={{
                display: error ? '' : 'none',
            }}>
            <h3>{message}</h3>
        </div>
    );
};

export default ErrorMessage;