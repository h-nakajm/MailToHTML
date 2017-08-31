var dbpath = "http://valkyrie.ics.es.osaka-u.ac.jp/exp1/questionnaire/";
var next_page = "./finish.html";

// Enterキーでの送信を許さない
$(function() {
  $(document).on("keypress", "input:not(.allow_submit)", function(event) {
    return event.which !== 13;
  });
});

function Clicked() {
  var a = "";
  var b = "";

  for (var i = 0; i < document.form1.ads.length; i++) {

    // 広告が選択されている場合
    if (document.form1.elements[i].checked) {

      // textareaが空欄の場合は警告を出す
      if ($("#text").val() == "") {
        window.alert("Enter your opinion into the text area.");
        return;
      }

      // 選択されているボタンを取得
      a = document.form1.elements[i].value;
      break;

    } // 広告が選択されていない場合
    else if (i == document.form1.ads.length - 1) {
      window.alert('Please select the button of Q1.');
      return;
    }

  }

  for (var i = 0; i < document.form2.alternatives.length; i++) {

    // 選択されている場合
    if (document.form2.elements[i].checked) {
      // 選択されているボタンを取得
      b = document.form2.elements[i].value;
      break;
    } // 選択されていない場合
    else if (i == document.form2.alternatives.length - 1) {
      window.alert('Please select the button of Q2.');
      return;
    }

  }

  // Ajaxで送信するデータを作成
  var result = {
    id: $('#id').text(),
    url: document.location.href,
    date: new Date(),
    ad_selected: a,
    annoyingness: b,
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
}
