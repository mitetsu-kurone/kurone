:: 當發生錯誤時終止腳本運行?待研究

::因為目前測試結果不接受自己的延遲，故下方yarn build結束後不會進部屬
::反而是會先部屬才打包，暫定只能先手動yarn build後執行腳本
::若有發現更好解法會更新
::yarn build
::移動至到打包後的dist目錄 
cd dist
git init
git add -A
git commit -m 'deploy'
::部署到 https://github.com/mitetsu-kurone/kurone.git 分支為 gh-pages
git push -f https://github.com/mitetsu-kurone/kurone.git master:gh-pages
cd ..