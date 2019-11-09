defmodule TimesheetSpa.Repo do
  use Ecto.Repo,
    otp_app: :timesheetSpa,
    adapter: Ecto.Adapters.Postgres
end
