import React, { Suspense, useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";

import { db } from "./firebase";

function Projects() {
  const [projects, setProjects] = useState([]);
  console.log('db', db)
  
  useEffect(() => {
    const query = ref(db, "projects");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      console.log('projects')

      if (snapshot.exists()) {
        Object.values(data).map((project) => {
          setProjects((projects) => [...projects, project]);
          console.log('projects: ', projects)
        });
      }
    });
  }, []);

  return (
    <div>
      {projects.map((project, index) => (
        <></>
        // <Project {...project} key={index} />
      ))}
    </div>
  );
}

export default Projects;