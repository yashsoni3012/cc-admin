import React from 'react';

function Courses() {
  const courses = [
    { id: 1, title: 'Web Development', desc: 'Learn HTML, CSS, and JS.', img: 'https://via.placeholder.com/300x200?text=Course+1' },
    { id: 2, title: 'Data Science', desc: 'Master Python and analytics.', img: 'https://via.placeholder.com/300x200?text=Course+2' },
    { id: 3, title: 'Graphic Design', desc: 'Create stunning visuals.', img: 'https://via.placeholder.com/300x200?text=Course+3' },
  ];

  return (
    <section id="courses" className="courses">
      <div className="container">
        <h2>Popular Courses</h2>
        <div className="course-grid">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <img src={course.img} alt={course.title} />
              <h3>{course.title}</h3>
              <p>{course.desc}</p>
              <a href="#" className="btn">Enroll Now</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Courses;