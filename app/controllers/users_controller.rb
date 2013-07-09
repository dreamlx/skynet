# coding: utf-8
class UsersController < ApplicationController
  
  def login
    render layout: false
  end

  def create_session
      http = login_to_remote(params["user"]["name"], params["user"]["password"])
    if http.http_get
      if json2hash(http.body_str)["code"] == "200"
        session[:current_user] = params[:user]
        redirect_to "/home" 
      else
        flash[:alert] = "用户名或者密码错误，登录失败"
        render :login, layout: false
      end
    else
      flash[:alert] = "网络访问失败，请稍后再试"
      render :login, layout: false
    end
  end

  def logout
    http = login_to_remote(session["current_user"]["name"], session["current_user"]["password"], "logout")
    http.http_get
    session[:current_user] = nil
    redirect_to "/users/login" 
  end

end
