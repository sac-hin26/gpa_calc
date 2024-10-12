(function() {
  let boxCount = 0;

  // Function to add a new subject-box
  const addSubjectBox = () => {
    boxCount++;
    const container = document.getElementById("container");
    const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = `
      <p class="box-content">Subject ${boxCount}</p>
      <select class="box-content" required>
        <option value="">Grade</option>
        <option value="10">O</option>
        <option value="9">A+</option>
        <option value="8">A</option>
        <option value="7">B+</option>
        <option value="6">B</option>
        <option value="5">C</option>
      </select>
      <select class="box-content" required>
        <option value="">Credit</option>
        <option value="7">7</option>
        <option value="6">6</option>
        <option value="5">5</option>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
      </select>
      <button class="remove-button">&#x2715;</button>
    `;
    
    container.appendChild(box);

    // Remove subject-box on click
    const removeButton = box.querySelector(".remove-button");
    removeButton.addEventListener("click", () => {
      container.removeChild(box);
      boxCount--;
    });
  };

  // Function to calculate GPA and display it in a new window
  const calculateGPA = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    document.querySelectorAll(".box").forEach(box => {
      const grade = parseInt(box.querySelector("select:nth-of-type(1)").value);
      const credit = parseInt(box.querySelector("select:nth-of-type(2)").value);

      if (grade && credit) {
        totalGradePoints += grade * credit;
        totalCredits += credit;
      }
    });

    if (totalCredits > 0) {
      const gpa = (totalGradePoints / totalCredits).toFixed(2);

      // Open a new window and write the result into it
      const resultWindow = window.open("", "", "width=400,height=300");

      // Write the HTML and style in the new window
      resultWindow.document.write(`
        <html>
        <head>
          <style>
            body {
              background-color: #ff4454; /* Same light red background */
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              font-family: 'Poppins', sans-serif;
            }
            h1 {
              font-size: 4rem;
              color: black;
              font-weight: bold;
              text-align: center;
            }
          </style>
          <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
        </head>
        <body>
          <h1>Your GPA is: <strong>${gpa}</strong></h1>
        </body>
        </html>
      `);
      resultWindow.document.close(); // Close the document writing process
    } else {
      alert("Please fill in all grade and credit values.");
    }
  };

  // Add the first subject box on load
  addSubjectBox();

  // Add subject box on button click
  document.querySelector(".add-button").addEventListener("click", addSubjectBox);

  // Calculate GPA on button click
  document.querySelector(".calculate-button").addEventListener("click", calculateGPA);
})();
