
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector("form");

    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault(); 

 
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value.trim();

   
        if (!name || !email || !phone || !password) {
            alert("Please fill in all fields.");
            return;
        }

        if (!/^\d{10}$/.test(phone)) {
            alert("Phone number must be exactly 10 digits.");
            return;
        }

    
        const data = {
            name: name,
            email: email,
            phone: phone,
            password: password
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/users/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert("Error: " + JSON.stringify(errorData));
                return;
            }

            const result = await response.json();
            alert(`User created successfully! Welcome, ${result.name}`);
       
            window.location.href = "../pages/login.html";

        } catch (err) {
            console.error("Error:", err);
            alert("An unexpected error occurred. Please try again.");
        }
    });
});
