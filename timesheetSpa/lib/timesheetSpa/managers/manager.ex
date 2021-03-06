defmodule TimesheetSpa.Managers.Manager do
  use Ecto.Schema
  import Ecto.Changeset

  schema "managers" do
    field :email, :string
    field :name, :string
    field :password_hash, :string

    timestamps()
  end

  @doc false
  def changeset(manager, attrs) do
    manager
    |> cast(attrs, [:email, :name, :password_hash])
    |> validate_required([:email, :name, :password_hash])
  end
end
