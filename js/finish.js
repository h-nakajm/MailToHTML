var dbpath = "http://valkyrie.ics.es.osaka-u.ac.jp/test/finish/";
var type = location.search.match(/type=(.*?)(&|$)/);
var id = location.search.match(/id=(.*?)(&|$)/);
var next_page = "http://sdl.ist.osaka-u.ac.jp";

// 終了ボタンが押された場合
function Clicked() {
  var date = new Date();

  // Ajaxで送信するデータを作成
  var result = {
    id: id,
    url: document.location.href,
    date: date,
    userAgent: window.navigator.userAgent,
    type: type
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
