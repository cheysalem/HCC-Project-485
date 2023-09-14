//NMSU CS485 Fall 2023 Project Pebble Village 

const rngModifier = 0;

//example script from w3
//generates a cookie with a name, text value, and expiration value
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();

    //cookie is actually created here
    document.cookie = cname + "=" + cvalue + ";" + agent + expires + ";path=/";
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function checkCookie() {
    //collect visitor data run getCookie
    let user = getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
        //assign random number to user
       //rngModifier++;
       //user = Math.random()*100 + rngModifier;
       user = prompt("Cookie test. Enter a username:", "");

       if (user != "" && user != null) {
        //save visitor data setCookie
         setCookie("username", user, 30);
       }
    }
  } 

  //generate and assign vsitor id 
  function visitorID(){
    //ummm
  }

  //collect as much information about the user in the background as possible
  function fingerprint(){
    const fp = {};
    fp.cookies = navigator.cookieEnabled;//cookieenabled
    fp.langu = navigator.languages;//languages
    fp.useragent = navigator.userAgent; //useragent
    fp.platform = navigator.platform;//browser platform
    fp.engine = navigator.engine;//browser engine
    //TODO add these categories to database
    fp.java = navigator.java;//java enabled?
    fp.dnt = navigator.doNotTrack;//donottrack enabled
    fp.processor = navigator.hardwareConcurrency;//number of cores or idk
    //screen properties
    fp.h = screen.height;//height
    fp.ah = screen.availHeight;//available height
    fp.w = screen.width;//width
    fp.sw = screen.availWidth;//available width

    return fp;
  }

  //send visitor data to the database
  //(right now it just displays it in a gross, annoying manner for our convenience)
  function visitorReport(){
    fpee = JSON.stringify(fingerprint());
    window.alert(fpee);
    console.log(fpee);
  }

  //secret button listener (just messing around)
  document.getElementById("showCookiesBtn").addEventListener("click", showCookies());
  function showCookies(){
    //display cookie data somehow
  }