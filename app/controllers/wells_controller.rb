class WellsController < ApplicationController

	def index
		@wells = Well.all
		p @wells
	end
	
end
