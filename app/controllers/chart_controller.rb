class ChartController < ApplicationController
  before_filter :require_logined
  def index
    current_user
    render :json => Chart.where(:user_id => current_user._id).as_json
  end

  def create
    params[:user_id] = current_user._id.to_s
    params[:chart][:user_id] = current_user._id.to_s
    chart = Chart.create chart_params
    render :json =>chart.as_json 
  end

  def show
    render :json => Chart.where(:user_id => current_user._id,:_id =>params[:id]).first.as_json 
  end

  def update
    chart = Chart.find(params[:id])
    chart.update! chart_params
    render :json =>chart.as_json
  end
  def destroy
    chart = Chart.find(params[:id])
    chart.remove
    render :json => {}
  end
  private
    def chart_params
      params.require(:chart).permit(:type, :data, :user_id)
    end
end
