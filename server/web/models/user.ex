defmodule Cloack.User do
  use Cloack.Web, :model
  @derive [Poison.Encoder]

  schema "users" do
    field :email, :string
    field :password_hash, :string
    field :password, :string, virtual: true

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:email, :password])
    |> validate_required([:email, :password])
    |> hash_password
  end

  defp hash_password(changeset) do
    pass = get_field(changeset, :password)
    hash = Comeonin.Bcrypt.hashpwsalt(pass)
    put_change(changeset, :password_hash, hash)
  end
end
