Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'user', to: 'users#show'
      patch 'user', to: 'users#update'
      resources :users, except: %i[show update]
    end
  end
end
