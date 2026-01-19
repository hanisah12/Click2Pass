

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form");

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

     
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

     
        if (!email || !password) {
            alert("Please fill in both email and password.");
            return;
        }

     
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                
        
                localStorage.setItem("user_id", data.user_id);
                localStorage.setItem("user_name", data.name);

                alert(`Welcome back, ${data.name}!`);

                window.location.href = "../pages/form.html";
            } else if (response.status === 404) {
                alert("User not found. Please sign up first.");
            } else if (response.status === 401) {
                alert("Incorrect password. Try again.");
            } else {
                alert("Something went wrong. Please try again later.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Unable to connect to server. Check if backend is running.");
        }
    });
});
