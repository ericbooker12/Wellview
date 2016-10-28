Rails.application.routes.draw do
  root 'main#index'
  get 'welcome/index'
  resources :measurements

  # get '/measurements' => 'measurement#data'

  resources :measurements do
  	collection do 
  		get 'td'
  	end
  end

end