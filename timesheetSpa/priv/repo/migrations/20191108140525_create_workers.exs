defmodule TimesheetSpa.Repo.Migrations.CreateWorkers do
  use Ecto.Migration

  def change do
    create table(:workers) do
      add :name, :string
      add :email, :string
      add :password_hash, :string
      add :manager_id, references(:managers, on_delete: :nothing)

      timestamps()
    end

    create index(:workers, [:manager_id])
  end
end
