module ApplicationHelper
  def page_title
    if @page_title
      "#{@page_title} - #{@site.name}"
    else
      "#{@site.name}"
    end
  end
end
