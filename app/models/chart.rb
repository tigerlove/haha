class Chart
  include Mongoid::Document
  include Mongoid::Timestamps::Created
  field :data
  field :type
  belongs_to :user
end