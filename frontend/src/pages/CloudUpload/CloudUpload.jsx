    import React, { useEffect, useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { fetchWithAuth } from '../../utils/fetchWithAuth';

    const FileUpload = () => {
        const [file, setFile] = useState(null);
        const [uploading, setUploading] = useState(false);
        const [uploadStatus, setUploadStatus] = useState('');
        const [uploadedUrl, setUploadedUrl] = useState('');
        const navigate = useNavigate();
        const [profileData, setProfileData] = useState({
            skills: "",
            education: "",
            age: "",
            experience: "",
            twitter_link: "",
            linkedin_link: "",
            insta_link: "",
            other_link: "",
            location: "",
            role: "",
            phone_no: "",
            domain_of_interest: "",
            job_type: "",
            resume: null,  // Set initial value to null for file input
            profile_picture: null, // Set initial value to null for file input
        });
        
        const CLOUD_NAME = "do81m3zqi";
        const UPLOAD_PRESET = "uploadresume";

        useEffect(() => {
            fetchWithAuth("http://127.0.0.1:8000/api/user/profile/")
                .then((data) => {
                    if (data.profile) {
                        setProfileData({ ...data.profile, resume: data.profile.resume || null });
                    } else {
                        console.error("Profile data not found.");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user profile data", error);
                });
        }, []);

        const uploadFile = async (e) => {
            e.preventDefault();
            if (!file) {
                setUploadStatus('Please select a file first');
                return;
            }

            try {
                setUploading(true);
                setUploadStatus('Uploading...');

                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', UPLOAD_PRESET);

                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
                    {
                        method: 'POST',
                        body: formData,
                    }
                );

                const data = await response.json();

                if (data.secure_url) {
                    setUploadStatus('Upload successful!');
                    setUploadedUrl(data.secure_url);
                    console.log('File uploaded:', data.secure_url);

                    const token = localStorage.getItem("access_token");
                    if (!token) {
                        console.error("No JWT token found!");
                        return;
                    }

                    const profileResponse = await fetchWithAuth(
                        "http://127.0.0.1:8000/api/profile/",
                        {
                            method: 'GET', // or 'PUT' depending on how your backend works
                            headers: {
                                'Content-Type': 'application/json',
                                "Authorization": `Bearer ${token}`,
                            },
                            body: JSON.stringify({
                                resume: data.secure_url, // sending the URL to the backend
                            }),
                        }
                    );

                    if (!profileResponse.ok) {
                        throw new Error('Failed to update profile');
                    }

                    const profileData = await profileResponse.json();
                    console.log('Profile updated:', profileData);

                } else {
                    throw new Error('Upload failed');
                }
            } catch (error) {
                console.error('Upload error:', error);
                setUploadStatus('Upload failed. Please try again.');
                setUploadedUrl('');
            } finally {
                setUploading(false);
            }
        };

        const handleFileChange = (e) => {
            const selectedFile = e.target.files[0];
            if (selectedFile && selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                setFile(selectedFile);
                setUploadStatus('');
                setUploadedUrl('');
            } else {
                setFile(null);
                setUploadStatus('Please select a valid DOCX file');
                setUploadedUrl('');
            }
        };

        return (
            <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Upload DOCX File</h2>

                <form onSubmit={uploadFile} className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">
                            Select DOCX File:
                        </label>
                        <input
                            type="file"
                            accept=".docx"
                            onChange={handleFileChange}
                            className="border rounded p-2"
                            disabled={uploading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!file || uploading}
                        className={`w-full py-2 px-4 rounded font-medium ${!file || uploading
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                    >
                        {uploading ? 'Uploading...' : 'Upload to Cloudinary'}
                    </button>

                    {uploadStatus && (
                        <p className={`text-sm ${uploadStatus.includes('successful')
                            ? 'text-green-600'
                            : uploadStatus.includes('Uploading')
                                ? 'text-blue-600'
                                : 'text-red-600'
                            }`}>
                            {uploadStatus}
                        </p>
                    )}

                    {uploadedUrl && (
                        <div className="mt-4">
                            <h3 className="text-sm font-medium mb-2">Uploaded File URL:</h3>
                            <div className="bg-gray-50 p-3 rounded break-all">
                                <a
                                    href={uploadedUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:text-blue-600 text-sm"
                                >
                                    {uploadedUrl}
                                </a>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        );
    };

    export default FileUpload;
