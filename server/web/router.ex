defmodule Cloack.Router do
  use Cloack.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
  end

  scope "/api", Cloack do
    pipe_through :api

    post "/session/create", SessionController, :create
  end
end
