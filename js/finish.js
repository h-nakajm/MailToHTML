var dbpath = "http://valkyrie.ics.es.osaka-u.ac.jp/exp1/finish/";
var type = location.search.match(/type=(.*?)(&|$)/);
var match = location.search.match(/id=(.*?)(&|$)/);
var next_page = "https://www.prolific.ac/submissions/complete?cc=5BBVTAAL";

// 終了ボタンが押された場合
function Clicked() {
  var date = new Date();

  // Ajaxで送信するデータを作成
  var result = {
    id: match[1],
    url: document.location.href,
    date: date,
    userAgent: window.navigator.userAgent,
    type: type[1]
  }

  // 参加者の情報をdbに送る
  $.ajax({
    url: dbpath,
    type: "POST",
    data: result
    // contentType: "application/json",
    // data: JSON.stringify(result),
    // dataType: 'xml'
  }).done(function(data) { // success
    window.location.href = next_page;
  }).fail(function(data) { // error
    window.alert(textStatus + ": Unable to connect to the server.");
  });
}
