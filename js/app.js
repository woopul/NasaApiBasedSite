//https://api.nasa.gov/planetary/apod?api_key=wumtU3CAPhFX7hNuwpH1IA2EdrTVZoKohSz8fjtT
//KEY: key=wumtU3CAPhFX7hNuwpH1IA2EdrTVZoKohSz8fjtT

//TODO
// 1) function that will change date after pressing the button under the date || DONE
// 3) Function that will check if type of url has .jpg at the end of src - to choose just these one as background src
// 4) Function that will check if curPicDate === TodayDate, if yes - next butn disabled
// 5) SECTION WITH ROVER PICTURES
// 2) RWD rethink
//

const apodUrl = 'https://api.nasa.gov/planetary/apod?api_key=wumtU3CAPhFX7hNuwpH1IA2EdrTVZoKohSz8fjtT',
    roverUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY';

//SETTING current pic date in the begening - as the current day's date
let todaysDate = new Date();
//changing format to ISO and triming string for foreward use
todaysDate = todaysDate.toISOString().substr(0, 10);
let currentPicDate = todaysDate;


// ---------------------RUN


getAPOD();
testDays();
console.log(currentPicDate);


//-------------------------------------DOM

$('#date').text(currentPicDate);


$('#nextBtn').on('click', e => {
    if (currentPicDate === todaysDate) {
        // console.log(e.currentTarget);
        e.hover(() => {
            thisBtn.style.removeProperty();
        })
    } else {
        addDay(currentPicDate);
        $('#date').text(currentPicDate);
        getAPOD(currentPicDate);
    }
});

$('#prevBtn').on('click', () => {
    substractDay(currentPicDate);
    $('#date').text(currentPicDate);
    getAPOD(currentPicDate);
});

//-----------------AJAX

function getAPOD() {
    $.ajax({
        method: 'GET',
        url: `https://api.nasa.gov/planetary/apod?date=${currentPicDate}&api_key=wumtU3CAPhFX7hNuwpH1IA2EdrTVZoKohSz8fjtT`,
        dataType: 'json',
    }).done(function (response) {
        injectApod(response);
        console.log(response);
    }).fail(function (error) {
        console.log(error);
    });
}

function testDays() {
    $.ajax({
        method: 'GET',
        url: `https://api.nasa.gov/planetary/apod?date=${currentPicDate}&api_key=wumtU3CAPhFX7hNuwpH1IA2EdrTVZoKohSz8fjtT`,
        dataType: 'json',
    }).done(function (response) {
        // injectApod(response);
        console.log(response);
    }).fail(function (error) {
        console.log(error);
    });
}

function showRoverAPI() {
    $.ajax({
        method: 'GET',
        url: roverUrl,
        dataType: 'json',
        // date: '2018 August 07'
    }).done(function (response) {
        injectApod(response);
        console.log(response);
    }).fail(function (error) {
        console.log(error);
    });
}


//------------------------function declarations

//takes APOD OBJ (pic url, title, explanation, date) and put each of these data in its' place
function injectApod(apodObj) {
    var backgroundImg = apodObj.url,
        backgrounImgHd = apodObj.hdurl,
        // apodDate = apodObj.date,
        apodPictureTitle = apodObj.title,
        apodPictureExplanation = apodObj.explanation;

    // currentPicDate = apodDate;

    $('section.welcome').css('background-image', 'url(' + backgroundImg + ')');
    $('#picTitle').text(apodPictureTitle)
    // $('#date').text(apodDate);
    $('#explanation').text(apodPictureExplanation);

}

addDay = (dateIn) => {
    let dt = new Date(dateIn);
    //converted to the date object and add a day to it
    dt.setDate(dt.getDate() + 1);

    //dt.getMonth()+1 ---> plus 1 because get.Month receive moth wich is indexed in array starded from 0, so to get actuall month
    // we need to add 1
    if (dt.getDate() < 10 && (dt.getMonth() + 1) < 10) {
        date = dt.getFullYear() + "-" + '0' + (dt.getMonth() + 1) + '-' + '0' + (dt.getDate());

    } else if (dt.getDate() < 10) {

        date = dt.getFullYear() + "-" + (dt.getMonth() + 1) + '-' + '0' + (dt.getDate());

    } else if ((dt.getMonth() + 1) < 10) {

        date = dt.getFullYear() + "-" + '0' + (dt.getMonth() + 1) + '-' + (dt.getDate());

    } else {
        date = dt.getFullYear() + "-" + (dt.getMonth() + 1) + '-' + (dt.getDate());
    }
    console.log(date);
    currentPicDate = date;
}


//SUBSTRACTS DAY FROM DATE & SAVE IT IN currentPicDate, gets
// Takes a currentPicDate, substract a day from it and set it as a new currentPicDate
substractDay = (dateIn) => {
    let dt = new Date(dateIn);
    //converted to the date object and substract a day from it
    dt.setDate(dt.getDate() - 1);

    //check if day is less than 10 - then add "0" before it because getDate() method returnes
    //day if less than 10  as : ex "09"-wanted value || "9" - returned value
    // "06" , "07" "09" etc.  ISO format is needed to further comparison of the dates
    if (dt.getDate() < 10 && (dt.getMonth() + 1) < 10) {
        date = dt.getFullYear() + "-" + '0' + (dt.getMonth() + 1) + '-' + '0' + (dt.getDate());

    } else if (dt.getDate() < 10) {

        date = dt.getFullYear() + "-" + (dt.getMonth() + 1) + '-' + '0' + (dt.getDate());

    } else if ((dt.getMonth() + 1) < 10) {

        date = dt.getFullYear() + "-" + '0' + (dt.getMonth() + 1) + '-' + (dt.getDate());

    } else {
        date = dt.getFullYear() + "-" + (dt.getMonth() + 1) + '-' + (dt.getDate());
    }
    console.log(date);
    currentPicDate = date;
};
