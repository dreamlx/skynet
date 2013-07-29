# coding: utf-8
class HomeController < ApplicationController
  #before_filter :auth_user!

  @@api_port     = "api_index.cgi"
  def getVoc(yaml,act, params=nil)
    if !session[:current_user]
      return get_voc(@@api_port, act, params)['arts']
    else
      return get_yaml(yaml)
    end
  end

  def weiboList
    #get weibo_list
    @weibo_list = getVoc("weibo_list",'get_wb_list')
    puts_to_yaml(@weibo_list, "weibo_list")

    # gon.weibo_list = @weibo_list
    # render layout: false
    
    respond_to do |format|
      format.json { render json: @weibo_list }
    end
  end

  #舆情
  def weibo_yq
    act         = 'get_yq_list'
    @weibo_yq   = getVoc("weibo_yq", act)
    puts_to_yaml(@weibo_yq, "weibo_yq")

    respond_to do |format|
      format.json { render json: @weibo_yq}
    end
  end

  #预警
  def weibo_yj    
    act         = 'get_yj_list'
    @weibo_yj   = getVoc("weibo_yj", act)
    puts_to_yaml(@weibo_yj, "weibo_yj")

    respond_to do |format|
      format.json { render json: @weibo_yj}
    end
  end

  def weiboTable
    #微博舆情
    #0为正面微博，1为负面微博，2为最热传播，3为最热评论，缺省为0
    act         = 'get_wb_yq'
    @weiboTable = getVoc("weiboTable", act)
    puts_to_yaml(@weiboTable, "weiboTable")  

    respond_to do |format|
      format.json { render json: @weiboTable}
    end  
  end

  def realTimeChart
    #图表部分
    #[动态趋势图]
    act = 'get_dtqs_list'
    @realTimeChart =  getVoc("realTimeChartBlock",act)
    puts_to_yaml(@realTimeChart, "realTimeChartBlock")

    respond_to do |format|
      format.json { render json: @realTimeChart}
    end  
  end

  def realTimeChartTitle
    #动态趋势图，title部分
    act = 'get_tit_num'
    @realTimeChartTitle = getVoc("realTimeChartTitle", act)
    puts_to_yaml(@realTimeChartTitle, "realTimeChartTitle")
    
    respond_to do |format|
      format.json { render json: @realTimeChartTitle}
    end
  end

  def qbdx_today
    #[全部调性]
    #date 整型，值为 1：当天，2：昨天，15：15天，缺省为1。
    act = 'get_dx'
    @qbdx_today      = getVoc("qbdx_today", act, "date=1")
    puts_to_yaml(@qbdx_today, "qbdx_today")
    respond_to do |format|
      format.json { render json: @qbdx_today}
    end
  end

  def qbdx_yesterday
    act = 'get_dx'
    @qbdx_yesterday  = getVoc("qbdx_yesterday", act, "date=2")
    puts_to_yaml(@qbdx_yesterday, "qbdx_yesterday")
    
    respond_to do |format|
      format.json { render json: @qbdx_yesterday}
    end
  end

  def qbdx_15days
    act = 'get_dx'
    @qbdx_15days     = getVoc("qbdx_15days", act, "date=15")
    puts_to_yaml(@qbdx_15days, "qbdx_15days")
    respond_to do |format|
      format.json { render json: @qbdx_15days}
    end
  end

  def media_today
    act = 'get_media_kind'
    @media_kind_today      = getVoc("media_kind_today", act, "date=1")
    puts_to_yaml(@media_kind_today, "media_kind_today")
    respond_to do |format|
      format.json { render json: @media_kind_today}
    end
  end

  def media_yesterday
    act = 'get_media_kind'
    @media_kind_today      = getVoc("media_kind_yesterday", act, "date=2")
    puts_to_yaml(@media_kind_today, "media_kind_yesterday")
    respond_to do |format|
      format.json { render json: @media_kind_today}
    end
  end

  def media_15days
    act = 'get_media_kind'
    @media_kind_today      = getVoc("media_kind_15days", act, "date=15")
    puts_to_yaml(@media_kind_today, "media_kind_15days")
    respond_to do |format|
      format.json { render json: @media_kind_today}
    end
  end

  def top10_today
    act = 'get_web_top10'
    @top10_today     = getVoc("top10_today", act, "date=1")
    puts_to_yaml(@top10_today, "top10_today")
    respond_to do |format|
      format.json { render json: @top10_today}
    end    
  end

  def top10_yesterday
    act = 'get_web_top10'
    @top10_today     = getVoc("top10_yesterday", act, "date=1")
    puts_to_yaml(@top10_today, "top10_yesterday")
    respond_to do |format|
      format.json { render json: @top10_today}
    end    
  end

  def top10_15days
    act = 'get_web_top10'
    @top10_today     = getVoc("top10_15days", act, "date=1")
    puts_to_yaml(@top10_today, "top10_15days")
    respond_to do |format|
      format.json { render json: @top10_today}
    end    
  end

  def index
  end
  

  private

end
