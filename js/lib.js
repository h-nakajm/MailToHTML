var start;
var dbpath = "http://valkyrie.ics.es.osaka-u.ac.jp/exp2/results/";
var ad_dbpath = "http://valkyrie.ics.es.osaka-u.ac.jp/exp2/ad_clicked";
var ad_open = "./clicked.html";
var type = location.search.match(/type=(.*?)(&|$)/);

var basex;
var basey;
var scrollMargin = 50;
var DEBUG = false;

// ブラウザの戻るボタンを禁止する
window.location.hash = "no-back-button";
window.location.hash = "Again-No-back-button"; //again because google chrome don't insert first hash into history
window.onhashchange = function() {
  window.location.hash = "no-back-button";
}

function categorize() {

  var a = "";
  var b = "";

  for (var i = 0; i < document.form1.example.length; i++) {

    // Q1のボタンが選択されている場合
    if (document.form1.elements[i].checked) {

      a = document.form1.elements[i].value;

      for (var j = 0; j < document.form2.q2.length; j++) {

        // Q2のボタンが選択されている場合
        if (document.form2.elements[j].checked) {

          b = document.form2.elements[j].value;
          var end = new Date();
          next_page = $('#next').text() + '?id=' + $('#id').text() + '&type=' + $('#type').text();

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
            selected: a,
            q2: b
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
            window.alert("Unable to connect to the server.");
          });

          return;

        } else if (j == document.form2.q2.length - 1) {

          window.alert('Please answer the Q2.');
          return;

        }
      }

      // ボタンが選択されていない場合
    } else if (i == document.form1.example.length - 1) {

      window.alert('Please answer the Q1.');
      return;

    }

  }

};

// アンカー広告を挿入する
function insert_anchor() {
  $("#anchor_ad_space").append("<div style=\"text-align: center;\" class=\"meerkat\"><a href=" + ad_open + " target=\"_blank\"><img id=\"anchor_ad\" border=\"0\" width=\"100%\" height=\"10%\" alt=\"\" src=\"./image/sample_ad05.png\"></a></div>");
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
};

// アッパー広告を挿入する
function insert_upper() {
  $("#upper_ad_space").append("<div style=\"text-align: center;\" class=\"meerkat\"><a href=" + ad_open + " target=\"_blank\"><img id=\"anchor_ad\" border=\"0\" width=\"100%\" height=\"10%\" alt=\"\" src=\"./image/sample_ad05.png\"></a></div>");
  $(function() {
    $('.meerkat').meerkat({
      background: 'url(\'./image/black.png\') repeat-x left top',
      //height: '200px',
      width: '100%',
      position: 'top'
      //close: '.close-meerkat',
      //dontShowAgain: '.dont-show',
      //animationIn: 'slide',
      //animationSpeed: 500,
      //removeCookie: '.reset'
    }).addClass('pos-bot');
  });

  // アッパー広告の両側の黒い部分が押された場合のページ遷移(新規window)
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
        type: "upper"
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
};

//ページ読み込み終了時の処理
window.onload = function() {

  start = new Date();
  if (type[1] == "upper" || type[1] == "scroll" || type[1] == "reverse")
    $('#upper_ad_space').css('margin-bottom', '200px');

  if (type[1] == "static") {
    // 静止広告を挿入
    $("#static_ad_space").after("<a href=" + ad_open + " target=\"_blank\"><img id=\"static_ad\" width=\"640\" src=\"./image/sample_ad05.png\"></a>");

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
  } else if (type[1] == "anchor" || type[1] == "reverse") {
    // アンカー広告を挿入
    insert_anchor();
  } else if (type[1] == "upper" || type[1] == "scroll") {
    // アッパー広告を挿入
    insert_upper();
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

  // スクロール方向の取得
  $('.inner_body').bind('touchstart', function(e) {
    basex = window.scrollX;
    basey = window.scrollY;
  });
  document.addEventListener('scroll', function(e) {
    deltax = basex - window.scrollX;
    deltay = basey - window.scrollY;

    if (DEBUG) {
      console.log('>>' +
        basex + '->' + window.scrollX + ' (' + deltax + ')   ' +
        basey + '->' + window.scrollY + ' (' + deltay + ')');
    }
    // 広告タイプとスクロール方向に応じて広告の位置を変更
    if (type[1] == "reverse") {
      if (deltay > scrollMargin) {
        $("#upper_ad_space").empty();
        if ($("#anchor_ad_space").children().length == 0)
          insert_anchor();
      } else if (deltay < -1 * scrollMargin) {
        $("#anchor_ad_space").empty();
        if ($("#upper_ad_space").children().length == 0)
          insert_upper();
      }
    } else if (type[1] == "scroll") {
      if (deltay > scrollMargin) {
        $("#anchor_ad_space").empty();
        if ($("#upper_ad_space").children().length == 0)
          insert_upper();
      } else if (deltay < -1 * scrollMargin) {
        $("#upper_ad_space").empty();
        if ($("#anchor_ad_space").children().length == 0)
          insert_anchor();
      }
    }

  }, false);

}
