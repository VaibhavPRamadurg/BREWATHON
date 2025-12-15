document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log("Starting application...");
        
        // Check if JSS is loaded
        if (typeof jss === 'undefined' || typeof jssPresetDefault === 'undefined') {
            throw new Error("JSS libraries failed to load. Please check your internet connection.");
        }

        // Handle UMD default export quirks
        const jssLib = jss.default ? jss.default : jss;
        const preset = jssPresetDefault.default ? jssPresetDefault.default : jssPresetDefault;

        // Initialize JSS with default preset
        jssLib.setup(preset());

        // Define the styles with JSS
        const styles = {
            '@global': {
                body: {
                    fontFamily: "'Didact Gothic', sans-serif",
                    backgroundColor: '#1e3c72',
                    backgroundImage: 'linear-gradient(to right, #243B55, #141E30)', // Dark Luxury Blue
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '40px 20px',
                    boxSizing: 'border-box',
                    color: '#ecf0f1', // Light gray text
                    overflowX: 'hidden',
                    position: 'relative'
                }
            },
            // Background - Cyber Grid
            bgGrid: {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '200%',
                height: '200%',
                background: `
                    linear-gradient(rgba(18, 16, 16, 0.9) 0%, rgba(0, 0, 0, 1) 100%),
                    linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, .05) 25%, rgba(0, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, .05) 75%, rgba(0, 255, 255, .05) 76%, transparent 77%, transparent),
                    linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, .05) 25%, rgba(0, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, .05) 75%, rgba(0, 255, 255, .05) 76%, transparent 77%, transparent)
                `,
                backgroundSize: '100px 100px',
                transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
                animation: '$gridMove 20s linear infinite',
                zIndex: '-2',
                pointerEvents: 'none'
            },
            '@keyframes gridMove': {
                '0%': { transform: 'perspective(500px) rotateX(60deg) translateY(0) translateZ(-200px)' },
                '100%': { transform: 'perspective(500px) rotateX(60deg) translateY(100px) translateZ(-200px)' }
            },
            // Ambient Orbs
            orb1: {
                position: 'fixed',
                top: '20%',
                left: '20%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(79, 172, 254, 0.4) 0%, rgba(0,0,0,0) 70%)', 
                borderRadius: '50%',
                zIndex: '-1',
                filter: 'blur(40px)',
                animation: '$pulse 8s infinite alternate'
            },
            orb2: {
                position: 'fixed',
                bottom: '10%',
                right: '10%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(236, 0, 140, 0.3) 0%, rgba(0,0,0,0) 70%)', 
                borderRadius: '50%',
                zIndex: '-1',
                filter: 'blur(50px)',
                animation: '$pulse 10s infinite alternate-reverse'
            },
            container: {
                maxWidth: '1200px',
                width: '100%',
                textAlign: 'center',
                zIndex: 1
            },
            header: {
                marginBottom: '60px',
                animation: '$fadeInDown 1.2s cubic-bezier(0.22, 1, 0.36, 1)'
            },
            title: {
                fontFamily: "'Orbitron', 'Playfair Display', sans-serif", // Futuristic font needed
                fontSize: '4rem',
                color: '#ffffff', 
                marginBottom: '10px',
                fontWeight: '900',
                letterSpacing: '5px',
                textTransform: 'uppercase',
                background: 'linear-gradient(to right, #fff 20%, #89f7fe 40%, #66a6ff 60%, #fff 80%)',
                backgroundSize: '200% auto',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                animation: '$shine 4s linear infinite'
            },
            subtitle: {
                fontSize: '1.3rem',
                color: '#dcdcdc', // Light gray
                fontWeight: '400',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.6'
            },
            grid: {
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)', // Enforce 2 columns
                maxWidth: '800px', // Limit width to keep it compact
                margin: '0 auto', // Center the grid
                gap: '30px',
                padding: '0 20px',
                animation: '$fadeInUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.2s backwards'
            },
            card: {
                backgroundColor: 'rgba(20, 30, 48, 0.6)', 
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '40px 20px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '240px', // Taller for more impact
                position: 'relative',
                overflow: 'hidden',
                '&::before': { // Holographic shine effect
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '50%',
                    height: '100%',
                    background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent)',
                    transform: 'skewX(-25deg)',
                    transition: 'left 0.5s'
                },
                '&:hover': {
                    transform: 'translateY(-10px) scale(1.02)',
                    boxShadow: '0 20px 60px rgba(0, 242, 254, 0.2), inset 0 0 0 1px rgba(0, 242, 254, 0.5)',
                    border: '1px solid rgba(0, 242, 254, 0.6)',
                    '&::before': {
                        left: '150%'
                    }
                }
            },
            cardSelected: {
                 backgroundColor: '#fff !important',
                 backgroundImage: 'linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)',
                 transform: 'scale(1.05)',
                 boxShadow: '0 15px 40px rgba(102, 166, 255, 0.4)',
                 border: 'none',
                 '& $districtName': {
                     color: 'white',
                     textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                 }
            },
            districtName: {
                fontSize: '1.6rem',
                fontWeight: '700',
                color: '#ffffff', // White
                letterSpacing: '1px',
                transition: 'all 0.3s',
                fontFamily: "'Playfair Display', serif",
                textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                zIndex: 2,
                position: 'relative'
            },
            // Animations
            '@keyframes float': {
                '0%': { transform: 'translate(0, 0)' },
                '50%': { transform: 'translate(40px, 40px)' },
                '100%': { transform: 'translate(0, 0)' }
            },
            '@keyframes shine': {
                '0%': { backgroundPosition: '200% center' },
                '100%': { backgroundPosition: '-200% center' }
            },
             '@keyframes pulse': {
                '0%': { transform: 'scale(1)', opacity: 0.5 },
                '100%': { transform: 'scale(1.2)', opacity: 0.8 }
            },
            '@keyframes fadeInDown': {
                from: { opacity: 0, transform: 'translateY(-30px)' },
                to: { opacity: 1, transform: 'translateY(0)' }
            },
            '@keyframes fadeInUp': {
                 from: { opacity: 0, transform: 'translateY(30px)' },
                 to: { opacity: 1, transform: 'translateY(0)' }
            },
            // Did You Know Styles
            factContainer: {
                marginTop: '50px',
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                maxWidth: '600px',
                margin: '50px auto 20px',
                animation: '$fadeInUp 1.5s ease',
                textAlign: 'left'
            },
            factHeader: {
                fontFamily: "'Playfair Display', serif",
                color: '#4facfe',
                fontSize: '1.2rem',
                marginBottom: '10px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            },
            factText: {
                fontSize: '1.1rem',
                lineHeight: '1.6',
                fontStyle: 'italic',
                color: '#ecf0f1'
            }
        };

        // Compile styles
        const sheet = jssLib.createStyleSheet(styles).attach();
        const classes = sheet.classes;

        // Data: 4 Districts of Karnataka
        const districts = [
            {
                name: "Bengaluru",
                image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Vidhana_Soudha_Neo-Dravidian_Legislative_Building_in_Bangalore.jpg"
            },
            {
                name: "Mysuru",
                image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Mysore_Palace_Morning.jpg"
            },
            {
                name: "Udupi",
                image: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Udupi_Sri_Krishna_Matha.jpg"
            },
            {
                name: "Tumakuru",
                image: "https://upload.wikimedia.org/wikipedia/commons/5/52/Devarayanadurga_Bhoganarasimha_temple.jpg"
            }
        ];

        // Did You Know Facts
        const facts = [
            "Japan: Japan is widely considered the cleanest country in the world due to its strict waste disposal laws and cultural emphasis on cleanliness.",
            "Singapore: Singapore is known as the 'Garden City' because 47% of its land is covered in green space.",
            "Curitiba, Brazil: This city recycles 70% of its waste and has one of the best bus reporting systems in the world.",
            "Copenhagen, Denmark: More than 50% of the population commutes by bicycle every day, reducing traffic and pollution.",
            "Surat, India: Once considered dirty, Surat transformed into one of India's cleanest cities through rapid waste management reforms.",
            "Amsterdam, Netherlands: The city is pursuing a 'circular economy' by 2050, aiming to eliminate waste entirely by reusing raw materials.",
            "Kigali, Rwanda: Known as the cleanest city in Africa, Kigali strictly bans plastic bags and has a monthly community cleanup day called 'Umuganda'.",
            "Indore, India: Indore has been titled the cleanest city in India for multiple consecutive years due to its 100% door-to-door garbage collection.",
            "Stockholm, Sweden: Stockholm was the first city to be named the 'European Green Capital' for its commitment to reducing carbon emissions."
        ];

        // App Logic
        const app = document.getElementById('app');
        if (!app) throw new Error("App container not found");
        
        // Clear loading state
        app.innerHTML = '';

        // Create Header
        const header = document.createElement('div');
        header.className = classes.header;
        header.innerHTML = `
            <h1 class="${classes.title}">Select a District</h1>
            <p class="${classes.subtitle}">Identify the location of the issue to help us fix it faster.</p>
        `;

        // Create Grid
        const grid = document.createElement('div');
        grid.className = classes.grid;

        districts.forEach(district => {
            const card = document.createElement('div');
            card.className = classes.card;
            
            // Set Background Image
            card.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url('${district.image}')`;
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';
            
            // Add District Name
            const name = document.createElement('span');
            name.className = classes.districtName;
            name.innerText = district.name;
            card.appendChild(name);

            // 3D Tilt Effect Logic
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
                const rotateY = ((x - centerX) / centerX) * 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(0,0,0,0.3)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                card.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.2)';
            });

            // Click Event
            card.addEventListener('click', () => {
                // Remove selection from others
                Array.from(grid.children).forEach(c => c.classList.remove(classes.cardSelected));
                
                // Add to current
                card.classList.add(classes.cardSelected);

                console.log(`Selected District: ${district.name}`);
                // Redirect to the dashboard
                setTimeout(() => {
                    window.location.href = `third_page.html?district=${encodeURIComponent(district.name)}`;
                }, 300); // Small delay for animation
            });

            grid.appendChild(card);
        });

        // Create Did You Know Section
        const factCard = document.createElement('div');
        factCard.className = classes.factContainer;
        
        // Random Selection
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        // Split fact into title (Country) and desc if possible, or just show text
        const [title, desc] = randomFact.includes(':') ? randomFact.split(':') : ["Did You Know?", randomFact];

        factCard.innerHTML = `
            <div class="${classes.factHeader}">
                <i class="fas fa-lightbulb"></i> DID YOU KNOW?
            </div>
            <div class="${classes.factText}">
                <strong style="color:#89f7fe">${title.trim()}:</strong> ${desc ? desc.trim() : ''}
            </div>
        `;

        // Assemble App
        const container = document.createElement('div');
        container.className = classes.container;
        container.appendChild(header);
        container.appendChild(grid);
        container.appendChild(factCard); // Add Facts at bottom

        // Add background grid and orbs
        const bgGrid = document.createElement('div');
        bgGrid.className = classes.bgGrid;
        const orb1 = document.createElement('div');
        orb1.className = classes.orb1;
        const orb2 = document.createElement('div');
        orb2.className = classes.orb2;
        
        app.appendChild(bgGrid);
        app.appendChild(orb1);
        app.appendChild(orb2);
        app.appendChild(container);
        console.log("App rendered successfully");

    } catch (e) {
        console.error(e);
        const app = document.getElementById('app');
        if (app) app.innerText = "Error: " + e.message;
    }
});
