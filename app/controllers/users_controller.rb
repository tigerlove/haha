class UsersController < ApplicationController
  layout 'signin'
  before_filter :require_no_logined

  def new
    @user = User.new
    store_location request.referrer if request.referrer.present?
  end

  def create
    debugger
    @user = User.new user_params

    if @user.save
      board = Board.create(name:'first board',data:'[]', style:'black', user_id:@user._id.to_s)   
      login_as @user
      
      redirect_back_or_default root_url
    else
      render :new
    end
  end

    
end
