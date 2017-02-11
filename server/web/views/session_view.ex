defmodule Cloack.SessionView do
  use Cloack.Web, :view

  def render("token.json", %{token: token}) do
    %{access_token: token}
  end
end
