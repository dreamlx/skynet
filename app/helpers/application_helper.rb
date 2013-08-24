# coding: utf-8
module ApplicationHelper
  def get_keywords
    keywords = "天网,skynet"
  end
  
  def get_description    
    description = ""
  end
  
  def get_head_title
    #产品-分类-网站名称
    title = "首页 - 天网舆情"
  end

  def get_home_title( lng = "cn" )
    
    if lng == 'en'
      title = "Public Opinion Monitoring System" 
    else
      title = "舆情预警分析系统" 
    end
  end
end
