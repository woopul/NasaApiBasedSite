//https://api.nasa.gov/planetary/apod?api_key=wumtU3CAPhFX7hNuwpH1IA2EdrTVZoKohSz8fjtT
//KEY: key=wumtU3CAPhFX7hNuwpH1IA2EdrTVZoKohSz8fjtT

const apodUrl = 'https://api.nasa.gov/planetary/apod?api_key=wumtU3CAPhFX7hNuwpH1IA2EdrTVZoKohSz8fjtT',
    roverUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY';

let currentPicDate = '';


// ---------------------RUN


showAPOD();
testDays();
console.log(currentPicDate);


//-----------------AJAX

function showAPOD(dateOfPic) {
    $.ajax({
        method: 'GET',
        url: apodUrl,
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
        url: 'https://api.nasa.gov/planetary/apod?date=2014-10-01&api_key=wumtU3CAPhFX7hNuwpH1IA2EdrTVZoKohSz8fjtT',
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

function changePic() {

}


//------------------------function declarations

//takes APOD OBJ (pic url, title, explanation, date) and put each of these data in its' place
function injectApod(apodObj) {
    var backgroundImg = apodObj.url,
        backgrounImgHd = apodObj.hdurl,
        apodDate = apodObj.date,
        apodPictureTitle = apodObj.title,
        apodPictureExplanation = apodObj.explanation;

    currentPicDate = apodDate;

    $('section.welcome').css('background-image', 'url(' + backgroundImg + ')');
    $('#picTitle').text(apodPictureTitle)
    $('#date').text(apodDate);
    $('#explanation').text(apodPictureExplanation);

    console.log(currentPicDate);
    console.log([...currentPicDate]);

}
