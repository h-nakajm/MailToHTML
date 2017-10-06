var dbpath = "http://localhost:3000/exp2/participants/";
var exp_page = "./00010.html";
var count_path = "http://localhost:3000/count/";

$(function () {
    var ua = navigator.userAgent;
    var date = new Date();
    var init_data = {
      "userAgent": ua,
      "date": date,
      "weight": screen.height,
      "width": screen.width,
      "angle": window.orientation
      //"angle": wndow.screen.orientation.angle,
    };
    if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
        // スマートフォン用コード
        $.ajax({
          url: count_path,
          type: "POST",
          data: init_data,
          // contentType: "application/json",
          // data: JSON.stringify(result),
          dataType: 'text'
        }).done(function(data) { // success
          // 被験者の広告タイプを埋め込む
          $('#type').text(data);
        }).fail(function(data) { // error
          window.alert(textStatus + ": Unable to connect to the server.");
        });
    } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
        // タブレット用コード
        $.ajax({
          url: count_path,
          type: "POST",
          data: init_data,
          // contentType: "application/json",
          // data: JSON.stringify(result),
          dataType: 'text'
        }).done(function(data) { // success
          // 被験者の広告タイプを埋め込む
          $('#type').text(data);
        }).fail(function(data) { // error
          window.alert(textStatus + ": Unable to connect to the server.");
        });
    } else {
        // パソコン用コード
        // window.location.href = "http://localhost:3000/experiment/pc.html";
    }
})

// Enterキーでの送信を許さない
$(function() {
  $(document).on("keypress", "input:not(.allow_submit)", function(event) {
    return event.which !== 13;
  });
});

// enterボタンが押された際の処理
function Clicked() {

  // テキストフィールドが空欄の場合
  if ($("#id1").val() == "" || $("#id2").val() == "") {
    window.alert("Input your Id.");
    return;
  }
  // テキストフィールドの内容が一致しない場合
  else if ($("#id1").val() != $("#id2").val()) {
    window.alert("The initial ID and the re-typed ID do not match. ");
    return;
  }
  // IDが正しく打ち込まれた場合
  else {
    var date = new Date();
    var ID = $("#id1").val();
    if ($('#type').text() == "static") {
      var next_page = exp_page + "?id=" + ID + "&type=static";
      var type = "static";
    } else {
      var next_page = exp_page + "?id=" + ID + "&type=anchor";
      var type = "anchor";
    }
    var result = {
      "id": ID,
      "date": date,
      "userAgent": window.navigator.userAgent,
      "weight": screen.height,
      "width": screen.width,
      "angle": window.orientation,
      //"angle": window.screen.orientation.angle,
      "type": type
    };

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
}
