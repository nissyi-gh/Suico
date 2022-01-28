Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'user', to: 'users#show'
      patch 'user', to: 'users#update'
      resources :users, except: %i[show update]

      get '/login', to: 'sessions#new'
      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'
      get '/logged_in', to: 'sessions#logged_in'
    end
  end
end
