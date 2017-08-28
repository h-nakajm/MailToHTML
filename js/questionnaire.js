var dbpath = "http://valkyrie.ics.es.osaka-u.ac.jp/test/questionnaire/";
var next_page = "http://sdl.ist.osaka-u.ac.jp";

// Enterキーでの送信を許さない
$(function() {
  $(document).on("keypress", "input:not(.allow_submit)", function(event) {
    return event.which !== 13;
  });
});

function Clicked() {
  var a = "";

  for (var i = 0; i < document.form1.ads.length; i++) {

    // ボタンが選択されている場合
    if (document.form1.elements[i].checked) {

      // textareaが空欄の場合は警告を出す
      if ($("#text").val() == "") {
        window.alert("Enter your opinion into the text area.");
        return;
      }

      // 選択されているボタンを取得
      a = document.form1.elements[i].value;

      // Ajaxで送信するデータを作成
      var result = {
        id: $('#id').text(),
        url: document.location.href,
        date: new Date(),
        selected: a,
        impression: $("#text").val()
      };

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
    } else if (i == document.form1.ads.length - 1) {

      window.alert('Please select the advertisement that appeared in the previous pages.');

    }

  }
}
