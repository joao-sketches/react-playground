# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :cloack,
  ecto_repos: [Cloack.Repo]

# Configures the endpoint
config :cloack, Cloack.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "ZxbPP6PHss+cOtZBt7xUQtlU8B9fnX+lx6tp3i8qSIglNtyOfBR9EnWHAkyf3dc7",
  render_errors: [view: Cloack.ErrorView, accepts: ~w(json)],
  pubsub: [name: Cloack.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]


config :guardian, Guardian,
  allowed_algos: ["HS512"], # optional
  verify_module: Guardian.JWT,  # optional
  issuer: "Cloack.#{Mix.env}",
  ttl: { 30, :days },
  allowed_drift: 2000,
  verify_issuer: true, # optional
  secret_key: "ZxbPP6PHss+cOtZBt7xUQtlU8B9fnX+lx6tp3i8qSIglNtyOfBR9EnWHAkyf3dc7",
  serializer: Cloack.GuardianSerializer,
  permissions: %{
         default: [:read, :write]
       }
# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
