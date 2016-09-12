Rails.application.routes.draw do
	get 'main/index'
	
	resources :wells

	root 'main#index'

  end
