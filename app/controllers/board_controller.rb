class BoardController < ApplicationController
  before_filter :require_logined
  def index
    current_user
    render :json => Board.where(:user_id => current_user._id).as_json
  end

  def create
    params[:user_id] = current_user._id.to_s
    params[:board][:user_id] = current_user._id.to_s
    board = Board.create board_params
    render :json =>board.as_json 
  end

  def show
  	render :json => Board.where(:user_id => current_user._id,:_id =>params[:id]).first.as_json 
  end

  def update
    board = Board.find(params[:id])
    board.update! board_params
    render :json => board.as_json
  end

  def destroy
    board = Board.find(params[:id])
    board.remove
    render :json => {}
  end


  private
    def board_params
      params.require(:board).permit(:name, :data, :style, :user_id)
    end
end
