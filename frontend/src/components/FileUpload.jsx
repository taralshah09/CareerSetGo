import React, { useState } from 'react';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [parsedData, setParsedData] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setError("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/parse-resume/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setParsedData(data);
                setError(null); // Clear any existing errors
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Something went wrong.");
            }
        } catch (err) {
            setError("Network error. Please try again.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" accept=".docx" onChange={handleFileChange} required />
                <button type="submit">Upload and Parse</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {parsedData && (
                <div>
                    <h3>Parsed Data:</h3>
                    <pre>{JSON.stringify(parsedData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
