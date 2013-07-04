# coding: utf-8
class HomeController < ApplicationController
  def index
    #through curl login skynet
    api_url = 'http://imws.voc.com.cn/cgi-bin/imetrics/api'
    login_api = 'api_login.cgi'
    weibo_api   = 'api_index.cgi'
    act = 'login'
    username = 'changhe@163.com'
    password = 'voc2013'
    id_cp = 30
    curl = "#{api_url}/#{login_api}?act=#{act}&username=#{username}&password=#{password}&id_cp=#{id_cp}"
    
    http = Curl::Easy.new(curl)
    http.follow_location = true
    http.enable_cookies = true

    if http.http_get
      # puts hash_login: 
      # {"code"=>"200", "data"=>{"id_cp"=>30, "id_gp"=>183, "VOC_CenterID"=>"432bee3c62e2dcf01ef76a87b59ba49178", "url"=>"http://imws.voc.com.cn/imetrics/30_183.html"}} 
      hash_login  =  ActiveSupport::JSON.decode(http.body_str)

      #get weibo_list
      act         = 'get_wb_list'
      @weibo_list = get_weibo_list(api_url, weibo_api, act, hash_login, http)
     
      #舆情
      act         = 'get_yq_list'
      @weibo_yq   = get_weibo_list(api_url, weibo_api, act, hash_login, http)

      #预警
      act         = 'get_yj_list'
      @weibo_yj   = get_weibo_list(api_url, weibo_api, act, hash_login, http)

      #微博舆情
      #0为正面微博，1为负面微博，2为最热传播，3为最热评论，缺省为0
      act         = 'get_wb_yq'
      @weiboTable = []
      @weiboTable[0] = get_weibo_list(api_url, weibo_api, act, hash_login, http,0)
      @weiboTable[1] = get_weibo_list(api_url, weibo_api, act, hash_login, http,0)
      @weiboTable[2] = get_weibo_list(api_url, weibo_api, act, hash_login, http,0)
      @weiboTable[3] = get_weibo_list(api_url, weibo_api, act, hash_login, http,0)
    else
        #TODO, try again
    end
  end

  private

  def get_weibo_list(api_url,weibo_api,act,hash_login,http,date=nil)
    id_gp = hash_login['data']['id_gp']
    id_cp = hash_login['data']['id_cp']
    curl = "#{api_url}/#{weibo_api}?act=#{act}&id_gp=#{id_gp}&id_cp=#{id_cp}"
    curl += "&date=#{date}" unless date.nil?
    http.url = curl
    if http.http_get
      weibo_list = ActiveSupport::JSON.decode(http.body_str)['arts'] 
    else
      weibo_list = []
    end
  end
end
