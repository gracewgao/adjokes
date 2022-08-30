var adblock = document.querySelectorAll('div[aria-label="Ads"]');

advice = [
  {
    heading: "drink water!",
    body: "hydrate or diedrate",
    author: "anon",
  },
  {
    heading: "go call your family",
    body: "they miss u...",
    author: "anon",
  },
  {
    heading: "if it takes a minute to do it, just do it",
    body: "your future self will thank you!",
    author: "reddit",
  },
  {
    heading: "take your responsibilities seriously, but not yourself",
    body: "if everyone on this planet would just chill out and not take themselves so seriously, a lot of society’s problems would fix themselves.",
    author: "reddit",
  },
  {
    heading: "keep cool, never freeze",
    body: "if the ketchup can do it, so can you!",
    author: "reddit",
  },
];

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

    var i = Math.floor(Math.random() * advice.length);

    heading.innerHTML = advice[i].heading;
    url.innerHTML = "vice from " + advice[i].author;
    body.innerHTML = advice[i].body;
  });
});
