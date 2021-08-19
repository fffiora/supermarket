git下载自己项目到本地:
假如外出工作，需要在另一台电脑上面pull自己的某个git远程项目到本地；

 git init
 
 git pull https://github.com/TTyb/54qjLogin   （远程仓库url）
下载的这个项目更改后需要push的会出现：
$ git push
fatal: No configured push destination.
Either specify the URL from the command-line or configure a remote repository using
 
    git remote add <name> <url>
 
and then push using the remote name
 
    git push <name>
此时：git remote用法
这个时候第一次push需要网址：
 
$ git add --all  或者使用 git add .(所得的文件) | git add file.js(对用指定文件)
$ git commit -m "提交信息"
$ git remote add origin '远程仓库url'
$ git push -u origin master
 https://github.com/a631588640/supermarket
 
 
然后下一次就不用那么麻烦了，直接：
 
$ git add --all  | git add .(所得的文件) | git add file.js(对用指定文件)
$ git commit -m "信息"
$ git push
完毕~~~~~~~~~~~~
