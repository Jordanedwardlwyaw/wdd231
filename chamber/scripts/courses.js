const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 2, subject: "wdd", completed: true },
  { code: "CSE110", name: "Programming Basics", credits: 2, subject: "cse", completed: true },
  { code: "WDD231", name: "Web Frontend Development I", credits: 2, subject: "wdd", completed: false },
  { code: "CSE111", name: "Programming with Functions", credits: 2, subject: "cse", completed: false },
];

const grid = document.querySelector("#courseGrid");
const totalCredits = document.querySelector("#creditTotal");
const filterButtons = document.querySelectorAll(".filter");

function displayCourses(list) {
  grid.innerHTML = "";
  list.forEach(course => {
    const div = document.createElement("div");
    div.classList.add("course-card");
    if (course.completed) div.classList.add("completed");
    div.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p><strong>${course.credits}</strong> credits</p>
    `;
    grid.appendChild(div);
  });

  const total = list.reduce((sum, course) => sum + course.credits, 0);
  totalCredits.textContent = total;
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    const filteredCourses =
      filter === "all" ? courses : courses.filter(c => c.subject === filter);
    displayCourses(filteredCourses);
  });
});

displayCourses(courses);
