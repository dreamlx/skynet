# coding: utf-8
class HomeController < ApplicationController
  def index
    #through curl login skynet
    base_url = 'http://imws.voc.com.cn/cgi-bin/imetrics/api'
    login_api = 'api_login.cgi'
    weibo_api   = 'api_index.cgi'
    api_url = "#{base_url}/#{weibo_api}"

    act = 'login'
    username = 'changhe@163.com'
    password = 'voc2013'
    id_cp = 30
    curl = "#{base_url}/#{login_api}?act=#{act}&username=#{username}&password=#{password}&id_cp=#{id_cp}"
    
    http = Curl::Easy.new(curl)
    http.follow_location = true
    http.enable_cookies = true

    if http.http_get
      # puts hash_login: 
      # {"code"=>"200", "data"=>{"id_cp"=>30, "id_gp"=>183, "VOC_CenterID"=>"432bee3c62e2dcf01ef76a87b59ba49178", "url"=>"http://imws.voc.com.cn/imetrics/30_183.html"}} 
      hash_login  = json2hash(http.body_str)

      #get weibo_list
      act         = 'get_wb_list'
      @weibo_list = json2hash(get_voc(api_url, act, hash_login, http))['arts']
     
      #舆情
      act         = 'get_yq_list'
      @weibo_yq   = json2hash(get_voc(api_url, act, hash_login, http))['arts']

      #预警
      act         = 'get_yj_list'
      @weibo_yj   = json2hash(get_voc(api_url, act, hash_login, http))['arts']

      #微博舆情
      #0为正面微博，1为负面微博，2为最热传播，3为最热评论，缺省为0
      act         = 'get_wb_yq'
      @weiboTable = []
      @weiboTable[0] = json2hash(get_voc(api_url, act, hash_login, http,"index=0"))['arts']
      @weiboTable[1] = json2hash(get_voc(api_url, act, hash_login, http,"index=1"))['arts']
      @weiboTable[2] = json2hash(get_voc(api_url, act, hash_login, http,"index=2"))['arts']
      @weiboTable[3] = json2hash(get_voc(api_url, act, hash_login, http,"index=3"))['arts']

      #图表部分
      #[动态趋势图]
      act = 'get_dtqs_list'
      gon.realTimeChartBlock = get_voc(api_url, act, hash_login, http)
      #动态趋势图，title部分
      act = 'get_tit_num'
      gon.realTimeChartTitle = get_voc(api_url, act, hash_login, http)
      
      #[全部调性]
      #date 整型，值为 1：当天，2：昨天，15：15天，缺省为1。
      act = 'get_dx'
      gon.qbdx_today = get_voc(api_url, act, hash_login, http,"date=1")
      gon.qbdx_yesterday = get_voc(api_url, act, hash_login, http,"date=2")
      gon.qbdx_15days = get_voc(api_url, act, hash_login, http,"date=15")

      #[媒体类型]
      act = 'get_media_kind'
      gon.media_kind_today = get_voc(api_url, act, hash_login, http,"date=1")
      gon.media_kind_yesterday = get_voc(api_url, act, hash_login, http,"date=2")
      gon.media_kind_15days = get_voc(api_url, act, hash_login, http,"date=15") 

      #top10
      act = 'get_web_top10'
      gon.top10_today = get_voc(api_url, act, hash_login, http,"date=1")
      gon.top10_yesterday = get_voc(api_url, act, hash_login, http,"date=2")
      gon.top10_15days = get_voc(api_url, act, hash_login, http,"date=15")      
    else
        #TODO, try again
    end
  end

  private

  def get_voc(api_url, act, hash_login, http, other_condition=nil)
    id_gp = hash_login['data']['id_gp']
    id_cp = hash_login['data']['id_cp']
    curl = "#{api_url}?act=#{act}&id_gp=#{id_gp}&id_cp=#{id_cp}"
    curl += "&#{other_condition}" unless other_condition.nil?
    http.url = curl
    if http.http_get
      result = http.body_str
    else
      result = []
    end
  end

  def json2hash(obj)
    result = ActiveSupport::JSON.decode(obj)
  end
end
