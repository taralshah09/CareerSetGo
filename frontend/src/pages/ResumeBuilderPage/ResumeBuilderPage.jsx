import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './ResumeBuilderPage.css';

const ResumeBuilderPage = () => {
    // Initial resume sections with unique IDs
    const [sections, setSections] = useState([
        { id: '1', title: 'Name', content: 'John Doe' },
        { id: '2', title: 'Job Role', content: 'Software Engineer' },
        { id: '3', title: 'Email', content: 'johndoe@example.com' },
        { id: '4', title: 'Phone', content: '123-456-7890' },
        { id: '5', title: 'Education', content: 'Bachelor of Science in Computer Science' },
        { id: '6', title: 'Experience', content: '3 years at XYZ Corp' },
        { id: '7', title: 'Skills', content: 'JavaScript, React, Node.js' },
    ]);

    // Handler for end of drag event to reorder sections
    const handleDragEnd = (result) => {
        const { source, destination } = result;

        // Ignore if dropped outside the list
        if (!destination) return;

        // Reorder sections array
        const reorderedSections = Array.from(sections);
        const [movedSection] = reorderedSections.splice(source.index, 1);
        reorderedSections.splice(destination.index, 0, movedSection);
        setSections(reorderedSections);
    };

    return (
        <div className="resume-builder">
            <h2>Resume Builder</h2>

            <div className="resume-content">
                {/* Form Section with Drag-and-Drop */}
                <div className="resume-form">
                    <h3>Resume Sections</h3>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="resumeSections">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {sections.map((section, index) => (
                                        <Draggable key={section.id} draggableId={section.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="resume-section"
                                                >
                                                    <label>{section.title}:</label>
                                                    <input
                                                        type="text"
                                                        value={section.content}
                                                        onChange={(e) => {
                                                            const newSections = [...sections];
                                                            newSections[index].content = e.target.value;
                                                            setSections(newSections);
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>

                {/* Preview Section */}
                <div className="resume-preview">
                    <h3>Resume Preview</h3>
                    {sections.map((section) => (
                        <div key={section.id} className="preview-section">
                            <strong>{section.title}:</strong> {section.content}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilderPage;
