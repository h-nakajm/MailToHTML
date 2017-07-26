# 出力ファイル名を設定
out_file = 'out.html'

# 入力ファイルを配列に読み込む
input = []
f = File.open(ARGV[0], mode = "r") { |f|
  input = f.readlines
}

# 最後のSubjectを検索
subject_index = input.rindex { |item|
  item =~ /^Subject/
}
puts subject_index
