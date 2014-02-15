class Sprint < ActiveRecord::Base
  belongs_to :project

  validates :points, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :project_id, presence: true
end
