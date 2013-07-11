# coding: utf-8
class HomeController < ApplicationController


  def index
 
      @weibo_list = get_yaml("weibo_list")
      
      @weibo_yq   = get_yaml("weibo_yq")
      
      @weibo_yj   = get_yaml("weibo_yj")
      
      @weiboTable = get_yaml("weiboTable")
      
      gon.realTimeChartBlock = get_yaml("realTimeChartBlock").to_json
      
      gon.realTimeChartTitle = get_yaml("realTimeChartTitle").to_json
     
      gon.qbdx_today = get_yaml("qbdx_today").to_json
      gon.qbdx_yesterday = get_yaml("qbdx_yesterday").to_json
      gon.qbdx_15days = get_yaml("qbdx_15days").to_json

      gon.media_kind_today = get_yaml("media_kind_today").to_json
      gon.media_kind_yesterday = get_yaml("media_kind_yesterday").to_json
      gon.media_kind_15days = get_yaml("media_kind_15days").to_json

      gon.top10_today = get_yaml("top10_today").to_json
      gon.top10_yesterday = get_yaml("top10_yesterday").to_json
      gon.top10_15days = get_yaml("top10_15days").to_json

  end

  private

end
