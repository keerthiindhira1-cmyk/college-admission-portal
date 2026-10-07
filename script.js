



document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // ADMISSION FORM
    // ==============================

    const admissionForm = document.getElementById("admissionForm");

    if (admissionForm) {

        admissionForm.addEventListener("submit", function (event) {

            event.preventDefault();

            // Student Name
            const studentName =
                admissionForm.querySelector(
                    'input[placeholder="Enter your full name"]'
                ).value;

            // Student Email
            const studentEmail =
                admissionForm.querySelector(
                    'input[type="email"]'
                ).value;

            // Course
            const selects =
                admissionForm.querySelectorAll("select");

            const studentCourse = selects[1].value;

            // Existing applications
            let applications =
                JSON.parse(localStorage.getItem("applications")) || [];

            // New application
            
            const studentMarks =
    admissionForm.querySelector(
        'input[placeholder="Enter percentage"]'
    ).value;

const fileInputs =
    admissionForm.querySelectorAll('input[type="file"]');

let documents = [];

fileInputs.forEach(function(fileInput) {
    if (fileInput.files.length > 0) {
        documents.push(fileInput.files[0].name);
    }
});

const newApplication = {
    name: studentName,
    email: studentEmail,
    course: studentCourse,
    marks: studentMarks,
    documents: documents,
    status: "Pending"
};

            // Add application
            applications.push(newApplication);

            // Save applications
            localStorage.setItem(
                "applications",
                JSON.stringify(applications)
            );

            // Remember this student's application
            localStorage.setItem(
                "currentApplicationIndex",
                applications.length - 1
            );

            // Student status
            localStorage.setItem(
                "applicationStatus",
                "Pending"
            );

            alert("Application Submitted Successfully!");

            admissionForm.reset();

            window.location.href = "dashboard.html";
        });
    }


    // ==============================
    // STUDENT DASHBOARD
    // ==============================

    const statusElement =
        document.getElementById("applicationStatus");

    const nameElement =
        document.getElementById("studentName");

    const emailElement =
        document.getElementById("studentEmail");

    const courseElement =
        document.getElementById("selectedCourse");

    const admissionStatusElement =
        document.getElementById("admissionStatus");


    if (nameElement || emailElement || courseElement) {

        let applications =
            JSON.parse(localStorage.getItem("applications")) || [];

        let currentIndex =
            Number(
                localStorage.getItem("currentApplicationIndex")
            );

        const student = applications[currentIndex];

        if (student) {

            if (nameElement) {
                nameElement.textContent = student.name;
            }

            if (emailElement) {
                emailElement.textContent = student.email;
            }

            if (courseElement) {
                courseElement.textContent = student.course;
            }

            if (statusElement) {

                statusElement.textContent =
                    student.status;

                statusElement.className = "";

                if (student.status === "Approved") {
                    statusElement.classList.add("approved");
                }
                else if (student.status === "Rejected") {
                    statusElement.classList.add("rejected");
                }
                else {
                    statusElement.classList.add("pending");
                }
            }

            if (admissionStatusElement) {

                if (student.status === "Approved") {
                    admissionStatusElement.textContent =
                        "Admission Approved";
                }
                else if (student.status === "Rejected") {
                    admissionStatusElement.textContent =
                        "Admission Rejected";
                }
                else {
                    admissionStatusElement.textContent =
                        "Under Review";
                }
            }
        }
    }


    // ==============================
    // REGISTRATION FORM
    // ==============================

    const registrationForm =
        document.getElementById("registrationForm");

    if (registrationForm) {

        registrationForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const passwords =
                    registrationForm.querySelectorAll(
                        'input[type="password"]'
                    );

                if (
                    passwords.length >= 2 &&
                    passwords[0].value !== passwords[1].value
                ) {
                    alert("Passwords do not match!");
                    return;
                }

                alert("Registration Successful!");

                registrationForm.reset();
            }
        );
    }


    // ==============================
    // LOGIN FORM
    // ==============================

    const loginForm =
        document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                alert("Login Successful!");

                loginForm.reset();

                window.location.href = "admission.html";
            }
        );
    }

});


// ==============================
// LOGOUT
// ==============================

function logout() {

    alert("Logged out successfully!");

    window.location.href = "index.html";
}


// ==============================
// ADMIN APPROVE
// ==============================

function approveApplication(index) {

    let applications =
        JSON.parse(localStorage.getItem("applications")) || [];

    if (applications[index]) {

        applications[index].status = "Approved";

        localStorage.setItem(
            "applications",
            JSON.stringify(applications)
        );

        alert("Application Approved Successfully!");

        if (typeof loadApplications === "function") {
            loadApplications();
        }
    }
}


// ==============================
// ADMIN REJECT
// ==============================

function rejectApplication(index) {

    let applications =
        JSON.parse(localStorage.getItem("applications")) || [];

    if (applications[index]) {

        applications[index].status = "Rejected";

        localStorage.setItem(
            "applications",
            JSON.stringify(applications)
        );

        alert("Application Rejected!");

        if (typeof loadApplications === "function") {
            loadApplications();
        }
    }
}


// ==============================
// PASSWORD SHOW / HIDE
// ==============================

function togglePassword() {

    const password =
        document.getElementById("loginPassword");

    if (!password) return;

    if (password.type === "password") {
        password.type = "text";
    }
    else {
        password.type = "password";
    }
}


// ==============================
// FORGOT PASSWORD
// ==============================

function forgotPassword() {

    alert(
        "Password reset link will be sent to your registered email."
    );
}