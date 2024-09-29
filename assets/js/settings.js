$(document).ready(function(){

    let settings;

    settings = JSON.parse(localStorage.getItem('settings'));

    if (!settings) {
        // Initialize default settings if none exist in localStorage
        settings = {
            name: 'Guest',
            weather: true,
            bdate: true,
            gdate: true,
            hdate: true,
            countdown: true,
            quotes: true,
            darkMode: false
        };
        localStorage.setItem('settings', JSON.stringify(settings));
        $('#name-input').val('Guest');
        $('#name').html('Guest');
    } else {
        $('#name-input').val(settings.name);
        $('#name').html(settings.name);
    }

    let weatherSwitch = $('#weather-toggle');
    let bdateSwitch = $('#bdate-toggle');
    let gdateSwitch = $('#gdate-toggle');
    let hdateSwitch = $('#hdate-toggle');
    let cdSwitch = $('#cd-toggle');
    let qSwitch = $('#q-toggle');
    let rSwitch = $('#r-toggle');

    let weatherContainer = $('#weather-display');
    let countDownContainer = $('#count-down-wrapper');
    let qouteContainer = $('#quote');
    let bdateContainer = $('#date-bongabdo');
    let gdateContainer = $('#date-gregorian');
    let hdateContainer = $('#date-hijri')


    if(settings.weather == true) {
        weatherSwitch.prop('checked', false);
        weatherContainer.show();
    }else{
        weatherSwitch.prop('checked', true);
        weatherContainer.hide();
    }

    if(settings.bdate == true) {
        bdateSwitch.prop('checked', false);
        bdateContainer.show();
    }else{
        bdateSwitch.prop('checked', true);
        bdateContainer.hide();
    }
    
    if(settings.gdate == true) {
        gdateSwitch.prop('checked', false);
        gdateContainer.show();
    }else{
        gdateSwitch.prop('checked', true);
        gdateContainer.hide();
    }

    if(settings.hdate == true) {
        hdateSwitch.prop('checked', false);
        hdateContainer.show();
    }else{
        hdateSwitch.prop('checked', true);
        hdateContainer.hide();
    }

    if(settings.countdown == true) {
        cdSwitch.prop('checked', false);
        countDownContainer.show();
    }else{
        cdSwitch.prop('checked', true);
        countDownContainer.hide();
    }

    if(settings.quotes == true) {
        qSwitch.prop('checked', false);
        qouteContainer.show()
    }else{
        qSwitch.prop('checked', true);
        qouteContainer.hide();
    }

    if(settings.darkMode == true) {
        rSwitch.prop('checked', false);
    }else{
        rSwitch.prop('checked', true);
    }

});

/////////////////////////

const channel = new BroadcastChannel('page-refresh');

channel.onmessage = (event) => {
    if (event.data === 'refresh') {
        location.reload();
    }
};


function updateName() {
    let name = $('#name-input').val();
    let settings = JSON.parse(localStorage.getItem('settings'));
    if (settings) {  // Ensure settings exist in localStorage
        let updatedSettings = {
            name: name,
            weather: settings.weather,
            bdate: settings.bdate,
            gdate: settings.gdate,
            hdate: settings.hdate,
            countdown: settings.countdown,
            quotes: settings.quotes,
            darkMode: settings.darkMode
        }
        localStorage.setItem('settings', JSON.stringify(updatedSettings));
        let updatedName = $('#name');
        updatedName.html(name);
    } else {
        console.error('No settings found in localStorage');
    }
}


function updateWeather() {
    let settings = JSON.parse(localStorage.getItem('settings'));
    let updateSettigns;
    let weatherBtn = $('#weather-toggle');
    if(settings.weather == true) {
        updateSettigns = {
            name: settings.name,
            weather: false,
            bdate: settings.bdate,
            gdate: settings.gdate,
            hdate: settings.hdate,
            countdown: settings.countdown,
            quotes: settings.quotes,
            darkMode: settings.darkMode
        }
    }else{
        updateSettigns = {
            name: settings.name,
            weather: true,
            bdate: settings.bdate,
            gdate: settings.gdate,
            hdate: settings.hdate,
            countdown: settings.countdown,
            quotes: settings.quotes,
            darkMode: settings.darkMode
        }
    }
    
    settings = localStorage.setItem('settings', JSON.stringify(updateSettigns));
}


function updateBDate() {
    let settings = JSON.parse(localStorage.getItem('settings'));
    let updateSettigns;
    if(settings.bdate == true) {
        updateSettigns = {
            name: settings.name,
            weather: settings.weather,
            bdate: false,
            gdate: settings.gdate,
            hdate: settings.hdate,
            countdown: settings.countdown,
            quotes: settings.quotes,
            darkMode: settings.darkMode
        }
    }else{
        updateSettigns = {
            name: settings.name,
            weather: settings.weather,
            bdate: true,
            gdate: settings.gdate,
            hdate: settings.hdate,
            countdown: settings.countdown,
            quotes: settings.quotes,
            darkMode: settings.darkMode
        }
    }
    
    settings = localStorage.setItem('settings', JSON.stringify(updateSettigns));
}

function updateGDate() {
    let settings = JSON.parse(localStorage.getItem('settings'));
    let updateSettigns;
    if(settings.gdate == true) {
        updateSettigns = {
            name: settings.name,
            weather: settings.weather,
            bdate: settings.bdate,
            gdate: false,
            hdate: settings.hdate,
            countdown: settings.countdown,
            quotes: settings.quotes,
            darkMode: settings.darkMode
        }
    }else{
        updateSettigns = {
            name: settings.name,
            weather: settings.weather,
            bdate: settings.bdate,
            gdate: true,
            hdate: settings.hdate,
            countdown: settings.countdown,
            quotes: settings.quotes,
            darkMode: settings.darkMode
        }
    }
    
    settings = localStorage.setItem('settings', JSON.stringify(updateSettigns));
}

function updateHDate() {
    let settings = JSON.parse(localStorage.getItem('settings'));
    let updateSettigns;
    if(settings.hdate == true) {
        updateSettigns = {
            name: settings.name,
            weather: settings.weather,
            bdate: settings.bdate,
            gdate: settings.gdate,
            hdate: false,
            countdown: settings.countdown,
            quotes: settings.quotes,
            darkMode: settings.darkMode
        }
    }else{
        updateSettigns = {
            name: settings.name,
            weather: settings.weather,
            bdate: settings.bdate,
            gdate: settings.gdate,
            hdate: true,
            countdown: settings.countdown,
            quotes: settings.quotes,
            darkMode: settings.darkMode
        }
    }
    
    settings = localStorage.setItem('settings', JSON.stringify(updateSettigns));
}

function updateCD() {
    let settings = JSON.parse(localStorage.getItem('settings'));
    let updateSettigns;
    if(settings.countdown == true) {
        updateSettigns = {
            name: settings.name,
            weather: settings.weather,
            bdate: settings.bdate,
            gdate: settings.gdate,
            hdate: settings.hdate,
            countdown: false,
            quotes: settings.quotes,
            darkMode: settings.darkMode
        }
    }else{
        updateSettigns = {
            name: settings.name,
            weather: settings.weather,
            bdate: settings.bdate,
            gdate: settings.gdate,
            hdate: settings.hdate,
            countdown: true,
            quotes: settings.quotes,
            darkMode: settings.darkMode
        }
    }
    
    settings = localStorage.setItem('settings', JSON.stringify(updateSettigns));
}

function updateQuotes() {
    let settings = JSON.parse(localStorage.getItem('settings'));
    let updateSettigns;
    if(settings.quotes == true) {
        updateSettigns = {
            name: settings.name,
            weather: settings.weather,
            bdate: settings.bdate,
            gdate: settings.gdate,
            hdate: settings.hdate,
            countdown: settings.countdown,
            quotes: false,
            darkMode: settings.darkMode
        }
    }else{
        updateSettigns = {
            name: settings.name,
            weather: settings.weather,
            bdate: settings.bdate,
            gdate: settings.gdate,
            hdate: settings.hdate,
            countdown: settings.countdown,
            quotes: true,
            darkMode: settings.darkMode
        }
    }
    
    settings = localStorage.setItem('settings', JSON.stringify(updateSettigns));
}

function updateDarkMode() {
    let settings = JSON.parse(localStorage.getItem('settings'));
        let readingMode = $('#rmode');
        let updateSettigns;
    if(settings.darkMode == true) {
        updateSettigns = {
            name: settings.name,
            weather: settings.weather,
            bdate: settings.bdate,
            gdate: settings.gdate,
            hdate: settings.hdate,
            countdown: settings.countdown,
            quotes: settings.quotes,
            darkMode: false
        }
        readingMode.attr('href','assets/css/dark.css');
    }else{
        updateSettigns = {
            name: settings.name,
            weather: settings.weather,
            bdate: settings.bdate,
            gdate: settings.gdate,
            hdate: settings.hdate,
            countdown: settings.countdown,
            quotes: settings.quotes,
            darkMode: true
        }
        readingMode.attr('href','assets/css/light.css');
    }
    settings = localStorage.setItem('settings', JSON.stringify(updateSettigns));
    channel.postMessage('refresh');
}