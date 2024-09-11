document.addEventListener('DOMContentLoaded', function() {
    var targetDate = new Date("April 14, 2025 00:00:00").getTime();
    var prevValues = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    var countdown = setInterval(function() {
        var now = new Date().getTime();
        var timeRemaining = targetDate - now;

        var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        updateValueWithFade("days", days);
        updateValueWithFade("hours", hours);
        updateValueWithFade("minutes", minutes);
        updateValueWithFade("seconds", seconds);

        if (timeRemaining < 0) {
            clearInterval(countdown);
            document.getElementById("countdown").innerHTML = "EXPIRED";
        }
    }, 1000);

    function updateValueWithFade(unit, value) {
        if (prevValues[unit] !== value) {
            var element = document.getElementById(unit);

            // Fade out current value
            element.classList.add("fade-out");

            setTimeout(function() {
                // Update value and fade in
                element.innerHTML = value;
                element.classList.remove("fade-out");
                element.classList.add("fade-in");

                setTimeout(function() {
                    element.classList.remove("fade-in");
                }, 300); // Remove fade-in class after animation completes
            }, 300); // Wait for fade-out to complete
        }
        prevValues[unit] = value;
    }
});
