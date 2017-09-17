var start;
var dbpath = "http://valkyrie.ics.es.osaka-u.ac.jp/exp1/results/";
var ad_dbpath = "http://valkyrie.ics.es.osaka-u.ac.jp/exp1/ad_clicked";
var ad_open = "./clicked.html";
var type = location.search.match(/type=(.*?)(&|$)/);

// ブラウザの戻るボタンを禁止する
window.location.hash="no-back-button";
window.location.hash="Again-No-back-button";//again because google chrome don't insert first hash into history
window.onhashchange=function(){window.location.hash="no-back-button";}

// メール分類ボタンが押された場合
function categorize() {

  var a = "";

  for (var i = 0; i < document.form1.example.length; i++) {

    // ボタンが選択されている場合
    if (document.form1.elements[i].checked) {

      var end = new Date();
      var next_page = $('#next').text() + '?id=' + $('#id').text() + '&type=' + $('#type').text();

      // 選択されているボタンを取得
      a = document.form1.elements[i].value;

      // Ajaxで送信するデータを作成
      var result = {
        id: $('#id').text(),
        url: document.location.href,
        start: start,
        end: end,
        time: end - start,
        userAgent: window.navigator.userAgent,
        height: screen.height,
        width: screen.width,
        angle: window.orientation,
         //angle: window.screen.orientation.angle,
        type: $('#type').text(),
        selected: a
      }

      // 作成したデータをAjaxで送信
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

//ページ読み込み終了時の処理
window.onload = function() {

  start = new Date();

  if (type[1] == "static") {
    // 静止広告を挿入
    $("#static_ad_space").after("<a href=" + ad_open + " target=\"_blank\"><img id=\"static_ad\" width=\"640\" src=\"./image/sample_ad03.png\"></a>");

    // 静止広告がクリックされた時の処理
    $("#static_ad").on('click', function() {
      var record = {
        id: $('#id').text(),
        url: document.location.href,
        userAgent: window.navigator.userAgent,
        height: screen.height,
        width: screen.width,
        angle: window.orientation,
        //angle: window.screen.orientation.angle,
        date: new Date(),
        type: "static"
      };

      // 広告がクリックされた情報をdbに送る
      $.ajax({
        url: ad_dbpath,
        type: "POST",
        data: record
        // contentType: "application/json",
        // data: JSON.stringify(record),
        // dataType: 'xml'
      }).done(function(data) { // success
        console.log("success");
      }).fail(function(data) { // error
        console.log("fail");
      });
    });
  } else if (type[1] == "anchor") {
    // アンカー広告を挿入
    $("#anchor_ad_space").after("<div style=\"text-align: center;\" class=\"meerkat\"><a href=" + ad_open + " target=\"_blank\"><img id=\"anchor_ad\" border=\"0\" width=\"100%\" height=\"10%\" alt=\"\" src=\"./image/sample_ad03.png\"></a></div>");
    $(function() {
      $('.meerkat').meerkat({
        background: 'url(\'./image/black.png\') repeat-x left top',
        //height: '200px',
        width: '100%',
        position: 'bottom'
        //close: '.close-meerkat',
        //dontShowAgain: '.dont-show',
        //animationIn: 'slide',
        //animationSpeed: 500,
        //removeCookie: '.reset'
      }).addClass('pos-bot');
    });

    // アンカー広告の両側の黒い部分が押された場合のページ遷移(新規window)
    $('.meerkat').on({
      'click': function() {
        window.open(ad_open);
        var record = {
          id: $('#id').text(),
          url: document.location.href,
          userAgent: window.navigator.userAgent,
          height: screen.height,
          width: screen.width,
          angle: window.orientation,
          //angle: window.screen.orientation.angle,
          date: new Date(),
          type: "anchor"
        };

        // 広告がクリックされた情報をdbに送る
        $.ajax({
          url: ad_dbpath,
          type: "POST",
          data: record
          // contentType: "application/json",
          // data: JSON.stringify(record),
          // dataType: 'xml'
        }).done(function(data) { // success
          console.log("success");
        }).fail(function(data) { // error
          console.log("fail");
        });
      }
    });
  }

  // bodyに動的に追加されたスタイルを削除
  $('body').removeAttr('style');

  // urlのクエリパラメタからidを取得して「your ID」に表示
  var match = location.search.match(/id=(.*?)(&|$)/);
  if (match) {
    var id = match[1];
    $('#id').text(id);
  }

  // urlのクエリパラメタからtypeを取得してhtml内に埋め込む
  $('#type').text(type[1]);

}
