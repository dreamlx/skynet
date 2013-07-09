class ApplicationController < ActionController::Base
  protect_from_forgery

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
