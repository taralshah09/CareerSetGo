import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../../utils/fetchWithAuth"; // Ensure this path is correct

const CourseList = () => {
  const [courses, setCourses] = useState([]); // State to hold courses data

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Use fetchWithAuth to fetch data with the access token
        const data = await fetchWithAuth('http://127.0.0.1:8000/api/course/');

        console.log(data);  
        // setCourses(data.courses);  
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []); 

  return (
    <div>
      <h2>Courses</h2>
      <div>
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div key={index}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <a href={course.link} target="_blank" rel="noopener noreferrer">
                Go to {course.type === "video" ? "Video" : "Playlist"}
              </a>
              <img src={course.thumbnail} alt={course.title} width="200" />
            </div>
          ))
        ) : (
          <p>No courses available</p>
        )}
      </div>
    </div>
  );
};

export default CourseList;
