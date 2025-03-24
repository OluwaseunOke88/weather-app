import React from "react";

function About() {
    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
            <h1>About This Weather App</h1>
            <p>
                This Weather App is developed by <strong>Oluwaseun Oke</strong> in partial fulfilment of the requirements 
                to participate in the <strong>AI Engineer Internship Program</strong> with PM Accelerator.
            </p>

            <h2>Overview</h2>
            <p>
                The <strong>Product Manager Accelerator Program</strong> is designed to support PM professionals 
                at every stage of their careers. Our program has helped hundreds of students achieve their career goals.
            </p>

            <h2>Programs & Services</h2>
            <ul>
                <li><strong>🚀 PMA Pro:</strong> End-to-end product manager job hunting program with FAANG-level training.</li>
                <li><strong>🚀 AI PM Bootcamp:</strong> Hands-on AI product management training.</li>
                <li><strong>🚀 PMA Power Skills:</strong> Leadership & executive presentation training.</li>
                <li><strong>🚀 PMA Leader:</strong> Career acceleration for senior PMs.</li>
                <li><strong>🚀 1:1 Resume Review:</strong> Expert resume review with an interview guarantee.</li>
            </ul>

            <h2>Free Resources</h2>
            <p>Check out free courses and training on:</p>
            <ul>
                <li><a href="https://www.drnancyli.com/pmresume" target="_blank" rel="noopener noreferrer">🔗 Free PM Resume Template</a></li>
                <li><a href="https://www.youtube.com/c/drnancyli" target="_blank" rel="noopener noreferrer">🔗 YouTube: Dr. Nancy Li</a></li>
                <li><a href="https://www.pmaccelerator.io/" target="_blank" rel="noopener noreferrer">🔗 PM Accelerator Website</a></li>
            </ul>

            <h2>Contact</h2>
            <p><strong>Website:</strong> <a href="https://www.pmaccelerator.io/" target="_blank" rel="noopener noreferrer">www.pmaccelerator.io</a></p>
            <p><strong>Phone:</strong> +1 (954) 889-1063</p>
            <p><strong>Headquarters:</strong> Boston, MA</p>
        </div>
    );
}

export default About;
