// Firebase configuration and contact form functionality
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js"; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Contact form functionality
const contactBtn = document.getElementById('contactBtn');
const nameLabel = document.getElementById('clientName');
const emailLabel = document.getElementById('clientEmail');
const messageLabel = document.getElementById('messageTextarea');
const contactForm = document.getElementById('contactForm');


if (contactBtn) {
    contactBtn.addEventListener('click', async()=>{
        if (!nameLabel.value || !emailLabel.value || !messageLabel.value) {
            alert("Please fill all the fields before submitting.")
        }
        else{
        try{
            const docRef = await addDoc(collection(db,"Inquires"),{
                Name: nameLabel.value,
                Email: emailLabel.value,
                Message: messageLabel.value
            });
            console.log("Enquire add it with ID ",docRef.id);
            alert("Thank you for your message! I'll get back to you within 24 hours.")
            contactForm.reset();
        }catch(error){
            console.error("Error saving the enquire ", error);
            alert("Sorry, there was an issue sending your message. Please try again or contact me directly at jguardoruiz@gmail.com")
        }
    }
    });

    
}

// Auto-expand textarea functionality
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('messageTextarea');
    
    if (textarea) {
        // Function to auto-resize textarea
        function autoResize() {
            // Reset height to auto to get the correct scrollHeight
            textarea.style.height = 'auto';
            // Set height to scrollHeight to fit content
            textarea.style.height = Math.max(50, textarea.scrollHeight) + 'px';
        }
        
        // Auto-resize on input
        textarea.addEventListener('input', autoResize);
        
        // Auto-resize on focus (in case content was pre-filled)
        textarea.addEventListener('focus', autoResize);
        
        // Initial resize
        autoResize();
    }
});

// Social media link handlers
const gitHubBtn = document.getElementById('gitHubSeb');
const linkedInBtn = document.getElementById('linkedInSeb');

if (gitHubBtn) {
    gitHubBtn.addEventListener('click',()=>{
        window.open('https://github.com/Jguardo03', '_blank');
    });
}

if (linkedInBtn) {
    linkedInBtn.addEventListener('click',()=>{
        window.open('https://www.linkedin.com/in/juan-sebastian-guardo-ruiz/', '_blank');
    });
}

// Footer social media link handlers
const gitHubBtnF = document.getElementById('gitHubSebF');
const linkedInBtnF = document.getElementById('linkedInSebF');

if (gitHubBtnF) {
    gitHubBtnF.addEventListener('click',()=>{
        window.open('https://github.com/Jguardo03', '_blank');
    });
}

if (linkedInBtnF) {
    linkedInBtnF.addEventListener('click',()=>{
        window.open('https://www.linkedin.com/in/juan-sebastian-guardo-ruiz/', '_blank');
    });
}

// Firebase Projects Functionality
// Function to fetch projects from Firebase
async function fetchProjects() {
    try {
        console.log("Fetching projects from Firebase...");
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projects = [];
        
        querySnapshot.forEach((doc) => {
            projects.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        console.log("✅ Projects fetched:", projects);
        return projects;
    } catch (error) {
        console.error("❌ Error fetching projects:", error);
        return [];
    }
}

// Function to fetch featured projects (first 3 projects)
async function fetchFeaturedProjects() {
    try {
        console.log("Fetching featured projects from Firebase...");
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projects = [];
        
        querySnapshot.forEach((doc) => {
            projects.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        // Return only the first 3 projects for featured section
        return projects.slice(0, 3);
    } catch (error) {
        console.error("❌ Error fetching featured projects:", error);
        return [];
    }
}

// Function to create a project card element
function createProjectCard(project) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card card-projects';
    cardDiv.id = `project-${project.id}`;
    
    // Create image container div
    const imgContainer = document.createElement('div');
    imgContainer.style.width = '100%';
    imgContainer.style.height = '220px';
    imgContainer.style.overflow = 'hidden';
    imgContainer.style.border = 'none';
    imgContainer.style.borderRadius = '8px 8px 0 0';
    imgContainer.style.display = 'block';
    
    // Create image element
    const img = document.createElement('img');
    img.src = project.ProjectImage || 'placeholder-image.jpg';
    img.alt = project.ProjectName || 'Project';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.display = 'block';
    
    // Add image to container
    imgContainer.appendChild(img);
    
    // Create technologies container
    const techContainer = document.createElement('div');
    techContainer.style.display = 'flex';
    techContainer.style.gap = '0.25rem';
    
    // Add technology tags
    const technologies = [
        project.Language1,
        project.Language2,
        project.Language3
    ].filter(tech => tech); // Remove empty values
    
    technologies.forEach(tech => {
        const techTag = document.createElement('p');
        techTag.className = 'xs-tool';
        techTag.textContent = tech;
        techContainer.appendChild(techTag);
    });
    
    // Create title
    const title = document.createElement('h3');
    title.textContent = project.ProjectName || 'Untitled Project';
    
    // Create description
    const description = document.createElement('p');
    description.textContent = project.ProjectDescription || 'No description available';
    
    // Create GitHub icon
    const githubIcon = document.createElement('i');
    githubIcon.className = 'fa-brands fa-github';
    githubIcon.style.cursor = 'pointer';
    githubIcon.style.fontSize = '1.5rem';
    
    // Add click event to GitHub icon
    githubIcon.addEventListener('click', () => {
        if (project.GitHubURL) {
            window.open(project.GitHubURL, '_blank');
        } else {
            console.log('GitHub URL not available for this project');
        }
    });
    
    // Append all elements to card
    cardDiv.appendChild(imgContainer);
    cardDiv.appendChild(techContainer);
    cardDiv.appendChild(title);
    cardDiv.appendChild(description);
    cardDiv.appendChild(githubIcon);
    
    return cardDiv;
}

// Function to create a featured project card element
function createFeaturedProjectCard(project) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card project-card-main';
    cardDiv.id = `featured-project-${project.id}`;
    
    // Create image container div
    const imgContainer = document.createElement('div');
    imgContainer.style.width = '100%';
    imgContainer.style.height = '280px';
    imgContainer.style.overflow = 'hidden';
    imgContainer.style.border = 'none';
    imgContainer.style.borderRadius = '8px 8px 0 0';
    imgContainer.style.display = 'block';
    
    // Create image element
    const img = document.createElement('img');
    img.src = project.ProjectImage || 'Resources/photo-1557821552-17105176677c.avif';
    img.alt = project.ProjectName || 'Project';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.display = 'block';
    
    // Add image to container
    imgContainer.appendChild(img);
    
    // Create content container
    const contentDiv = document.createElement('div');
    contentDiv.className = "project-description"
    
    // Create technologies container
    const techContainer = document.createElement('div');
    techContainer.style.display = 'flex';
    techContainer.style.gap = '0.25rem';
    
    // Add technology tags
    const technologies = [
        project.Language1,
        project.Language2,
        project.Language3
    ].filter(tech => tech); // Remove empty values
    
    technologies.forEach(tech => {
        const techTag = document.createElement('p');
        techTag.className = 'xs-tool';
        techTag.textContent = tech;
        techContainer.appendChild(techTag);
    });
    
    // Create title
    const title = document.createElement('h2');
    title.textContent = project.ProjectName || 'Untitled Project';
    
    // Create description
    const description = document.createElement('p');
    description.textContent = project.ProjectDescription || 'No description available';
    
    // Create GitHub icon
    const githubIcon = document.createElement('i');
    githubIcon.className = 'fa-brands fa-github';
    githubIcon.style.cursor = 'pointer';
    githubIcon.style.fontSize = '1.5rem';
    
    // Add click event to GitHub icon
    githubIcon.addEventListener('click', () => {
        if (project.GitHubURL) {
            window.open(project.GitHubURL, '_blank');
        } else {
            console.log('GitHub URL not available for this project');
        }
    });
    
    // Append all elements to content container
    contentDiv.appendChild(techContainer);
    contentDiv.appendChild(title);
    contentDiv.appendChild(description);
    contentDiv.appendChild(githubIcon);
    
    // Append image container and content to card
    cardDiv.appendChild(imgContainer);
    cardDiv.appendChild(contentDiv);
    
    return cardDiv;
}

// Function to render all projects
async function renderProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    
    if (!projectsContainer) {
        console.error("Projects container not found!");
        return;
    }
    
    // Clear existing content
    projectsContainer.innerHTML = '';
    
    // Show loading state
    const loadingDiv = document.createElement('div');
    loadingDiv.innerHTML = '<p>Loading projects...</p>';
    projectsContainer.appendChild(loadingDiv);
    
    try {
        // Fetch projects from Firebase
        const projects = await fetchProjects();
        
        // Clear loading state
        projectsContainer.innerHTML = '';
        
        if (projects.length === 0) {
            // Show message if no projects found
            const noProjectsDiv = document.createElement('div');
            noProjectsDiv.innerHTML = '<p>No projects found. Add some projects to your Firebase database!</p>';
            noProjectsDiv.style.gridColumn = '1 / -1';
            noProjectsDiv.style.textAlign = 'center';
            noProjectsDiv.style.padding = '2rem';
            projectsContainer.appendChild(noProjectsDiv);
            return;
        }
        
        // Create and append project cards
        projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsContainer.appendChild(projectCard);
        });
        
        console.log(`✅ Rendered ${projects.length} project cards`);
        
    } catch (error) {
        console.error("❌ Error rendering projects:", error);
        projectsContainer.innerHTML = '<p>Error loading projects. Please try again later.</p>';
    }
}

// Function to render featured projects
async function renderFeaturedProjects() {
    const featuredContainer = document.getElementById('featuredProjectsContainer');
    
    if (!featuredContainer) {
        console.error("Featured projects container not found!");
        return;
    }
    
    // Show loading state
    featuredContainer.innerHTML = '<p>Loading featured projects...</p>';
    
    try {
        // Fetch featured projects from Firebase
        const projects = await fetchFeaturedProjects();
        
        // Clear loading state
        featuredContainer.innerHTML = '';
        
        if (projects.length === 0) {
            // Show message if no projects found
            const noProjectsDiv = document.createElement('div');
            noProjectsDiv.innerHTML = '<p>No featured projects available at the moment.</p>';
            noProjectsDiv.style.textAlign = 'center';
            noProjectsDiv.style.padding = '2rem';
            featuredContainer.appendChild(noProjectsDiv);
            return;
        }
        
        // Create and append featured project cards
        projects.forEach(project => {
            const projectCard = createFeaturedProjectCard(project);
            featuredContainer.appendChild(projectCard);
        });
        
        console.log(`✅ Rendered ${projects.length} featured project cards`);
        
    } catch (error) {
        console.error("❌ Error rendering featured projects:", error);
        featuredContainer.innerHTML = '<p>Error loading featured projects. Please try again later.</p>';
    }
}

// Mobile Menu JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // Toggle hamburger icon
            const icon = mobileMenuToggle.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
});

// Initialize page-specific functionality based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    console.log("DOM loaded, initializing Firebase and page-specific functionality...");
    
    // Initialize Firebase and render content based on current page
    if (currentPage === 'index.html' || currentPage === '') {
        renderFeaturedProjects();
    } else if (currentPage === 'projects.html') {
        renderProjects();
    }
});