document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("apply-pass-form");

    if (!form) {
        console.error("Form not found!");
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const idProof = document.getElementById("id-proof").value.trim();
        const passType = document.querySelector('input[name="pass_type"]:checked')?.value;
        const validFrom = document.getElementById("valid-from").value;
        const validTill = document.getElementById("valid-till").value;
        const userId = localStorage.getItem("user_id"); 

        if (!idProof || !passType || !validFrom || !validTill) {
            alert("Please fill in all fields.");
            return;
        }

        if (validTill < validFrom) {
            alert("Valid Till cannot be earlier than Valid From.");
            return;
        }

        const payload = {
            user_id: Number(userId),
            id_proof: idProof,
            pass_type: passType,
            valid_from: validFrom,
            valid_till: validTill
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/passes/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                alert("Pass applied successfully!");
                window.location.href = "../pages/success.html";
            } else {
                const errorData = await response.json();
                alert("Error: " + (errorData.detail || "Something went wrong"));
            }
        } catch (err) {
            console.error(err);
            alert("Failed to connect to server. Make sure backend is running.");
        }
    });
});
