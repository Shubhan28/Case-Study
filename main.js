
function show(message)
{
    console.log(message);
}
prediction1 = "";
prediction2 = "";
Webcam.set({
    width : 350,
    height : 300,
    image_format : 'jpeg',
    jpeg_quality : 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot()
{
    Webcam.snap(function(data_url){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_url+'">';
    });       
    
}
show(ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/952Ujb881/model.json', modelLoaded);
function modelLoaded()
{
    show("Model Loaded!");
}
function speak()
{
    var synthesis = window.speechSynthesis;
    speak_data = "I found you"+prediction1;
    var utter = new SpeechSynthesisUtterance(speak_data);
    synthesis.speak(utter);

}
function what(message)
{
    var synth = window.speechSynthesis;
    var utter2 = new SpeechSynthesisUtterance(message);
    synth.speak(utter2);
}
function check()
{
    show("Checking...");
    img = document.getElementById("captured_image");
    classifier.classify(img, get_results);
}
function get_results(error, results)
{
    if(error)
    {
        show("Error, could not recognise the image!!");
        what("I do not know you, you re a stranger to me!!");

    }else{
        show("Checked!!");
        show(results);
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        
    }
}
