class ApplicationController < ActionController::Base
  protect_from_forgery
  
  def auth_user!
    redirect_to "/users/login" if session['current_user'].nil?
  end
  
  private

  def get_voc(api_port, act, other_condition=nil)
    base_url = 'http://imws.voc.com.cn/cgi-bin/imetrics/api'
    curl = "#{base_url}/#{api_port}?act=#{act}"
    curl += "&VOC_CenterID=#{ session['user_data']['VOC_CenterID'] }&id_cp=#{ session['user_data']['id_cp'] }&id_gp=#{ session['user_data']['id_gp'] }"
    curl += "&#{other_condition}" unless other_condition.nil?
    http = Curl::Easy.new(curl)
    http.url = curl

    if http.http_get
      result = json2hash(http.body_str)
    else
      result = []
    end
   
  end

  def json2hash(obj)
    result = ActiveSupport::JSON.decode(obj)
  end

  def puts_to_yaml(hash_obj, filename)
    File.open(Rails.root.to_s + "/test/yaml_data/#{filename}.yml", 'w') do |f|  
         f.puts hash_obj.ya2yaml  
    end  
  end

  # read yaml file
  def get_yaml(filename)
    YAML::load(File.read(Rails.root.to_s + "/test/yaml_data/#{filename}.yml"))  
  end

  def login_to_remote(username='changhe@163.com', password='voc2013', act="login")
    base_url = 'http://imws.voc.com.cn/cgi-bin/imetrics/api'
    login_api = 'api_login.cgi'

    #TODO:id_cp 和用户有关，现在是指定的！需要给参数解决
    id_cp = 30
    curl = "#{base_url}/#{login_api}?act=#{act}&username=#{username}&password=#{password}&id_cp=#{id_cp}"
    http = Curl::Easy.new(curl)
    http.follow_location = true
    http.enable_cookies = true
    return http
  end  
end
