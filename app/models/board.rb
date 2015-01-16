class Board
  include Mongoid::Document
  include Mongoid::Timestamps::Created
  field :name
  field :data
  field :style
  belongs_to :user
end