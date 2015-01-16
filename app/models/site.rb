class Site
  include Mongoid::Document

  field :name, :default => 'Board'
  # embeds_one :fragment

  # after_initialize :build_fragment_if_nil

  # def build_fragment_if_nil
  #   build_fragment if fragment.nil?
  # end
end
