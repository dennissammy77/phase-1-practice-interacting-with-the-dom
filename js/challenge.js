document.addEventListener("DOMContentLoaded",()=>{
    const counterElement = document.getElementById("counter");
    const incrementElement = document.getElementById("plus");
    const decrementElement = document.getElementById("minus");
    const likesContainerElement = document.querySelector(".likes");
    const likeElement = document.getElementById("heart");
    const pauseButton = document.getElementById("pause");
    
    const commentForm = document.getElementById("comment-form");
    const commentInput = document.getElementById("comment-input");
    const commentList = document.getElementById("list");

    let count = 0;
    let isPaused = false;
    // update count every second
    let interval = setInterval(()=>{
        count++;
        updateTimer()
    }, 1000);
    // increment || decrement count on click
    incrementElement.addEventListener("click",()=>{
        count++;
        updateTimer()
    });
    decrementElement.addEventListener("click",()=>{
        count--;
        updateTimer()
    });
    function updateTimer(){
        counterElement.innerHTML = count;
    };

    const likeCounts = {}; // Object to store like counts

    function likeNumber(time) {
        if (likeCounts[time]) {
            likeCounts[time]++; // Increment count if it already exists
        } else {
            likeCounts[time] = 1; // Initialize count if first time
        }
        return `${time} has been liked ${likeCounts[time]} ${likeCounts[time] === 1 ? 'time' : 'times'}`;
    }

    likeElement.addEventListener("click",()=>{
        const likeText = likeNumber(count);

        const likeInstanceElement = document.createElement('li');
        likeInstanceElement.textContent = likeText;
        likesContainerElement.appendChild(likeInstanceElement)
    });

    pauseButton.addEventListener("click", () => {
        if (!isPaused) {
            clearInterval(interval);
            pauseButton.textContent = "Resume";
            incrementElement.disabled = true;
            decrementElement.disabled = true;
            likeElement.disabled = true;
        } else {
            pauseButton.textContent = "Pause";
            incrementElement.disabled = false;
            decrementElement.disabled = false;
            likeElement.disabled = false;
            interval = setInterval(()=>{
                count++;
                updateTimer()
            }, 1000);
        }
        isPaused = !isPaused;
    });

    commentForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent page refresh

        let commentText = commentInput.value.trim();

        const commentElement = document.createElement("p");
        commentElement.textContent = commentText;
        commentList.appendChild(commentElement);

        commentInput.value = ""; // Clear input field
    });
})