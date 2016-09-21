Rails.application.routes.draw do
  get 'measurement/index'

  resources :measurements

  get 'welcome/index'

  root 'main#index'
  end
