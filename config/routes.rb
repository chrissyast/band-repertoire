Rails.application.routes.draw do
  root 'pages#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  #
  namespace :api do
    post 'repertoire/save', to: 'repertoire#save'
  end
end
