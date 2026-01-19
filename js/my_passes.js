document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector(".my-passes-section");

    if (!container) {
        console.error("Container for passes not found!");
        return;
    }


    const userId = localStorage.getItem("user_id");
    if (!userId) {
        alert("Please login first.");
        window.location.href = "../pages/login.html";
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:8000/passes/");
        if (!response.ok) {
            throw new Error("Failed to fetch passes from server");
        }

        const passes = await response.json();

        const userPasses = passes.filter(p => p.user_id === parseInt(userId));

   
        container.innerHTML = '<h2 class="section-title">My Active Passes</h2>';

        if (userPasses.length === 0) {
            container.innerHTML += `<p>No active passes found. Apply for a pass first.</p>`;
            return;
        }

        userPasses.forEach(p => {
            const ticketHTML = `
            <div class="ticket-card">
                <div class="ticket-main">
                    <h3>${p.pass_type === "1000" ? "Monthly Pass" : "Premium Pass"} (₹${p.pass_type})</h3>
                    <div class="details">
                        <div>
                            <p>Valid From</p>
                            <strong>${new Date(p.valid_from).toLocaleDateString()}</strong>
                        </div>
                        <div>
                            <p>Valid Until</p>
                            <strong>${new Date(p.valid_till).toLocaleDateString()}</strong>
                        </div>
                    </div>
                    <div class="ticket-actions">
                        <a href="renew-pass.html?pass_id=${p.pass_id}" class="btn-renew">
                            Renew Now
                        </a>
                    </div>
                </div>
            </div>
            `;
            container.innerHTML += ticketHTML;
        });

    } catch (error) {
        console.error("Error fetching passes:", error);
        container.innerHTML += `<p>Failed to load passes. Try again later.</p>`;
    }
});
