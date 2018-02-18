#!/bin/bash

shopt -s extglob

for i in ./test_mails/*; do ruby MailToHTML.rb $i; done
mv ./test_mails/*.html ./test

cd test
ruby setup_pages.rb
rm *.html
mv ./target/*.html ../out/

cd ../image
cp * ../out/image/

cd ../js
cp * ../out/js/

cd ../html
cp !(lib).html ../out/

cd ../
find ./out/ -type f -print | xargs chmod 755
tar cvf experiment.tar out
