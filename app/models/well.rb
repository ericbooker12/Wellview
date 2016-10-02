class Well < ApplicationRecord
	has_many :measurements
	belongs_to :rig
end
