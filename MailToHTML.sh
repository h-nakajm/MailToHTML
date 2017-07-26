#!/bin/bash

# 区切り文字を改行コードに指定
IFS_SAVE=$IFS
IFS=$'\n'

# 出力ファイル名を設定
out_file=1.html
converted_file=1-1.html

# 雛形をコピー
# cp lib.html 1.html

# ファイルを配列に読み込む
input_file=(`cat "$1"`)
lib=(`cat lib.html`)

# 最後の「Subject」を検索
subject=0
for (( i=`expr ${#input_file[@]} - 1`; $i > 0; i-- )); do
  if [[ ${input_file[$i]} = Subject* ]]; then
    subject=$i
    break
  fi
done

# 雛形への挿入箇所を検索
# <body>の次の行
body=0
for (( i=0; $i < ${#lib[@]}; i++ )); do
  if [[ ${lib[$i]} = "<body>" ]]; then
    body=$i
    break
  fi
done

# <body>までを配列outに入れる
for (( i = 0; i <= $body; i++ )); do
  out+=(${lib[$i]})
done

# 最後の「Subject」以降の文面の各行の最後に「</br>」を追加してoutに追記
for (( i = `expr $subject + 1`; i < ${#input_file[@]}; i++ )); do
 # echo "${input_file[$i]}</br>" >> "$1.html"
 # echo "${input_file[$i]}</br>"
 out+=("${input_file[$i]}</br>")
done

# outに雛形の残りを追記
for (( i = `expr $body + 1`; i < ${#lib[@]}; i++ )); do
  out+=(${lib[$i]})
done

# outをファイルに出力
for i in ${out[@]}; do
 echo -e "$i\n" >> $out_file
done

# echo -e "${out[@]}"

# 出力ファイルのエンコードをUTF-8→Shift-JISに変換
# iconv -f UTF8 -t SJIS $out_file > $converted_file

# 区切り文字を復帰
IFS=$IFS_SAVE
