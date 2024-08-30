import React from 'react';

const Input = ({ type = "text", name, placeholder, value, isTextArea = false, onChange, min="0", max="", step="", disabled=false }) => {
    return (
        <div className="input-container">
            {isTextArea ? (
                <textarea
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    min={min}
                    disabled={disabled}  
                ></textarea>
            ) : (
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}  
                />
            )}
        </div>
    );
}

export default Input;
