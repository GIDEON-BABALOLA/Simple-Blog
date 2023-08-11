const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const mongoose = require("mongoose");
app.use(express.static("public"));
app.set('view engine', 'ejs');
mongoose.connect("mongodb://127.0.0.1:27017/sinpleBlogDB", {
useNewUrlParser: true,
useUnifiedTopology:true }
)
const blogSchema = new mongoose.Schema({
    title : String,
    content : String,
    timestamp: { type: Date, default: Date.now }
})
const blogModel = mongoose.model("simpleBlog", blogSchema)
 //Global variables have to be declared outside all of the functions in a page
app.get("/", function( request, response){
    const home = "HOME";
    const homeContent = "At Folben Coorporation we bridge the knowledge gap in between digital technology and and industries such as banking, agriculture, healthcare, logistics and transportation with the help of highly qualified scientists, engineers, designers and other fields such as finance and business administration.Other companies under FOLBEN COORPORATION includes SmartBank, Agrosoft, Folben-Xpress and Folben Healthcare.";
blogModel.find().sort({ timestamp: -1 })
.then((data)=>{
    response.render("home", { titletype : home, firsthome: homeContent, glo : data,});
})
.catch((error)=>{
    console.log("Error in finding blog content data")
})  // console.log(global);
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
    const originalString = request.url
    const loadman = _.replace(originalString, '/posts/', '');
    console.log(loadman); //test
    blogModel.find({_id : loadman})
    .then((data)=>{
response.render("post",{ paper: data[0].title, cement: data[0].content} )
    })
    .catch((error)=>{
        console.log("Error in rendering each data")
    })
});
app.post("/compose", (request, response)=> {
    const composed = request.body.composetitle;
    const composedbody = request.body.composebody;
    const post = new blogModel({
        title : composed,
        content : composedbody
    })
    post.save()
    // you can also use global.push()
    //type rs to force nodemon to restart our servers
    response.redirect("/")
})
app.listen(7000, () => {
    console.log("server is running on port 7000");
})
 
