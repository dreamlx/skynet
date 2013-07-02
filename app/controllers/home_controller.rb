# coding: utf-8
class HomeController < ApplicationController
  def index
    #through curl login skynet
    api_url = 'http://imws.voc.com.cn/cgi-bin/imetrics/api'
    login_api = 'api_login.cgi'
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
      hash_login =  ActiveSupport::JSON.decode(http.body_str)

      #get weibo_list
      weibo_api = 'api_index.cgi'
      id_gp = hash_login['data']['id_gp']
      id_cp = hash_login['data']['id_cp']

      act = 'get_wb_list'
      curl = "#{api_url}/#{weibo_api}?act=#{act}&id_gp=#{id_gp}&id_cp=#{id_cp}"
      http.url = curl
      @weibo_list = ActiveSupport::JSON.decode(http.body_str)['arts'] if http.http_get

      #舆情
      act = 'get_yq_list'
      curl = "#{api_url}/#{weibo_api}?act=#{act}&id_gp=#{id_gp}&id_cp=#{id_cp}"
      http.url = curl
      @weibo_yq = ActiveSupport::JSON.decode(http.body_str)['arts'] if http.http_get

      #预警
      act = 'get_yj_list'
      curl = "#{api_url}/#{weibo_api}?act=#{act}&id_gp=#{id_gp}&id_cp=#{id_cp}"
      http.url = curl
      @weibo_yj = ActiveSupport::JSON.decode(http.body_str)['arts'] if http.http_get

    else
        #TODO, try again
    end

    @weiboTable1 =  []
    @weiboTable1<< {content: "新疆好风景A", meiti: "CCTV", created_at: Time.now, url: '#' }
    @weiboTable1<< {content: "新疆好风景B", meiti: "CCTV", created_at: Time.now, url: '#' }
    @weiboTable1<< {content: "新疆暴动C", meiti: "CCTV", created_at: Time.now, url: '#' }
    @weiboTable1<< {content: "新疆好风景D", meiti: "CCTV", created_at: Time.now, url: '#' }
    @weiboTable1<< {content: "新疆好风景E", meiti: "CCTV", created_at: Time.now, url: '#' }

    @weiboTable2 =  []
    @weiboTable2<< {content: "上海经济良好A", meiti: "CCTV2", created_at: Time.now, url: '#' }
    @weiboTable2<< {content: "上海经济良好B", meiti: "CCTV2", created_at: Time.now, url: '#' }
    @weiboTable2<< {content: "上海经济良好C", meiti: "CCTV2", created_at: Time.now, url: '#' }
    @weiboTable2<< {content: "上海经济良好A", meiti: "CCTV2", created_at: Time.now, url: '#' }
    @weiboTable2<< {content: "上海经济良好E", meiti: "CCTV2", created_at: Time.now, url: '#' }

        @weiboTable3 =  []
    @weiboTable3<< {content: "东海稳定良好A", meiti: "CCTV3", created_at: Time.now, url: '#' }
    @weiboTable3<< {content: "东海稳定良好B", meiti: "CCTV3", created_at: Time.now, url: '#' }
    @weiboTable3<< {content: "东海稳定良好C", meiti: "CCTV3", created_at: Time.now, url: '#' }
    @weiboTable3<< {content: "东海稳定良好D", meiti: "CCTV3", created_at: Time.now, url: '#' }
    @weiboTable3<< {content: "东海稳定良好E", meiti: "CCTV3", created_at: Time.now, url: '#' }


        @weiboTable4 =  []
    @weiboTable4<< {content: "浙江地区良好", meiti: "CCTV4", created_at: Time.now, url: '#' }
    @weiboTable4<< {content: "浙江地区良好", meiti: "CCTV4", created_at: Time.now, url: '#' }
    @weiboTable4<< {content: "浙江地区良好", meiti: "CCTV4", created_at: Time.now, url: '#' }
    @weiboTable4<< {content: "浙江地区良好", meiti: "CCTV4", created_at: Time.now, url: '#' }
    @weiboTable4<< {content: "浙江地区良好", meiti: "CCTV4", created_at: Time.now, url: '#' }
  end
end
