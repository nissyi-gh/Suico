Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      root 'application#health'
      get 'user', to: 'users#show'
      patch 'user', to: 'users#update'
      resources :users, except: %i[show update]
      get 'guest', to: 'users#guest_create'

      get '/login', to: 'sessions#new'
      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'
      get '/logged_in', to: 'sessions#logged_in'

      resources :sleep_logs
      get '/create_guest_logs', to: 'sleep_logs#guest_logs'
      resources :alarm_presets
    end
  end
end
