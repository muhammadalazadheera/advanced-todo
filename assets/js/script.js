$(document).ready(function () {
    loadBongabdo();
    loadDate();
    loadWeather();
    loadQuote();
})

function loadBongabdo() {
    $('#date-bongabdo').bongabdo({
        showSeason: true,
        format: "DD MM, YY (SS)"
    });
}

function loadDate(){
    const date = new Date();
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;

        $(document).ready(function () {
            let apiUrl = "https://api.aladhan.com/v1/gToH/" + formattedDate;

            $.getJSON(apiUrl, function (response) {
                if (response.code === 200) {
                    let hijri_day = response.data.hijri.day;
                    let hijri_month = response.data.hijri.month.en;
                    let hijri_year = response.data.hijri.year;

                    let day = response.data.gregorian.day;
                    let month = response.data.gregorian.month.en;
                    let year = response.data.gregorian.year;

                    $('#date-gregorian').text(day + ' ' + month + ' ' + year);
                    $('#date-hijri').text(hijri_day + ' ' + hijri_month + ' ' + hijri_year);
                } else {
                    $('#date-display').text("Failed to fetch the date.");
                }
            }).fail(function () {
                $('#date-display').text("Error in fetching data.");
            });
        });
}


function loadWeather() {
    $(document).ready(function () {
        var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=26.10834&lon=88.83409&units=metric&appid=01d9f2d66b5fb9c863aa86b5cb001cd2";

        $.getJSON(apiUrl, function (response) {
            if (response.cod === 200) {
                let description = response.weather[0].description;
                let temperature = response.main.temp;
                let feels_like = response.main.feels_like;
                let humidity = response.main.humidity;
                let icon = response.weather[0].icon;

                let weatherInfo = `
                <table>
                        <tr>
                            <td colspan="2" style="text-align: center;">
                                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather icon"/>
                            </td>
                        </tr>
                        <tr>
                            <td class="value">${description}</td>
                        </tr>
                        <tr>
                            <td class="value">${temperature}°C</td>
                        </tr>
                        <tr>
                            <td class="value">${feels_like}°C (Feels Like)</td>
                        </tr>
                        <tr>
                            <td class="value">${humidity}% (Humidity)</td>
                        </tr>
                    </table>
            `;
                $('#weather-display').html(weatherInfo);
            } else {
                $('#weather-display').text("Failed to fetch weather data.");
            }
        }).fail(function () {
            $('#weather-display').text("Error in fetching data.");
        });
    });
}

function loadQuote() {
    let file = 'assets/quotes.json';
        let random_number = Math.floor((Math.random() * 100) + 1);
        $(document).ready(function () {
            $.getJSON(file, function (response) {
                $('#quote').text(response[random_number].quote)
            })
        })
}
