import React, { useEffect, useState } from "react";
import axios from "axios";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/api/course/', {
          headers: {
            'Authorization': localStorage.getItem('access_token')
              ? `Bearer ${localStorage.getItem('access_token')}`
              : '',
          }
        });
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (isLoading) return <div>Loading courses...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log(courses.courses)
  return (
    <div>
      <h2>Courses</h2>
      <div>
        {courses.map((course, index) => (
          <div key={course.link || index}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <a href={course.link} target="_blank" rel="noopener noreferrer">
              Go to {course.type === "video" ? "Video" : "Playlist"}
            </a>
            <img src={course.thumbnail} alt={course.title} width="200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;