Rails.application.routes.draw do
  root 'main#index'
  get 'welcome/index'

  resources :measurements

  # get '/measurements' => 'measurement#data'

end