document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup JSS
    const jssLib = jss.default ? jss.default : jss;
    const preset = jssPresetDefault.default ? jssPresetDefault.default : jssPresetDefault;
    jssLib.setup(preset());

    // 2. Define Styles (Dark Luxury Theme)
    const styles = {
        '@global': {
            body: {
                fontFamily: "'Didact Gothic', sans-serif",
                backgroundColor: '#1e3c72', // Fallback if images fail
                // backgroundImage: 'linear-gradient(to right, #243B55, #141E30)',
                color: '#ecf0f1',
                margin: 0,
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative'
            }
        },
        backgroundCarousel: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -2,
            overflow: 'hidden',
            backgroundColor: '#1e3c72' // Ensure container is dark
        },
        bgImage: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0,
            transition: 'opacity 1.5s ease-in-out'
        },
        bgImageActive: {
            opacity: 1
        },
        bgOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            background: 'linear-gradient(rgba(15, 32, 39, 0.7), rgba(32, 58, 67, 0.7))', // Darker "Whitish" Fix
            pointerEvents: 'none'
        },
        container: {
            width: '100%',
            maxWidth: '600px',
            padding: '20px',
            boxSizing: 'border-box',
            zIndex: 1
        },
        header: {
            textAlign: 'center',
            marginBottom: '40px',
            animation: 'fadeInDown 0.8s ease',
            position: 'relative' // For absolute positioning of back button
        },
        backBtn: {
            position: 'absolute',
            left: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            padding: '8px 15px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.3s',
            '&:hover': {
                background: 'rgba(255, 255, 255, 0.2)',
                paddingLeft: '10px' // Slide effect
            }
        },
        title: {
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '3rem',
            margin: '0 0 10px 0',
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            textShadow: '0 0 10px rgba(0, 242, 254, 0.8), 0 0 20px rgba(0, 242, 254, 0.4)'
        },
        scoreCard: {
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '30px',
            margin: '20px auto',
            border: '2px solid rgba(0, 242, 254, 0.3)',
            textAlign: 'center',
            boxShadow: '0 0 30px rgba(0, 242, 254, 0.2), inset 0 0 20px rgba(0, 242, 254, 0.1)',
            maxWidth: '300px',
            position: 'relative',
            '&::after': {
                content: '""',
                position: 'absolute',
                top: '-5px', left: '-5px', right: '-5px', bottom: '-5px',
                border: '1px dashed rgba(0, 242, 254, 0.5)',
                borderRadius: '25px',
                pointerEvents: 'none',
                animation: '$spin 20s linear infinite'
            }
        },
        scoreValue: {
            fontSize: '4rem',
            fontWeight: '900',
            color: '#00f2fe',
            fontFamily: "'Orbitron', sans-serif",
            textShadow: '0 0 15px rgba(0, 242, 254, 0.8)',
            display: 'block',
            marginTop: '10px'
        },
        badge: {
            display: 'inline-block',
            padding: '5px 15px',
            borderRadius: '20px',
            marginTop: '10px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontSize: '0.9rem'
        },
        badgeReward: {
            backgroundColor: 'rgba(46, 204, 113, 0.2)',
            color: '#2ecc71',
            border: '1px solid #2ecc71'
        },
        badgePenalty: {
            backgroundColor: 'rgba(231, 76, 60, 0.2)',
            color: '#e74c3c',
            border: '1px solid #e74c3c'
        },
        sectionTitle: {
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.8rem',
            borderBottom: '1px solid rgba(255,255,255,0.2)',
            paddingBottom: '10px',
            marginBottom: '20px'
        },
        formGroup: {
            marginBottom: '20px'
        },
        input: {
            width: '100%',
            padding: '15px',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.3)',
            backgroundColor: 'rgba(255,255,255,0.05)',
            color: '#fff',
            fontSize: '1rem',
            fontFamily: 'inherit',
            boxSizing: 'border-box',
            '&:focus': {
                outline: 'none',
                borderColor: '#4facfe'
            }
        },
        fileInput: {
            display: 'none'
        },
        fileLabel: {
            display: 'block',
            width: '100%',
            padding: '15px',
            textAlign: 'center',
            backgroundColor: 'rgba(79, 172, 254, 0.2)',
            border: '1px dashed #4facfe',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: 'all 0.3s',
            '&:hover': {
                backgroundColor: 'rgba(79, 172, 254, 0.3)'
            }
        },
        btn: {
            width: '100%',
            padding: '15px',
            border: 'none',
            borderRadius: '5px',
            background: 'linear-gradient(90deg, #00f2fe 0%, #4facfe 100%)',
            color: '#000',
            fontSize: '1.2rem',
            fontWeight: '900',
            fontFamily: "'Orbitron', sans-serif",
            letterSpacing: '2px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            marginTop: '15px',
            transition: 'all 0.3s',
            boxShadow: '0 0 20px rgba(0, 242, 254, 0.4)',
            '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 0 40px rgba(0, 242, 254, 0.8)'
            }
        },
        issueList: {
            marginTop: '40px'
        },
        issueCard: {
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '15px',
            padding: '20px',
            marginBottom: '20px',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
        },
        issueImg: {
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '10px'
        },
        issueFooter: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        voteBtn: {
            background: 'none',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            padding: '5px 15px',
            borderRadius: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.3s',
            '&:hover': {
                background: 'rgba(255,255,255,0.1)',
                borderColor: '#4facfe'
            }
        },
        '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' }
        },
        '@keyframes fadeInDown': {
            '0%': { opacity: 0, transform: 'translateY(-30px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        '@keyframes fadeInUp': {
            '0%': { opacity: 0, transform: 'translateY(30px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' }
        }
    };

    const sheet = jssLib.createStyleSheet(styles).attach();
    const classes = sheet.classes;

    // 3. State & Logic
    const urlParams = new URLSearchParams(window.location.search);
    const districtName = urlParams.get('district') || 'Unknown District';
    
    // Background Images Configuration (4 images per district)
    const districtImages = {
        "Bengaluru": [
            "bengaluru_bg.jpg", // User uploaded image
            "https://upload.wikimedia.org/wikipedia/commons/e/e4/Vidhan_Soudha_-_Bangalore.jpg", // Vidhana Soudha
            "https://upload.wikimedia.org/wikipedia/commons/e/e0/Glass_house_in_Lalbagh%2C_Bangalore.JPG", // Lalbagh Glass House
            "https://upload.wikimedia.org/wikipedia/commons/a/a2/Sri_krishna_Math,_Udupi.jpg", 
            "https://upload.wikimedia.org/wikipedia/commons/c/c5/Bangalore_Palace.jpg" // Bangalore Palace
        ],
        "Mysuru": [
            "mysuru_bg.jpg", // User uploaded image
            "https://upload.wikimedia.org/wikipedia/commons/M/My/Mysore_palace_with_night_light_show_1.jpg", // Palace Night
            "https://upload.wikimedia.org/wikipedia/commons/e/e0/St._Philomena%27s_Cathedral%2C_Mysore_-_Apr_2019.jpg", // St Philomena
            "https://upload.wikimedia.org/wikipedia/commons/b/b3/Brindavan_Gardens%2C_Mysore.jpg", // Brindavan Gardens
            "https://commons.wikimedia.org/wiki/Special:FilePath/Nandi_Chamundi_Mysore.jpg" // Chamundi Nandi
        ],
        "Udupi": [
            "udupi_bg.jpg", // User uploaded image
            "https://upload.wikimedia.org/wikipedia/commons/e/e0/Udupi_Sri_Krishna_Matha_Temple.jpg", // Krishna Matha
            "https://upload.wikimedia.org/wikipedia/commons/2/2c/Malpe_Beach%2CUdupi.jpg", // Malpe Beach
            "https://upload.wikimedia.org/wikipedia/commons/b/b2/St._Mary%27s_Island%2C_Udupi.jpg", // St Mary's Island
            "https://upload.wikimedia.org/wikipedia/commons/3/37/Malpe_Beach_Panorama_Udupi.jpg" // Scenic Panorama
        ],
        "Tumakuru": [
            "tumakuru_bg.jpg", // User uploaded image
            "https://upload.wikimedia.org/wikipedia/commons/e/ee/PM_Modi_at_Siddaganga_Mutt.jpg", // Siddaganga Mutt (Entrance/Event) - generic nice view
            "https://upload.wikimedia.org/wikipedia/commons/7/7b/Devarayanadurga_hills%2C_Karnataka%2C_India.jpg", // Devarayanadurga
            "https://upload.wikimedia.org/wikipedia/commons/e/ef/Madhugiri_Fort_top.jpg", // Madhugiri
            "https://upload.wikimedia.org/wikipedia/commons/9/91/Devarayanadurga_hills.jpg" // Scenic Hills
        ]
    };

    // Default images if district not found
    const defaultImages = [
        "https://images.unsplash.com/photo-1532375879-1fec2f8ee6e6?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519307722742-1e712a321262?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1582555563967-df592751cb03?q=80&w=1600&auto=format&fit=crop"
    ];

    const imagesToUse = districtImages[districtName] || defaultImages;

    // Initial State
    const initialState = {
        score: 100,
        issues: []
    };

    // Load from LocalStorage
    const storageKey = `gocivic_${districtName}`;
    let districtData = JSON.parse(localStorage.getItem(storageKey)) || initialState;

    // DOM Elements
    const app = document.getElementById('dashboardApp');
    app.innerHTML = ''; // Clear loading

    // Setup Background
    const carouselHTML = `
        <div class="${classes.backgroundCarousel}">
            ${imagesToUse.map((img, index) => 
                `<img src="${img}" class="${classes.bgImage} ${index === 0 ? classes.bgImageActive : ''}" data-index="${index}">`
            ).join('')}
        </div>
        <div class="${classes.bgOverlay}"></div>
    `;
    
    // Insert carousel at start of body
    document.body.insertAdjacentHTML('afterbegin', carouselHTML);

    // Start Slideshow
    let currentSlide = 0;
    setInterval(() => {
        const slides = document.querySelectorAll(`.${classes.bgImage}`);
        slides[currentSlide].classList.remove(classes.bgImageActive);
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add(classes.bgImageActive);
    }, 5000); // Change every 5 seconds

    // Animation Utility
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + "%";
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Render Function
    function render() {
        // Calculate Score dynamically based on issues
        // Rule: Each issue -5 points.
        const currentScore = Math.max(0, 100 - (districtData.issues.length * 5));
        
        // Determine Badge
        let badgeHTML = '';
        if (currentScore >= 90) {
            badgeHTML = `<span class="${classes.badge} ${classes.badgeReward}"><i class="fas fa-trophy"></i> Reward Eligible: Budget Bonus!</span>`;
        } else if (currentScore <= 40) {
            badgeHTML = `<span class="${classes.badge} ${classes.badgePenalty}"><i class="fas fa-exclamation-triangle"></i> Penalty Warning: High Urgency!</span>`;
        }

        // Sort issues by votes (descending)
        const sortedIssues = [...districtData.issues].sort((a,b) => b.votes - a.votes);

        app.innerHTML = `
            <div class="${classes.container}">
                <header class="${classes.header}">
                    <a href="second_page.html" class="${classes.backBtn}">
                        <i class="fas fa-arrow-left"></i> Back
                    </a>
                    <h1 class="${classes.title}">${districtName}</h1>
                    <div class="${classes.scoreCard}">
                        <div style="font-size:0.9rem; opacity:0.7;">Civil Score</div>
                        <div id="scoreDisplay" class="${classes.scoreValue}" style="color: ${currentScore < 40 ? '#e74c3c' : '#4facfe'}">0%</div>
                        ${badgeHTML}
                    </div>
                </header>

                <section>
                    <h2 class="${classes.sectionTitle}">Report Issue</h2>
                    <div class="${classes.formGroup}">
                        <label class="${classes.fileLabel}">
                            <i class="fas fa-camera"></i> Tap to Snap Photo
                            <input type="file" accept="image/*" capture="environment" id="cameraInput" class="${classes.fileInput}">
                        </label>
                        <div id="previewArea" style="margin-top:10px; display:none;">
                            <img id="imgPreview" style="width:100%; border-radius:10px;">
                        </div>
                    </div>
                    <div class="${classes.formGroup}">
                        <input type="text" id="locationInput" class="${classes.input}" placeholder="Enter specific location/landmark...">
                    </div>
                    <div class="${classes.formGroup}">
                        <textarea id="commentInput" class="${classes.input}" style="min-height: 80px; resize: vertical; font-family: inherit;" placeholder="Describe the severity (e.g., 'Deep pothole, dangerous for bikers')..."></textarea>
                    </div>
                    <button id="submitBtn" class="${classes.btn}">Post Issue</button>
                </section>

                <section class="${classes.issueList}">
                    <h2 class="${classes.sectionTitle}">Community Reports</h2>
                    ${sortedIssues.length === 0 ? '<p style="text-align:center; opacity:0.6;">No issues reported yet. Good job!</p>' : ''}
                    <div id="issuesContainer"></div>
                </section>
            </div>
        `;

        // Animate Score
        const scoreElement = document.getElementById('scoreDisplay');
        animateValue(scoreElement, 0, currentScore, 1000);

        // Render Issue Cards with Staggered Animation
        const issuesContainer = document.getElementById('issuesContainer');
        sortedIssues.forEach((issue, index) => {
            const card = document.createElement('div');
            card.className = classes.issueCard;
            // Add slide-in animation style dynamically
            card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
            card.style.opacity = '0'; // Start hidden for animation
            
            card.innerHTML = `
                <img src="${issue.image}" class="${classes.issueImg}" alt="Issue">
                <div>
                    <div style="font-weight:bold; font-size:1.1rem;">${issue.location}</div>
                    ${issue.comment ? `<div style="font-size:0.95rem; margin-top:5px; color:#ddd; font-style:italic;">"${issue.comment}"</div>` : ''}
                    <div style="font-size:0.8rem; opacity:0.6; margin-top:5px;">Reported on ${new Date(issue.timestamp).toLocaleDateString()}</div>
                </div>
                <div class="${classes.issueFooter}">
                    <button class="${classes.voteBtn}" onclick="window.vote('${issue.id}')">
                        <i class="fas fa-thumbs-up"></i> +${issue.votes} Priority
                    </button>
                    ${currentScore <= 40 ? '<span style="color:#e74c3c; font-size:0.8rem;">High Priority</span>' : ''}
                </div>
            `;
            issuesContainer.appendChild(card);
        });

        // Event Listeners
        document.getElementById('cameraInput').addEventListener('change', handleImageUpload);
        document.getElementById('submitBtn').addEventListener('click', handleSubmit);
    }

    // Handlers
    let currentImage = null;

    function handleImageUpload(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                currentImage = event.target.result;
                const preview = document.getElementById('imgPreview');
                preview.src = currentImage;
                document.getElementById('previewArea').style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    }

    function handleSubmit() {
        const locationInput = document.getElementById('locationInput');
        const location = locationInput.value.trim();
        const commentInput = document.getElementById('commentInput');
        const comment = commentInput.value.trim();
        
        if (!location || !currentImage) {
            alert("Please take a photo and enter a location.");
            return;
        }

        // Check for duplicates (Case-insensitive check)
        const existingIssue = districtData.issues.find(issue => 
            issue.location.toLowerCase() === location.toLowerCase()
        );

        if (existingIssue) {
            // Auto-upvote logic
            window.vote(existingIssue.id);
            alert(`Similar issue found at '${location}'. We have upvoted the existing report instead of creating a duplicate!`);
            
            // Clear inputs
            locationInput.value = '';
            commentInput.value = '';
            currentImage = null;
            document.getElementById('previewArea').style.display = 'none';
            return;
        }

        const newIssue = {
            id: Date.now().toString(),
            location: location,
            comment: comment,
            image: currentImage,
            votes: 0,
            timestamp: Date.now()
        };

        districtData.issues.push(newIssue);
        saveData();
        render(); // Re-render to show new issue and update score
        
        // Clear inputs on success
        locationInput.value = '';
        commentInput.value = '';
        currentImage = null;
        document.getElementById('previewArea').style.display = 'none';
    }

    // Global Vote Function
    window.vote = function(id) {
        const issue = districtData.issues.find(i => i.id === id);
        if (issue) {
            issue.votes += 1;
            saveData();
            render();
        }
    };

    function saveData() {
        localStorage.setItem(storageKey, JSON.stringify(districtData));
    }

    // Initial Render
    render();
});
