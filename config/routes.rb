Rails.application.routes.draw do
  root 'main#index'
  get 'measurements/index'
  get '/measurements' => 'measurements#index'
  

  resources :measurements

  get 'welcome/index'

  end
