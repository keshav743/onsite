$(".s-div").hide();

$(".search-btn").click(function (e) { 
    console.log($("#search-bar").val());
    var s = $("#search-bar").val();
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"
    const apiKey = "6bbfe12d225b4f29aac75a60fbad6859";
    var url = `${proxyUrl}http://newsapi.org/v2/everything?q=${s}&language=en&sortBy=publishedAt&apiKey=${apiKey}`;
    const request = new Request(url);
    $(".s-div").show();
    fetch(request)
    .then(response => response.json())
    .then((news) => {
        console.log(news.articles);       
        for(var i = 0; i<news.articles.length; i++){
            var newsUS = "";
            var m = "";
            var a = "";
            var d = "";
            var c = "";
            var u = "";
            m = (i+1).toString() + ") " + news.articles[i].title;
            a = news.articles[i].author;
            d = news.articles[i].description;
            u = news.articles[i].url;
            c = news.articles[i].urlToImage;
            newsUS = newsUS + (m + "<br>" + d + "<br>" + " Author - " + a + "<br><br>");
            if(c == null){
                c = "img.png";
            }
            $(".news-"+i.toString()+"-img").attr("src",c);
            $(".news-"+i.toString()).html(newsUS);
            $(".news-"+i.toString()+"-a").attr("href",u);
        }
    })
  .catch(error => {
    $(".country-us-q").html("No Results Found");
    console.log(error);
  });
});

function openCity(evt, cityName) {
    $(".s-div").hide();
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";

    const proxyUrl = "https://cors-anywhere.herokuapp.com/"
    var country = cityName;
    const apiKey = "6bbfe12d225b4f29aac75a60fbad6859";
    var url = `${proxyUrl}https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
    const request = new Request(url);

    fetch(request)
    .then(response => response.json())
    .then((news) => {
        console.log(news.articles);
        for(var i = 0; i<news.articles.length; i++){
            var newsUS = "";
            var m = "";
            var a = "";
            var d = "";
            var c = "";
            var u = "";
            m = (i+1).toString() + ") " + news.articles[i].title;
            a = news.articles[i].author;
            d = news.articles[i].description;
            u = news.articles[i].url;
            c = news.articles[i].urlToImage;
            if(c == null){
                c = "img.png";
            }
            newsUS = newsUS + (m + "<br>" + d + "<br>" + " Author - " + a + "<br><br>");
            $(".news-"+i.toString()+"-img").attr("src",c);
            $(".news-"+i.toString()).html(newsUS);
            $(".news-"+i.toString()+"-a").attr("href",u);
        }
    })
  .catch(error => {
    console.log(error);
  });
}






