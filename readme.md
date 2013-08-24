1. 图片位置： assets/images
2. js 位置： assets/javascripts， 注意看一下 application.js
3. css 位置： assets/stylesheets, 注意看一下 application.css
        css被我改名为scss,原因 url路径变动
        url(../images/cssprite.png) 变成了 url(/assets/csssprite.png)
4. views：layouts & home
5. controller: home_controller.rb
6. application.html.haml中，get 开头的 helper函数位于 application_helper.rb
7. config/routes.rb 中指定了默认访问路径 root :to => 'home#index'
8. clone项目后，# bundle install
9. 启动项目 # rails s
10. 404.html 位于public目录 


