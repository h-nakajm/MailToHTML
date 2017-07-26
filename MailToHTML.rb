# 出力ファイル名を設定
out_file = 'out.html'

# ファイル出力用配列
output = []

# 入力ファイルを配列に読み込む
input = []
input_file = File.open(ARGV[0], mode = "r") { |f|
  input = f.readlines
}

# 雛形を配列に読み込む
lib = []
lib_file = File.open('lib.html', mode = "r") { |f|
  lib = f.readlines
}

# メール内の最後のSubjectを検索
subject_index = input.rindex { |item|
  item =~ /^Subject/
}

# 雛形への挿入箇所を検索
# <body>の次の行
body_index = lib.index { |item|
  item =~ /^<body>/
}

# libの<body>までを配列outputに入れる
output << lib[0, body_index + 1]
