const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
const global = []; //Global variables have to be declared outside all of the functions in a page
app.get("/", function( request, response){
    const home = "HOME";
    const homeContent = "At Folben Coorporation we bridge the knowledge gap in between digital technology and and industries such as banking, agriculture, healthcare, logistics and transportation with the help of highly qualified scientists, engineers, designers and other fields such as finance and business administration.Other companies under FOLBEN COORPORATION includes SmartBank, Agrosoft, Folben-Xpress and Folben Healthcare.";
    response.render("home", { titletype : home, firsthome: homeContent, glo : global,});
    // console.log(global);
});
app.get("/contact-us", function( request, response){
    const contact = "CONTACT US";
    const contactContent = "Embark on a Journey of Knowledge and Success with Our Transportation and Logistics Newsletter: Elevating Your Business with Cutting-Edge Features, Unparalleled Insights, and Customizable Solutions Tailored to Your Industry's Demands. Stay Informed, Stay Ahead, and Unlock a World of Opportunities as we Guide you through the Ever-Evolving Landscape of Transportation and Logistics."
    response.render("contact-us", { titletype : contact, firstcontact : contactContent});
});
app.get("/about-us", function( request, response){
    const about = "ABOUT US";
    const aboutContent = "Unlock Seamless Efficiency and Navigate Success with Our Transportation and Logistics Powerhouse. Experience the Intersection of Precision and Reliability as we Streamline Your Operations, Connect Supply Chains, and Accelerate Your Business Growth. Trust in our Expertise, Embrace Innovation, and Let Us Propel Your Transportation and Logistics Endeavors to Extraordinary Heights"
    response.render("about-us", { titletype : about, firstabout: aboutContent});
});
app.get("/compose", (request, response)=> {
const composer = "Title";
const composered = "Post"
response.render("compose", { compact : composer, compactplayer : composered});
});
app.get("/posts/:value", (request, response) => {
    const loader = _.lowerCase(global[0].coTitle)
    const loadman = _.replace(loader, /\s+/g, '-');
    console.log(request.params.value); //TEST
    console.log(loadman); //test
    if(request.params.value === loadman){
        response.render("post", { paper : global[0].coTitle, cement : global[0].coBody,});
    }
    else if(request.params.value === global[0].coTitle){
        response.render("post", { paper : global[0].coTitle, cement : global[0].coBody,});
    }
});
app.post("/compose", (request, response)=> {
    const composed = request.body.composetitle;
    const composedbody = request.body.composebody;
    // console.log(composedbody)
    // console.log(composed);
    const post = {
        coTitle : composed,
        coBody : composedbody
    }
    global.unshift(post);
    // you can also use global.push()
    //type rs to force nodemon to restart our servers
    response.redirect("/")
})
app.listen(7000, () => {
    console.log("server is running on port 7000");
})
 
