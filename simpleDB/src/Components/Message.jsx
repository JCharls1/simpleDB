import React from 'react';

const Message = (props) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(props.message);
        alert('Message copied to clipboard!');
    };

    return (
        <div className="m-1 flex justify-between items-center border-b border-teal-500 py-2 px-4 bg-white shadow-md rounded-lg">
            <p className="text-gray-700 flex-1">{props.message}</p>
            <button
                className="bg-teal-500 hover:bg-teal-700 text-white text-sm py-1 px-3 rounded ml-4"
                onClick={handleCopy}
            >
                Copy
            </button>
        </div>
    );
};

export default Message;
