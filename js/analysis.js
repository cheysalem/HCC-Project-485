//NMSU CS485 Fall 2023 Project Pebble Village 
//i did most of this it's mine - david

const id = Date.now().toString(36) + Math.random().toString(36).substring(2);

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
    let did = getCookie("deviceID");
    if (did != "") {
      //dont do anything
      alert("Welcome again " + did);
    } else {
      //execute fingerprint
       //user = prompt("Cookie test. Enter a username:", "");
       did = id;

       if (did != "" && did != null) {
        //save visitor data setCookie
         setCookie("deviceID", did, 30);
       }
    }
  } 

  //generate and assign vsitor id 
  function visitorID(){
    return id;
  }

  //collect as much information about the user in the background as possible
  function fingerprint(){
    const fp = {};
    fp.did = id; //device visit id

    //navigator properties
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

    console.log(fpee); // so i can see it

  }

  //secret button listener (just messing around)
  document.getElementById("showCookiesBtn").addEventListener("click", showCookies());
  function showCookies(){
    //display cookie data somehow
  }