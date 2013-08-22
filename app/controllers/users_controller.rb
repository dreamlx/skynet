# coding: utf-8
class UsersController < ApplicationController
  layout "frontApplication"
  def login
  end

  def homepage
  end

  def experience
  end

  def services
  end

  def cases
  end

  def about
  end

  def create_session
    http = login_to_remote(params["user"]["name"], params["user"]["password"])
    if http.http_get
      if json2hash(http.body_str)["code"] == "200"
        session["current_user"] = params[:user]
        session["user_data"] = json2hash(http.body_str)["data"]
        cookies["last_sigin"] = (Time.now + 600).strftime("%Y-%m-%d %H:%M")
        redirect_to "/home" 
      else
        flash[:alert] = "用户名或者密码错误，登录失败"
        render :login, layout: "frontApplication"
      end
    else
      flash[:alert] = "网络访问失败，请稍后再试"
      render :login, layout: "frontApplication"
    end
  end

  def logout
    http = login_to_remote(session["current_user"]["name"], session["current_user"]["password"], "logout")
    http.http_get
    session[:current_user] = nil
    session[:VOC_CenterID] = nil
    cookies["last_sigin"] = Time.now.strftime("%Y-%m-%d ")
    redirect_to "/users/login" 
  end

  def post_consult
    @consult = Consult.new(params[:consult]) 
    respond_to do |format|
      if @consult.save
        UserMailer.consult(@consult).deliver
        format.html{redirect_to root_path, notice:'This email has aready send'} 
        format.json{render :json => {:response => "success"}}
      else
        format.json{render :json => {:response => "failed"}}
      end
    end
  end

  def try_out
    @user = User.new(params[:user])
    respond_to do |format|
      if @user.save
        UserMailer.try_out(@user).deliver
        format.html{redirect_to root_path, notice:'This email has aready send'} 
        format.json{render :json => {:response => "success"}}
      else
        format.json{render :json => {:response => "failed"}}
      end
    end
  end
end
