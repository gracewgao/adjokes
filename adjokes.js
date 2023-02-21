async function getJoke() {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: myHeaders,
  });
  const data = await response.json();

  var leadin = data.joke;
  var punchline = "";

  // separate first sentence of joke from punchline
  for (var i = 0; i < data.joke.length; i++) {
    const c = data.joke.charAt(i);
    if (c == '?' || c == '!' || c == '.'){
      leadin = data.joke.slice(0,i + 1);
      if (i != data.joke.length - 1) {
        punchline = data.joke.slice(i + 1);
      }
      break;
    }
  }

  return {
    heading: leadin,
    body: punchline,
  };
}

// scrapes page for ads
var adblock = document.querySelectorAll('div[aria-label="Ads"]');
adblock.forEach(function (ads) {
  var a = Object.values(ads.children).filter((e) => e.nodeName == "DIV");
  a.forEach(function (ad) {
    copy = ad.children[0].children[0].children[0].children;
    var heading = copy[0]
      .querySelector('div[role="heading"]')
      .querySelector("span");
    var url = copy[0].querySelector('span[role="text"]');
    copy[0].querySelector('div[aria-label="Why this ad?"]').remove();
    var body = copy[1].querySelector("span");
    if (!body) body = copy[1].children[0].children[0];
    Object.values(copy)
      .splice(2)
      .forEach((e) => e.remove());
      
    // replace ad content with dad joke
    joke = getJoke().then((joke) => {
      url.innerHTML = "jokes";
      heading.innerHTML = joke.heading;
      body.innerHTML = joke.body;
    });
  });
});
