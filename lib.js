var start;
var dbpath = "http://127.0.0.1:8080/test/results/";
var ad_dbpath = "http://127.0.0.1:8080/test/ad_clicked";
var ad_open = "http://sdl.ist.osaka-u.ac.jp";

// メール分類ボタンが押された場合
function categorize() {

  var a = "";
  var next_page = $('#next').text() + '?id=' + $('#id').text();

  for (var i = 0; i < document.form1.example.length; i++) {

    // ボタンが選択されている場合
    if (document.form1.elements[i].checked) {

      var end = new Date();

      // 選択されているボタンを取得
      a = document.form1.elements[i].value;

      // Ajaxで送信するデータを作成
      var result = {
        id: $('#id').text(),
        url: document.location.href,
        start: start,
        end: end,
        time: end - start,
        selected: a
      }

      // 作成したデータをAjaxで送信
      $.ajax({
        url: dbpath,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(result),
        dataType: 'xml'
      }).done(function(data) { // success
        window.location.href = next_page;
      }).fail(function(data) { // error
        window.alert(textStatus + ": Unable to connect to the server.");
      });

      break;

      // ボタンが選択されていない場合
    } else if (i == document.form1.example.length - 1) {

      window.alert('Please select the button.');

    }

  }

}

// 途中でやめるボタンが押された場合
function quit() {

  window.confirm('quit');

}

// アンカー広告を挿入
$(function() {
  $('.meerkat').meerkat({
    background: 'url(\'./image/black.png\') repeat-x left top',
    height: '200px',
    width: '100%',
    position: 'bottom',
    //close: '.close-meerkat',
    //dontShowAgain: '.dont-show',
    //animationIn: 'slide',
    //animationSpeed: 500,
    //removeCookie: '.reset'
  }).addClass('pos-bot');
});

//ページ読み込み終了時の処理
window.onload = function() {

  start = new Date();

  // bodyに動的に追加されたスタイルを削除
  $('body').removeAttr('style');

  // urlのクエリパラメタからidを取得して「your ID」に表示
  var match = location.search.match(/id=(.*?)(&|$)/);
  if (match) {
    id = match[1];
    $('#id').text(id);
  }

  // 広告の両側の黒い部分が押された場合のページ遷移(新規window)
  $('.meerkat').on({
    'click': function() {
      window.open(ad_open);
      var record = {
        id: $('#id').text(),
        url: document.location.href,
        date: new Date()
      }

      // 広告がクリックされた情報をdbに送る
      $.ajax({
        url: ad_dbpath,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(record),
        dataType: 'xml'
      }).done(function(data) { // success
        console.log("success");
      }).fail(function(data) { // error
        console.log("fail");
      });
    }
  });

}
