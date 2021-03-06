class User < ApplicationRecord
  attr_accessor :remember_token

  before_save { email.downcase! }
  validates :name,  presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 }, format: { with: VALID_EMAIL_REGEX }, uniqueness: true
  has_secure_password
  validates :password, presence: true, length: { minimum: 8 }, allow_nil: true

  has_many :sleep_logs, dependent: :destroy
  has_many :alarm_presets, dependent: :destroy

  # Userクラスのクラスメソッドを定義
  class << self
    # 渡された文字列のハッシュ値を返す
    def User.digest(string)
      cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
      BCrypt::Password.create(string, cost: cost)
    end

    # ランダムなトークンを返す
    def User.new_token
      SecureRandom.urlsafe_base64
    end

    def User.guest_create
      User.create(
        name: 'ゲストユーザー',
        email: "user.#{User.count}th@guest.com",
        password: "password",
        password_confirmation: "password"
      )
    end
  end

  # 永続セッションのためにユーザーをデータベースに記憶する
  def remember
    self.remember_token = User.new_token
    update_attribute(:remember_digest, User.digest(remember_token))
  end

  # 渡されたトークンがダイジェストと一致したらtrue
  def authenticated?(remember_token)
    return false if remember_digest.nil?

    BCrypt::Password.new(remember_digest).is_password?(remember_token)
  end

  # ログイン情報を破棄
  def forget
    update_attribute(:remember_digest, nil)
  end
end
