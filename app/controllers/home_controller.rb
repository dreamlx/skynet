# coding: utf-8
class HomeController < ApplicationController
  def index
    @lastestWeiboArticle =[]
    @lastestWeiboArticle[1] = "最新舆情,最新舆情最新舆情最新舆情最新舆情最新舆情最新舆情最新舆情最新舆情最新舆情"
    @lastestWeiboArticle[2] = "最新预警,最新预警最新预警最新预警最新预警最新预警最新预警最新预警最新预警最新预警"
    
    @weibo_items = []
    @weibo_items << { content: "热门事件A" }
    @weibo_items << { content: "热门事件B" }
    @weibo_items << { content: "热门事件C" }
    @weibo_items << { content: "热门事件D" }

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
