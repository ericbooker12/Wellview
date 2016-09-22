Rails.application.routes.draw do
  root 'main#index'
  get 'welcome/index'

  resources :measurements

end