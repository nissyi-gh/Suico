class Notification < ApplicationRecord
  belongs_to :user

  validates :post_user_id, presence: true
  validates :title, presence: true
  validates :body, presence: true
end
