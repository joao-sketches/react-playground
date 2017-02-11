defmodule Cloack.GuardianSerializer do
  @behaviour Guardian.Serializer

  alias Cloack.Repo
 alias Cloack.User

  def for_token(user = %User{}), do: { :ok, Poison.encode!(%{id: user.id, email: user.email, roles: [:read]})}
  def for_token(_), do: { :error, "Unknown resource type" }

  def from_token(json), do: { :ok, Repo.get(User, Poison.decode!(json) |> Map.get("id")) }

end
