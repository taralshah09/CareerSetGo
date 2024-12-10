import React, { useState } from 'react';
import Mammoth from 'mammoth';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { pdf } from '@react-pdf/renderer';
import { Document as PDFDocument, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import './WordToCV.css';

// Define PDF styles
const pdfStyles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30
    },
    section: {
        margin: 10,
        padding: 10
    },
    text: {
        fontSize: 12,
        marginBottom: 10
    }
});

// PDF Document Component
const PDFResume = ({ content }) => (
    <PDFDocument>
        <Page size="A4" style={pdfStyles.page}>
            <View style={pdfStyles.section}>
                <Text style={pdfStyles.text}>{content}</Text>
            </View>
        </Page>
    </PDFDocument>
);

const WordToCV = () => {
    const [docContent, setDocContent] = useState('');
    const [docHtml, setDocHtml] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [exportFormat, setExportFormat] = useState('');

    const generateResume = async () => {
        if (!docContent || !jobDescription) {
            setError("Please provide both resume and job description");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const genAI = new GoogleGenerativeAI("AIzaSyD3rn502lgtJKrJNWtfwwSQN6vw96la53U");
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `
                I have a resume and a job description. Please help me tailor my resume to better match this job description.
                Original Resume (with HTML formatting):
                ${docHtml}
                
                Plain text version:
                ${docContent}
    
                Job Description:
                ${jobDescription}
    
                Please provide a tailored version of my resume that:
                1. Highlights relevant experiences and skills that match the job description
                2. Uses keywords from the job description where appropriate
                3. Maintains a professional tone
                4. Preserves all URLs and links from the original resume
                5. Formats the output in markdown, ensuring URLs are properly formatted as [text](url)
                6. Focuses on achievements and quantifiable results
    
                Format the response as a properly formatted markdown document, ensuring all links from the original resume are preserved.
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            const paragraphs = text.split('\n\n');
            const filteredText = paragraphs.slice(0, -1).join('\n\n');

            setOutput(filteredText);
        } catch (error) {
            console.error("Error generating resume:", error);
            setError("Failed to generate resume. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const exportToWord = async () => {
        const doc = new Document({
            sections: [{
                properties: {},
                children: output.split('\n').map(line =>
                    new Paragraph({
                        children: [new TextRun(line)]
                    })
                )
            }]
        });

        Packer.toBlob(doc).then(blob => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'tailored-resume.docx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    };

    const handleExport = () => {
        if (!output) {
            setError("Please generate a resume first before exporting");
            return;
        }

        if (exportFormat === 'word') {
            exportToWord();
        }
        // PDF export is handled by PDFDownloadLink component
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.name.endsWith('.docx')) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const arrayBuffer = e.target.result;

                Promise.all([
                    Mammoth.convertToHtml({ arrayBuffer }),
                    Mammoth.extractRawText({ arrayBuffer })
                ]).then(([htmlResult, textResult]) => {
                    setDocHtml(htmlResult.value);
                    setDocContent(textResult.value);
                }).catch((err) => {
                    console.error('Error reading file:', err);
                    setError('Error reading file. Please try again.');
                });
            };

            reader.readAsArrayBuffer(file);
        } else {
            setError('Please upload a valid .docx file');
        }
    };

    return (
        <div className="cv-container">
            <h1 className="cv-title">Resume Tailoring Tool</h1>

            <div className="upload-section">
                <h2 className="cv-subtitle">Upload Resume</h2>
                <input
                    type="file"
                    accept=".docx"
                    onChange={handleFileUpload}
                    className="file-input"
                />

                <h2 className="cv-subtitle">Job Description</h2>
                <div className="textarea-container">
                    <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="job-description-textarea"
                        placeholder="Type or paste the job description here"
                    />
                </div>

                <button
                    onClick={generateResume}
                    disabled={loading || !docContent || !jobDescription}
                    className={`generate-button ${loading ? 'loading' : ''}`}
                >
                    {loading ? 'Generating...' : 'Generate Tailored Resume'}
                </button>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {output && (
                <div className="output-container">
                    <h2 className="cv-subtitle">Tailored Resume:</h2>
                    <div className="markdown-content">
                        <ReactMarkdown>
                            {output}
                        </ReactMarkdown>
                    </div>

                    <div className="export-section">
                        <h3>Export Options:</h3>
                        <select
                            value={exportFormat}
                            onChange={(e) => setExportFormat(e.target.value)}
                            className="export-select"
                        >
                            <option value="">Select Format</option>
                            <option value="pdf">PDF</option>
                            <option value="word">Word Document</option>
                        </select>

                        {exportFormat === 'pdf' ? (
                            <PDFDownloadLink
                                document={<PDFResume content={output} />}
                                fileName="tailored-resume.pdf"
                                className="export-button"
                            >
                                {({ blob, url, loading, error }) =>
                                    loading ? 'Preparing PDF...' : 'Download PDF'
                                }
                            </PDFDownloadLink>
                        ) : (
                            <button
                                onClick={handleExport}
                                className="export-button"
                                disabled={!exportFormat}
                            >
                                Export Resume
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WordToCV;