defmodule Cloack.SessionController do
  use Cloack.Web, :controller

  alias Cloack.Repo
  alias Cloack.User

  def create(conn, %{"username" => email, "password" => pass}) do
    user = Repo.get_by(User, [email: email])
    case user do
      {:ok, user} ->
        if Comeonin.Bcrypt.checkpw(pass, user.password_hash) do
          {:ok, jwt, _c} = Guardian.encode_and_sign(user, :access, perms: %{ default: [:read, :write]})
          render(conn, "token.json", token: jwt)
        else
          conn |> put_status(400) |> render(Cloack.ErrorView, "400.json", message: "Password does not match")
        end
      _ -> conn |> put_status(400) |> render(Cloack.ErrorView, "400.json", message: "Password does not match")
    end

  end
end
