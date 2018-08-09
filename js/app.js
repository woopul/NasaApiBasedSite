//https://api.nasa.gov/planetary/apod?api_key=wumtU3CAPhFX7hNuwpH1IA2EdrTVZoKohSz8fjtT
//KEY: key=wumtU3CAPhFX7hNuwpH1IA2EdrTVZoKohSz8fjtT

var apodUrl = 'https://api.nasa.gov/planetary/apod?api_key=wumtU3CAPhFX7hNuwpH1IA2EdrTVZoKohSz8fjtT';


// ---------------------RUN


showAPOD();



//-----------------function declarations

function showAPOD() {
    $.ajax({
        method: 'GET',
        url: apodUrl,
        dataType: 'json',
        date: '2018 August 07'
    }).done(function (response) {
        injectApod(response);
        console.log(response);
    }).fail(function (error) {
        console.log(error);
    });
}


function injectApod(apodObj) {
    var sectionWelcome = $('section.welcome'),
        pictureTitle = $('#picTitle'),
        pictureDate = $('#date'),
        pictureExplenation = $('#explanation');


    var backgroundImg = apodObj.url,
        backgrounImgHd = apodObj.hdurl,
        apodDate = apodObj.date,
        apodPictureTitle = apodObj.title,
        apodPictureExplanation = apodObj.explanation;


    console.log(backgroundImg);
    pictureTitle.text(apodPictureTitle);
    pictureDate.text(apodDate);
    pictureExplenation.text(apodPictureExplanation);

    sectionWelcome.css('background-image','url('+backgroundImg+')');
    // sectionWelcome.css('background' , 'green');
    // $('section.welcome').css('background-img', 'url('+backgroundImg+')');
}
