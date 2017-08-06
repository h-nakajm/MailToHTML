function categorize() {

  var a = "";

  // 選択されているボタンを取得

  for (var i = 0; i < document.form1.example.length; i++) {

    if (document.form1.elements[i].checked) {

      // 選択されているボタンを取得
      a = document.form1.elements[i].value;

      // Ajaxで送信するデータを作成
      var result = {
        url: document.location.href,
        date: new Date(),
        selected: a
      }

      // 作成したデータをAjaxで送信
      $.ajax({
        url: "http://127.0.0.1:8080/test/result/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(result),
        success: function() {
          window.location.href = "http://sdl.ist.osaka-u.ac.jp";
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          window.alert(textStatus + ": Unable to connect to the server.");
        }
      })

      break;

    } else if (i == document.form1.example.length - 1) {

      window.alert('Please select the button.');

    }

  }


  // // 「OK」時の処理開始 ＋ 確認ダイアログの表示
  //
  // if (window.confirm(a)) {
  //
  // }
  //
  // // 「キャンセル」時の処理開始
  // else {
  //
  // }

}

function quit() {

  window.confirm('quit');

}

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

$('.meerkat').on({
  'click': function() {
    window.open('http://sdl.ist.osaka-u.ac.jp');
  }
});
window.onload = function() {
  $('body').removeAttr('style');
  var match = location.search.match(/id=(.*?)(&|$)/);
  if (match) {
    id = match[1];
    $('#id').text(id);
  }
}
