
        function swapAndOpen(index, url) {
            let boxes = document.querySelectorAll('.difficulty-box');
            let loadingContainer = document.querySelector('.loading-container');

            let originalColors = ['#4CAF50', '#FF9800', '#F44336'];
            let colors = [...originalColors];
            let texts = ['Easy', 'Moderate', 'Hard'];

            if (index === 0) { 
                [colors[0], colors[1]] = [colors[1], colors[0]];
                [texts[0], texts[1]] = [texts[1], texts[0]];
            } 
            else if (index === 2) { 
                [colors[2], colors[1]] = [colors[1], colors[2]];
                [texts[2], texts[1]] = [texts[1], texts[2]];
            }

            boxes.forEach((box, i) => {
                box.style.backgroundColor = colors[i];
                box.textContent = texts[i];
            });

            setTimeout(() => {
                loadingContainer.style.display = 'flex';
                setTimeout(() => {
                    let newTab = window.open(url, '_self');
                    if (newTab) {
                        loadingContainer.style.display = 'none';
                        boxes.forEach((box, i) => {
                            box.style.backgroundColor = originalColors[i];
                            box.textContent = ['Easy', 'Moderate', 'Hard'][i];
                        });
                    }
                }, 1500);
            }, 1000); 
        }
    