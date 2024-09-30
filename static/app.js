document.getElementById("upload-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const fileInput = document.getElementById("file");
    const promptInput = document.getElementById("prompt");

    if (!fileInput.files.length || !promptInput.value) {
        alert("Please provide both a file and a prompt!");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("prompt", promptInput.value);

    // Show the loading spinner and progress bar
    document.getElementById('loading-spinner').style.display = 'block';
    

    try {


        const response = await fetch("/upload", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            const successMessage = document.getElementById("success-message");
            const downloadLink = document.getElementById("download-link");

            successMessage.textContent = "File processed successfully!";
            downloadLink.href = result.file_url;
            downloadLink.style.display = "block";
        } else {
            alert(result.error || "Something went wrong. Please try again.");
        }

        // Hide the spinner and progress bar
        document.getElementById('loading-spinner').style.display = 'none';

         // Show "Process Another Document" button
        document.getElementById('process-another').style.display = 'block';
       

        
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while processing the file.");
        document.getElementById('loading-spinner').style.display = 'none';
        
    }
});

// Reload the page when "Process Another Document" button is clicked
document.getElementById('process-another').addEventListener('click', function() {
window.location.reload(); // Use window.location.reload() for better compatibility
});