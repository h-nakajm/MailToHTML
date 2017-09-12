#!/bin/bash

cd /cygdrive/c/Users/hirok/Documents/research

for i in ./test_mails/*; do ruby MailToHTML.rb $i; done

mv ./test_mails/*.html ./test

cd test

ruby setup_pages.rb

rm *.html

mv ./target/*.html ~/research/out/

cd ~/research

find ./out/ -type f -print | xargs chmod 755 

tar cvf experiment1.tar out
