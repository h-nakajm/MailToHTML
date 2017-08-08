# test.rb
# input: なし
# output: カレントディレクトリにあるhtmlファイルを整形したhtmlファイル
# 整形内容: ページ遷移の追加，ファイル名の変更

# 最後のアンケートページとホスト名
question_page = "http://sdl.ist.osaka-u.ac.jp"
host = "http://localhost:8000/"

# カレントディレクトリにあるメールファイルの名前を全て取得
input_files = []
Dir.foreach('.'){|item|
  next if item == '.' or item == '..' or item == 'test.rb'
  input_files << item
}
input_files.sort!

# 出力ファイル名を設定
# [000~999][元メールの番号].html
output_files = []
input_files.each_with_index{|input_file, index|
  output_files << format('%03d', index) + input_file
}

# 各メールファイルを読み込み
input_contents = []
input_files.each_with_index{|input_file, index|
  File.open(input_file.chomp, "r"){|f|
    input_contents[index] = f.readlines
  }
}

# <span id="next" hidden>を含む行を探索
# 次の実験ページのurlを挿入(http://(ホスト名):(ポート番号)/(実験番号).html)
# 実験中にjsでurlの後ろに「?id=(yourID)」を追加する
# 最後のページの場合はアンケートページへのリンクを挿入
input_contents.each_with_index{|input_content ,index|
  target = input_content.index{|item|
    item =~ /<span id="next" hidden>/
  }
  if index == input_contents.length - 1 then
    input_contents[index][target].gsub!(/(>)(<)/, '\1'"#{question_page}"'\2')
  else
    input_contents[index][target].gsub!(/(>)(<)/, '\1'"#{host}#{output_files[index + 1]}"'\2')
  end
}

# ページ遷移を追加した実験ページをファイルに出力
output_files.each_with_index{|output_file, index|
  File.open(output_file, "w"){|f|
    f.puts(input_contents[index])
  }
}
