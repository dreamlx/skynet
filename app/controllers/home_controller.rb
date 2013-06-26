# coding: utf-8
class HomeController < ApplicationController
  def index
    @weibo_items = []
    @weibo_items << { content: "热门事件A" }
    @weibo_items << { content: "热门事件B" }
    @weibo_items << { content: "热门事件C" }
    @weibo_items << { content: "热门事件D" }
  end
end
