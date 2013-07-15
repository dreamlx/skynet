# coding: utf-8
class HomeController < ApplicationController


  def index
 
      @weibo_list = get_yaml("weibo_list")
      
      @weibo_yq   = get_yaml("weibo_yq")
      
      @weibo_yj   = get_yaml("weibo_yj")
      
      @weiboTable = get_yaml("weiboTable")
      
      gon.realTimeChartBlock = get_yaml("realTimeChartBlock")
      
      gon.realTimeChartTitle = get_yaml("realTimeChartTitle")
     
      gon.qbdx_today = get_yaml("qbdx_today")
      gon.qbdx_yesterday = get_yaml("qbdx_yesterday")
      gon.qbdx_15days = get_yaml("qbdx_15days")

      gon.media_kind_today = get_yaml("media_kind_today")
      gon.media_kind_yesterday = get_yaml("media_kind_yesterday")
      gon.media_kind_15days = get_yaml("media_kind_15days")

      gon.top10_today = get_yaml("top10_today")
      gon.top10_yesterday = get_yaml("top10_yesterday")
      gon.top10_15days = get_yaml("top10_15days")

  end

  def aside
    render layout: false;
  end

  private

end
